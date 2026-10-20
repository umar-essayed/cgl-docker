'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight, ShieldCheck, Layers, Beaker, Crosshair, Pickaxe, Compass, Trees, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { CGL_SERVICES } from '@/lib/data';
import { ServiceItem } from '@/lib/types';
import { Locale, getDictionary } from '@/lib/i18n';

interface ServicesSectionProps {
  lang?: Locale;
  services?: ServiceItem[];
}

const serviceIconMap: Record<string, React.ReactNode> = {
  'geotechnical-investigation': <Layers className="w-5 h-5 text-[#3b76b3]" />,
  'structural-integrity': <ShieldCheck className="w-5 h-5 text-[#3b76b3]" />,
  'materials-testing': <Beaker className="w-5 h-5 text-[#D4A359]" />,
  'engineering-surveying': <Crosshair className="w-5 h-5 text-[#3b76b3]" />,
  'mining-testing': <Pickaxe className="w-5 h-5 text-[#A94845]" />,
  'shoring-dewatering': <Compass className="w-5 h-5 text-[#3b76b3]" />,
  'environmental-testing': <Trees className="w-5 h-5 text-[#3b76b3]" />,
};

const serviceColorMap: Record<string, { border: string; glow: string }> = {
  'geotechnical-investigation': {
    border: 'hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/50',
    glow: 'from-[#3b76b3]/15',
  },
  'structural-integrity': {
    border: 'hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/50',
    glow: 'from-[#3b76b3]/15',
  },
  'materials-testing': {
    border: 'hover:border-[#D4A359]/60 dark:hover:border-[#D4A359]/50',
    glow: 'from-[#D4A359]/15',
  },
  'engineering-surveying': {
    border: 'hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/50',
    glow: 'from-[#3b76b3]/15',
  },
  'mining-testing': {
    border: 'hover:border-[#A94845]/60 dark:hover:border-[#A94845]/50',
    glow: 'from-[#A94845]/15',
  },
  'shoring-dewatering': {
    border: 'hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/50',
    glow: 'from-[#3b76b3]/15',
  },
  'environmental-testing': {
    border: 'hover:border-[#3b76b3]/60 dark:hover:border-[#3b76b3]/50',
    glow: 'from-[#3b76b3]/15',
  },
};

