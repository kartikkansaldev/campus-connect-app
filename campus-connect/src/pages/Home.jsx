import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const playClick = () => {
  try {
    const audio = new Audio('/click.mp3');
    // If click.mp3 doesn't exist, this will fail silently. Alternatively we can use a synthesized beep.
    // Let's use a very short synthesized sound for guaranteed working without assets:
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error(e);
  }
};

/* ===== RICH COLORED Hand-Drawn Illustrations ===== */

function HeroIllustration() {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[52%] overflow-hidden" style={{ zIndex: 1 }}>
      <svg width="100%" height="100%" viewBox="0 0 360 340" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
        {/* ===== LARGE COMPASS — warm colored, prominent ===== */}
        <g transform="translate(195, 20)">
          {/* Outer decorative ring */}
          <circle cx="60" cy="60" r="58" stroke="#B5AA96" strokeWidth="0.8" opacity="0.3" />
          {/* Main outer ring */}
          <circle cx="60" cy="60" r="52" stroke="#7A6E58" strokeWidth="2" fill="#F5F0E4" opacity="0.6" />
          <circle cx="60" cy="60" r="46" stroke="#A09580" strokeWidth="1.2" opacity="0.5" />
          <circle cx="60" cy="60" r="38" stroke="#C4B8A0" strokeWidth="0.7" opacity="0.4" />
          <circle cx="60" cy="60" r="30" stroke="#D4C8B0" strokeWidth="0.5" opacity="0.3" />
          {/* Degree marks — 36 marks around the circle */}
          {Array.from({length:72},(_, i) => {
            const angle = i * 5;
            const isMajor = angle % 90 === 0;
            const isMid = angle % 45 === 0 && !isMajor;
            const len = isMajor ? 8 : isMid ? 5 : 2;
            const sw = isMajor ? 1.8 : isMid ? 1 : 0.4;
            const op = isMajor ? 0.7 : isMid ? 0.5 : 0.3;
            return <line key={angle} x1="60" y1={8 + (isMajor ? 0 : isMid ? 2 : 4)} x2="60" y2={8 + len}
              stroke="#5C5647" strokeWidth={sw} opacity={op} transform={`rotate(${angle} 60 60)`} />;
          })}
          {/* Compass needle — RED north */}
          <polygon points="60,14 54,58 60,50 66,58" fill="#B53A1A" opacity="0.85" />
          <polygon points="60,106 54,62 60,70 66,62" fill="#5C5647" opacity="0.5" />
          {/* Needle shadow */}
          <polygon points="62,16 56,60 62,52 68,60" fill="#000" opacity="0.04" />
          {/* Center hub */}
          <circle cx="60" cy="60" r="6" fill="#EDE5D4" stroke="#7A6E58" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="3" fill="#B53A1A" opacity="0.7" />
          <circle cx="60" cy="60" r="1.2" fill="#FFF" opacity="0.6" />
          {/* Cardinal labels — bold */}
          <text x="56" y="26" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#3C3528" opacity="0.85">N</text>
          <text x="96" y="64" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#5C5647" opacity="0.6">E</text>
          <text x="57" y="100" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#5C5647" opacity="0.6">S</text>
          <text x="18" y="64" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#5C5647" opacity="0.6">W</text>
          {/* Intermediate labels */}
          <text x="84" y="36" fontSize="5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.4">NE</text>
          <text x="84" y="90" fontSize="5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.4">SE</text>
          <text x="28" y="90" fontSize="5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.4">SW</text>
          <text x="28" y="36" fontSize="5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.4">NW</text>
        </g>

        {/* ===== TOPOGRAPHIC CAMPUS MAP — rich detail ===== */}
        <g transform="translate(10, 125)">
          {/* Terrain fill area */}
          <path d="M 0 180 C 20 160 50 170 80 150 S 130 120 170 130 S 220 110 260 120 S 310 100 350 90 L 350 200 L 0 200 Z"
            fill="#E8E0D0" opacity="0.15" />

          {/* Main road — thick warm brown */}
          <path d="M 0 170 C 30 145 70 160 100 135 S 150 100 190 115 S 240 85 280 95 S 320 70 355 55"
            stroke="#8B6E40" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
          {/* Road edge lines */}
          <path d="M 0 167 C 30 142 70 157 100 132 S 150 97 190 112 S 240 82 280 92 S 320 67 355 52"
            stroke="#A08860" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
          <path d="M 0 173 C 30 148 70 163 100 138 S 150 103 190 118 S 240 88 280 98 S 320 73 355 58"
            stroke="#A08860" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />

          {/* Secondary roads */}
          <path d="M 5 185 C 35 165 65 175 90 155 S 125 130 155 140 S 195 120 225 128"
            stroke="#A08860" strokeWidth="1.8" opacity="0.4" strokeLinecap="round" />
          <path d="M 100 135 C 115 115 135 105 155 100" stroke="#B5A080" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          <path d="M 190 115 C 205 100 220 90 240 95" stroke="#B5A080" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
          {/* Small path */}
          <path d="M 280 95 C 290 110 300 120 320 130" stroke="#C4B090" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" strokeDasharray="4 3" />

          {/* Contour lines — topographic */}
          <path d="M 20 110 C 55 100 90 112 125 95 S 180 80 215 90 S 260 75 295 82" stroke="#D4C4A0" strokeWidth="0.6" opacity="0.3" strokeDasharray="5 3" />
          <path d="M 30 125 C 60 115 95 125 130 110 S 175 95 210 105" stroke="#D4C4A0" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 3" />
          <path d="M 40 140 C 65 132 95 140 120 128" stroke="#D4C4A0" strokeWidth="0.4" opacity="0.2" strokeDasharray="3 3" />

          {/* Building footprints — filled, warm tones */}
          <rect x="85" y="75" width="28" height="20" rx="3" fill="#E5DCC8" stroke="#7A6E58" strokeWidth="1.2" opacity="0.6" />
          <rect x="88" y="78" width="6" height="6" rx="1" fill="#D5CDB8" stroke="#7A6E58" strokeWidth="0.4" opacity="0.3" />
          <rect x="155" y="58" width="35" height="24" rx="3" fill="#E5DCC8" stroke="#7A6E58" strokeWidth="1.2" opacity="0.55" />
          <rect x="160" y="62" width="8" height="6" rx="1" fill="#D5CDB8" stroke="#7A6E58" strokeWidth="0.4" opacity="0.3" />
          <rect x="175" y="66" width="6" height="5" rx="1" fill="#D5CDB8" stroke="#7A6E58" strokeWidth="0.4" opacity="0.25" />
          <rect x="248" y="48" width="26" height="18" rx="2.5" fill="#E5DCC8" stroke="#7A6E58" strokeWidth="1" opacity="0.5" />
          <rect x="40" y="130" width="20" height="15" rx="2" fill="#E5DCC8" stroke="#7A6E58" strokeWidth="0.9" opacity="0.45" />
          <rect x="310" y="80" width="24" height="17" rx="2" fill="#E5DCC8" stroke="#7A6E58" strokeWidth="0.8" opacity="0.4" />

          {/* Trees — olive green with fills */}
          <circle cx="60" cy="90" r="8" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.9" opacity="0.5" />
          <circle cx="75" cy="100" r="6" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.7" opacity="0.4" />
          <circle cx="130" cy="115" r="7" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.8" opacity="0.45" />
          <circle cx="210" cy="75" r="9" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.9" opacity="0.45" />
          <circle cx="285" cy="65" r="6" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.7" opacity="0.4" />
          <circle cx="145" cy="145" r="7" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.7" opacity="0.35" />
          <circle cx="240" cy="108" r="5" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.6" opacity="0.35" />
          <circle cx="330" cy="100" r="6" fill="#C8D8B0" stroke="#6B7F4A" strokeWidth="0.7" opacity="0.3" />

          {/* Location markers — terracotta red */}
          <g transform="translate(91, 60)" opacity="0.7">
            <path d="M 6 0 C 6 -4.5 9.5 -8 14 -8 S 22 -4.5 22 0 C 22 6 14 12 14 12 S 6 6 6 0 Z" fill="#E8D0C4" stroke="#B53A1A" strokeWidth="1.3" />
            <circle cx="14" cy="0" r="3" fill="#B53A1A" opacity="0.5" />
          </g>
          <g transform="translate(160, 44)" opacity="0.6">
            <path d="M 5 0 C 5 -3.5 7.5 -6 11 -6 S 17 -3.5 17 0 C 17 5 11 9 11 9 S 5 5 5 0 Z" fill="#E8D0C4" stroke="#B53A1A" strokeWidth="1.1" />
            <circle cx="11" cy="0" r="2.5" fill="#B53A1A" opacity="0.45" />
          </g>
          <g transform="translate(250, 34)" opacity="0.5">
            <path d="M 4 0 C 4 -3 6 -5 9 -5 S 14 -3 14 0 C 14 4 9 7.5 9 7.5 S 4 4 4 0 Z" fill="#E8D0C4" stroke="#B53A1A" strokeWidth="1" />
            <circle cx="9" cy="0" r="2" fill="#B53A1A" opacity="0.4" />
          </g>

          {/* Technical coordinate annotation */}
          <text x="285" y="110" fontSize="5.5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.45">N 28°36'50"</text>
          <text x="285" y="118" fontSize="5.5" fontFamily="Space Grotesk" fill="#8B8578" opacity="0.45">E 77°12'32"</text>

          {/* Scale bar */}
          <g transform="translate(10, 195)" opacity="0.3">
            <line x1="0" y1="0" x2="50" y2="0" stroke="#5C5647" strokeWidth="1" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#5C5647" strokeWidth="0.8" />
            <line x1="25" y1="-2" x2="25" y2="2" stroke="#5C5647" strokeWidth="0.5" />
            <line x1="50" y1="-3" x2="50" y2="3" stroke="#5C5647" strokeWidth="0.8" />
            <text x="0" y="8" fontSize="4" fontFamily="Space Grotesk" fill="#5C5647">0</text>
            <text x="42" y="8" fontSize="4" fontFamily="Space Grotesk" fill="#5C5647">100m</text>
          </g>
        </g>

        {/* Decorative drafting circles */}
        <circle cx="190" cy="50" r="14" stroke="#C4B8A0" strokeWidth="0.5" opacity="0.2" fill="none" />
        <circle cx="190" cy="50" r="8" stroke="#C4B8A0" strokeWidth="0.3" opacity="0.15" fill="none" />
        <circle cx="340" cy="170" r="10" stroke="#C4B8A0" strokeWidth="0.4" opacity="0.18" fill="none" />
      </svg>
    </div>
  );
}

