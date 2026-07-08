import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/campus-life', label: 'Campus Life' },
  { path: '/community', label: 'Community' },
  { path: '/academics', label: 'Academics' },
  { path: '/visitor-guide', label: 'Visitor Guide' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 z-40 border-b-[2.5px] border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center" style={{ background: 'var(--color-card)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>Campus</div>
              <div className="text-xs font-semibold tracking-[1.5px] uppercase" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>Connect</div>
            </div>
          </Link>

          {/* Global AI Search - Centered */}
          <div className="hidden lg:flex flex-1 max-w-[480px]">
            <div className="relative w-full flex items-center">
              <div className="absolute left-3 text-[var(--color-text-muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask AI... (e.g. 'Where is the Robotics Club?')"
                className="w-full h-10 pl-10 pr-4 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] text-sm font-medium font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)]"
              />
              <div className="absolute right-3 px-1.5 py-0.5 rounded border border-[var(--color-border-light)] text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider bg-[var(--color-bg)] shadow-[1px_1px_0_0_var(--color-border-light)] pointer-events-none">
                Ctrl K
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav flex items-center gap-1 xl:gap-2 shrink-0">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-sm xl:text-base transition-all duration-150 whitespace-nowrap`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    ...(isActive
                      ? { background: 'var(--color-border)', color: '#fff', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }
                      : { color: 'var(--color-text-secondary)', fontWeight: 600 }
                    ),
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth / Profile */}
          <div className="desktop-nav flex items-center gap-3 shrink-0">
            <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn hidden items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--color-border)] cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-30 pt-20 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="mb-6 relative w-full flex items-center">
             <div className="absolute left-3 text-[var(--color-text-muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask AI..."
                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] text-base font-medium font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)]"
              />
          </div>
          <nav className="flex flex-col gap-2">
            {[...navItems, { path: '/profile', label: 'Profile' }].map(item => {
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
          </nav>
        </div>
      )}
    </>
  );
}
