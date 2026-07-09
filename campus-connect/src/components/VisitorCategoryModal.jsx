import React from 'react';
import { useApp } from '../context/AppContext';

export default function VisitorCategoryModal({ categoryId, onClose, onSelectPlace }) {
  const { data } = useApp();

  const category = data.placeCategories.find(c => c.id === categoryId);
  const places = data.places.filter(p => p.category === categoryId);

  // If no specific places match, we can show a placeholder or let them explore
  const hasPlaces = places.length > 0;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col relative">
        {/* Header matching PlaceDetail */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border-2 border-[var(--color-border-light)]">{category?.icon || '✨'}</div>
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-[var(--color-text)]">{category?.label || categoryId}</h2>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {places.length} locations found
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[var(--color-border)] hover:bg-[var(--color-card-inner)] transition-colors relative z-10 font-bold text-sm bg-white"
          >
            ← Back to Directory
          </button>
        </div>

        {/* Content Body */}
        <div className="w-full">
          {/* Parchment texture effect via background color */}
          {!hasPlaces ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 opacity-50">🧭</div>
              <h3 className="text-lg font-bold mb-2">No locations found</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Check back later for updates to this section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {places.map((place, i) => (
                <div 
                  key={place.id} 
                  onClick={() => onSelectPlace(place)}
                  className={`neo-card p-5 cursor-pointer stagger-${Math.min(i + 1, 6)} animate-in flex flex-col h-full bg-[#FAF9F6]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-[var(--color-border-light)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                      {place.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={place.crowdLevel === 'low' ? 'badge-chill' : place.crowdLevel === 'moderate' ? 'badge-moderate' : 'badge-busy'}>
                        {place.crowdLevel === 'low' ? 'CHILL' : place.crowdLevel === 'moderate' ? 'MODERATE' : 'BUSY'}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-lg mb-1 group-hover:text-amber-700 transition-colors">{place.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold mb-3">
                    <span className="text-amber-500">★</span> {place.rating}
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed mb-4 flex-1">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider pt-3 border-t border-[var(--color-border-light)]">
                    <span className="flex items-center gap-1">🕐 {place.hours?.split('|')[0] || 'Open Now'}</span>
                    <span className="text-[var(--color-text)] font-bold group-hover:underline">View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
