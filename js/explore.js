/* ===== Explore Tab Module ===== */

const ExploreModule = {
  currentCategory: 'all',
  currentSearch: '',
  currentSort: 'rating',
  currentView: 'grid',
  map: null,
  markers: [],

  init() {
    this.renderCategories();
    this.bindEvents();
    this.renderPlaces();
    
    // Defer map init slightly so DOM is ready
    setTimeout(() => {
      this.initMap();
    }, 100);
  },

  /* ===== Bindings ===== */
  bindEvents() {
    // Search
    const searchInput = document.getElementById('place-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.currentSearch = e.target.value.toLowerCase().trim();
        this.updateView();
      }, 200));
    }

    // Sort
    const sortSelect = document.getElementById('place-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.updateView();
      });
    }

    // View Toggle
    const viewToggle = document.getElementById('explore-view-toggle');
    if (viewToggle) {
      viewToggle.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        
        viewToggle.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentView = e.target.dataset.view;
        this.toggleViewDisplay();
      });
    }
  },

  /* ===== Category Chips ===== */
  renderCategories() {
    const container = document.getElementById('place-categories');
    if (!container) return;

    container.innerHTML = CampusData.placeCategories.map(cat => `
      <button class="chip ${cat.id === this.currentCategory ? 'active' : ''}" 
              data-category="${cat.id}">
        <span class="chip-icon">${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join('');

    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      this.currentCategory = chip.dataset.category;
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      this.updateView();
    });
  },

  /* ===== Filter Places ===== */
  getFilteredPlaces() {
    let places = CampusData.places;
    
    if (this.currentCategory !== 'all') {
      places = places.filter(p => p.category === this.currentCategory);
    }
    
    if (this.currentSearch) {
      places = places.filter(p =>
        p.name.toLowerCase().includes(this.currentSearch) ||
        p.category.toLowerCase().includes(this.currentSearch) ||
        p.description.toLowerCase().includes(this.currentSearch)
      );
    }

    // Sort
    places = [...places].sort((a, b) => {
      if (this.currentSort === 'rating') {
        return b.rating - a.rating;
      } else if (this.currentSort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.currentSort === 'crowd') {
        const order = { low: 1, moderate: 2, high: 3 };
        return order[a.crowdLevel] - order[b.crowdLevel];
      }
      return 0;
    });

    return places;
  },

  updateView() {
    this.renderPlaces();
    this.updateMapMarkers();
  },

  toggleViewDisplay() {
    const grid = document.getElementById('places-grid');
    const mapContainer = document.getElementById('places-map-container');
    
    if (this.currentView === 'grid') {
      grid.style.display = 'grid';
      mapContainer.style.display = 'none';
    } else {
      grid.style.display = 'none';
      mapContainer.style.display = 'block';
      if (this.map) {
        this.map.invalidateSize();
      }
    }
  },

  /* ===== Map Logic ===== */
  initMap() {
    if (typeof L === 'undefined') return; // Ensure Leaflet is loaded
    
    // Center roughly on Greenfield campus
    this.map = L.map('campus-map', {
      zoomControl: false,
      attributionControl: false
    }).setView([28.6139, 77.2090], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.updateMapMarkers();
  },

  updateMapMarkers() {
    if (!this.map) return;

    // Remove existing markers
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    const places = this.getFilteredPlaces();
    
    places.forEach(place => {
      if (!place.lat || !place.lng) return;

      // Custom marker icon based on category color
      const colors = {
        food: '#f97316',
        study: '#3b82f6',
        sports: '#22c55e',
        medical: '#ef4444',
        academic: '#8b5cf6',
        other: '#64748b'
      };
      
      const markerHtml = `
        <div style="background: ${colors[place.category] || colors.other}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          ${place.icon}
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'custom-map-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([place.lat, place.lng], { icon })
        .addTo(this.map)
        .on('click', () => {
          this.openPlaceDetail(place.id);
        });
        
      this.markers.push(marker);
    });
  },

  /* ===== Render Place Cards ===== */
  renderPlaces() {
    const grid = document.getElementById('places-grid');
    if (!grid) return;

    const places = this.getFilteredPlaces();

    if (places.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">No places found</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = places.map((place, idx) => `
      <div class="place-card stagger-${Math.min(idx + 1, 10)}" 
           onclick="ExploreModule.openPlaceDetail('${place.id}')">
        <div class="place-card-image">
          ${place.image ? `
            <img src="${place.image}" alt="${place.name}">
            <div class="overlay"></div>
          ` : `
            <div class="gradient-bg ${place.gradient}"></div>
          `}
          <div class="place-card-crowd">${Utils.createCrowdBadge(place.crowdLevel)}</div>
          <span>${place.icon}</span>
        </div>
        <div class="place-card-body">
          <div class="place-card-category">${place.category}</div>
          <div class="place-card-name">${place.name}</div>
          <div class="place-card-footer">
            <div class="place-card-rating">
              <span class="stars">★</span>
              <span>${place.rating}</span>
              <span style="color:var(--color-text-muted);">(${place.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  /* ===== Place Detail Modal ===== */
  openPlaceDetail(placeId) {
    const place = CampusData.places.find(p => p.id === placeId);
    if (!place) return;

    // Set hero
    const gradient = document.getElementById('place-modal-gradient');
    gradient.className = `modal-hero-gradient ${place.gradient}`;
    
    // Add background image to hero if available
    if (place.image) {
      gradient.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url('${place.image}')`;
      gradient.style.backgroundSize = 'cover';
      gradient.style.backgroundPosition = 'center';
    } else {
      gradient.style.backgroundImage = '';
    }

    document.getElementById('place-modal-icon').textContent = place.icon;

    // Set bookmark state
    const bookmarkBtn = document.getElementById('place-bookmark-btn');
    bookmarkBtn.className = `modal-action-btn bookmark-btn ${Utils.isBookmarked(placeId) ? 'active' : ''}`;
    bookmarkBtn.onclick = () => {
      const isNowBookmarked = Utils.toggleBookmark(placeId);
      bookmarkBtn.classList.toggle('active', isNowBookmarked);
      if (typeof ProfileModule !== 'undefined') ProfileModule.render();
    };

    // Get user reviews for this place
    const userReviews = Utils.getUserReviews().filter(r => r.placeId === placeId);
    const allReviews = [...place.reviews, ...userReviews];

    // Build body
    const body = document.getElementById('place-modal-body');
    body.innerHTML = `
      <div class="detail-name">${place.name}</div>
      <div class="detail-meta">
        <span class="detail-category-badge">${place.category}</span>
        <div class="detail-rating">
          ${Utils.renderStars(place.rating)}
          <span style="margin-left:4px;">${place.rating}</span>
          <span style="color:var(--color-text-muted);">(${place.reviewCount + userReviews.length})</span>
        </div>
        ${Utils.createCrowdBadge(place.crowdLevel)}
      </div>
      <p class="detail-description">${place.description}</p>
      
      <div class="info-list">
        <div class="info-item">
          <div class="info-icon">${Utils.icons.clock}</div>
          <div class="info-content">
            <div class="info-label">Hours</div>
            <div class="info-value">${place.hours}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.mapPin}</div>
          <div class="info-content">
            <div class="info-label">Location</div>
            <div class="info-value">${place.location}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.phone}</div>
          <div class="info-content">
            <div class="info-label">Contact</div>
            <div class="info-value">${place.phone}</div>
          </div>
        </div>
      </div>

      <div class="detail-divider"></div>

      <!-- Reviews Section -->
      <div class="reviews-header">
        <h3>Reviews</h3>
        <div class="rating-summary">
          <span class="rating-number">${place.rating}</span>
          <div>
            <div class="rating-stars">${Utils.renderStars(place.rating)}</div>
            <div class="rating-count">${place.reviewCount + userReviews.length} reviews</div>
          </div>
        </div>
      </div>

      ${allReviews.map(review => `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">${review.initials}</div>
            <div class="review-user-info">
              <div class="review-user-name">${review.user}</div>
              <div class="review-date">${Utils.formatDate(review.date)}</div>
            </div>
            <div class="rating-stars">${Utils.renderStars(review.rating)}</div>
          </div>
          <p class="review-text">${review.text}</p>
        </div>
      `).join('')}

      <div class="detail-divider"></div>

      <!-- Add Review Form -->
      <h3 style="margin-bottom: var(--space-4);">Write a Review</h3>
      <div id="add-review-form-${placeId}">
        <div class="form-group">
          <label class="form-label">Your Rating</label>
          <div class="star-rating-input" id="star-input-${placeId}">
            ${[1,2,3,4,5].map(i => `
              <button class="star-btn" data-rating="${i}" onclick="ExploreModule.setStarRating('${placeId}', ${i})">★</button>
            `).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Your Review</label>
          <textarea class="form-textarea" id="review-text-${placeId}" placeholder="Share your experience..."></textarea>
        </div>
        <button class="btn btn-primary btn-full" onclick="ExploreModule.submitReview('${placeId}')">
          Submit Review
        </button>
      </div>
    `;

    // Scroll to top and open
    document.getElementById('place-modal-scroll').scrollTop = 0;
    Utils.openModal('place-modal');
  },

  /* Star rating helper */
  _selectedRating: {},

  setStarRating(placeId, rating) {
    this._selectedRating[placeId] = rating;
    const container = document.getElementById(`star-input-${placeId}`);
    if (!container) return;
    container.querySelectorAll('.star-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx < rating);
    });
  },

  submitReview(placeId) {
    const rating = this._selectedRating[placeId] || 0;
    const textEl = document.getElementById(`review-text-${placeId}`);
    const text = textEl ? textEl.value.trim() : '';

    if (!rating) {
      Utils.showToast('Please select a star rating');
      return;
    }
    if (!text) {
      Utils.showToast('Please write a review');
      return;
    }

    Utils.addUserReview(placeId, rating, text);
    // Refresh the modal to show the new review
    this.openPlaceDetail(placeId);
  }
};
