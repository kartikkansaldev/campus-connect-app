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
import { useApp } from './context/AppContext';

// Guard for authenticated pages
function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, sessionInitialized } = useApp();
  
  if (!sessionInitialized) return null; // Wait for auth to load
  
  // If not logged in at all (visitor or logged out), redirect to login
  if (!currentUser) {
    // If they are specifically a visitor they should be able to view regular pages.
    // However, if requireAdmin is true, visitors should not see it.
    if (requireAdmin) return <Navigate to="/login" replace />;
    return children;
  }

  // If requires admin, check role
  if (requireAdmin && currentUser.role !== 'club_admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/onboarding';
  const { isAdminView } = useApp();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <BlueprintBackground />
      {!isAuthPage && <Navbar />}
      
      {/* Main content wrapper */}
      <main className={`mx-auto relative z-[1] ${isAuthPage ? '' : 'max-w-[1400px] px-6 py-8'}`}>
        <Routes>
          {/* Auth Routes */}
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
      </main>
    </div>
  );
}
