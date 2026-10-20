'use client';

import React, { useState, useEffect } from 'react';

interface PageLoaderProps {
  color?: string;
  coreColor?: string;
  glowColor?: string;
}

export default function PageLoader({
  color = '#3b76b3',
  coreColor = '#bbdefb',
  glowColor = 'rgba(59, 118, 179, 0.5)',
}: PageLoaderProps) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Ultra-smooth instant dismiss when DOM is interactive
    const dismissTimer = setTimeout(() => {
      setMounted(false);
    }, 450);

    return () => clearTimeout(dismissTimer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="cgl-preloader"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FBF9F5]/90 dark:bg-black/85 backdrop-blur-xl pointer-events-none select-none transition-opacity duration-300"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft atmospheric ambient glow */}
        <div
          className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Instant Hardware-Accelerated 360 SVG Dual-Orbiter (Prominent & Scaled) */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg
            className="w-28 h-28 sm:w-36 sm:h-36 cgl-instant-spinner"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="loaderOrbGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={coreColor} />
                <stop offset="45%" stopColor={color} />
                <stop offset="100%" stopColor={color} stopOpacity="0.85" />
              </radialGradient>
            </defs>

            {/* Orbit Circle Path */}
            <circle
              cx="50"
              cy="50"
              r="24"
              stroke={color}
              strokeWidth="1.75"
              strokeDasharray="6 4"
              className="opacity-35"
            />

            {/* Leading Orb */}
            <circle
              cx="50"
              cy="26"
              r="7.5"
              fill="url(#loaderOrbGrad)"
              className="drop-shadow-[0_0_12px_rgba(59,118,179,0.9)]"
            />

            {/* Counter Orb */}
            <circle
              cx="50"
              cy="74"
              r="7.5"
              fill="url(#loaderOrbGrad)"
              className="drop-shadow-[0_0_12px_rgba(59,118,179,0.9)]"
            />

            {/* Micro Center Node */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill={color}
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
