import { useApp } from '../context/AppContext';

export default function Profile() {
  const { data, bookmarks, joinedClubs, userReviews, clearAllData, showToast, setActiveTab } = useApp();
  const user = data.user;

  return (
    <div className="animate-in max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="neo-card-static text-center p-8 mb-6">
        <div className="w-20 h-20 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 ring-4 ring-orange-100">
          {user.initials}
        </div>
        <h2 className="text-xl font-extrabold font-heading">{user.name}</h2>
        <p className="text-sm text-[var(--color-text-muted)]">{user.department} · {user.year}</p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { num: bookmarks.length, label: 'Saved' },
            { num: joinedClubs.length, label: 'Clubs' },
            { num: userReviews.length, label: 'Reviews' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold text-[var(--color-accent)] font-heading">{stat.num}</div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Places */}
      <div className="mb-6">
        <h3 className="font-bold font-heading text-lg mb-3">📍 Saved Places</h3>
        {bookmarks.length > 0 ? (
          <div className="space-y-2">
            {bookmarks.map(id => {
              const place = data.places.find(p => p.id === id);
              if (!place) return null;
              return (
                <div key={id} className="neo-card flex items-center gap-3 p-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-lg">{place.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{place.name}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{place.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="neo-card-static text-center py-8">
            <div className="text-3xl mb-2">📌</div>
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">No saved places yet</p>
            <p className="text-xs text-[var(--color-text-muted)]">Bookmark places from Explore</p>
          </div>
        )}
      </div>

      {/* Joined Clubs */}
      <div className="mb-6">
        <h3 className="font-bold font-heading text-lg mb-3">🏛️ My Clubs</h3>
        {joinedClubs.length > 0 ? (
          <div className="space-y-2">
            {joinedClubs.map(id => {
              const club = data.clubs.find(c => c.id === id);
              if (!club) return null;
              return (
                <div key={id} className="neo-card flex items-center gap-3 p-3 cursor-pointer" onClick={() => setActiveTab('clubs')}>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-lg">{club.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{club.name}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{club.memberCount} members · {club.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="neo-card-static text-center py-8">
            <div className="text-3xl mb-2">🤝</div>
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">No clubs joined yet</p>
            <p className="text-xs text-[var(--color-text-muted)]">Join clubs from the Clubs tab</p>
          </div>
        )}
      </div>

      {/* Academic Info */}
      <div className="mb-6">
        <h3 className="font-bold font-heading text-lg mb-3">🎓 Academic Info</h3>
        <div className="neo-card-static divide-y divide-[var(--color-border-light)]">
          {[
            { label: 'Enrollment ID', value: user.enrollmentId },
            { label: 'Current Semester', value: user.semester },
            { label: 'CGPA', value: user.cgpa, accent: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[var(--color-text-muted)]">{item.label}</span>
              <span className={`text-sm font-bold ${item.accent ? 'text-[var(--color-accent)]' : ''}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mb-6">
        <h3 className="font-bold font-heading text-lg mb-3">⚙️ Settings</h3>
        <div className="neo-card-static divide-y divide-[var(--color-border-light)]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔔</span>
              <div>
                <div className="text-sm font-semibold">Notifications</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">Receive alerts for events</div>
              </div>
            </div>
            <div className="w-12 h-7 rounded-full bg-[var(--color-accent)] p-0.5 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-white shadow translate-x-5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <button onClick={() => { if (confirm('Clear all saved data?')) { clearAllData(); showToast('All data cleared'); } }} className="px-6 py-2.5 rounded-full border-2 border-[var(--color-red)] text-[var(--color-red)] text-sm font-bold hover:bg-red-50 transition-colors cursor-pointer">
          🗑️ Clear All Data
        </button>
        <div className="mt-6 text-xs text-[var(--color-text-muted)]">
          <div>Campus Grid v2.0</div>
          <div>Made with ❤️ for Chitkara University</div>
        </div>
      </div>
    </div>
  );
}
