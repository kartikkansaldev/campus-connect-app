import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { campusData as localMockData } from '../data/campusData';
import { supabase } from '../supabaseClient';

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
  const [clubReviewsState, setClubReviewsState] = useState(() => getFromLS('cc_club_reviews'));
  const [toast, setToast] = useState(null);
  
  // State for live Supabase data
  const [liveData, setLiveData] = useState(localMockData); // Default to mock while loading
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    async function fetchSupabaseData() {
      try {
        console.log("Fetching live data from Supabase...");
        
        // Fetch all tables
        const [
          { data: places }, { data: placeCategories }, { data: placeReviews },
          { data: clubs }, { data: clubCategories }, { data: clubEvents }, { data: clubReviews },
          { data: staff }, { data: staffCategories },
          { data: classrooms }, { data: announcements }, 
          { data: academicCalendar }, { data: examSchedule }, { data: quickLinks }
        ] = await Promise.all([
          supabase.from('places').select('*'),
          supabase.from('place_categories').select('*'),
          supabase.from('place_reviews').select('*'),
          supabase.from('clubs').select('*'),
          supabase.from('club_categories').select('*'),
          supabase.from('club_events').select('*'),
          supabase.from('club_reviews').select('*'),
          supabase.from('staff').select('*'),
          supabase.from('staff_categories').select('*'),
          supabase.from('classrooms').select('*'),
          supabase.from('announcements').select('*'),
          supabase.from('academic_calendar').select('*'),
          supabase.from('exam_schedule').select('*'),
          supabase.from('quick_links').select('*')
        ]);

        // Reconstruct the nested arrays so they match the expected format
        const structuredPlaces = places?.map(p => ({
          ...p,
          crowdLevel: p.crowd_level,
          reviewCount: p.review_count,
          waitTime: p.wait_time,
          reviews: placeReviews?.filter(r => r.place_id === p.id) || []
        })) || [];

        const structuredClubs = clubs?.map(c => ({
          ...c,
          meetingSchedule: c.meeting_schedule,
          memberCount: c.member_count,
          isRecruiting: c.is_recruiting,
          reviewCount: c.review_count,
          events: clubEvents?.filter(e => e.club_id === c.id) || [],
          reviews: clubReviews?.filter(r => r.club_id === c.id) || []
        })) || [];

        // Build the remoteData object, falling back to localMockData for things not in DB (like user/timetable)
        const remoteData = {
          ...localMockData,
          places: structuredPlaces,
          placeCategories: placeCategories || [],
          clubs: structuredClubs,
          clubCategories: clubCategories || [],
          staff: staff || [],
          staffCategories: staffCategories || [],
          classrooms: classrooms?.map(c => ({...c, placeId: c.place_id})) || [],
          announcements: announcements || [],
          academicCalendar: academicCalendar || [],
          examSchedule: examSchedule || [],
          quickLinks: quickLinks || []
        };

        setLiveData(remoteData);
      } catch (err) {
        console.error("Error fetching data from Supabase:", err);
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchSupabaseData();
  }, []);

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

  const addReview = useCallback(async (placeId, rating, text) => {
    const review = { placeId, user: liveData.user.name, initials: liveData.user.initials, rating, text, date: new Date().toISOString().split('T')[0] };
    
    // Save to local state for immediate UI feedback
    setUserReviews(prev => {
      const next = [...prev, review];
      setToLS('cc_reviews', next);
      return next;
    });

    // Save to Supabase
    await supabase.from('place_reviews').insert([{
      place_id: placeId,
      user_name: review.user,
      initials: review.initials,
      rating: review.rating,
      text: review.text,
      date: review.date
    }]);
  }, [liveData.user]);

  const addClubReview = useCallback(async (clubId, rating, text) => {
    const review = { clubId, user: liveData.user.name, initials: liveData.user.initials, rating, text, date: new Date().toISOString().split('T')[0] };
    
    setClubReviewsState(prev => {
      const next = [...prev, review];
      setToLS('cc_club_reviews', next);
      return next;
    });

    await supabase.from('club_reviews').insert([{
      club_id: clubId,
      user_name: review.user,
      initials: review.initials,
      rating: review.rating,
      text: review.text,
      date: review.date
    }]);
  }, [liveData.user]);

  const clearAllData = useCallback(() => {
    setBookmarks([]); setJoinedClubs([]); setUserReviews([]); setClubReviewsState([]);
    ['cc_bookmarks', 'cc_joined', 'cc_reviews', 'cc_club_reviews'].forEach(k => localStorage.removeItem(k));
  }, []);

  return (
    <AppContext.Provider value={{
      data: liveData, activeTab, setActiveTab,
      bookmarks, toggleBookmark,
      joinedClubs, toggleJoinClub,
      userReviews, addReview,
      clubReviews: clubReviewsState, addClubReview,
      toast, showToast, clearAllData, isLoadingData
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
