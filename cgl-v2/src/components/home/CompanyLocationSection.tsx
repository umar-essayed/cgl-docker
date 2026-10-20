'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Navigation, ExternalLink, MessageCircle } from 'lucide-react';
import { CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';

const DarkLocationMap = dynamic(() => import('@/components/map/DarkLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 dark:bg-[#000000] flex items-center justify-center text-slate-500 dark:text-stone-400 text-xs font-mono">
      Loading interactive map...
    </div>
  ),
});

interface CompanyLocationSectionProps {
  lang?: Locale;
  companyInfo?: any;
}

export default function CompanyLocationSection({ lang = 'ar', companyInfo }: CompanyLocationSectionProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const info = companyInfo || CGL_COMPANY_INFO;

  const address = isRtl
    ? (info.addressAr || CGL_COMPANY_INFO.addressAr)
    : (info.addressEn || CGL_COMPANY_INFO.addressEn);

  const phoneDisplay = info.phone1 || info.phone || CGL_COMPANY_INFO.phone1;
  const whatsappRaw = info.whatsapp1Raw || (info.whatsapp1 || '').replace(/[^0-9]/g, '') || CGL_COMPANY_INFO.whatsapp1Raw;
  const mapsUrl = info.googleMapsUrl || CGL_COMPANY_INFO.googleMapsUrl;

  return (
    <section id="location" className="scroll-mt-20 sm:scroll-mt-24 py-10 sm:py-16 bg-[#F3ECE2] dark:bg-[#000000] border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Minimal Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <span className="text-xs font-mono text-[#3b76b3] font-bold block mb-0.5">
              {dict.location.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#18181B] dark:text-white">
              {dict.location.title} • {address}
            </h2>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 w-fit"
          >
            <Navigation className="w-4 h-4" />
            <span>{dict.location.openInMaps}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
        </div>

        {/* Map Box */}
        <div className="relative isolate z-10 w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-[#E6DFD3] dark:border-[#1f1f1f] shadow-md dark:shadow-2xl bg-white dark:bg-[#000000]">
          <DarkLocationMap lang={lang} zoom={17} />

          {/* Floating Brand Pin Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-auto">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-[#E6DFD3] dark:border-[#1f1f1f] shadow-lg dark:shadow-2xl backdrop-blur-md flex items-center gap-2.5 max-w-[270px] sm:max-w-sm">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#3b76b3]/15 border border-[#3b76b3] flex items-center justify-center flex-shrink-0 p-1">
                <Image
                  src="/assets/cgl-logo1.png"
                  alt="CGL"
                  width={36}
                  height={24}
                  className="h-4 sm:h-5 w-auto object-contain"
                />
              </div>
              <div className="text-start min-w-0">
                <span className="text-xs font-bold text-[#18181B] dark:text-white block truncate">
                  CGL Laboratories
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#52525B] dark:text-stone-300 font-mono block">
                  {address}
                </span>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] sm:text-[11px] font-mono text-[#3b76b3]">
                  <a 
                    href={`https://wa.me/${whatsappRaw}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline inline-flex items-center gap-1"
                    dir="ltr"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    <span>{phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
