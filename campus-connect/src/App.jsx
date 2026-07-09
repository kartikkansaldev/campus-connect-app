import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BlueprintBackground from './components/BlueprintBackground';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CampusLife from './pages/CampusLife';
import Community from './pages/Community';
import Academics from './pages/Academics';
import VisitorGuide from './pages/VisitorGuide';
import Profile from './pages/Profile';
import AI from './pages/AI';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import AdminDashboard from './pages/AdminDashboard';
import CampusSelect from './pages/CampusSelect';
import { useApp } from './context/AppContext';

// Guard for authenticated pages
function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser } = useApp();
  
  if (requireAdmin && currentUser?.role !== 'club_admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Global Guard to enforce Campus -> Login -> App flow
function GlobalGuard({ children }) {
  const { sessionInitialized, currentUser, isVisitor } = useApp();
  const location = useLocation();
  
  if (!sessionInitialized) return null; // Wait for auth to load

  const hasCampus = !!localStorage.getItem('cc_campus');
  const path = location.pathname;

  // 1. Must select campus first
  if (!hasCampus && path !== '/campus-select') {
    return <Navigate to="/campus-select" replace />;
  }

  // 2. If campus selected, but not logged in and not visitor -> force login
  if (hasCampus && !currentUser && !isVisitor && path !== '/login' && path !== '/onboarding' && path !== '/campus-select') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/onboarding' || location.pathname === '/campus-select';
  const { isAdminView } = useApp();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <BlueprintBackground />
      {!isAuthPage && <Navbar />}
      
      {/* Main content wrapper */}
      <main className={`mx-auto relative z-[1] ${isAuthPage ? '' : 'max-w-[1400px] px-3 sm:px-4 md:px-6 py-4 md:py-8'}`}>
        <GlobalGuard>
          <Routes>
            {/* Auth / Onboarding Routes */}
            <Route path="/campus-select" element={<CampusSelect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Regular Routes */}
          <Route path="/" element={isAdminView ? <Navigate to="/admin-dashboard" replace /> : <Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/community" element={<Community />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/visitor-guide" element={<VisitorGuide />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GlobalGuard>
      </main>
    </div>
  );
}
