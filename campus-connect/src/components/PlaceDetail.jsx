import { useState } from 'react';
import { useApp } from '../context/AppContext';

function Stars({ rating }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </span>
  );
}

export default function PlaceDetail({ place, onClose }) {
  const { bookmarks, toggleBookmark, userReviews, addReview, showToast } = useApp();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const isBookmarked = bookmarks.includes(place.id);
  const placeReviews = [...place.reviews, ...userReviews.filter(r => r.placeId === place.id)];

  const handleSubmit = () => {
    if (!rating) { showToast('Please select a rating'); return; }
    if (!text.trim()) { showToast('Please write a review'); return; }
    addReview(place.id, rating, text);
    showToast('Review added! Thanks ✨');
    setRating(0); setText('');
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel hide-scroll">
        {/* Header */}
        <div className="p-6 border-b-2 border-[var(--color-border)]">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl mb-2">{place.icon}</div>
              <h2 className="text-2xl font-extrabold font-heading">{place.name}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-[var(--color-text-secondary)]">{place.category}</span>
                <span className="flex items-center gap-1 text-sm"><Stars rating={place.rating} /> <strong>{place.rating}</strong> <span className="text-[var(--color-text-muted)]">({placeReviews.length})</span></span>
                <span className={place.crowdLevel === 'low' ? 'badge-chill' : place.crowdLevel === 'moderate' ? 'badge-moderate' : 'badge-busy'}>
                  {place.crowdLevel === 'low' ? 'CHILL' : place.crowdLevel === 'moderate' ? 'MODERATE' : 'BUSY'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { toggleBookmark(place.id); showToast(isBookmarked ? 'Removed' : 'Saved!'); }} className={`w-10 h-10 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-lg cursor-pointer transition-all ${isBookmarked ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                {isBookmarked ? '★' : '☆'}
              </button>
              <button onClick={onClose} className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-lg cursor-pointer hover:bg-gray-50">✕</button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{place.description}</p>

          {/* Info List */}
          <div className="space-y-3">
            {[
              { icon: '🕐', label: 'Hours', value: place.hours },
              { icon: '📍', label: 'Location', value: place.location },
              { icon: '📞', label: 'Contact', value: place.phone },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-sm flex-shrink-0">{info.icon}</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">{info.label}</div>
                  <div className="text-sm font-medium">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-[var(--color-border-light)]" />

          {/* Reviews */}
          <div>
            <h3 className="font-bold font-heading text-lg mb-3">Reviews</h3>
            {placeReviews.map((review, i) => (
              <div key={i} className="neo-card-static p-4 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-xs font-bold">{review.initials}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{review.user}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{review.date}</div>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{review.text}</p>
              </div>
            ))}
          </div>

          <hr className="border-[var(--color-border-light)]" />

          {/* Add Review */}
          <div>
            <h3 className="font-bold font-heading text-lg mb-3">Write a Review</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} onClick={() => setRating(i)} className={`text-2xl cursor-pointer transition-transform hover:scale-110 ${i <= rating ? 'star-filled' : 'star-empty'}`}>★</button>
              ))}
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Share your experience..." className="w-full p-3 neo-card-static text-sm min-h-[80px] resize-none outline-none" />
            <button onClick={handleSubmit} className="btn-primary w-full justify-center mt-3">Submit Review</button>
          </div>
        </div>
      </div>
    </>
  );
}
