import { useEffect } from 'react';

export default function EventDetail({ event, onClose }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 pt-24 sm:p-4 sm:pt-28 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[var(--color-bg)] w-full sm:w-[600px] max-h-[85vh] sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4">
        
        {/* Header/Image */}
        {event.image_url ? (
          <div className="relative h-64 bg-black shrink-0">
            <img src={event.image_url} alt={event.title} className="w-full h-full object-contain" />
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer">
              ✕
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-start p-5 border-b border-[var(--color-border)] shrink-0">
            <h2 className="text-2xl font-black font-heading pr-8">{event.title}</h2>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors cursor-pointer absolute top-5 right-5">
              ✕
            </button>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {event.image_url && (
            <h2 className="text-2xl font-black font-heading mb-4">{event.title}</h2>
          )}
          
          <div className="flex items-center gap-4 mb-6">
             <div className="bg-[var(--color-orange-bg)] text-[var(--color-orange)] w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-[var(--color-orange)]">
                <span className="text-[10px] font-bold uppercase leading-none mb-1">
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-xl font-black font-heading leading-none">
                  {new Date(event.date).getDate()}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">{event.venue}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">⏰ {event.time}</p>
              </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-2">About this event</h3>
            <p className="text-[15px] text-[var(--color-text)] whitespace-pre-line leading-relaxed">
              {event.description}
            </p>
          </div>

          {event.link && (
            <div className="pt-4 border-t border-[var(--color-border-light)] pb-6 sm:pb-0">
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-[var(--color-text)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center">
                Register / Join Now →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
