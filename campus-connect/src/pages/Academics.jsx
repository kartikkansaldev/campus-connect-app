import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Academics() {
  const { data } = useApp();
  const [activeCategory, setActiveCategory] = useState(null);

  const academicData = data.academicData || [];
  const selectedCategory = academicData.find(c => c.id === activeCategory);

  return (
    <div className="animate-in pb-12">
      {/* Hero Header */}
      {!activeCategory && (
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-[var(--color-text)] mb-3 tracking-tight flex items-center gap-3">
            <span className="text-3xl">📚</span> Chitkara Academics
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed max-w-2xl">
            Explore comprehensive information about our programs, global pathways, research initiatives, and campus life based on the 2026-27 reference report.
          </p>
        </div>
      )}

      {/* Directory Content */}
      <div id="directory-section" className="mb-6">
        <div className="relative">
          {activeCategory ? (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col relative">
                {/* Header matching PlaceDetail/VisitorCategoryModal */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border-2 border-[var(--color-border-light)]">
                      {selectedCategory.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold font-heading text-[var(--color-text)]">{selectedCategory.title}</h2>
                      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                        Information Category
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[var(--color-border)] hover:bg-[var(--color-card-inner)] transition-colors relative z-10 font-bold text-sm bg-white cursor-pointer"
                  >
                    ← Back to Directory
                  </button>
                </div>

                {/* Content Body */}
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedCategory.details.map((detail, idx) => (
                      <div key={idx} className={`neo-card p-5 stagger-${Math.min(idx + 1, 6)} animate-in flex flex-col h-full bg-[#FAF9F6]`}>
                        <h3 className="font-extrabold text-lg mb-3 pb-2 border-b border-[var(--color-border-light)] text-[var(--color-text)]">{detail.subtitle}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed whitespace-pre-wrap flex-1">
                          {detail.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {academicData.map((item, i) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveCategory(item.id)}
                  className="neo-card p-5 flex flex-col group cursor-pointer h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-card-inner)] border-2 border-[var(--color-border-light)] flex items-center justify-center text-2xl mb-4 group-hover:border-[var(--color-border)] group-hover:-translate-y-1 transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-lg mb-1 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