/* ===== STAT CARD ICONS — warm, filled, detailed ===== */

function IconBuilding() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base platform */}
      <rect x="6" y="39" width="40" height="4" rx="1.5" fill="#D4C8B0" opacity="0.5" />
      {/* Main building body */}
      <path d="M 9 39 L 9 17 L 26 6 L 43 17 L 43 39" fill="#EDE5D4" stroke="#4A4035" strokeWidth="1.8" strokeLinejoin="round" opacity="0.8" />
      {/* Pediment fill */}
      <path d="M 9 17 L 26 6 L 43 17 Z" fill="#E0D8C4" stroke="none" opacity="0.5" />
      {/* Entablature */}
      <rect x="9" y="15.5" width="34" height="3" fill="#D4C8B0" stroke="#4A4035" strokeWidth="0.6" opacity="0.5" />
      {/* Pillars */}
      <rect x="14" y="18" width="3" height="21" fill="#F0E8D8" stroke="#4A4035" strokeWidth="0.8" opacity="0.55" rx="0.5" />
      <rect x="21" y="18" width="3" height="21" fill="#F0E8D8" stroke="#4A4035" strokeWidth="0.8" opacity="0.55" rx="0.5" />
      <rect x="28" y="18" width="3" height="21" fill="#F0E8D8" stroke="#4A4035" strokeWidth="0.8" opacity="0.55" rx="0.5" />
      <rect x="35" y="18" width="3" height="21" fill="#F0E8D8" stroke="#4A4035" strokeWidth="0.8" opacity="0.55" rx="0.5" />
      {/* Pediment circle ornament */}
      <circle cx="26" cy="12" r="3" fill="#D4C8B0" stroke="#4A4035" strokeWidth="0.7" opacity="0.45" />
      {/* Door */}
      <rect x="22" y="29" width="8" height="10" rx="4" fill="#C4B8A0" stroke="#4A4035" strokeWidth="0.7" opacity="0.5" />
      {/* Steps */}
      <line x1="18" y1="39" x2="34" y2="39" stroke="#4A4035" strokeWidth="0.5" opacity="0.3" />
      <line x1="16" y1="41" x2="36" y2="41" stroke="#4A4035" strokeWidth="0.4" opacity="0.25" />
    </svg>
  );
}

