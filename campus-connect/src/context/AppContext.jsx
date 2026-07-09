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
  const [userReviews, setUserReviews] = useState(() => getFromLS('cc_reviews'));
  const [clubReviewsState, setClubReviewsState] = useState(() => getFromLS('cc_club_reviews'));
  const [toast, setToast] = useState(null);
  
  // State for live Supabase data
  const [liveData, setLiveData] = useState(localMockData); // Default to mock while loading
  const [isLoadingData, setIsLoadingData] = useState(true);

  // --- NEW AUTH STATE ---
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [isVisitor, setIsVisitor] = useState(() => localStorage.getItem('cc_is_visitor') === 'true');
  // Replaces the old local storage joined clubs
  const [myMemberships, setMyMemberships] = useState([]);

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
          { data: academicCalendar }, { data: examSchedule }, { data: quickLinks },
          { data: clubMemberships } // NEW
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
          supabase.from('quick_links').select('*'),
          supabase.from('club_memberships').select('*') // NEW
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
          // Member count is now dynamically calculated from 'accepted' members!
          memberCount: clubMemberships?.filter(m => m.club_id === c.id && m.status === 'accepted').length || 0,
          isRecruiting: c.is_recruiting,
          reviewCount: c.review_count,
          events: clubEvents?.filter(e => e.club_id === c.id) || [],
          reviews: clubReviews?.filter(r => r.club_id === c.id) || []
        })) || [];

        // Build the remoteData object, falling back to localMockData for things not in DB
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

        // --- AUTH INITIALIZATION ---
        const sessionId = localStorage.getItem('cc_session_id');
        if (sessionId) {
          const { data: profileData } = await supabase.from('profiles').select('*').eq('id', sessionId).single();
          if (profileData) {
            setCurrentUser(profileData);
            if (profileData.role === 'club_admin') {
              setIsAdminView(true);
            }
            // Load user's memberships
            const userMems = clubMemberships?.filter(m => m.profile_id === profileData.id) || [];
            setMyMemberships(userMems);
          }
        }
        setSessionInitialized(true);

      } catch (err) {
        console.error("Error fetching data from Supabase:", err);
        setSessionInitialized(true);
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchSupabaseData();
  }, []);

  const loginUser = (userObj) => {
    setCurrentUser(userObj);
    setIsAdminView(userObj?.role === 'club_admin');
    if (userObj) {
      localStorage.setItem('cc_is_visitor', 'false');
      setIsVisitor(false);
    }
  };

  const handleSetIsVisitor = (val) => {
    localStorage.setItem('cc_is_visitor', val ? 'true' : 'false');
    setIsVisitor(val);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setMyMemberships([]);
    setIsAdminView(false);
    localStorage.removeItem('cc_session_id');
    localStorage.removeItem('cc_is_visitor');
    setIsVisitor(false);
  };

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

  const toggleJoinClub = useCallback(async (clubId) => {
    if (!currentUser || currentUser.role !== 'student') {
      showToast("Only students can join clubs!");
      return;
    }

    const existingMem = myMemberships.find(m => m.club_id === clubId);
    
    if (existingMem) {
      // Leave club
      setMyMemberships(prev => prev.filter(m => m.club_id !== clubId));
      await supabase.from('club_memberships').delete().eq('id', existingMem.id);
      showToast("Request cancelled");
    } else {
      // Join club (pending)
      const newMem = {
        club_id: clubId,
        profile_id: currentUser.id,
        status: 'pending'
      };
      // Optimistic update
      const tempMem = { ...newMem, id: 'temp-'+Date.now() };
      setMyMemberships(prev => [...prev, tempMem]);
      showToast("Join request sent!");
      
      const { data } = await supabase.from('club_memberships').insert([newMem]).select().single();
      if (data) {
        setMyMemberships(prev => prev.map(m => m.id === tempMem.id ? data : m));
      }
    }
  }, [currentUser, myMemberships, showToast]);

  const addReview = useCallback(async (placeId, rating, text) => {
    const userName = currentUser?.name || 'Visitor';
    const initials = userName.substring(0, 1).toUpperCase();
    const review = { placeId, user: userName, initials, rating, text, date: new Date().toISOString().split('T')[0] };
    
    // Save to local state for immediate UI feedback
    setUserReviews(prev => {
      const next = [...prev, review];
      setToLS('cc_reviews', next);
      return next;
    });

    // Update the average rating locally in liveData so the UI updates instantly
    setLiveData(prev => {
      const newPlaces = prev.places.map(p => {
        if (p.id === placeId) {
          const allReviews = [...(p.reviews || []), review];
          const newAvg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
          return { ...p, rating: parseFloat(newAvg.toFixed(1)), reviewCount: allReviews.length };
        }
        return p;
      });
      return { ...prev, places: newPlaces };
    });

    // Save to Supabase
    try {
      await supabase.from('place_reviews').insert([{
        place_id: placeId,
        user_name: review.user,
        initials: review.initials,
        rating: review.rating,
        text: review.text,
        date: review.date
      }]);
    } catch (err) {
      console.error("Error saving review to Supabase", err);
    }
  }, [currentUser]);

  const addClubReview = useCallback(async (clubId, rating, text) => {
    const userName = currentUser?.name || 'Visitor';
    const initials = userName.substring(0, 1).toUpperCase();
    const review = { clubId, user: userName, initials, rating, text, date: new Date().toISOString().split('T')[0] };
    
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
  }, [currentUser]);

  const clearAllData = useCallback(() => {
    setBookmarks([]); setMyMemberships([]); setUserReviews([]); setClubReviewsState([]);
    ['cc_bookmarks', 'cc_reviews', 'cc_club_reviews'].forEach(k => localStorage.removeItem(k));
  }, []);

  return (
    <AppContext.Provider value={{
      data: liveData, activeTab, setActiveTab,
      bookmarks, toggleBookmark,
      joinedClubs: myMemberships.map(m => m.club_id),
      myMemberships, toggleJoinClub,
      userReviews, addReview,
      clubReviews: clubReviewsState, addClubReview,
      toast, showToast, clearAllData, isLoadingData,
      currentUser, loginUser, logoutUser,
      isAdminView, setIsAdminView,
      sessionInitialized,
      isVisitor,
      setIsVisitor: handleSetIsVisitor
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
