'use client';

import { useEffect } from 'react';
import { Locale } from '@/lib/i18n';

export default function LangDirSync({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (typeof window !== 'undefined') {
      const hasSelected = localStorage.getItem('cgl_lang_selected') === '1' || document.cookie.includes('cgl_lang_selected=1');
      if (!hasSelected) {
        const navLang = (navigator.language || '').toLowerCase();
        const prefersArabic = navLang.startsWith('ar');
        const expectedLang: Locale = prefersArabic ? 'ar' : 'en';

        if (expectedLang !== lang) {
          localStorage.setItem('cgl_lang_selected', '1');
          document.cookie = 'cgl_lang_selected=1; path=/; max-age=31536000; SameSite=Lax';
          document.cookie = `cgl_lang=${expectedLang}; path=/; max-age=31536000; SameSite=Lax`;
          const segments = window.location.pathname.split('/').filter(Boolean);
          if (segments[0] === 'ar' || segments[0] === 'en') {
            segments[0] = expectedLang;
            window.location.href = '/' + segments.join('/') + window.location.search + window.location.hash;
          }
        }
      }
    }
  }, [lang]);

  return null;
}
