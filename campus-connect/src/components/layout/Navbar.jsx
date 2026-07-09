import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/campus-life', label: 'Campus Life' },
  { path: '/community', label: 'Community' },
  { path: '/academics', label: 'Academics' },
  { path: '/visitor-guide', label: 'Visitor Guide' },
  { path: '/ai', label: 'AI' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logoutUser, isAdminView, setIsAdminView } = useApp();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b-[2.5px] border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/images/logo.png" alt="Campus Connect Logo" className="w-10 h-10 rounded-md object-contain border-[1.5px] border-[var(--color-border)] shadow-sm" style={{ background: 'var(--color-card)' }} />
              <div className="leading-none">
                <div className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>Campus</div>
                <div className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>Connect</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav (Hidden in Admin View) */}
          {!isAdminView && (
            <nav className="desktop-nav flex items-center justify-center gap-1 xl:gap-2 shrink-0">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-full text-sm xl:text-base transition-all duration-150 whitespace-nowrap`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      ...(isActive
                        ? { background: 'var(--color-border)', color: '#fff', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.8px' }
                        : { color: 'var(--color-text-secondary)', fontWeight: 600 }
                      ),
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Auth / Profile & Mobile Menu Button */}
          <div className="flex-1 flex justify-end items-center gap-3 shrink-0">
            {currentUser?.role === 'club_admin' && (
              <button 
                onClick={() => {
                  if (isAdminView) {
                    setIsAdminView(false);
                    navigate('/');
                  } else {
                    setIsAdminView(true);
                    navigate('/admin-dashboard');
                  }
                }}
                className={`hidden md:flex px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border-2 border-[var(--color-border)] transition-all ${isAdminView ? 'bg-[var(--color-accent)] text-white shadow-[2px_2px_0_0_var(--color-border)]' : 'bg-white text-[var(--color-text)] hover:bg-[var(--color-card)]'}`}
              >
                {isAdminView ? 'Admin View Active' : 'Switch to Admin'}
              </button>
            )}

            <div className="desktop-nav flex items-center gap-2">
              {currentUser ? (
                <>
                  <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-[var(--color-card)] rounded-md border-2 border-[var(--color-border)]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 underline underline-offset-2">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-[var(--color-accent)] text-white rounded-md border-2 border-[var(--color-border)] hover:bg-[var(--color-accent-hover)] transition-colors shadow-[2px_2px_0_0_var(--color-border)]">
                  Login
                </Link>
              )}
            </div>

            <button className="mobile-menu-btn hidden items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--color-border)] cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-30 pt-20 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
          <nav className="flex flex-col gap-2">
            {!isAdminView && navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-left px-4 py-3 rounded-xl text-lg font-semibold transition-all`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    ...(isActive
                      ? { background: 'var(--color-border)', color: '#fff' }
                      : { color: 'var(--color-text-secondary)' }
                    ),
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <div className="mt-4 pt-4 border-t-2 border-[var(--color-border)]">
              {currentUser?.role === 'club_admin' && (
                <button 
                  onClick={() => { 
                    if (isAdminView) {
                      setIsAdminView(false);
                      navigate('/');
                    } else {
                      setIsAdminView(true);
                      navigate('/admin-dashboard');
                    }
                    setMobileOpen(false); 
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-lg font-semibold bg-[var(--color-accent)] text-white mb-2"
                >
                  {isAdminView ? 'Switch to Student View' : 'Switch to Admin View'}
                </button>
              )}
              {currentUser ? (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-lg font-semibold text-red-500">
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-lg font-semibold bg-[var(--color-accent)] text-white">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
