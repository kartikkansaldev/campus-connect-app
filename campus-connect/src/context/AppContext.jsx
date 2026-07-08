import { createContext, useContext, useState, useCallback } from 'react';
import { campusData } from '../data/campusData';

const AppContext = createContext(null);

function getFromLS(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

function setToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('home');
  const [bookmarks, setBookmarks] = useState(() => getFromLS('cc_bookmarks'));
  const [joinedClubs, setJoinedClubs] = useState(() => getFromLS('cc_joined'));
  const [userReviews, setUserReviews] = useState(() => getFromLS('cc_reviews'));
  const [clubReviews, setClubReviews] = useState(() => getFromLS('cc_club_reviews'));
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleBookmark = useCallback((placeId) => {
    setBookmarks(prev => {
      const next = prev.includes(placeId) ? prev.filter(id => id !== placeId) : [...prev, placeId];
      setToLS('cc_bookmarks', next);
      return next;
    });
  }, []);

  const toggleJoinClub = useCallback((clubId) => {
    setJoinedClubs(prev => {
      const next = prev.includes(clubId) ? prev.filter(id => id !== clubId) : [...prev, clubId];
      setToLS('cc_joined', next);
      return next;
    });
  }, []);

  const addReview = useCallback((placeId, rating, text) => {
    const review = { placeId, user: campusData.user.name, initials: campusData.user.initials, rating, text, date: new Date().toISOString().split('T')[0] };
    setUserReviews(prev => {
      const next = [...prev, review];
      setToLS('cc_reviews', next);
      return next;
    });
  }, []);

  const addClubReview = useCallback((clubId, rating, text) => {
    const review = { clubId, user: campusData.user.name, initials: campusData.user.initials, rating, text, date: new Date().toISOString().split('T')[0] };
    setClubReviews(prev => {
      const next = [...prev, review];
      setToLS('cc_club_reviews', next);
      return next;
    });
  }, []);

  const clearAllData = useCallback(() => {
    setBookmarks([]); setJoinedClubs([]); setUserReviews([]); setClubReviews([]);
    ['cc_bookmarks', 'cc_joined', 'cc_reviews', 'cc_club_reviews'].forEach(k => localStorage.removeItem(k));
  }, []);

  return (
    <AppContext.Provider value={{
      data: campusData, activeTab, setActiveTab,
      bookmarks, toggleBookmark,
      joinedClubs, toggleJoinClub,
      userReviews, addReview,
      clubReviews, addClubReview,
      toast, showToast, clearAllData
    }}>
      {children}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[var(--color-text)] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg animate-in">
          {toast}
        </div>
      )}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
