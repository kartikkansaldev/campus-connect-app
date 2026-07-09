import React from 'react';

export default function BlueprintBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      
      {/* Layer 1: Fine paper grain texture & noise */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'multiply'
      }}></div>

      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="gridMinor" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#B0A898" strokeWidth="0.9" opacity="0.9" />
          </pattern>
          <pattern id="gridMajor" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M 140 0 L 0 0 0 140" fill="none" stroke="#8C8578" strokeWidth="1.5" opacity="0.9" />
          </pattern>
          <filter id="fadedInk">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
          </filter>
        </defs>

        {/* Layer 2 & 3: Primary and Minor Blueprint Grid */}
        <rect width="100%" height="100%" fill="url(#gridMinor)" />
        <rect width="100%" height="100%" fill="url(#gridMajor)" />

        {/* Layer 5: Blueprint Symbols (Drafting Crosses & Alignment Markers) */}
        <g stroke="#8B8272" strokeWidth="1.5" opacity="0.8">
          {Array.from({ length: 18 }).map((_, c) => 
            Array.from({ length: 10 }).map((_, r) => {
              if (c === 0 || r === 0) return null;
              const x = c * 140;
              const y = r * 140;
              return (
                <g key={`plus-${c}-${r}`}>
                  <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
                  <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
                </g>
              );
            })
          )}
        </g>

        {/* Engineering registration marks and border */}
        <g stroke="#A09585" opacity="0.7">
          <line x1="56" y1="0" x2="56" y2="100%" strokeWidth="2" />
          <line x1="0" y1="56" x2="100%" y2="56" strokeWidth="2" />
          <line x1="0" y1="896" x2="100%" y2="896" strokeWidth="2" />
          <line x1="1400" y1="0" x2="1400" y2="100%" strokeWidth="2" />
          
          {/* Measurement ticks */}
          {Array.from({ length: 60 }).map((_, i) => (
            <React.Fragment key={`tick-h-${i}`}>
              <line x1={i * 28} y1="56" x2={i * 28} y2="64" strokeWidth="1" />
              <line x1={i * 28} y1="888" x2={i * 28} y2="896" strokeWidth="1" />
            </React.Fragment>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <React.Fragment key={`tick-v-${i}`}>
              <line x1="56" y1={i * 28} x2="64" y2={i * 28} strokeWidth="1" />
              <line x1="1392" y1={i * 28} x2="1400" y2={i * 28} strokeWidth="1" />
            </React.Fragment>
          ))}
        </g>

        {/* Coordinate guides & numeric annotations */}
        <g fill="#8B8272" fontSize="9" fontFamily="Space Grotesk" fontWeight="600" opacity="0.6">
          <text x="40" y="145" transform="rotate(-90 40 145)">400</text>
          <text x="40" y="425" transform="rotate(-90 40 425)">200</text>
          <text x="40" y="705" transform="rotate(-90 40 705)">91</text>
          <text x="40" y="845" transform="rotate(-90 40 845)">46</text>

          <text x="285" y="45">200</text>
          <text x="565" y="45">400</text>
          <text x="845" y="45">600</text>
          <text x="1125" y="45">800</text>
        </g>

        {/* Layer 4: Campus Map (Bottom Right and sweeping across bottom) */}
        <g transform="translate(650, 450)" stroke="#2A241A" fill="none" opacity="0.85">
          {/* Winding roads & curved pathways */}
          <path d="M -600 250 C -400 280 -200 200 0 250 S 150 350 250 300 S 350 400 450 350 S 550 400 700 350" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M -400 250 C -300 210 -150 180 50 220 S 200 150 300 200 S 450 150 550 220 S 650 300 750 280" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 220 L 150 325" strokeWidth="2.5" />
          <path d="M 250 300 L 300 200 L 350 150" strokeWidth="2.5" />
          <path d="M 450 350 L 550 220" strokeWidth="2.5" />
          
          <path d="M -200 210 L -150 120 L -50 150 L 0 250" strokeWidth="1.5" strokeDasharray="8 4" />
          <path d="M 100 230 L 150 150 L 250 180" strokeWidth="1.5" />
          <path d="M 350 320 L 400 250 L 500 270" strokeWidth="1.5" />

          {/* Left Side Extruded Roads */}
          <path d="M -700 180 C -550 150 -450 220 -300 190 S -150 250 -50 180" strokeWidth="3" strokeLinecap="round" />
          <path d="M -650 320 C -500 350 -350 280 -200 330 S -50 260 100 310" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -450 150 L -350 280" strokeWidth="2" />
          <path d="M -250 180 L -150 350" strokeWidth="2" />

          {/* Campus blocks & building footprints */}
          <g strokeWidth="1.2">
            {/* Left Side Blocks */}
            <rect x="-620" y="200" width="45" height="30" rx="3" />
            <rect x="-560" y="210" width="55" height="40" rx="3" />
            <rect x="-480" y="180" width="35" height="50" rx="3" />
            <rect x="-380" y="240" width="60" height="35" rx="3" />
            <rect x="-300" y="220" width="40" height="45" rx="3" />
            <path d="M -250 280 L -200 300 L -220 350 L -270 330 Z" />
            
            {/* Middle/Right Blocks */}
            <rect x="-100" y="160" width="50" height="35" rx="3" />
            <rect x="-30" y="170" width="40" height="45" rx="3" />
            <rect x="20" y="140" width="60" height="40" rx="3" />
            
            <rect x="180" y="200" width="45" height="30" rx="3" />
            <rect x="235" y="220" width="35" height="50" rx="3" />
            <rect x="190" y="260" width="40" height="40" rx="3" />
            
            <rect x="350" y="220" width="60" height="40" rx="3" />
            <rect x="420" y="210" width="45" height="35" rx="3" />
            <rect x="360" y="270" width="50" height="30" rx="3" />
            
            <rect x="520" y="260" width="40" height="55" rx="3" />
            <rect x="575" y="280" width="65" height="45" rx="3" />
            <rect x="540" y="340" width="50" height="35" rx="3" />

            {/* Geometric blocks */}
            <path d="M 120 280 L 170 300 L 150 350 L 100 330 Z" />
            <path d="M 280 320 L 330 350 L 310 400 L 260 370 Z" />
            <path d="M 460 280 L 510 300 L 490 350 L 440 330 Z" />
          </g>

          {/* Map nodes and route lines */}
          <g strokeWidth="1" opacity="0.6">
            <circle cx="-450" cy="180" r="4" fill="#5C5040" />
            <circle cx="-250" cy="240" r="4" fill="#5C5040" />
            <path d="M -450 180 C -350 160 -300 200 -250 240" strokeDasharray="3 3" />

            <circle cx="20" cy="140" r="4" fill="#5C5040" />
            <circle cx="180" cy="200" r="4" fill="#5C5040" />
            <circle cx="350" cy="220" r="4" fill="#5C5040" />
            <path d="M 20 140 C 80 120 120 160 180 200 C 240 240 290 180 350 220" strokeDasharray="3 3" />
          </g>

          {/* Contour lines */}
          <g stroke="#4A4032" strokeWidth="1" strokeDasharray="5 4" opacity="0.85">
            <path d="M -500 180 C -300 220 -100 120 100 180 S 300 80 500 150 S 700 100 800 180" />
            <path d="M -480 195 C -280 235 -80 135 120 195 S 320 95 520 165 S 720 115 820 195" />
            <path d="M -460 210 C -260 250 -60 150 140 210 S 340 110 540 180 S 740 130 840 210" />
          </g>
        </g>

        {/* Layer 6 & 8: Corner Illustrations (Faded architectural sketches & Compass geometry) */}
        
        {/* Upper Left: Radial construction guides & Concentric circles */}
        <g transform="translate(140, 140)" stroke="#2A241A" fill="none" opacity="0.6">
          <circle cx="0" cy="0" r="80" strokeWidth="1" />
          <circle cx="0" cy="0" r="70" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="40" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="15" strokeWidth="0.8" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`radial-ul-${i}`} x1="0" y1="0" x2="100" y2="0" strokeWidth="0.5" strokeDasharray="4 4" transform={`rotate(${i * 30})`} />
          ))}
          <rect x="-30" y="-30" width="60" height="60" strokeWidth="0.8" transform="rotate(45)" />
        </g>

        {/* Upper Right: Navigation rings & Drafting arcs */}
        <g transform="translate(1150, 150)" stroke="#2A241A" fill="none" opacity="0.6">
          <circle cx="0" cy="0" r="100" strokeWidth="1" />
          <circle cx="0" cy="0" r="95" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="75" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="0" cy="0" r="50" strokeWidth="1" />
          <line x1="-120" y1="0" x2="120" y2="0" strokeWidth="0.8" />
          <line x1="0" y1="-120" x2="0" y2="120" strokeWidth="0.8" />
          <line x1="-80" y1="-80" x2="80" y2="80" strokeWidth="0.5" />
          <line x1="80" y1="-80" x2="-80" y2="80" strokeWidth="0.5" />
          <path d="M 50 0 A 50 50 0 0 1 0 50" strokeWidth="2" opacity="0.5" />
          <path d="M 0 -75 A 75 75 0 0 1 75 0" strokeWidth="2" opacity="0.5" />
        </g>

        {/* Bottom Left: Map geometry & Road network */}
        <g transform="translate(200, 750)" stroke="#2A241A" fill="none" opacity="0.65">
          <path d="M -150 0 C -50 -40 50 40 150 0 S 250 -80 350 -40" strokeWidth="3.5" />
          <path d="M -120 -30 C -20 -70 80 10 180 -30 S 280 -110 380 -70" strokeWidth="2" />
          <circle cx="150" cy="0" r="8" fill="#5C5040" opacity="0.3" />
          <circle cx="250" cy="-60" r="8" fill="#5C5040" opacity="0.3" />
          <circle cx="50" cy="-10" r="8" fill="#5C5040" opacity="0.3" />
          <line x1="150" y1="0" x2="150" y2="60" strokeWidth="1.5" />
          <line x1="250" y1="-60" x2="250" y2="0" strokeWidth="1.5" />
          <line x1="50" y1="-10" x2="50" y2="50" strokeWidth="1.5" />
        </g>

        {/* Bottom Right: Technical map & Drafting curves */}
        <g transform="translate(1150, 750)" stroke="#2A241A" fill="none" opacity="0.65">
          <circle cx="0" cy="0" r="120" strokeWidth="0.8" strokeDasharray="5 5" />
          <circle cx="0" cy="0" r="60" strokeWidth="0.5" />
          <line x1="-150" y1="0" x2="150" y2="0" strokeWidth="0.8" />
          <line x1="0" y1="-150" x2="0" y2="150" strokeWidth="0.8" />
          <rect x="30" y="-60" width="45" height="30" strokeWidth="1.5" rx="2" />
          <rect x="90" y="-30" width="55" height="40" strokeWidth="1.5" rx="2" />
          <rect x="40" y="20" width="35" height="35" strokeWidth="1.5" rx="2" />
          <path d="M -120 50 C -50 80 0 120 80 80" strokeWidth="2" />
        </g>

        {/* Layer 7: Technical annotations, dimension lines, and architectural symbols */}
        <g stroke="#8B8272" fill="none" strokeWidth="1" opacity="0.55">
          {/* Detail circles */}
          <circle cx="450" cy="220" r="12" />
          <circle cx="450" cy="220" r="3" fill="#8B8272" />
          <text x="468" y="224" fontSize="10" fontFamily="Space Grotesk" fontWeight="600" fill="#8B8272">DETAIL A</text>
          <line x1="458" y1="220" x2="465" y2="220" strokeWidth="0.8" />

          <circle cx="950" cy="180" r="12" />
          <circle cx="950" cy="180" r="3" fill="#8B8272" />
          <text x="968" y="184" fontSize="10" fontFamily="Space Grotesk" fontWeight="600" fill="#8B8272">DETAIL B</text>
          <line x1="958" y1="180" x2="965" y2="180" strokeWidth="0.8" />

          {/* Dimension line 1 */}
          <line x1="560" y1="850" x2="840" y2="850" strokeWidth="0.8" />
          <line x1="560" y1="842" x2="560" y2="858" strokeWidth="1.2" />
          <line x1="840" y1="842" x2="840" y2="858" strokeWidth="1.2" />
          <text x="700" y="842" fontSize="10" fontFamily="Space Grotesk" textAnchor="middle" fill="#8B8272">1200mm</text>

          {/* Dimension line 2 */}
          <line x1="120" y1="560" x2="120" y2="840" strokeWidth="0.8" />
          <line x1="112" y1="560" x2="128" y2="560" strokeWidth="1.2" />
          <line x1="112" y1="840" x2="128" y2="840" strokeWidth="1.2" />
          <text x="110" y="700" fontSize="10" fontFamily="Space Grotesk" textAnchor="middle" transform="rotate(-90 110 700)" fill="#8B8272">800mm</text>
          
          {/* Elevation marks */}
          <polygon points="1200,600 1210,615 1190,615" fill="#8B8272" opacity="0.4" />
          <line x1="1170" y1="615" x2="1230" y2="615" strokeWidth="0.8" />
          <text x="1200" y="628" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle" fill="#8B8272">EL +45.0</text>
        </g>

        {/* Scattered calibration circles & tiny plus signs */}
        <g stroke="#A09585" strokeWidth="1" opacity="0.6">
          {[[280, 280], [840, 280], [560, 560], [1120, 560], [280, 700], [840, 700]].map(([x, y], i) => (
            <g key={`calib-${i}`}>
              <circle cx={x} cy={y} r="8" fill="none" />
              <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
              <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