export default function ServicesSection({ lang = 'ar', services }: ServicesSectionProps) {
  const BATCH_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const servicesList = services && services.length > 0 ? services : CGL_SERVICES;
  const visibleServices = servicesList.slice(0, visibleCount);
  const hasMore = visibleCount < servicesList.length;
  const remainingCount = servicesList.length - visibleCount;
  const progressPercent = Math.min(100, Math.round((visibleServices.length / servicesList.length) * 100));

  const col1 = visibleServices.filter((_, i) => i % 3 === 0);
  const col2 = visibleServices.filter((_, i) => i % 3 === 1);
  const col3 = visibleServices.filter((_, i) => i % 3 === 2);

  const renderCard = (service: ServiceItem, index: number, isTall = false) => {
    const styling = serviceColorMap[service.id] || serviceColorMap['geotechnical-investigation'];
    const icon = serviceIconMap[service.id] || <Layers className="w-5 h-5 text-[#3b76b3]" />;
    const imageSrc = service.image || '/assets/sliders/slider1.jpg';
    const originalIndex = servicesList.findIndex(s => s.id === service.id);
    const title = isRtl ? service.titleAr : service.titleEn;
    const desc = isRtl ? service.shortDescAr : service.shortDescEn;

    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-[#1f1f1f] ${styling.border} transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/80 flex flex-col justify-between`}
      >
        {/* Photography Header / Banner (كارت طالع وكارت نازل حسب isTall) */}
        <div className={`relative w-full overflow-hidden ${isTall ? 'h-52 sm:h-60' : 'h-40 sm:h-44'}`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/50 dark:to-transparent" />
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between relative z-10">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#3b76b3]">
                {originalIndex < 9 ? `0${originalIndex + 1}` : originalIndex + 1}
              </span>
              <div className="text-[#52525B] dark:text-stone-400 group-hover:text-[#3b76b3] dark:group-hover:text-white transition-colors">
                {icon}
              </div>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors mb-2 leading-snug">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-[#52525B] dark:text-stone-300 font-sans leading-relaxed line-clamp-3 mb-4">
              {desc}
            </p>
          </div>

          {/* Footer: Standards & Link */}
          <div className="pt-3 border-t border-[#E6DFD3] dark:border-white/5 flex items-center justify-between gap-2 mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {(service.standards || []).slice(0, 2).map((std, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3ECE2] dark:bg-white/5 text-[#52525B] dark:text-stone-300 border border-[#E6DFD3] dark:border-white/10"
                >
                  {std}
                </span>
              ))}
            </div>

            <Link
              href={`/${lang}/rfq`}
              className="inline-flex items-center text-xs font-bold text-[#3b76b3] hover:text-[#18181B] dark:hover:text-white transition-colors gap-1 group/link"
            >
              <span>{dict.services.requestPricing}</span>
              <ArrowIcon className="w-3.5 h-3.5 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#F3ECE2] dark:bg-[#000000] border-b border-[#E6DFD3] dark:border-[#1f1f1f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 text-xs font-mono text-[#3b76b3] mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b76b3] animate-pulse" />
              <span>{dict.services.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#18181B] dark:text-white tracking-tight">
              {dict.services.title}
            </h2>
          </div>
          <p className="text-[#52525B] dark:text-stone-300 font-sans text-xs sm:text-sm max-w-xl leading-relaxed">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Mobile View: Clean Vertical Stack */}
        <div className="flex md:hidden flex-col gap-4">
          {visibleServices.map((service, idx) => {
            const styling = serviceColorMap[service.id] || serviceColorMap['geotechnical-investigation'];
            const icon = serviceIconMap[service.id] || <Layers className="w-5 h-5 text-[#3b76b3]" />;
            const imageSrc = service.image || '/assets/sliders/slider1.jpg';
            const originalIndex = servicesList.findIndex(s => s.id === service.id);
            const title = isRtl ? service.titleAr : service.titleEn;
            const desc = isRtl ? service.shortDescAr : service.shortDescEn;

            return (
              <div
                key={service.id}
                className={`rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-[#1f1f1f] ${styling.border} flex flex-col shadow-sm`}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/50 dark:to-transparent" />
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#3b76b3]">
                      {originalIndex < 9 ? `0${originalIndex + 1}` : originalIndex + 1}
                    </span>
                    <div className="text-[#52525B] dark:text-stone-400">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#18181B] dark:text-white mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-[#52525B] dark:text-stone-300 font-sans leading-relaxed line-clamp-2 mb-3">
                    {desc}
                  </p>
                  <div className="pt-2.5 border-t border-[#E6DFD3] dark:border-[#1f1f1f] flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3ECE2] dark:bg-white/5 text-[#52525B] dark:text-stone-400 border border-[#E6DFD3] dark:border-[#1f1f1f]">
                      {(service.standards || [])[0] || 'SBC'}
                    </span>
                    <Link
                      href={`/${lang}/rfq`}
                      className="inline-flex items-center text-xs font-bold text-[#3b76b3] gap-1"
                    >
                      <span>{dict.services.requestPricing}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Staggered Masonry (كارت طالع وكارت نازل) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
          <div className="space-y-6 sm:space-y-7 flex flex-col">
            {col1.map((service, idx) => renderCard(service, idx, idx % 2 === 0))}
          </div>
          <div className="space-y-6 sm:space-y-7 flex flex-col lg:pt-8">
            {col2.map((service, idx) => renderCard(service, idx + 2, idx % 2 === 1))}
          </div>
          <div className="space-y-6 sm:space-y-7 flex flex-col lg:pt-14 md:col-span-2 lg:col-span-1">
            {col3.map((service, idx) => renderCard(service, idx + 4, idx % 2 === 0))}
          </div>
        </div>

        {/* Progressive Pagination Controls */}
        {servicesList.length > BATCH_SIZE && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center gap-4">
            {/* Progress counter and bar */}
            <div className="w-full max-w-md text-center space-y-2">
              <div className="flex items-center justify-between text-xs text-[#52525B] dark:text-stone-400 font-mono">
                <span>
                  {isRtl ? 'عرض' : 'Showing'}{' '}
                  <strong className="text-[#18181B] dark:text-white font-bold">{visibleServices.length}</strong>{' '}
                  {isRtl ? 'من أصل' : 'of'}{' '}
                  <strong className="text-[#18181B] dark:text-white font-bold">{servicesList.length}</strong>{' '}
                  {isRtl ? 'خدمة هندسية' : 'services'}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#3b76b3] rounded-full"
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {hasMore ? (
                <>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, servicesList.length))}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-sans text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#3b76b3]/20 active:scale-95"
                  >
                    <span>
                      {isRtl 
                        ? `تحميل باقي الخدمات (${remainingCount} متبقية)` 
                        : `Load More Services (${remainingCount} remaining)`
                      }
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisibleCount(servicesList.length)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-[#E6DFD3] dark:border-white/10 text-[#18181B] dark:text-stone-300 hover:text-[#3b76b3] dark:hover:text-white font-sans text-xs sm:text-sm font-medium transition-all shadow-sm"
                  >
                    <span>{isRtl ? 'عرض الكل' : 'Show All'}</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setVisibleCount(BATCH_SIZE)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-[#E6DFD3] dark:border-white/10 text-[#18181B] dark:text-stone-400 hover:text-[#3b76b3] dark:hover:text-white font-sans text-xs transition-all shadow-sm"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>{isRtl ? 'طي القائمة (عرض 6 فقط)' : 'Collapse List (Show 6)'}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