function IconPlateFood() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plate — warm beige with rim */}
      <ellipse cx="26" cy="29" rx="17" ry="15" fill="#F0E8D8" opacity="0.6" />
      <ellipse cx="26" cy="29" rx="17" ry="15" stroke="#4A4035" strokeWidth="1.6" opacity="0.6" fill="none" />
      <ellipse cx="26" cy="29" rx="13" ry="11" stroke="#D4C8B0" strokeWidth="0.8" opacity="0.4" fill="none" />
      <ellipse cx="26" cy="29" rx="8.5" ry="7" stroke="#E0D8C4" strokeWidth="0.5" opacity="0.3" fill="none" />
      {/* Food items — colored */}
      <ellipse cx="22" cy="26" rx="6" ry="4" fill="#C07A3A" opacity="0.45" />
      <ellipse cx="22" cy="26" rx="6" ry="4" stroke="#8B5A28" strokeWidth="0.5" opacity="0.3" fill="none" />
      <ellipse cx="30" cy="28" rx="5" ry="3.5" fill="#6B7F4A" opacity="0.4" />
      <circle cx="26" cy="32" r="3" fill="#A63D2F" opacity="0.35" />
      <circle cx="20" cy="30" r="2" fill="#C4A040" opacity="0.3" />
      {/* Fork — detailed */}
      <g opacity="0.6" stroke="#4A4035" strokeLinecap="round">
        <line x1="7" y1="8" x2="7" y2="26" strokeWidth="1.3" />
        <line x1="5" y1="8" x2="5" y2="15" strokeWidth="0.9" />
        <line x1="9" y1="8" x2="9" y2="15" strokeWidth="0.9" />
        <line x1="7" y1="8" x2="7" y2="15" strokeWidth="0.6" />
        <line x1="5" y1="15" x2="9" y2="15" strokeWidth="0.8" />
      </g>
      {/* Knife — detailed */}
      <g opacity="0.6" stroke="#4A4035" strokeLinecap="round">
        <line x1="45" y1="8" x2="45" y2="26" strokeWidth="1.3" />
        <path d="M 45 8 C 47.5 9.5 48.5 13 47.5 17 L 45 17" strokeWidth="0.9" fill="#E8E0D0" fillOpacity="0.3" />
      </g>
    </svg>
  );
}

