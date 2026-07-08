/* ===== Academics Tab Module ===== */

const AcademicsModule = {
  openSection: null,

  init() {
    this.render();
  },

  /* ===== Get today's day name ===== */
  getTodayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  },

  /* ===== Check if a period is currently happening ===== */
  isCurrentPeriod(timeStr) {
    const now = new Date();
    const today = this.getTodayName();
    // Only mark as current if it's today
    const parts = timeStr.split('–').map(s => s.trim());
    if (parts.length !== 2) return false;

    const parseTime = (t) => {
      const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return 0;
      let h = parseInt(match[1]);
      const m = parseInt(match[2]);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    };

    const startMin = parseTime(parts[0]);
    const endMin = parseTime(parts[1]);
    const nowMin = now.getHours() * 60 + now.getMinutes();

    return nowMin >= startMin && nowMin < endMin;
  },

  /* ===== Get next upcoming class for today ===== */
  getNextClass() {
    const today = this.getTodayName();
    const periods = CampusData.timetable.periods.filter(p => p.day === today);
    if (periods.length === 0) return null;

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (const period of periods) {
      const parts = period.time.split('–').map(s => s.trim());
      const parseTime = (t) => {
        const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        let h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const ampm = match[3].toUpperCase();
        if (ampm === 'PM' && h !== 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;
        return h * 60 + m;
      };

      const startMin = parseTime(parts[0]);
      const endMin = parseTime(parts[1]);

      // Currently happening or upcoming
      if (nowMin < endMin) {
        return { ...period, isCurrent: nowMin >= startMin };
      }
    }
    return null;
  },

  /* ===== Toggle section expand/collapse ===== */
  toggleSection(sectionId) {
    const btn = document.querySelector(`[data-section="${sectionId}"]`);
    const body = document.getElementById(`acad-body-${sectionId}`);
    if (!btn || !body) return;

    const isOpen = body.classList.contains('open');

    // Close all sections
    document.querySelectorAll('.acad-section-btn').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.acad-section-body').forEach(b => b.classList.remove('open'));

    if (!isOpen) {
      btn.classList.add('open');
      body.classList.add('open');
      this.openSection = sectionId;
    } else {
      this.openSection = null;
    }
  },

  /* ===== Render timetable for a specific day ===== */
  renderTimetableDay(day) {
    const periods = CampusData.timetable.periods.filter(p => p.day === day);
    const container = document.getElementById('timetable-periods');
    if (!container) return;

    const today = this.getTodayName();

    if (periods.length === 0) {
      container.innerHTML = `
        <div class="timetable-empty">
          <div class="timetable-empty-icon">🎉</div>
          <div style="font-weight: 600; margin-bottom: 4px;">No Classes!</div>
          <div style="font-size: var(--text-xs);">Enjoy your day off.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = periods.map((p, i) => {
      const isCurrent = day === today && this.isCurrentPeriod(p.time);
      return `
        <div class="period-card ${isCurrent ? 'current' : ''}" style="animation-delay: ${i * 50}ms">
          <div class="period-time-bar ${p.type}"></div>
          <div class="period-info">
            <div class="period-code">${p.code}</div>
            <div class="period-subject">${p.subject}</div>
            <div class="period-meta">
              <span class="period-meta-item">🕐 ${p.time}</span>
              <span class="period-meta-item">📍 ${p.room}</span>
            </div>
            <div class="period-meta" style="margin-top: 2px;">
              <span class="period-meta-item">👤 ${p.faculty}</span>
            </div>
          </div>
          <span class="period-badge ${p.type}">${p.type}</span>
        </div>
      `;
    }).join('');

    // Update active tab
    document.querySelectorAll('.timetable-day-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.day === day);
    });
  },

  /* ===== Days until a date ===== */
  daysUntil(dateStr) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  },

  /* ===== Main render ===== */
  render() {
    const container = document.getElementById('academics-content');
    if (!container) return;

    const today = this.getTodayName();
    const todayPeriods = CampusData.timetable.periods.filter(p => p.day === today);
    const isSunday = today === 'Sunday';

    // Count upcoming exams
    const upcomingExams = CampusData.examSchedule.filter(e => this.daysUntil(e.date) >= 0);
    const urgentAnnouncements = CampusData.announcements.filter(a => a.priority === 'urgent').length;

    const sections = [
      {
        id: 'timetable',
        icon: '📅',
        gradient: 'gradient-cool',
        title: 'Timetable',
        subtitle: isSunday ? 'No classes today — it\'s Sunday!' : `${todayPeriods.length} class${todayPeriods.length !== 1 ? 'es' : ''} today`
      },
      {
        id: 'faculty',
        icon: '👨‍🏫',
        gradient: 'gradient-educational',
        title: 'Faculty Directory',
        subtitle: `${CampusData.staff.filter(s => s.category === 'faculty').length} faculty members`
      },
      {
        id: 'classrooms',
        icon: '🏛️',
        gradient: 'gradient-academic',
        title: 'Classroom Locations',
        subtitle: `${CampusData.classrooms.length} classrooms — linked to map`
      },
      {
        id: 'calendar',
        icon: '📆',
        gradient: 'gradient-secondary',
        title: 'Academic Calendar',
        subtitle: `Semester 4, 2026 — ${CampusData.academicCalendar.filter(e => this.daysUntil(e.date) >= 0).length} upcoming events`
      },
      {
        id: 'exams',
        icon: '📝',
        gradient: 'gradient-warm',
        title: 'Exam Schedule',
        subtitle: `${upcomingExams.length} upcoming exam${upcomingExams.length !== 1 ? 's' : ''} — Mid-Semester`
      },
      {
        id: 'announcements',
        icon: '📢',
        gradient: 'gradient-social',
        title: 'Announcements',
        subtitle: `${CampusData.announcements.length} notice${CampusData.announcements.length !== 1 ? 's' : ''}${urgentAnnouncements > 0 ? ` — ${urgentAnnouncements} urgent` : ''}`
      },
      {
        id: 'quicklinks',
        icon: '🔗',
        gradient: 'gradient-tech',
        title: 'Quick Links',
        subtitle: 'College portal & services'
      }
    ];

    container.innerHTML = `
      <div class="section-header" style="margin-top: var(--space-2); margin-bottom: var(--space-4);">
        <h2 style="font-size: var(--text-xl); font-weight: 700;">📖 Academics</h2>
        <p style="color: var(--color-text-muted); font-size: var(--text-sm); margin-top: var(--space-1);">
          ${CampusData.user.department} · ${CampusData.user.year} · ${CampusData.user.semester}
        </p>
      </div>

      ${sections.map(s => `
        <div class="acad-section">
          <button class="acad-section-btn" data-section="${s.id}" onclick="AcademicsModule.toggleSection('${s.id}')">
            <div class="acad-section-icon">
              <div class="gradient-bg ${s.gradient}"></div>
              <span style="position:relative;z-index:2;">${s.icon}</span>
            </div>
            <div class="acad-section-text">
              <div class="acad-section-title">${s.title}</div>
              <div class="acad-section-subtitle">${s.subtitle}</div>
            </div>
            <svg class="acad-section-chevron" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <div class="acad-section-body" id="acad-body-${s.id}">
            ${this.renderSectionContent(s.id)}
          </div>
        </div>
      `).join('')}
    `;
  },

  /* ===== Render content for each section ===== */
  renderSectionContent(sectionId) {
    switch (sectionId) {
      case 'timetable': return this.renderTimetable();
      case 'faculty': return this.renderFaculty();
      case 'classrooms': return this.renderClassrooms();
      case 'calendar': return this.renderCalendar();
      case 'exams': return this.renderExams();
      case 'announcements': return this.renderAnnouncements();
      case 'quicklinks': return this.renderQuickLinks();
      default: return '';
    }
  },

  /* ===== TIMETABLE ===== */
  renderTimetable() {
    const today = this.getTodayName();
    const days = CampusData.timetable.days;
    const defaultDay = days.includes(today) ? today : 'Monday';
    const periods = CampusData.timetable.periods.filter(p => p.day === defaultDay);

    return `
      <div class="timetable-day-tabs">
        ${days.map(d => `
          <button class="timetable-day-tab ${d === defaultDay ? 'active' : ''} ${d === today ? 'today' : ''}"
                  data-day="${d}"
                  onclick="AcademicsModule.renderTimetableDay('${d}')">
            ${d.substring(0, 3)}
          </button>
        `).join('')}
      </div>
      <div class="timetable-periods" id="timetable-periods">
        ${periods.length === 0 ? `
          <div class="timetable-empty">
            <div class="timetable-empty-icon">🎉</div>
            <div style="font-weight: 600; margin-bottom: 4px;">No Classes!</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Enjoy your day off.</div>
          </div>
        ` : periods.map((p, i) => {
          const isCurrent = defaultDay === today && this.isCurrentPeriod(p.time);
          return `
            <div class="period-card ${isCurrent ? 'current' : ''}" style="animation-delay: ${i * 50}ms">
              <div class="period-time-bar ${p.type}"></div>
              <div class="period-info">
                <div class="period-code">${p.code}</div>
                <div class="period-subject">${p.subject}</div>
                <div class="period-meta">
                  <span class="period-meta-item">🕐 ${p.time}</span>
                  <span class="period-meta-item">📍 ${p.room}</span>
                </div>
                <div class="period-meta" style="margin-top: 2px;">
                  <span class="period-meta-item">👤 ${p.faculty}</span>
                </div>
              </div>
              <span class="period-badge ${p.type}">${p.type}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ===== FACULTY DIRECTORY ===== */
  renderFaculty() {
    const faculty = CampusData.staff;
    return `
      <div class="acad-faculty-list">
        ${faculty.map(f => `
          <div class="acad-faculty-item" onclick="StaffModule.openStaffDetail('${f.id}')">
            <div class="acad-faculty-avatar ${f.gradient}">${f.initials}</div>
            <div class="acad-faculty-info">
              <div class="acad-faculty-name">${f.name}</div>
              <div class="acad-faculty-role">${f.role} · ${f.department}</div>
            </div>
            ${Utils.createAvailabilityBadge(f.availability)}
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ===== CLASSROOM LOCATIONS ===== */
  renderClassrooms() {
    const classrooms = CampusData.classrooms;
    const typeIcons = {
      'Smart Classroom': '💻',
      'Lecture Hall': '🏛️',
      'Computer Lab': '🖥️',
      'Seminar Room': '📋',
      'Examination Hall': '📝'
    };

    return `
      <div class="classroom-list">
        ${classrooms.map(cr => `
          <div class="classroom-item">
            <div class="classroom-icon">${typeIcons[cr.type] || '🏢'}</div>
            <div class="classroom-info">
              <div class="classroom-name">${cr.name}</div>
              <div class="classroom-detail">${cr.type} · ${cr.floor} · Capacity: ${cr.capacity}</div>
            </div>
            ${cr.placeId ? `
              <button class="classroom-map-btn" onclick="event.stopPropagation(); AcademicsModule.viewOnMap('${cr.placeId}')">
                📍 Map
              </button>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ===== ACADEMIC CALENDAR ===== */
  renderCalendar() {
    const events = CampusData.academicCalendar;
    const typeLabels = { exam: 'Exam', holiday: 'Holiday', deadline: 'Deadline', milestone: 'Milestone' };

    return `
      <div class="calendar-timeline">
        ${events.map((e, i) => {
          const daysLeft = this.daysUntil(e.date);
          const isPast = daysLeft < 0;
          const { month, day } = Utils.formatDateShort(e.date);
          return `
            <div class="calendar-event ${e.type} ${isPast ? 'past' : ''}" style="animation-delay: ${i * 40}ms">
              <div class="calendar-event-header">
                <span class="calendar-event-icon">${e.icon}</span>
                <span class="calendar-event-title">
                  ${e.title}
                  <span class="calendar-event-type-badge ${e.type}">${typeLabels[e.type]}</span>
                </span>
                <span class="calendar-event-date">${month} ${day}</span>
              </div>
              <div class="calendar-event-desc">${e.description}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ===== EXAM SCHEDULE ===== */
  renderExams() {
    const exams = CampusData.examSchedule;

    return `
      <div class="exam-cards">
        ${exams.map((e, i) => {
          const daysLeft = this.daysUntil(e.date);
          const { month, day } = Utils.formatDateShort(e.date);
          const isPast = daysLeft < 0;
          let countdownClass = 'far';
          if (daysLeft <= 3) countdownClass = '';
          else if (daysLeft <= 14) countdownClass = 'soon';

          return `
            <div class="exam-card" style="animation-delay: ${i * 50}ms; ${isPast ? 'opacity: 0.5;' : ''}">
              <div class="exam-date-box">
                <span class="month">${month}</span>
                <span class="day">${day}</span>
              </div>
              <div class="exam-info">
                <div class="exam-code">${e.code}</div>
                <div class="exam-subject">${e.subject}</div>
                <div class="exam-meta">
                  <span>🕐 ${e.time}</span>
                  <span>📍 ${e.venue}</span>
                </div>
              </div>
              ${!isPast ? `
                <span class="exam-countdown ${countdownClass}">
                  ${daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft}d`}
                </span>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* ===== ANNOUNCEMENTS ===== */
  renderAnnouncements() {
    const announcements = CampusData.announcements;
    const priorityLabels = { urgent: 'Urgent', warning: 'Notice', info: 'Info' };

    return `
      <div class="announcement-cards">
        ${announcements.map((a, i) => `
          <div class="announcement-card ${a.priority}" style="animation-delay: ${i * 50}ms">
            <div class="announcement-header">
              <div class="announcement-title">${a.title}</div>
              <span class="announcement-priority ${a.priority}">${priorityLabels[a.priority]}</span>
            </div>
            <div class="announcement-body">${a.body}</div>
            <div class="announcement-footer">
              <span>📣 ${a.author}</span>
              <span>${Utils.formatDate(a.date)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ===== QUICK LINKS ===== */
  renderQuickLinks() {
    return `
      <div class="quick-links-grid">
        ${CampusData.quickLinks.map(link => `
          <a class="quick-link-card" href="${link.url}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); Utils.showToast('Portal link — coming soon!');">
            <span class="quick-link-icon">${link.icon}</span>
            <span class="quick-link-label">${link.label}</span>
            <span class="quick-link-desc">${link.description}</span>
          </a>
        `).join('')}
      </div>
    `;
  },

  /* ===== Navigate to Explore map & focus a place ===== */
  viewOnMap(placeId) {
    App.switchTab('explore');
    setTimeout(() => {
      // Switch to map view
      const mapToggle = document.querySelector('.toggle-btn[data-view="map"]');
      if (mapToggle) mapToggle.click();
      // Open place detail
      setTimeout(() => {
        if (typeof ExploreModule !== 'undefined') {
          ExploreModule.openPlaceDetail(placeId);
        }
      }, 300);
    }, 150);
  }
};
