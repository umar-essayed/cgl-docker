'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
}

export default function ThemeToggle({ className = '', isScrolled = true }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [allowLight, setAllowLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAllowed = document.documentElement.getAttribute('data-allow-light') === 'true';
    setAllowLight(isAllowed);

    if (!isAllowed) {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
      setIsLight(false);
      return;
    }

    const savedTheme = localStorage.getItem('cgl_theme_mode');
    const htmlHasLight = document.documentElement.classList.contains('theme-light');
    if (savedTheme === 'light' || htmlHasLight) {
      setIsLight(true);
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsLight(false);
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (!allowLight) return;
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);

    if (nextIsLight) {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('cgl_theme_mode', 'light');
        document.cookie = 'cgl_theme_mode=light; path=/; max-age=31536000; SameSite=Lax';
      } catch {
        // Ignored
      }
    } else {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('cgl_theme_mode', 'dark');
        document.cookie = 'cgl_theme_mode=dark; path=/; max-age=31536000; SameSite=Lax';
      } catch {
        // Ignored
      }
    }
  };

  if (!mounted || !allowLight) {
    return null;
  }

  // Over Hero (not scrolled): Always crisp glassmorphism over the dark cinematic hero
  // Scrolled: Match page background theme
  const buttonStyle = !isScrolled
    ? isLight
      ? 'bg-white/80 hover:bg-white border-[#E6DFD3] text-amber-500 backdrop-blur-md shadow-sm'
      : 'bg-white/10 hover:bg-white/20 border-white/20 text-[#3b76b3] hover:text-white backdrop-blur-md shadow-sm'
    : isLight
      ? 'bg-white hover:bg-slate-50 border-[#E6DFD3] text-amber-500 shadow-sm'
      : 'bg-[#111111] hover:bg-[#1a1a1a] border-[#222222] text-[#3b76b3] hover:text-white shadow-sm';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
      title={isLight ? 'الوضع الداكن' : 'الوضع الفاتح'}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all duration-200 border active:scale-95 ${buttonStyle} ${className}`}
    >
      {isLight ? (
        <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-transform rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-[#60a5fa] drop-shadow-[0_0_8px_rgba(96,165,250,0.4)] transition-transform -rotate-12" />
      )}
    </button>
  );
}
