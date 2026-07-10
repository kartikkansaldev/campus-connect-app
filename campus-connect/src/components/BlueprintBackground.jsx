import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BlueprintBackground() {
  const location = useLocation();
  const path = location.pathname;

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

          <pattern id="diagonalLeft" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <path d="M 0 0 L 0 28" fill="none" stroke="#B0A898" strokeWidth="1.2" opacity="0.9" />
          </pattern>

          <pattern id="diagonalRight" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M 0 0 L 0 28" fill="none" stroke="#B0A898" strokeWidth="1.2" opacity="0.9" />
          </pattern>

          <pattern id="verticalStrips" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 14 0 L 14 28" fill="none" stroke="#B0A898" strokeWidth="1.2" opacity="0.9" />
          </pattern>

          <pattern id="horizontalStrips" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 0 14 L 28 14" fill="none" stroke="#B0A898" strokeWidth="1.2" opacity="0.9" />
          </pattern>

          <pattern id="wavyVertical" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 20 0 Q 32 10 20 20 T 20 40" fill="none" stroke="#B0A898" strokeWidth="1.2" opacity="0.9" />
          </pattern>
        </defs>

        {/* Dynamic Background Pattern based on Route */}
        {path === '/explore' ? (
          <rect width="100%" height="100%" fill="url(#diagonalLeft)" />
        ) : path === '/campus-life' ? (
          <rect width="100%" height="100%" fill="url(#verticalStrips)" />
        ) : path === '/community' ? (
          <rect width="100%" height="100%" fill="url(#diagonalRight)" />
        ) : path === '/academics' ? (
          <rect width="100%" height="100%" fill="url(#horizontalStrips)" />
        ) : path === '/visitor-guide' ? (
          <rect width="100%" height="100%" fill="url(#wavyVertical)" />
        ) : (
          <>
            <rect width="100%" height="100%" fill="url(#gridMinor)" />
            <rect width="100%" height="100%" fill="url(#gridMajor)" />
          </>
        )}
      </svg>
    </div>
  );
}

