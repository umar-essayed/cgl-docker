'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUp, Clock } from 'lucide-react';
import { CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';

interface FooterProps {
  lang?: Locale;
  companyInfo?: any;
}

export default function Footer({ lang = 'ar', companyInfo }: FooterProps) {
  const info = companyInfo || CGL_COMPANY_INFO;
  const currentYear = new Date().getFullYear();
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const address = isRtl
    ? (info.addressAr || CGL_COMPANY_INFO.addressAr)
    : (info.addressEn || CGL_COMPANY_INFO.addressEn);

  const workingHours = isRtl
    ? (info.workingHoursAr || info.workingHoursEn || 'الأحد - الخميس: 8:00 ص - 5:00 م')
    : (info.workingHoursEn || info.workingHoursAr || 'Sun - Thu: 8:00 AM - 5:00 PM');

  return (
    <footer className="bg-[#F3ECE2] dark:bg-[#000000] text-[#52525B] dark:text-stone-300 font-sans border-t border-[#E6DFD3] dark:border-[#1f1f1f] pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Clean Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-8 border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-center md:text-start">
          
          {/* 1. Identity */}
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Link href={`/${lang}`} className="inline-block mb-3">
              <Image
                src="/assets/cgl-logo1.png"
                alt="CGL Labs"
                width={140}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-[#52525B] dark:text-stone-400 text-xs leading-relaxed font-mono">
              {isRtl
                ? 'CGL - Creative Geotechnical Laboratories • فرع معتمد لمجموعة CGI العالمية (السعودية والولايات المتحدة).'
                : 'CGL - Creative Geotechnical Laboratories • A proud franchise of CGI Group (USA & KSA).'}
            </p>
          </div>

          {/* 2. Quick Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[#52525B] dark:text-stone-300 font-medium">
            <Link href={`/${lang}`} className="hover:text-[#3b76b3] transition-colors">{dict.nav.home}</Link>
            <Link href={`/${lang}/about`} className="hover:text-[#3b76b3] transition-colors">{dict.nav.about}</Link>
            <Link href={`/${lang}#services`} className="hover:text-[#3b76b3] transition-colors">{dict.nav.services}</Link>
            <Link href={`/${lang}#projects`} className="hover:text-[#3b76b3] transition-colors">{dict.nav.projects}</Link>
            <Link href={`/${lang}/rfq`} className="hover:text-[#3b76b3] transition-colors text-[#3b76b3] font-bold">{dict.nav.rfq}</Link>
          </div>

          {/* 3. Direct Contact */}
          <div className="flex flex-col items-center md:items-end space-y-2.5 text-[#52525B] dark:text-stone-400 font-mono text-xs">
            <div className="flex items-center gap-2" dir="ltr">
              <Phone className="w-3.5 h-3.5 text-[#3b76b3]" />
              <a
                href={`https://wa.me/${info.whatsapp1Raw || (info.whatsapp1 || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18181B] dark:text-white hover:text-[#3b76b3] transition-colors font-bold"
              >
                {info.phone1 || info.phone}
              </a>
              <span className="text-[#A1A1AA] dark:text-stone-700">|</span>
              <a
                href={`https://wa.me/${info.whatsapp2Raw || (info.whatsapp2 || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18181B] dark:text-white hover:text-[#3b76b3] transition-colors font-bold"
              >
                {info.phone2}
              </a>
            </div>

            <a
              href={`mailto:${info.email}`}
              className="inline-flex items-center gap-1.5 text-[#52525B] dark:text-stone-300 hover:text-[#3b76b3] dark:hover:text-white transition-colors"
              dir="ltr"
            >
              <Mail className="w-3.5 h-3.5 text-[#508ECB]" />
              <span>{info.email}</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-[#52525B] dark:text-stone-300 font-sans text-xs">
              <Clock className="w-3.5 h-3.5 text-[#3b76b3] flex-shrink-0" />
              <span>{workingHours}</span>
            </div>

            <a
              href={info.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#52525B] dark:text-stone-300 hover:text-[#3b76b3] transition-colors font-sans text-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C45B58] flex-shrink-0" />
              <span>{address}</span>
            </a>
          </div>

        </div>

        {/* Accreditations Strip & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A] dark:text-stone-400 font-mono">
          {/* Subtle Accreditations Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[#52525B] dark:text-stone-400">
            <span className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 shadow-sm">
              {isRtl ? 'كود البناء السعودي SBC 303 • SBC 304' : 'Saudi Building Code SBC 303 • SBC 304'}
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 shadow-sm">ASTM International</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 shadow-sm">American Concrete Institute (ACI)</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 shadow-sm">ISO/IEC 17025 Ready</span>
          </div>

          {/* Copyright & Up Button */}
          <div className="flex items-center gap-3">
            <span>© {currentYear} CGL Labs. {dict.footer.rights}.</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/15 text-[#18181B] dark:text-stone-400 hover:text-[#3b76b3] dark:hover:text-white transition-colors border border-[#E6DFD3] dark:border-white/10 shadow-sm"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
