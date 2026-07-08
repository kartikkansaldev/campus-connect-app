/* ===== Clubs Tab Module ===== */

const ClubsModule = {
  currentCategory: 'all',
  currentSearch: '',
  currentSort: 'members',

  init() {
    this.renderUpcomingEvents();
    this.renderCategories();
    this.bindEvents();
    this.renderClubs();
  },

  /* ===== Bindings ===== */
  bindEvents() {
    // Search
    const searchInput = document.getElementById('club-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.currentSearch = e.target.value.toLowerCase().trim();
        this.renderClubs();
      }, 200));
    }

    // Sort
    const sortSelect = document.getElementById('club-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderClubs();
      });
    }
  },

  /* ===== Upcoming Events (aggregated) ===== */
  renderUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    if (!container) return;

    // Collect all events from all clubs, sorted by date
    const allEvents = [];
    CampusData.clubs.forEach(club => {
      club.events.forEach(event => {
        allEvents.push({ ...event, clubName: club.name, clubId: club.id, clubIcon: club.icon, clubGradient: club.gradient });
      });
    });
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Only show upcoming events
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcoming = allEvents.filter(e => new Date(e.date) >= now);

    container.innerHTML = upcoming.map(event => {
      const { month, day } = Utils.formatDateShort(event.date);
      return `
        <div class="event-card" onclick="ClubsModule.openClubDetail('${event.clubId}')">
          <div class="event-card-date">
            <div class="event-date-box">
              <span class="month">${month}</span>
              <span class="day">${day}</span>
            </div>
            <div>
              <div class="event-card-title">${event.title}</div>
              <div class="event-card-club">${event.clubIcon} ${event.clubName}</div>
            </div>
          </div>
          <div class="event-card-info">
            <div class="event-card-info-item">
              ${Utils.icons.clock}
              <span>${event.time}</span>
            </div>
            <div class="event-card-info-item">
              ${Utils.icons.mapPin}
              <span>${event.venue}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  /* ===== Category Chips ===== */
  renderCategories() {
    const container = document.getElementById('club-categories');
    if (!container) return;

    container.innerHTML = CampusData.clubCategories.map(cat => `
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
      this.renderClubs();
    });
  },

  /* ===== Filter Clubs ===== */
  getFilteredClubs() {
    let clubs = CampusData.clubs;

    if (this.currentCategory !== 'all') {
      clubs = clubs.filter(c => c.category === this.currentCategory);
    }

    if (this.currentSearch) {
      clubs = clubs.filter(c =>
        c.name.toLowerCase().includes(this.currentSearch) ||
        c.category.toLowerCase().includes(this.currentSearch) ||
        c.description.toLowerCase().includes(this.currentSearch)
      );
    }

    // Sort
    clubs = [...clubs].sort((a, b) => {
      if (this.currentSort === 'members') {
        return b.memberCount - a.memberCount;
      } else if (this.currentSort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.currentSort === 'events') {
        return b.events.length - a.events.length;
      }
      return 0;
    });

    return clubs;
  },

  /* ===== Render Club Cards ===== */
  renderClubs() {
    const grid = document.getElementById('clubs-grid');
    if (!grid) return;

    const clubs = this.getFilteredClubs();

    if (clubs.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">No clubs found</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = clubs.map((club, idx) => `
      <div class="club-card stagger-${Math.min(idx + 1, 10)}" 
           onclick="ClubsModule.openClubDetail('${club.id}')">
        <div class="club-card-icon">
          <div class="gradient-bg ${club.gradient}"></div>
          <span style="position:relative;z-index:2;">${club.icon}</span>
        </div>
        <div class="club-card-info">
          <div class="club-card-name">${club.name}</div>
          <span class="club-card-category ${club.category}">${club.category}</span>
          <div class="club-card-desc">${club.description}</div>
          <div class="club-card-meta">
            <div class="club-card-meta-item">
              ${Utils.icons.users}
              <span>${club.memberCount} members</span>
            </div>
            <div class="club-card-meta-item">
              ${Utils.icons.calendar}
              <span>${club.events.length} events</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  /* ===== Club Detail Modal ===== */
  openClubDetail(clubId) {
    const club = CampusData.clubs.find(c => c.id === clubId);
    if (!club) return;

    // Set hero
    const gradient = document.getElementById('club-modal-gradient');
    gradient.className = `modal-hero-gradient ${club.gradient}`;
    document.getElementById('club-modal-icon').textContent = club.icon;

    const isJoined = Utils.isJoined(clubId);

    // Get user reviews for this club
    const userReviews = Utils.getClubReviews().filter(r => r.clubId === clubId);
    const allReviews = [...(club.reviews || []), ...userReviews];
    const totalReviews = allReviews.length + (club.reviewCount || 0);

    // Build body
    const body = document.getElementById('club-modal-body');
    body.innerHTML = `
      <div class="detail-name">${club.name}</div>
      <div class="detail-meta">
        <span class="club-card-category ${club.category}" style="font-size: var(--text-xs);">${club.category}</span>
        <div class="detail-members">
          ${Utils.icons.users}
          <span style="margin-left:4px;">${club.memberCount} members</span>
        </div>
        ${club.isRecruiting ? '<span class="crowd-badge low"><span class="crowd-dot"></span>Recruiting</span>' : '<span class="crowd-badge high">Closed</span>'}
      </div>
      <div class="detail-rating" style="margin-bottom: var(--space-4);">
        ${Utils.renderStars(club.rating || 0)}
        <span style="margin-left:4px; font-weight:600; color:var(--color-text-primary);">${club.rating || 0}</span>
        <span style="color:var(--color-text-muted);">(${totalReviews} reviews)</span>
      </div>
      
      <p class="detail-description">${club.description}</p>

      <!-- Join / Leave Button -->
      <button class="join-status-btn ${isJoined ? 'joined' : 'join'}" 
              id="join-btn-${clubId}" 
              onclick="ClubsModule.toggleJoin('${clubId}')">
        ${isJoined ? '✓ Joined' : 'Join Club'}
      </button>

      <div class="info-list">
        <div class="info-item">
          <div class="info-icon">${Utils.icons.mapPin}</div>
          <div class="info-content">
            <div class="info-label">Office</div>
            <div class="info-value">${club.office}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.calendar}</div>
          <div class="info-content">
            <div class="info-label">Meeting Schedule</div>
            <div class="info-value">${club.meetingSchedule}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.user}</div>
          <div class="info-content">
            <div class="info-label">Contact</div>
            <div class="info-value">${club.contact}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.mail}</div>
          <div class="info-content">
            <div class="info-label">Email</div>
            <div class="info-value">${club.email}</div>
          </div>
        </div>
      </div>

      <div class="detail-divider"></div>

      <!-- Upcoming Events -->
      <h3 style="margin-bottom: var(--space-4);">Upcoming Events</h3>
      ${club.events.length > 0 ? club.events.map(event => {
        const { month, day } = Utils.formatDateShort(event.date);
        return `
          <div class="event-list-item">
            <div class="event-list-date">
              <span class="month">${month}</span>
              <span class="day">${day}</span>
            </div>
            <div class="event-list-info">
              <div class="event-list-title">${event.title}</div>
              <div class="event-list-meta">${event.time} · ${event.venue}</div>
              <p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:var(--space-1);line-height:var(--leading-relaxed);">${event.description}</p>
            </div>
          </div>
        `;
      }).join('') : '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-title">No upcoming events</div></div>'}

      <div class="detail-divider"></div>

      <!-- Reviews Section -->
      <div class="reviews-header">
        <h3>Member Reviews</h3>
      </div>

      ${allReviews.length > 0 ? allReviews.map(review => `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">${review.initials}</div>
            <div class="review-user-info">
              <div class="review-user-name">${review.user}</div>
              <div class="review-date">${Utils.formatDate(review.date)}</div>
            </div>
            <div class="rating-stars">${Utils.renderStars(review.rating)}</div>
          </div>
          <p class="review-text">${review.text || 'No review text provided.'}</p>
        </div>
      `).join('') : '<div class="empty-state" style="padding: var(--space-4);"><div class="empty-state-title">No reviews yet</div></div>'}

      <div class="detail-divider"></div>

      <!-- Add Review Form -->
      <h3 style="margin-bottom: var(--space-4);">Write a Review</h3>
      <div id="add-club-review-form-${clubId}">
        <div class="form-group">
          <label class="form-label">Your Rating</label>
          <div class="star-rating-input" id="club-star-input-${clubId}">
            ${[1,2,3,4,5].map(i => `
              <button class="star-btn" data-rating="${i}" onclick="ClubsModule.setStarRating('${clubId}', ${i})">★</button>
            `).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Your Review</label>
          <textarea class="form-textarea" id="club-review-text-${clubId}" placeholder="Share your experience with this club..."></textarea>
        </div>
        <button class="btn btn-primary btn-full" onclick="ClubsModule.submitReview('${clubId}')">
          Submit Review
        </button>
      </div>

      <div class="detail-divider"></div>

      <!-- Apply Form -->
      ${club.isRecruiting ? `
        <div class="apply-section" style="margin-top: 0; padding-top: 0; border: none;">
          <button class="apply-toggle-btn" id="apply-toggle-${clubId}" 
                  onclick="ClubsModule.toggleApplyForm('${clubId}')">
            📝 Apply to Join
          </button>
          <div class="apply-form" id="apply-form-${clubId}">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="apply-name-${clubId}" placeholder="Enter your full name">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="apply-email-${clubId}" placeholder="your.email@greenfield.edu">
            </div>
            <div class="form-group">
              <label class="form-label">Year of Study</label>
              <select class="form-select form-input" id="apply-year-${clubId}">
                <option value="" disabled selected>Select your year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="pg">Post Graduate</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Why do you want to join?</label>
              <textarea class="form-textarea" id="apply-reason-${clubId}" placeholder="Tell us what excites you about this club..."></textarea>
            </div>
            <button class="btn btn-primary btn-full" onclick="ClubsModule.submitApplication('${clubId}')">
              Submit Application
            </button>
          </div>
        </div>
      ` : ''}
    `;

    // Scroll to top and open
    document.getElementById('club-modal-scroll').scrollTop = 0;
    Utils.openModal('club-modal');
  },

  /* ===== Toggle Join ===== */
  toggleJoin(clubId) {
    const isNowJoined = Utils.toggleJoinedClub(clubId);
    const btn = document.getElementById(`join-btn-${clubId}`);
    if (btn) {
      btn.className = `join-status-btn ${isNowJoined ? 'joined' : 'join'}`;
      btn.innerHTML = isNowJoined ? '✓ Joined' : 'Join Club';
    }
    if (typeof ProfileModule !== 'undefined') ProfileModule.render();
  },

  /* ===== Toggle Apply Form ===== */
  toggleApplyForm(clubId) {
    const form = document.getElementById(`apply-form-${clubId}`);
    if (form) {
      form.classList.toggle('visible');
      const btn = document.getElementById(`apply-toggle-${clubId}`);
      if (btn) {
        btn.textContent = form.classList.contains('visible') ? '✕ Cancel' : '📝 Apply to Join';
      }
    }
  },

  /* ===== Submit Application ===== */
  submitApplication(clubId) {
    const name = document.getElementById(`apply-name-${clubId}`)?.value.trim();
    const email = document.getElementById(`apply-email-${clubId}`)?.value.trim();
    const year = document.getElementById(`apply-year-${clubId}`)?.value;
    const reason = document.getElementById(`apply-reason-${clubId}`)?.value.trim();

    if (!name || !email || !year || !reason) { 
      Utils.showToast('Please fill out all fields'); 
      return; 
    }

    Utils.showToast('Application submitted successfully! 🎉');
    const form = document.getElementById(`apply-form-${clubId}`);
    if (form) form.classList.remove('visible');
    const btn = document.getElementById(`apply-toggle-${clubId}`);
    if (btn) {
      btn.textContent = '✅ Application Submitted';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }
  },

  /* Star rating helper */
  _selectedRating: {},

  setStarRating(clubId, rating) {
    this._selectedRating[clubId] = rating;
    const container = document.getElementById(`club-star-input-${clubId}`);
    if (!container) return;
    container.querySelectorAll('.star-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx < rating);
    });
  },

  submitReview(clubId) {
    const rating = this._selectedRating[clubId] || 0;
    const textEl = document.getElementById(`club-review-text-${clubId}`);
    const text = textEl ? textEl.value.trim() : '';

    if (!rating) {
      Utils.showToast('Please select a star rating');
      return;
    }
    if (!text) {
      Utils.showToast('Please write a review');
      return;
    }

    Utils.addClubReview(clubId, rating, text);
    this.openClubDetail(clubId); // refresh
  }
};
