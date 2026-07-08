/* ===== Dashboard Tab Module ===== */

const DashboardModule = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    // Get time-based greeting
    const hour = new Date().getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';

    // Campus Stats
    const totalPlaces = CampusData.places.length;
    const totalClubs = CampusData.clubs.length;
    
    // Get upcoming events
    const allEvents = [];
    CampusData.clubs.forEach(club => {
      club.events.forEach(event => {
        allEvents.push({ 
          ...event, 
          clubName: club.name, 
          clubIcon: club.icon 
        });
      });
    });
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now).slice(0, 3);

    // Get popular places (highest rating + most reviews)
    const popularPlaces = [...CampusData.places]
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, 4);

    // Get next class from AcademicsModule
    let nextClassHtml = '';
    if (typeof AcademicsModule !== 'undefined') {
      const nextClass = AcademicsModule.getNextClass();
      if (nextClass) {
        nextClassHtml = `
          <div class="next-class-card" onclick="App.switchTab('academics')">
            <div class="next-class-label">${nextClass.isCurrent ? '🔴 Happening Now' : '⏳ Up Next'}</div>
            <div class="next-class-subject">${nextClass.subject}</div>
            <div class="next-class-details">
              <span class="next-class-detail-item">🕐 ${nextClass.time}</span>
              <span class="next-class-detail-item">📍 ${nextClass.room}</span>
              <span class="next-class-detail-item">👤 ${nextClass.faculty}</span>
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="dashboard-header" style="margin-bottom: var(--space-4);">
        <h1 style="font-size: var(--text-2xl); font-weight: 700;">${greeting}, ${CampusData.user.name.split(' ')[0]}!</h1>
        <p style="color: var(--color-text-muted);">Here's what's happening on campus today.</p>
      </div>

      ${nextClassHtml}

      <!-- Quick Stats -->
      <div class="quick-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6);">
        <div class="stat-card" style="background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; align-items: center; gap: var(--space-3);">
          <div style="font-size: 24px;">📍</div>
          <div>
            <div style="font-size: var(--text-xl); font-weight: 700;">${totalPlaces}</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Campus Places</div>
          </div>
        </div>
        <div class="stat-card" style="background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; align-items: center; gap: var(--space-3);">
          <div style="font-size: 24px;">🎯</div>
          <div>
            <div style="font-size: var(--text-xl); font-weight: 700;">${totalClubs}</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Active Clubs</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions hide-scrollbar" style="display: flex; gap: var(--space-3); margin-bottom: var(--space-6); overflow-x: auto; padding-bottom: var(--space-2);">
        <button class="chip" onclick="App.switchTab('academics')" style="white-space: nowrap;">📖 Academics</button>
        <button class="chip" onclick="App.switchTab('explore')" style="white-space: nowrap;">🗺️ Campus Map</button>
        <button class="chip" onclick="App.switchTab('clubs')" style="white-space: nowrap;">📅 Upcoming Events</button>
      </div>

      <!-- Popular Places -->
      <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
        <h2 style="font-size: var(--text-lg); font-weight: 600;">Popular Places</h2>
        <button class="text-btn" onclick="App.switchTab('explore')" style="color: var(--color-primary); font-size: var(--text-sm);">View All</button>
      </div>
      <div class="popular-places-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-6);">
        ${popularPlaces.map(place => `
          <div class="mini-place-card" style="background: var(--color-surface); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border);" onclick="App.switchTab('explore'); setTimeout(() => ExploreModule.openPlaceDetail('${place.id}'), 100)">
            <div style="height: 80px; position: relative;" class="${place.gradient}">
              ${place.image ? `<img src="${place.image}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">` : ''}
              <div style="position: absolute; bottom: var(--space-2); left: var(--space-2); font-size: 20px;">${place.icon}</div>
            </div>
            <div style="padding: var(--space-2);">
              <div style="font-weight: 600; font-size: var(--text-sm); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${place.name}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                <span style="color: #fbbf24;">★</span> ${place.rating}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Up Next (Events) -->
      <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
        <h2 style="font-size: var(--text-lg); font-weight: 600;">Up Next</h2>
        <button class="text-btn" onclick="App.switchTab('clubs')" style="color: var(--color-primary); font-size: var(--text-sm);">All Events</button>
      </div>
      <div class="upcoming-events-list" style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${upcomingEvents.map(event => {
          const { month, day } = Utils.formatDateShort(event.date);
          return `
            <div class="event-card" style="margin: 0;" onclick="App.switchTab('clubs')">
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
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
};
