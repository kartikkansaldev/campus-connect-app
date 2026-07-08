import { useState } from 'react';

export default function Community() {
  const [search, setSearch] = useState('');
  
  const categories = [
    'General', 'Freshers', 'Academics', 'Coding', 'Clubs', 
    'Placements', 'Hostel', 'Sports', 'Events', 'Buy & Sell', 
    'Lost & Found', 'Memes'
  ];

  const mockPosts = [
    { id: 1, author: 'Rohan K.', time: '2h ago', category: 'Coding', content: 'Anyone want to team up for the HackGreenfield 2026 hackathon? Need a frontend dev with React experience.', likes: 12, comments: 4 },
    { id: 2, author: 'Priya P.', time: '4h ago', category: 'Academics', content: 'Does anyone have the previous year question papers for Data Structures (CS201)?', likes: 5, comments: 2 },
    { id: 3, author: 'Aarav S.', time: '5h ago', category: 'Lost & Found', content: 'Found a blue water bottle in the Central Library 2nd floor silent zone. Left it at the front desk.', likes: 24, comments: 1 },
    { id: 4, author: 'Sneha G.', time: 'Yesterday', category: 'Hostel', content: 'Hostel Wi-Fi is incredibly slow in Block B today. Anyone else facing this issue?', likes: 45, comments: 18 }
  ];

  return (
    <div className="animate-in flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-[260px] shrink-0">
        <h1 className="text-3xl font-extrabold font-heading mb-6">Community</h1>
        
        <div className="neo-card-static flex items-center px-4 py-3 gap-3 bg-[var(--color-bg)] mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
        </div>

        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3 font-mono">Topics</h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat, i) => (
            <button key={i} className={`text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${i === 0 ? 'bg-[var(--color-border)] text-white' : 'hover:bg-[var(--color-card)] text-[var(--color-text-secondary)]'}`}>
              # {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 space-y-5">
        <div className="neo-card-static p-4 bg-white flex items-center gap-4 border-2 border-dashed border-[var(--color-border-light)] hover:border-[var(--color-border)] transition-colors cursor-text">
           <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[var(--color-border)] shrink-0"></div>
           <p className="text-[var(--color-text-muted)] font-medium text-sm">What's on your mind? Ask the campus...</p>
        </div>

        {mockPosts.map(post => (
          <div key={post.id} className="neo-card-static p-5 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-border)] text-white flex items-center justify-center font-bold text-sm">
                  {post.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{post.author}</h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-mono">{post.time}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[var(--color-card)] rounded border border-[var(--color-border-light)] text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-[var(--color-text)] mb-4">{post.content}</p>
            
            <div className="flex items-center gap-6 pt-3 border-t border-[var(--color-border-light)]">
              <button className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                {post.likes}
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                {post.comments} Comments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
