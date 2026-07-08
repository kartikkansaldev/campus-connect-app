/* ===== Profile Tab Module ===== */

const ProfileModule = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('profile-content');
    if (!container) return;

    const user = CampusData.user;
    const bookmarks = Utils.getBookmarks();
    const joinedClubs = Utils.getJoinedClubs();
    const userReviews = Utils.getUserReviews();
    const currentTheme = Utils.getTheme();

    container.innerHTML = `
      <!-- Profile Card -->
      <div class="profile-card">
        <div class="profile-avatar">${user.initials}</div>
        <div class="profile-name">${user.name}</div>
        <div class="profile-department">${user.department} · ${user.year}</div>
        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-number">${bookmarks.length}</div>
            <div class="stat-label">Saved</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${joinedClubs.length}</div>
            <div class="stat-label">Clubs</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${userReviews.length}</div>
            <div class="stat-label">Reviews</div>
          </div>
        </div>
      </div>

      <!-- Saved Places -->
      <div class="profile-section">
        <div class="profile-section-header">📍 Saved Places</div>
        ${bookmarks.length > 0 ? `
          <div class="mini-cards-list">
            ${bookmarks.map(id => {
              const place = CampusData.places.find(p => p.id === id);
              if (!place) return '';
              return `
                <div class="mini-card" onclick="ExploreModule.openPlaceDetail('${place.id}')">
                  <div class="mini-card-icon">
                    <div class="gradient-bg ${place.gradient}"></div>
                    <span style="position:relative;z-index:2;">${place.icon}</span>
                  </div>
                  <div class="mini-card-info">
                    <div class="mini-card-name">${place.name}</div>
                    <div class="mini-card-sub">${place.location}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="empty-state" style="padding: var(--space-6);">
            <div class="empty-state-icon">📌</div>
            <div class="empty-state-title">No saved places yet</div>
            <div class="empty-state-desc">Bookmark places from the Explore tab to see them here</div>
          </div>
        `}
      </div>

      <!-- Joined Clubs -->
      <div class="profile-section">
        <div class="profile-section-header">🏛️ My Clubs</div>
        ${joinedClubs.length > 0 ? `
          <div class="mini-cards-list">
            ${joinedClubs.map(id => {
              const club = CampusData.clubs.find(c => c.id === id);
              if (!club) return '';
              return `
                <div class="mini-card" onclick="ClubsModule.openClubDetail('${club.id}')">
                  <div class="mini-card-icon">
                    <div class="gradient-bg ${club.gradient}"></div>
                    <span style="position:relative;z-index:2;">${club.icon}</span>
                  </div>
                  <div class="mini-card-info">
                    <div class="mini-card-name">${club.name}</div>
                    <div class="mini-card-sub">${club.memberCount} members · ${club.category}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="empty-state" style="padding: var(--space-6);">
            <div class="empty-state-icon">🤝</div>
            <div class="empty-state-title">No clubs joined yet</div>
            <div class="empty-state-desc">Join clubs from the Clubs tab to see them here</div>
          </div>
        `}
      </div>

      <!-- Academic Info -->
      <div class="profile-section">
        <div class="profile-section-header">🎓 Academic Info</div>
        <div class="settings-list">
          <div class="settings-item" style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">Enrollment ID</span>
            <span style="font-weight: 500;">GFU-2024-8921</span>
          </div>
          <div class="settings-item" style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">Current Semester</span>
            <span style="font-weight: 500;">Semester 4</span>
          </div>
          <div class="settings-item" style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">CGPA</span>
            <span style="font-weight: 500; color: var(--color-accent);">8.9</span>
          </div>
        </div>
      </div>

      <!-- Activity Timeline -->
      <div class="profile-section">
        <div class="profile-section-header">⏱️ Recent Activity</div>
        <div class="timeline" style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-3); padding-left: var(--space-2); border-left: 2px solid var(--color-border); margin-left: var(--space-2);">
          
          <div style="position: relative; padding-left: var(--space-4);">
            <div style="position: absolute; left: -25px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--color-accent); border: 2px solid var(--color-bg-primary);"></div>
            <div style="font-size: var(--text-sm); font-weight: 500;">Joined Code Crafters</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Today, 10:30 AM</div>
          </div>
          
          <div style="position: relative; padding-left: var(--space-4);">
            <div style="position: absolute; left: -25px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--color-border-strong); border: 2px solid var(--color-bg-primary);"></div>
            <div style="font-size: var(--text-sm); font-weight: 500;">Saved Central Library</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Yesterday, 4:15 PM</div>
          </div>
          
          <div style="position: relative; padding-left: var(--space-4);">
            <div style="position: absolute; left: -25px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--color-border-strong); border: 2px solid var(--color-bg-primary);"></div>
            <div style="font-size: var(--text-sm); font-weight: 500;">Wrote a review for Tech Hub</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Mon, 2:00 PM</div>
          </div>
          
        </div>
      </div>

      <!-- Settings -->
      <div class="profile-section">
        <div class="profile-section-header">⚙️ Settings</div>
        <div class="settings-list">
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon">${currentTheme === 'dark' ? '🌙' : '☀️'}</div>
              <div>
                <div class="settings-item-text">Dark Mode</div>
                <div class="settings-item-desc">Toggle between dark and light theme</div>
              </div>
            </div>
            <button class="toggle ${currentTheme === 'dark' ? 'active' : ''}" 
                    id="theme-toggle" 
                    onclick="ProfileModule.handleThemeToggle()"
                    aria-label="Toggle dark mode"></button>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon">🔔</div>
              <div>
                <div class="settings-item-text">Notifications</div>
                <div class="settings-item-desc">Receive alerts for events and updates</div>
              </div>
            </div>
            <button class="toggle active" 
                    id="notif-toggle"
                    onclick="this.classList.toggle('active')"
                    aria-label="Toggle notifications"></button>
          </div>
        </div>
        <div style="margin-top: var(--space-4); display: flex; justify-content: center;">
          <button class="btn btn-danger-outline btn-sm" onclick="ProfileModule.clearData()">
            🗑️ Clear All Data
          </button>
        </div>
      </div>

      <!-- App Info -->
      <div style="text-align:center; padding: var(--space-4) 0; margin-top: var(--space-4);">
        <div style="font-size:var(--text-sm); color:var(--color-text-muted);">CampusHub v1.0</div>
        <div style="font-size:var(--text-xs); color:var(--color-text-muted); margin-top:var(--space-1);">Made with ❤️ for Greenfield University</div>
      </div>
    `;
  },

  handleThemeToggle() {
    const newTheme = Utils.toggleTheme();
    // Update the meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = newTheme === 'dark' ? '#06080f' : '#f8fafc';
    }
    // Re-render profile to update icon and toggle state
    this.render();
  },

  clearData() {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.removeItem('campushub_bookmarks');
      localStorage.removeItem('campushub_joined');
      localStorage.removeItem('campushub_reviews');
      Utils.showToast('All data cleared');
      this.render();
    }
  }
};
