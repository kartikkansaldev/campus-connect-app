import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabaseClient';
import ClubDetail from '../components/ClubDetail';
import EventDetail from '../components/EventDetail';

export default function CampusLife() {
  const { data } = useApp();
  const [activeTab, setActiveTab] = useState('clubs'); // 'clubs', 'events', 'rewards'
  const [search, setSearch] = useState('');
  
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const currentUser = { name: 'Arjun M.' }; // Mock current user

  useEffect(() => {
    const fetchClubsAndEvents = async () => {
      setLoading(true);
      setEventsLoading(true);
      
      const { data: supabaseClubs, error: clubsError } = await supabase
        .from('campus_clubs')
        .select('*')
        .order('rating', { ascending: false });
      
      if (supabaseClubs) setClubs(supabaseClubs);
      if (clubsError) console.error("Error fetching clubs:", clubsError);
      
      setLoading(false);

      const { data: supabaseEvents, error: eventsError } = await supabase
        .from('campus_events')
        .select('*')
        .order('date', { ascending: true });
        
      if (supabaseEvents) setEvents(supabaseEvents);
      if (eventsError) console.error("Error fetching events:", eventsError);
      
      setEventsLoading(false);
    };

    fetchClubsAndEvents();
  }, []);

  const tabs = [
    { id: 'clubs', label: 'Clubs & Societies', icon: '🎯' },
    { id: 'events', label: 'Upcoming Events', icon: '🎉' },
    { id: 'rewards', label: 'Rewards & XP', icon: '🏆' }
  ];

  // We can derive categories dynamically from the fetched clubs
  const clubCategories = ['All', ...new Set(clubs.map(c => c.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || club.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-in">
      <h1 className="text-3xl font-extrabold font-heading mb-6">Campus Life</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 cursor-pointer shrink-0 ${activeTab === tab.id ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]' : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-card)]'}`}
          >
            <span className="text-lg">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'clubs' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="neo-card-static flex items-center px-4 py-3 gap-3 bg-white w-full md:w-96">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Search clubs..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
            </div>

            <div className="flex gap-2 flex-wrap">
              {clubCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full border border-[var(--color-border-light)] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeCategory === cat ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-text-secondary)] bg-[var(--color-card)] hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[var(--color-text-secondary)] font-bold animate-pulse">Loading clubs from database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClubs.map(club => (
                <div key={club.id} className="neo-card-static p-5 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-transform group" onClick={() => setSelectedClub(club)}>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl border-2 border-[var(--color-border)] group-hover:bg-[var(--color-bg)] transition-colors">
                        {club.category === 'Technical' ? '💻' : club.category === 'Cultural' ? '🎭' : club.category === 'Entrepreneurship' ? '🚀' : '🎯'}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${club.status === 'Active' ? 'bg-[var(--color-green-bg)] text-[var(--color-green)]' : 'bg-gray-200 text-gray-500'}`}>{club.status}</span>
                        {club.rating >= 0 && <span className="text-[10px] font-bold text-[var(--color-orange)]">★ {Number(club.rating).toFixed(1)} <span className="text-[var(--color-text-muted)]">({club.review_count || 0})</span></span>}
                      </div>
                    </div>
                    <h3 className="font-extrabold text-lg font-heading mb-1 group-hover:text-[var(--color-accent)] transition-colors">{club.name}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-2">{club.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border-light)]">
                    <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{club.members_count || 0} Members</div>
                    <button className="text-xs font-bold uppercase text-[var(--color-accent)]">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          {eventsLoading ? (
            <div className="text-center py-12 text-[var(--color-text-secondary)] font-bold animate-pulse">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 neo-card-static bg-[var(--color-card)]">
              <div className="text-5xl mb-4">📅</div>
              <h2 className="text-2xl font-extrabold font-heading mb-2">No Upcoming Events</h2>
              <p className="text-[var(--color-text-secondary)]">There are no upcoming events scheduled at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map(event => (
                <div key={event.id} className="neo-card-static flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform h-full" onClick={() => setSelectedEvent(event)}>
                  {event.image_url && (
                    <div className="w-full h-40 bg-black shrink-0">
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex gap-4 mb-3">
                      <div className="bg-[var(--color-orange-bg)] text-[var(--color-orange)] w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border border-[var(--color-orange)]">
                        <span className="text-[9px] font-bold uppercase leading-none mb-1">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-lg font-black font-heading leading-none">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-0.5 line-clamp-2">{event.title}</h3>
                        <p className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">{event.venue}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 mb-4 leading-relaxed flex-1">{event.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-[var(--color-border-light)] flex gap-2">
                      <button className="flex-1 py-2 rounded-lg border border-[var(--color-border)] text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="text-center py-16 neo-card-static bg-[var(--color-card)]">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-extrabold font-heading mb-2">Rewards & XP</h2>
          <p className="text-[var(--color-text-secondary)]">Complete campus challenges to earn badges and dining coupons.</p>
        </div>
      )}

      {selectedClub && (
        <ClubDetail club={selectedClub} onClose={() => setSelectedClub(null)} currentUser={currentUser} />
      )}
      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
