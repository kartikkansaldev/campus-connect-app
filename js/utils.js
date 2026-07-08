/* ===== CampusHub Shared Utilities ===== */

const Utils = {
  /* ===== SVG Icons ===== */
  icons: {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  },

  /* ===== Star Rendering ===== */
  renderStars(rating, size = 'sm') {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let html = '';
    for (let i = 0; i < full; i++) html += '<span class="star filled">★</span>';
    for (let i = 0; i < half; i++) html += '<span class="star filled">★</span>';
    for (let i = 0; i < empty; i++) html += '<span class="star">★</span>';
    return html;
  },

  /* ===== Crowd Badge ===== */
  createCrowdBadge(level) {
    const labels = { low: 'Quiet', moderate: 'Moderate', high: 'Crowded' };
    return `<span class="crowd-badge ${level}"><span class="crowd-dot"></span>${labels[level]}</span>`;
  },

  /* ===== Date Formatting ===== */
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  },

  formatDateShort(dateStr) {
    const date = new Date(dateStr);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return { month: months[date.getMonth()], day: date.getDate() };
  },

  getRelativeDate(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    return this.formatDate(dateStr);
  },

  /* ===== Toast Notification ===== */
  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.innerHTML = '';
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  },

  /* ===== Debounce ===== */
  debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /* ===== Local Storage Helpers ===== */
  getBookmarks() {
    try { return JSON.parse(localStorage.getItem('campushub_bookmarks') || '[]'); }
    catch { return []; }
  },

  toggleBookmark(placeId) {
    const bookmarks = this.getBookmarks();
    const idx = bookmarks.indexOf(placeId);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      this.showToast('Removed from saved places');
    } else {
      bookmarks.push(placeId);
      this.showToast('Added to saved places');
    }
    localStorage.setItem('campushub_bookmarks', JSON.stringify(bookmarks));
    return bookmarks.includes(placeId);
  },

  isBookmarked(placeId) {
    return this.getBookmarks().includes(placeId);
  },

  getJoinedClubs() {
    try { return JSON.parse(localStorage.getItem('campushub_joined') || '[]'); }
    catch { return []; }
  },

  toggleJoinedClub(clubId) {
    const joined = this.getJoinedClubs();
    const idx = joined.indexOf(clubId);
    if (idx > -1) {
      joined.splice(idx, 1);
      this.showToast('Left the club');
    } else {
      joined.push(clubId);
      this.showToast('Joined the club! 🎉');
    }
    localStorage.setItem('campushub_joined', JSON.stringify(joined));
    return joined.includes(clubId);
  },

  isJoined(clubId) {
    return this.getJoinedClubs().includes(clubId);
  },

  getUserReviews() {
    try { return JSON.parse(localStorage.getItem('campushub_reviews') || '[]'); }
    catch { return []; }
  },

  addUserReview(placeId, rating, text) {
    const reviews = this.getUserReviews();
    reviews.push({
      placeId,
      user: CampusData.user.name,
      initials: CampusData.user.initials,
      rating,
      text,
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('campushub_reviews', JSON.stringify(reviews));
    this.showToast('Review added! Thanks for your feedback ✨');
    return reviews;
  },

  getClubReviews() {
    try { return JSON.parse(localStorage.getItem('campushub_club_reviews') || '[]'); }
    catch { return []; }
  },

  addClubReview(clubId, rating, text) {
    const reviews = this.getClubReviews();
    reviews.push({
      clubId,
      user: CampusData.user.name,
      initials: CampusData.user.initials,
      rating,
      text,
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('campushub_club_reviews', JSON.stringify(reviews));
    this.showToast('Review added! Thanks for your feedback ✨');
    return reviews;
  },

  createAvailabilityBadge(status) {
    const labels = { available: 'Available', meeting: 'In a Meeting', leave: 'On Leave' };
    const classes = { available: 'low', meeting: 'moderate', leave: 'high' };
    return `<span class="crowd-badge ${classes[status]}"><span class="crowd-dot"></span>${labels[status]}</span>`;
  },

  /* ===== Modal Control ===== */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  /* ===== Theme ===== */
  getTheme() {
    return localStorage.getItem('campushub_theme') || 'dark';
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('campushub_theme', theme);
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
};
