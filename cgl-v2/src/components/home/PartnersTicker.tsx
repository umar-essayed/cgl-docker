'use client';

import React from 'react';
import Image from 'next/image';
import { CGL_AUTHORIZED_PARTNERS } from '@/lib/data';
import { Locale } from '@/lib/i18n';
import { AuthorizedPartner } from '@/lib/types';

interface PartnersTickerProps {
  lang?: Locale;
  partners?: AuthorizedPartner[];
}

export default function PartnersTicker({ 
  lang = 'ar',
  partners = CGL_AUTHORIZED_PARTNERS 
}: PartnersTickerProps) {
  const currentPartners = partners && partners.length > 0 ? partners : CGL_AUTHORIZED_PARTNERS;
  const isRtl = lang === 'ar';

  return (
    <section id="partners" className="scroll-mt-20 sm:scroll-mt-24 py-10 sm:py-12 bg-[#FBF9F5] dark:bg-[#000000] border-b border-[#E6DFD3] dark:border-[#1f1f1f] relative overflow-hidden transition-colors duration-300">
      {/* Seamless Upper Bleed to connect smoothly with Hero bottom */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FBF9F5] to-transparent dark:from-[#000000] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6 text-center">
        <p className="text-xs sm:text-sm font-sans font-medium text-[#52525B] dark:text-stone-400">
          {isRtl
            ? 'معتمدون لدى كبرى جهات التطوير العقاري والمقاولات والجهات الاستشارية بالمملكة'
            : 'Certified and trusted by leading real estate developers and Tier-1 contractors across Saudi Arabia'}
        </p>
      </div>

      {/* Infinite Seamless Scrolling Ribbon with Mask */}
      <div 
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        dir="ltr"
      >
        <div className="flex w-max animate-marquee-seamless items-center cursor-pointer select-none py-1">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {currentPartners.map((partner, index) => {
              const name = isRtl ? partner.nameAr : partner.nameEn;
              return (
                <div
                  key={`t1-${partner.id}-${index}`}
                  className="h-20 sm:h-22 w-48 sm:w-56 flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0a0a0a] hover:bg-stone-50 dark:hover:bg-[#121212] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/60 transition-all duration-300 group shadow-sm hover:shadow-md"
                  title={`${name} • ${partner.sectorAr || ''}`}
                >
                  <div className="relative w-full h-10 sm:h-11 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 192px, 224px"
                      className="object-contain p-0.5 filter grayscale opacity-60 contrast-125 dark:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                  <span className="mt-1 text-[11px] font-sans font-medium text-[#52525B] dark:text-stone-400 group-hover:text-[#18181B] dark:group-hover:text-white transition-colors truncate max-w-full px-1 text-center">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Track 2 */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
            {currentPartners.map((partner, index) => {
              const name = isRtl ? partner.nameAr : partner.nameEn;
              return (
                <div
                  key={`t2-${partner.id}-${index}`}
                  className="h-20 sm:h-22 w-48 sm:w-56 flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#0a0a0a] hover:bg-stone-50 dark:hover:bg-[#121212] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/60 transition-all duration-300 group shadow-sm hover:shadow-md"
                  title={`${name} • ${partner.sectorAr || ''}`}
                >
                  <div className="relative w-full h-10 sm:h-11 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 192px, 224px"
                      className="object-contain p-0.5 filter grayscale opacity-60 contrast-125 dark:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                  <span className="mt-1 text-[11px] font-sans font-medium text-[#52525B] dark:text-stone-400 group-hover:text-[#18181B] dark:group-hover:text-white transition-colors truncate max-w-full px-1 text-center">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