function IconClubPeople() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center person — green shirt */}
      <circle cx="26" cy="14" r="6" fill="#EDE5D4" stroke="#4A4035" strokeWidth="1.4" opacity="0.75" />
      <path d="M 15 44 C 15 32 20 26 26 26 S 37 32 37 44" fill="#A8C8A0" opacity="0.5" stroke="#4A4035" strokeWidth="1.3" />
      {/* Left person — blue shirt */}
      <circle cx="11" cy="17" r="4.5" fill="#EDE5D4" stroke="#4A4035" strokeWidth="1" opacity="0.6" />
      <path d="M 3 44 C 3 35 6 29 11 29 S 18 34 19 37" fill="#A0B8D0" opacity="0.4" stroke="#4A4035" strokeWidth="1" />
      {/* Right person — warm shirt */}
      <circle cx="41" cy="17" r="4.5" fill="#EDE5D4" stroke="#4A4035" strokeWidth="1" opacity="0.6" />
      <path d="M 33 37 C 34 34 37 29 41 29 S 49 35 49 44" fill="#D8C8A8" opacity="0.4" stroke="#4A4035" strokeWidth="1" />
      {/* Back row people — smaller, muted */}
      <circle cx="18" cy="11" r="3" fill="#E0D8C4" stroke="#4A4035" strokeWidth="0.7" opacity="0.35" />
      <circle cx="34" cy="11" r="3" fill="#E0D8C4" stroke="#4A4035" strokeWidth="0.7" opacity="0.35" />
      {/* Connection dots */}
      <circle cx="18" cy="32" r="1" fill="#4A4035" opacity="0.15" />
      <circle cx="34" cy="32" r="1" fill="#4A4035" opacity="0.15" />
    </svg>
  );
}

