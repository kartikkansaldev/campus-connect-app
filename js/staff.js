/* ===== Staff Directory Tab Module ===== */

const StaffModule = {
  currentCategory: 'all',
  currentSearch: '',
  currentSort: 'name',

  init() {
    this.renderCategories();
    this.bindEvents();
    this.renderStaff();
  },

  /* ===== Bindings ===== */
  bindEvents() {
    // Search
    const searchInput = document.getElementById('staff-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.currentSearch = e.target.value.toLowerCase().trim();
        this.renderStaff();
      }, 200));
    }

    // Sort
    const sortSelect = document.getElementById('staff-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderStaff();
      });
    }
  },

  /* ===== Category Chips ===== */
  renderCategories() {
    const container = document.getElementById('staff-categories');
    if (!container) return;

    container.innerHTML = CampusData.staffCategories.map(cat => `
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
      this.renderStaff();
    });
  },

  /* ===== Filter Staff ===== */
  getFilteredStaff() {
    let staff = CampusData.staff;

    if (this.currentCategory !== 'all') {
      staff = staff.filter(s => s.category === this.currentCategory);
    }

    if (this.currentSearch) {
      staff = staff.filter(s =>
        s.name.toLowerCase().includes(this.currentSearch) ||
        s.role.toLowerCase().includes(this.currentSearch) ||
        s.department.toLowerCase().includes(this.currentSearch)
      );
    }

    // Sort
    staff = [...staff].sort((a, b) => {
      if (this.currentSort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.currentSort === 'department') {
        return a.department.localeCompare(b.department);
      } else if (this.currentSort === 'availability') {
        const order = { available: 1, meeting: 2, leave: 3 };
        return order[a.availability] - order[b.availability];
      }
      return 0;
    });

    return staff;
  },

  /* ===== Render Staff Cards ===== */
  renderStaff() {
    const list = document.getElementById('staff-list');
    if (!list) return;

    const staffList = this.getFilteredStaff();

    if (staffList.length === 0) {
      list.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">No staff found</div>
        </div>
      `;
      return;
    }

    list.innerHTML = staffList.map((staff, idx) => `
      <div class="staff-card stagger-${Math.min(idx + 1, 10)}" 
           onclick="StaffModule.openStaffDetail('${staff.id}')">
        <div class="staff-avatar ${staff.gradient}">${staff.initials}</div>
        <div class="staff-info">
          <div class="staff-name">${staff.name}</div>
          <div class="staff-role">${staff.role}</div>
          <div class="staff-dept">${staff.department}</div>
        </div>
        <div class="staff-status">${Utils.createAvailabilityBadge(staff.availability)}</div>
      </div>
    `).join('');
  },

  /* ===== Staff Detail Modal ===== */
  openStaffDetail(staffId) {
    const staff = CampusData.staff.find(s => s.id === staffId);
    if (!staff) return;

    // Set hero
    const gradient = document.getElementById('staff-modal-gradient');
    gradient.className = `modal-hero-gradient ${staff.gradient}`;
    
    const avatarContainer = document.getElementById('staff-modal-avatar');
    avatarContainer.textContent = staff.initials;
    avatarContainer.className = `staff-modal-avatar ${staff.gradient}`;

    // Build body
    const body = document.getElementById('staff-modal-body');
    body.innerHTML = `
      <div class="detail-name" style="text-align: center; margin-top: var(--space-4);">${staff.name}</div>
      <div style="text-align: center; color: var(--color-primary); font-weight: 500; font-size: var(--text-sm); margin-bottom: var(--space-1);">${staff.role}</div>
      <div style="text-align: center; color: var(--color-text-muted); font-size: var(--text-sm); margin-bottom: var(--space-4);">${staff.department}</div>
      
      <div style="display: flex; justify-content: center; margin-bottom: var(--space-6);">
        ${Utils.createAvailabilityBadge(staff.availability)}
      </div>
      
      <div class="quick-actions" style="display: flex; gap: var(--space-3); margin-bottom: var(--space-6);">
        <a href="mailto:${staff.email}" class="btn btn-primary" style="flex: 1; text-decoration: none; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          ✉️ Email
        </a>
        <a href="tel:${staff.phone}" class="btn btn-outline" style="flex: 1; text-decoration: none; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          📞 Call
        </a>
      </div>

      <div class="info-list">
        <div class="info-item">
          <div class="info-icon">${Utils.icons.mapPin}</div>
          <div class="info-content">
            <div class="info-label">Office Location</div>
            <div class="info-value">${staff.office}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.mail}</div>
          <div class="info-content">
            <div class="info-label">Email Address</div>
            <div class="info-value">${staff.email}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">${Utils.icons.phone}</div>
          <div class="info-content">
            <div class="info-label">Contact Number</div>
            <div class="info-value">${staff.phone}</div>
          </div>
        </div>
      </div>
    `;

    // Scroll to top and open
    document.getElementById('staff-modal-scroll').scrollTop = 0;
    Utils.openModal('staff-modal');
  }
};
