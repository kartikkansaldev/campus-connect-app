import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-[2.5px] border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center" style={{ background: 'var(--color-card)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>Campus</div>
                <div className="text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>Connect</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
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

          {/* Auth / Profile & Mobile Menu Button */}
          <div className="flex-1 flex justify-end items-center gap-3 shrink-0">
            <div className="desktop-nav flex items-center">
              <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
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