function IconGraduate() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap — dark navy colored */}
      <polygon points="26,6 4,18 26,30 48,18" fill="#3C4A5C" opacity="0.5" stroke="#2C3038" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Cap top highlight */}
      <polygon points="26,8 10,18 26,27 42,18" fill="#4A5A6C" opacity="0.2" />
      {/* Body/gown */}
      <path d="M 13 23 L 13 36 C 13 40 18 44 26 44 S 39 40 39 36 L 39 23" fill="#E8E0D0" opacity="0.45" stroke="#2C3038" strokeWidth="1.2" />
      {/* Tassel — orange/gold */}
      <line x1="48" y1="18" x2="48" y2="34" stroke="#C07A3A" strokeWidth="1.5" opacity="0.65" />
      <circle cx="48" cy="35" r="2.5" fill="#C07A3A" opacity="0.55" />
      <line x1="46" y1="38" x2="48" y2="35" stroke="#C07A3A" strokeWidth="0.8" opacity="0.4" />
      <line x1="50" y1="38" x2="48" y2="35" stroke="#C07A3A" strokeWidth="0.8" opacity="0.4" />
      {/* Face */}
      <circle cx="26" cy="37" r="4" fill="#EDE5D4" stroke="#2C3038" strokeWidth="0.8" opacity="0.4" />
      {/* Scroll/diploma in hand */}
      <rect x="32" y="38" width="8" height="3" rx="1.5" fill="#F0E8D8" stroke="#2C3038" strokeWidth="0.5" opacity="0.35" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 1 C 4.7 1 2 3.7 2 7 C 2 11.5 8 15 8 15 S 14 11.5 14 7 C 14 3.7 11.3 1 8 1 Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="8" cy="7" r="2.2" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function IconUtensils() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="3" y1="2" x2="3" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="7" y1="2" x2="7" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="3" y1="7" x2="7" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="2" x2="12" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 12 2 C 14 3 14.5 5.5 13.5 7.5 L 12 7.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ===== Sub-Components ===== */
function CrowdBadge({ level }) {
  const cls = level === 'low' ? 'badge-chill' : level === 'moderate' ? 'badge-moderate' : 'badge-busy';
  const label = level === 'low' ? 'CHILL' : level === 'moderate' ? 'MODERATE' : 'BUSY';
  return <span className={cls}>{label}</span>;
}

