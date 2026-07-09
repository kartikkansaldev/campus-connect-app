import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import PlaceDetail from '../components/PlaceDetail';


export default function Explore() {
  const { data } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('rating');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const filteredPlaces = useMemo(() => {
    let places = data.places;
    if (category !== 'all') places = places.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      places = places.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.description.toLowerCase().includes(q));
    }
    return [...places].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'crowd') { const o = { low: 1, moderate: 2, high: 3 }; return o[a.crowdLevel] - o[b.crowdLevel]; }
      return 0;
    });
  }, [data.places, category, search, sort]);

  return (
    <div className="animate-in">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <h1 className="text-3xl font-extrabold font-heading mb-1">Explore Campus</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">Navigation, description, ratings & reviews.</p>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8 md:h-[calc(100vh-12rem)]">
        
        {/* Sidebar */}
        <div className="w-full md:w-[280px] shrink-0 h-full overflow-y-auto pb-4 pr-1 hide-scroll">
          {/* Search */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3 font-mono">Search</h3>
            <div className="neo-card-static flex items-center px-4 py-3 gap-3 bg-[var(--color-bg)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Building, Cafe, ATM..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3 font-mono">Categories</h3>
            <div className="flex flex-col gap-2">
              {data.placeCategories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setCategory(cat.id)} 
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer border-[2.5px] shadow-[4px_4px_0_0_var(--color-border)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_0_var(--color-border)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[1px_1px_0_0_var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] border-[var(--color-border)]`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span> {cat.label}
                  </div>
                  {category === cat.id && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content (Places Grid) */}
        <div className="flex-1 h-full overflow-y-auto pb-10 pr-2 hide-scroll">

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[var(--color-text-secondary)] font-medium">No places found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlaces.map((place, i) => (
            <div key={place.id} className={`neo-card p-5 cursor-pointer stagger-${Math.min(i + 1, 6)} animate-in flex flex-col h-full`} onClick={() => setSelectedPlace(place)}>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-0.5">
                  <div>
                    <h3 className="font-bold font-heading text-[15px] min-h-[46px]">{place.name}</h3>
                    <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest font-bold mt-0.5">{place.category.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] mb-2">
                  <span className="flex items-center gap-1"><span className="star-filled text-sm">★</span> <span className="font-bold text-[var(--color-text)]">{place.rating}</span></span>
                  {place.waitTime && <span className="flex items-center gap-1">⏱ {place.waitTime}</span>}
                  {place.price && <span className="font-semibold text-[var(--color-text)]">{place.price}</span>}
                </div>
              </div>

              <div className="mt-auto">
                {place.signature && <p className="text-xs text-[var(--color-text-secondary)] mb-1">Signature: {place.signature}</p>}
                <p className="text-[11px] text-[var(--color-text-muted)] mb-3">⏰ {place.hours?.split('|')[0]?.trim()}</p>

                <button className="w-full py-2.5 rounded-lg border-2 border-[var(--color-border)] text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer" onClick={e => { e.stopPropagation(); setSelectedPlace(place); }}>
                  View & review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>

      {selectedPlace && <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
    </div>
  );
}
