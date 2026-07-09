import { Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <BlueprintBackground />
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 py-8 relative z-[1]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/community" element={<Community />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/visitor-guide" element={<VisitorGuide />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/profile" element={<Profile />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
