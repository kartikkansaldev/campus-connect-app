import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useApp } from '../context/AppContext';

export default function ClubDetail({ club, onClose }) {
  const { currentUser, myMemberships, toggleJoinClub, showToast } = useApp();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!club) return;
    fetchReviews();
  }, [club]);

  const fetchReviews = async () => {
    setLoading(true);
    const { data: reviewsData } = await supabase
      .from('club_reviews')
      .select('*')
      .eq('club_id', club.id)
      .order('date', { ascending: false });
    
    if (reviewsData) setReviews(reviewsData);
    setLoading(false);
  };

  const membership = myMemberships.find(m => m.club_id === club.id);
  const isPending = membership?.status === 'pending';
  const isAccepted = membership?.status === 'accepted';
  const isBlocked = membership?.status === 'blocked';

  const handleJoin = async () => {
    if (isBlocked) {
      showToast("You are blocked from joining this club.");
      return;
    }
    await toggleJoinClub(club.id);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser || currentUser.role === 'visitor') return alert('Please sign in to leave a review.');
    if (newReviewRating === 0) return alert('Please select a star rating.');
    if (!newReviewText.trim()) return alert('Please write a review.');
    
    setIsSubmitting(true);
    const newReview = {
      club_id: club.id,
      user_name: currentUser.name,
      initials: currentUser.name.substring(0, 2).toUpperCase(),
      rating: newReviewRating,
      text: newReviewText,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const { data, error } = await supabase
        .from('club_reviews')
        .insert([newReview])
        .select()
        .single();
        
      if (error) throw error;
      
      const updatedReviews = [data, ...reviews];
      setReviews(updatedReviews);
      
      const newAverage = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
      await supabase.from('clubs').update({ rating: newAverage, review_count: updatedReviews.length }).eq('id', club.id);
        
      setNewReviewText('');
      setNewReviewRating(0);
      showToast("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
    
    setIsSubmitting(false);
  };

  if (!club) return null;

  const socialLinks = typeof club.social_links === 'string' 
    ? JSON.parse(club.social_links || '{}') 
    : (club.social_links || {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel animate-in">
        {/* Cover / Header */}
        <div className="relative h-32 bg-[var(--color-border)] p-5 flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid-pattern-detail" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern-detail)" />
            </svg>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:opacity-80 transition-opacity bg-black/20 rounded-full p-1 z-50 cursor-pointer">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div className="relative z-10 flex gap-3 items-end">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-card)] flex items-center justify-center text-3xl shadow-lg border-2 border-[var(--color-border)]">
              {club.category === 'Technical' ? '💻' : club.category === 'Cultural' ? '🎭' : club.category === 'Entrepreneurship' ? '🚀' : '🎯'}
            </div>
            <div className="text-white pb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm mb-1 inline-block">
                {club.category}
              </span>
              <h2 className="text-2xl font-black font-heading leading-tight text-[var(--color-bg)]">{club.name}</h2>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 pb-8 space-y-6 bg-[var(--color-bg)]">
          {/* Quick Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="neo-card-static p-3 bg-white">
              <div className="text-xs text-[var(--color-text-muted)] font-bold uppercase mb-1">Status</div>
              <div className={`font-bold text-sm ${club.isRecruiting ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>{club.isRecruiting ? 'Recruiting' : 'Closed'}</div>
            </div>
            <div className="neo-card-static p-3 bg-white">
              <div className="text-xs text-[var(--color-text-muted)] font-bold uppercase mb-1">Office</div>
              <div className="font-bold text-sm">{club.office || 'N/A'}</div>
            </div>
            <div className="neo-card-static p-3 bg-white">
              <div className="text-xs text-[var(--color-text-muted)] font-bold uppercase mb-1">Members</div>
              <div className="font-bold text-sm">{club.memberCount || '0'}</div>
            </div>
            <div className="neo-card-static p-3 bg-white">
              <div className="text-xs text-[var(--color-text-muted)] font-bold uppercase mb-1">Rating</div>
              <div className="font-bold text-sm text-[var(--color-orange)] flex items-center gap-1">
                ★ {club.rating !== undefined ? Number(club.rating).toFixed(1) : '0.0'} <span className="text-[var(--color-text-muted)] text-[10px]">({club.reviewCount || 0})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              {/* About */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2 font-mono">About</h3>
                <p className="text-[var(--color-text)] font-medium leading-relaxed bg-white p-4 neo-card-static">
                  {club.description}
                </p>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2 font-mono flex justify-between items-center">
                  <span>Student Reviews</span>
                  <span className="text-[10px] bg-[var(--color-border-light)] px-2 py-0.5 rounded text-[var(--color-text)]">{reviews.length} total</span>
                </h3>

                {/* Review Form */}
                <form onSubmit={handleSubmitReview} className="neo-card-static p-4 bg-white mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase">Leave a Review</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setNewReviewRating(star)}
                          className={`text-lg transition-transform hover:scale-110 cursor-pointer ${newReviewRating >= star ? 'text-[var(--color-orange)]' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience with this club..."
                    className="w-full bg-[var(--color-bg)] border-2 border-[var(--color-border-light)] rounded-lg p-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none h-20 font-medium"
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting || newReviewRating === 0 || !newReviewText.trim()}
                      className="px-4 py-2 bg-[var(--color-text)] text-white text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Review'}
                    </button>
                  </div>
                </form>

                {loading ? (
                  <div className="text-center text-sm py-4">Loading reviews...</div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-3">
                    {reviews.map(rev => (
                      <div key={rev.id} className="neo-card-static p-3 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-sm flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[var(--color-border)] text-white flex items-center justify-center text-[10px]">{rev.initials}</div>
                            {rev.user_name}
                          </div>
                          <div className="text-[var(--color-orange)] text-xs tracking-widest">
                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)]">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-[var(--color-text-muted)] italic neo-card-static p-4 bg-[var(--color-card)] text-center">
                    No reviews yet. Be the first to review!
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-64 shrink-0 space-y-6">
              {/* Join Button */}
              <div className="neo-card-static p-4 bg-white space-y-4">
                <button 
                  onClick={handleJoin}
                  disabled={isBlocked}
                  className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all border-2 border-[var(--color-border)] cursor-pointer
                    ${isAccepted ? 'bg-[var(--color-green)] text-white shadow-none translate-y-[2px] translate-x-[2px]' 
                    : isPending ? 'bg-[var(--color-orange)] text-white shadow-none translate-y-[2px] translate-x-[2px]'
                    : isBlocked ? 'bg-[var(--color-card)] text-[var(--color-text-muted)] opacity-50 cursor-not-allowed'
                    : 'bg-[var(--color-accent)] text-white shadow-[4px_4px_0px_0px_var(--color-border)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[3px_3px_0px_0px_var(--color-border)]'}`}
                >
                  {isAccepted ? 'Joined ✓' : isPending ? 'Requested ⏳' : isBlocked ? 'Blocked 🚫' : 'Join Club'}
                </button>
                <p className="text-[10px] text-[var(--color-text-muted)] text-center font-medium">
                  {isAccepted ? "You're a member of this club!" : isPending ? "Waiting for admin approval." : "Join to get notified about events and auditions."}
                </p>
              </div>

              {/* Details List */}
              <div className="neo-card-static p-4 bg-[var(--color-card)] space-y-3">
                 <div>
                  <div className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase mb-0.5">Contact</div>
                  <div className="text-sm font-semibold">{club.contact || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase mb-0.5">Email</div>
                  <div className="text-sm font-semibold">{club.email || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