function CapacityBar({ level }) {
  const pct = level === 'low' ? 25 : level === 'moderate' ? 55 : 85;
  const color = level === 'low' ? 'bg-[var(--color-green)]' : level === 'moderate' ? 'bg-[var(--color-orange)]' : 'bg-[var(--color-red)]';
  return (
    <div className="capacity-bar mt-3">
      <div className={`capacity-bar-fill ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function getNow() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  return `${h > 12 ? h - 12 : h}:${m} ${ampm}`;
}

/* ===== Main Component ===== */
export default function Home() {
  const { data } = useApp();
  const navigate = useNavigate();
  
  const [trendingPosts, setTrendingPosts] = useState([]);
  
  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data: posts, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('likes_count', { ascending: false })
          .limit(3);
        if (!error && posts) setTrendingPosts(posts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTrending();
  }, []);

  const foodPlaces = data.places.filter(p => p.category === 'food').slice(0, 2);
  const timeNow = getNow();
  
  // Real Data Fetching from AppContext
  const upcomingEvent = data.clubs.flatMap(c => c.events).sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  const topAnnouncement = data.announcements[0];

  const handleNav = (path) => {
    playClick();
    navigate(path);
  };

  const quickAccess = [
    { icon: '🧭', label: 'Explore', path: '/explore', bg: '#EDE5D4' },
    { icon: '🎯', label: 'Campus Life', path: '/campus-life', bg: '#E0EAD8' },
    { icon: '💬', label: 'Community', path: '/community', bg: '#E4DDF0' },
    { icon: '🎓', label: 'Academics', path: '/academics', bg: '#F0E5D0' },
    { icon: '🌍', label: 'Visitor Guide', path: '/visitor-guide', bg: '#E2EAEF' }
  ];

  const capacityInfo = {
    high: { text: '78% capacity', waitDir: '↓' },
    low: { text: '| 312 / 400 people', waitDir: '↗' },
    moderate: { text: '43% / 400 people', waitDir: '↗' },
  };

  return (
    <div className="space-y-7 animate-in">
      {/* Section Title */}
      <h2 className="text-[1.05rem] font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
        Chitkara University Live Activity Feed
      </h2>

      {/* Hero + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hero Card */}
        <div className="lg:col-span-2 neo-card-static p-7 pb-8 relative overflow-hidden min-h-[330px]">
          <HeroIllustration />
          <div className="relative z-10 max-w-[55%]">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border mb-5"
              style={{
                background: 'var(--color-green-bg)',
                color: 'var(--color-green)',
                borderColor: 'var(--color-green)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.8px',
              }}
            >
              ✦ Chitkara UNIVERSITY
            </span>
            <h1 className="text-[2.2rem] font-extrabold leading-[1.08] mb-0.5" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              Navigate campus.
            </h1>
            <h1 className="text-[2.2rem] font-extrabold leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', letterSpacing: '-0.03em' }}>
              Skip the queues.
            </h1>
            <p className="text-[12.5px] leading-[1.65] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Real-time rush of food outlets, walking directions between buildings, {data.clubs.length} clubs to discover, and a personal assistant that actually knows the campus.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary" onClick={() => handleNav('/explore')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.8px' }}>Explore Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 content-start">
          <h3 className="col-span-full text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1 font-mono">Quick Access</h3>
          {quickAccess.map((item, i) => (
            <div 
              key={i} 
              onClick={() => handleNav(item.path)}
              className="neo-card-static p-3 flex items-center gap-3 cursor-pointer hover:bg-[var(--color-card)] transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform" style={{ background: item.bg }}>
                {item.icon}
              </div>
              <div className="text-[13px] font-extrabold tracking-tight font-heading leading-tight flex-1 group-hover:text-[var(--color-accent)] transition-colors">
                {item.label}
              </div>
              <svg className="w-4 h-4 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Home Feed Section */}
      <div className="mt-8">
        <h3 className="text-xl font-extrabold tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Home Feed
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Trending */}
          <div className="neo-card-static p-5 row-span-2">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-accent)] font-bold text-sm uppercase tracking-wider font-mono">
              <span>🔥</span> Trending
            </div>
            <div className="space-y-4">
              {trendingPosts.length > 0 ? trendingPosts.map((post, i) => (
                <div key={i} className="border-b border-[var(--color-border-light)] pb-3 last:border-0 cursor-pointer group" onClick={() => handleNav('/community')}>
                  <p className="font-semibold text-sm leading-tight mb-1 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{post.content}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{post.likes_count} likes • {post.category}</p>
                </div>
              )) : (
                <div className="text-sm text-[var(--color-text-muted)] italic">Loading trending posts...</div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="neo-card-static p-5">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-orange)] font-bold text-sm uppercase tracking-wider font-mono">
              <span>🎉</span> Upcoming Events
            </div>
            <div className="flex flex-col gap-3">
              {upcomingEvent ? (
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--color-orange-bg)] text-[var(--color-orange)] w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 leading-none">
                    <span className="text-[10px] font-bold uppercase">{new Date(upcomingEvent.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-black font-heading">{new Date(upcomingEvent.date).getDate()}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight line-clamp-1">{upcomingEvent.title}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">{upcomingEvent.location} • {upcomingEvent.time}</p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-[var(--color-text-muted)] italic">No upcoming events.</div>
              )}
            </div>
            <button onClick={() => handleNav('/campus-life')} className="w-full mt-4 py-2 border-2 border-[var(--color-border)] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-card)] transition-colors cursor-pointer">
              View All Events
            </button>
          </div>

          {/* Announcements */}
          <div className="neo-card-static p-5 bg-[var(--color-card)]">
             <div className="flex items-center gap-2 mb-3 text-[var(--color-text)] font-bold text-sm uppercase tracking-wider font-mono">
              <span>📢</span> Announcements
            </div>
            {topAnnouncement ? (
              <>
                <p className="text-sm font-medium leading-relaxed mb-3 line-clamp-3">{topAnnouncement.text}</p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono uppercase">By Admin • {topAnnouncement.date}</p>
              </>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)] italic">No recent announcements.</p>
            )}
          </div>

          {/* Popular Food (Repurposing Busy Right Now) */}
          <div className="neo-card-static p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-green)] font-bold text-sm uppercase tracking-wider font-mono">
              <span>🍔</span> Popular Food Spots
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {foodPlaces.map((place, i) => (
                <div key={i} className="border-2 border-[var(--color-border)] rounded-xl p-3 bg-white cursor-pointer hover:border-[var(--color-green)] transition-colors" onClick={() => handleNav('/explore?cat=food')}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm line-clamp-1">{place.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-green-bg)] text-[var(--color-green)] font-bold uppercase shrink-0">Open</span>
                  </div>
                  <div className="text-[9px] mt-2 tracking-wide" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    last updated {timeNow}
                  </div>
                </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.3px' }}>
          Campus Connect | Chitkara University © 2026 | support@campusconnect.edu
        </p>
      </footer>
    </div>
  );
}
