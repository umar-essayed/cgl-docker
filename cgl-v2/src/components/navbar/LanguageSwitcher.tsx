'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLang: Locale;
  className?: string;
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ currentLang, className = '', isScrolled = true }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const targetLang: Locale = currentLang === 'ar' ? 'en' : 'ar';
  const label = currentLang === 'ar' ? 'English' : 'العربية';

  const handleSwitch = () => {
    try {
      document.cookie = 'cgl_lang_selected=1; path=/; max-age=31536000; SameSite=Lax';
      document.cookie = `cgl_lang=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('cgl_lang_selected', '1');
      localStorage.setItem('cgl_lang', targetLang);
    } catch {
      // Ignored
    }

    if (!pathname) {
      router.push(`/${targetLang}`);
      return;
    }

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${targetLang}`);
    } else if (segments[0] === 'ar' || segments[0] === 'en') {
      segments[0] = targetLang;
      router.push('/' + segments.join('/'));
    } else {
      router.push(`/${targetLang}/${segments.join('/')}`);
    }
  };

  const buttonStyle = !isScrolled
    ? 'bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-[#E6DFD3] dark:border-white/20 text-[#18181B] dark:text-white backdrop-blur-md shadow-sm'
    : 'bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-stone-200 shadow-sm';

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={`Switch to ${label}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 border ${buttonStyle} ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-[#60a5fa]" />
      <span className="font-sans font-semibold">{label}</span>
    </button>
  );
}
