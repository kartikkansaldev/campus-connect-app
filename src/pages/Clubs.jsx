import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

function formatDate(d) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dt = new Date(d);
  return { month: months[dt.getMonth()].toUpperCase(), day: dt.getDate() };
}

export default function Clubs() {
  const { data, joinedClubs, toggleJoinClub, clubReviews, addClubReview, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('members');
  const [selectedClub, setSelectedClub] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // All events aggregated
  const upcomingEvents = useMemo(() => {
    const all = [];
    data.clubs.forEach(c => c.events.forEach(e => all.push({ ...e, clubName: c.name, clubId: c.id, clubIcon: c.icon })));
    all.sort((a, b) => new Date(a.date) - new Date(b.date));
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return all.filter(e => new Date(e.date) >= now);
  }, [data.clubs]);

  const filteredClubs = useMemo(() => {
    let clubs = data.clubs;
    if (category !== 'all') clubs = clubs.filter(c => c.category === category);
    if (search) { const q = search.toLowerCase(); clubs = clubs.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)); }
    return [...clubs].sort((a, b) => {
      if (sort === 'members') return b.memberCount - a.memberCount;
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'events') return b.events.length - a.events.length;
      return 0;
    });
  }, [data.clubs, category, search, sort]);

  const handleSubmitReview = () => {
    if (!reviewRating) { showToast('Please select a rating'); return; }
    if (!reviewText.trim()) { showToast('Please write a review'); return; }
    addClubReview(selectedClub.id, reviewRating, reviewText);
    showToast('Review added! ✨');
    setReviewRating(0); setReviewText('');
  };

  return (
    <div className="animate-in">
      {/* Upcoming Events */}
      <h2 className="text-2xl font-bold font-heading mb-4">🔥 Upcoming Events</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8" style={{ scrollbarWidth: 'none' }}>
        {upcomingEvents.slice(0, 8).map(event => {
          const { month, day } = formatDate(event.date);
          return (
            <div key={event.id} className="neo-card p-4 flex-shrink-0 w-72 cursor-pointer" onClick={() => setSelectedClub(data.clubs.find(c => c.id === event.clubId))}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-lg bg-[var(--color-accent)] text-white flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold">{month}</span>
                  <span className="text-sm font-extrabold">{day}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{event.title}</div>
                  <div className="text-xs text-[var(--color-accent)] font-medium">{event.clubIcon} {event.clubName}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[var(--color-text-muted)]">
                <span>🕐 {event.time}</span>
                <span>📍 {event.venue}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clubs Section */}
      <h2 className="text-2xl font-bold font-heading mb-4">Clubs & Societies</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-1 min-w-[200px] neo-card-static flex items-center px-4 py-2.5 gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search clubs..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="neo-card-static px-4 py-2.5 text-sm font-medium bg-white cursor-pointer outline-none">
          <option value="members">Members (Most)</option>
          <option value="name">Name (A to Z)</option>
          <option value="events">Events (Most)</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4" style={{ scrollbarWidth: 'none' }}>
        {data.clubCategories.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border-2 transition-all cursor-pointer ${category === cat.id ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-border)]'}`}>
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredClubs.map((club, i) => (
          <div key={club.id} className={`neo-card p-4 flex gap-4 cursor-pointer stagger-${Math.min(i + 1, 6)} animate-in`} onClick={() => setSelectedClub(club)}>
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0">{club.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold font-heading">{club.name}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-[var(--color-text-secondary)]">{club.category}</span>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">{club.description}</p>
              <div className="flex gap-4 mt-2 text-[11px] text-[var(--color-text-muted)]">
                <span>👥 {club.memberCount} members</span>
                <span>📅 {club.events.length} events</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Club Detail Modal */}
      {selectedClub && (
        <>
          <div className="modal-backdrop" onClick={() => setSelectedClub(null)} />
          <div className="modal-panel">
            <div className="p-6 border-b-2 border-[var(--color-border)]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedClub.icon}</div>
                  <div>
                    <h2 className="text-xl font-extrabold font-heading">{selectedClub.name}</h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-100">{selectedClub.category}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">👥 {selectedClub.memberCount} members</span>
                      {selectedClub.isRecruiting ? <span className="badge-chill">Recruiting</span> : <span className="badge-busy">Closed</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedClub(null)} className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center cursor-pointer hover:bg-gray-50">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selectedClub.description}</p>

              <button onClick={() => { toggleJoinClub(selectedClub.id); showToast(joinedClubs.includes(selectedClub.id) ? 'Left club' : 'Joined! 🎉'); }} className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${joinedClubs.includes(selectedClub.id) ? 'bg-green-50 text-[var(--color-green)] border-2 border-[var(--color-green)]' : 'btn-primary justify-center'}`}>
                {joinedClubs.includes(selectedClub.id) ? '✓ Joined' : 'Join Club'}
              </button>

              <div className="space-y-2">
                {[
                  { icon: '📍', label: 'Office', value: selectedClub.office },
                  { icon: '📅', label: 'Schedule', value: selectedClub.meetingSchedule },
                  { icon: '👤', label: 'Contact', value: selectedClub.contact },
                  { icon: '✉️', label: 'Email', value: selectedClub.email },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <span>{info.icon}</span>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">{info.label}</div>
                      <div className="text-sm font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-[var(--color-border-light)]" />
              <h3 className="font-bold font-heading">Upcoming Events</h3>
              {selectedClub.events.map(event => {
                const { month, day } = formatDate(event.date);
                return (
                  <div key={event.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-[var(--color-border-light)]">
                    <div className="w-11 h-11 rounded-lg bg-[var(--color-accent)] text-white flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[8px] font-bold">{month}</span>
                      <span className="text-sm font-extrabold">{day}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{event.title}</div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">{event.time} · {event.venue}</div>
                    </div>
                  </div>
                );
              })}

              <hr className="border-[var(--color-border-light)]" />
              <h3 className="font-bold font-heading">Write a Review</h3>
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <button key={i} onClick={() => setReviewRating(i)} className={`text-2xl cursor-pointer ${i <= reviewRating ? 'star-filled' : 'star-empty'}`}>★</button>
                ))}
              </div>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Share your experience..." className="w-full p-3 neo-card-static text-sm min-h-[60px] resize-none outline-none" />
              <button onClick={handleSubmitReview} className="btn-primary w-full justify-center mt-2">Submit Review</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
