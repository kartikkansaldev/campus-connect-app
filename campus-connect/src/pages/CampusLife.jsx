import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CampusLife() {
  const { data } = useApp();
  const [activeTab, setActiveTab] = useState('clubs'); // 'clubs', 'events', 'rewards'
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'clubs', label: 'Clubs & Societies', icon: '🎯' },
    { id: 'events', label: 'Upcoming Events', icon: '🎉' },
    { id: 'rewards', label: 'Rewards & XP', icon: '🏆' }
  ];

  const clubCategories = [
    { id: 'tech', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'sports', label: 'Sports' },
    { id: 'educational', label: 'Academic' },
    { id: 'social', label: 'Social' }
  ];

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
          <div className="neo-card-static flex items-center px-4 py-3 gap-3 bg-white w-full md:w-96">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search clubs..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {clubCategories.map(cat => (
              <span key={cat.id} className="px-3 py-1 rounded-full border border-[var(--color-border-light)] text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-card)] uppercase tracking-wider">{cat.label}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.clubs.map(club => (
              <div key={club.id} className="neo-card-static p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl border-2 border-[var(--color-border)]">{club.icon}</div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--color-green-bg)] text-[var(--color-green)] font-bold uppercase tracking-wider">Recruiting</span>
                  </div>
                  <h3 className="font-extrabold text-lg font-heading mb-1">{club.name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-2">{club.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border-light)]">
                  <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{club.memberCount} Members</div>
                  <button className="text-xs font-bold uppercase text-[var(--color-accent)] hover:underline cursor-pointer">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.clubs.flatMap(c => c.events).map(event => (
              <div key={event.id} className="neo-card-static p-5 flex gap-4">
                 <div className="bg-[var(--color-orange-bg)] text-[var(--color-orange)] w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-[var(--color-orange)]">
                  <span className="text-[10px] font-bold uppercase leading-none mb-1">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-black font-heading leading-none">{new Date(event.date).getDate()}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{event.title}</h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mb-2">{event.venue} • {event.time}</p>
                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="text-center py-16 neo-card-static bg-[var(--color-card)]">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-extrabold font-heading mb-2">Rewards & XP</h2>
          <p className="text-[var(--color-text-secondary)]">Complete campus challenges to earn badges and dining coupons.</p>
        </div>
      )}
    </div>
  );
}
