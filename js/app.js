/* ===== CampusHub App Controller ===== */

const App = {
  currentTab: 'dashboard',

  init() {
    // Apply saved theme
    const savedTheme = Utils.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize modules
    if (typeof DashboardModule !== 'undefined') DashboardModule.init();
    ExploreModule.init();
    if (typeof AcademicsModule !== 'undefined') AcademicsModule.init();
    if (typeof StaffModule !== 'undefined') StaffModule.init();
    ClubsModule.init();
    ProfileModule.init();

    // Bind navigation
    this.bindNavigation();

    // Handle back button
    window.addEventListener('popstate', () => {
      // Close any open modals
      Utils.closeModal('place-modal');
      Utils.closeModal('club-modal');
      Utils.closeModal('staff-modal');
    });

    console.log('🎓 CampusHub initialized!');
  },

  bindNavigation() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;

    nav.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (!navItem) return;

      const tab = navItem.dataset.tab;
      if (tab === this.currentTab) return;

      this.switchTab(tab);
    });
  },

  switchTab(tab) {
    this.currentTab = tab;

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tab);
    });

    // Update pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    const targetPage = document.getElementById(`${tab}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Refresh dynamic content when switching tabs
    if (tab === 'profile') {
      ProfileModule.render();
    }
    if (tab === 'academics' && typeof AcademicsModule !== 'undefined') {
      AcademicsModule.render();
    }
  }
};

// ===== Boot =====
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
