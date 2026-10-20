'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface BackToHomeButtonProps {
  lang: Locale;
  className?: string;
}

export default function BackToHomeButton({ lang, className = '' }: BackToHomeButtonProps) {
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`/${lang}`}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10 border border-[#E6DFD3] dark:border-white/10 hover:border-[#3b76b3]/50 text-[#18181B] dark:text-stone-300 hover:text-[#3b76b3] dark:hover:text-white text-xs font-sans font-medium transition-all group backdrop-blur-md shadow-sm active:scale-95 ${className}`}
    >
      <Arrow className="w-3.5 h-3.5 text-[#3b76b3] group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
      <Home className="w-3.5 h-3.5 text-[#3b76b3]" />
      <span>{isRtl ? 'العودة للصفحة الرئيسية' : 'Back to Home'}</span>
    </Link>
  );
}
