'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale, getDictionary } from '@/lib/i18n';
import { HeroSlide } from '@/lib/types';

interface HeroProps {
  lang?: Locale;
  slides?: HeroSlide[];
  stats?: {
    globalPartners?: number;
    innovativeSolutions?: number;
    yearsOfGrowth?: number;
  };
}

function AnimatedCounter({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return <>{count.toLocaleString('en-US')}</>;
}

export default function Hero({ lang = 'ar', slides, stats }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  const partnersCount = stats?.globalPartners ?? dict.hero.stats.partners.num;
  const solutionsCount = stats?.innovativeSolutions ?? dict.hero.stats.solutions.num;
  const experienceCount = stats?.yearsOfGrowth ?? dict.hero.stats.experience.num;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const fallbackImages = [
    '/assets/sliders/slider1.jpg',
    '/uploads/projects_images/project_688d08b6e73ee4.36242119.jpg',
    '/uploads/projects_images/project_688d0f1061e875.99060450.jpg'
  ];

  // Normalized dynamic slides (accepts arbitrary count, image or video, custom duration)
  const normalizedSlides = useMemo(() => {
    if (slides && slides.length > 0) {
      return slides.map((s, idx) => ({
        id: s.id || `slide-${idx}`,
        tag: (isRtl ? s.tagAr : s.tagEn) || (isRtl ? 'دراسات جيوتقنية' : 'Geotechnical'),
        title: (isRtl ? s.titleAr : s.titleEn) || '',
        subtitle: (isRtl ? s.subtitleAr : s.subtitleEn) || '',
        metrics: (isRtl ? s.metricsAr : s.metricsEn) || '',
        mediaUrl: s.mediaUrl || fallbackImages[idx % fallbackImages.length],
        type: s.type || ((s.mediaUrl?.endsWith('.mp4') || s.mediaUrl?.endsWith('.webm')) ? 'video' : 'image'),
        duration: s.duration || 6,
      }));
    }

    return dict.hero.slides.map((s, idx) => ({
      id: `dict-${s.id || idx}`,
      tag: s.tag,
      title: s.title,
      subtitle: s.subtitle,
      metrics: s.metrics,
      mediaUrl: fallbackImages[idx % fallbackImages.length],
      type: 'image' as const,
      duration: 6,
    }));
  }, [slides, isRtl, dict.hero.slides]);

  const totalSlides = normalizedSlides.length;
  const activeSlide = normalizedSlides[currentSlide] || normalizedSlides[0];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keep current slide within bounds if slides count changes dynamically
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Dynamic per-slide timer based on each slide's individual duration
  useEffect(() => {
    if (totalSlides <= 1) return;
    const slideDuration = Number(activeSlide.duration) > 0 ? Number(activeSlide.duration) : 6;
    const durationMs = slideDuration * 1000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [currentSlide, activeSlide.id, activeSlide.duration, totalSlides]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        if (isRtl) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        if (isRtl) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const PrevChevron = isRtl ? ChevronRight : ChevronLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section 
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative select-none transition-colors duration-300"
    >
      {/* =========================================================================
          1. DARK MODE HERO: 100% Exact Previous Cinematic Design
          ========================================================================= */}
      <div className="hidden dark:flex relative min-h-[100svh] sm:min-h-[700px] max-h-[1050px] flex-col justify-between pt-24 pb-4 sm:pt-28 sm:pb-8 engineering-canvas overflow-hidden bg-[#000000] text-white">
        
        {/* Background Image/Video Carousel with Smooth AnimatePresence */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`dark-bg-${activeSlide.id}-${activeSlide.mediaUrl}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.78, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              {activeSlide.type === 'video' ? (
                <video
                  key={activeSlide.mediaUrl}
                  src={activeSlide.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                />
              ) : (
                <Image
                  src={activeSlide.mediaUrl}
                  alt={activeSlide.title}
                  fill
                  priority
                  className="object-cover object-center filter contrast-105 brightness-95"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Top/Overall Cinematic Dark Vignette - Softened & Balanced */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-black/30 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Soft Controlled Architectural Bottom Blend to pure #000000 */}
          <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 lg:h-44 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full my-auto">
          <div className="max-w-4xl">
            {/* Content Box with Stable Reserved Height to Prevent Any Layout Shift */}
            <div className="min-h-[185px] sm:min-h-[225px] md:min-h-[265px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dark-content-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="space-y-2 sm:space-y-3.5"
                >
                  {/* Tag Pill */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#111111]/90 border border-[#1f1f1f] text-[11px] sm:text-xs font-sans text-[#3b76b3] shadow-sm w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b76b3] animate-pulse" />
                    <span className="font-semibold">{activeSlide.tag}</span>
                    {activeSlide.metrics && (
                      <>
                        <span className="text-stone-600">|</span>
                        <span className="text-stone-300 font-mono text-[10px] sm:text-xs">{activeSlide.metrics}</span>
                      </>
                    )}
                  </div>

                  {/* Headline with Stable Reserved Height */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-snug tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] min-h-[60px] sm:min-h-[85px] lg:min-h-[110px] flex items-center">
                    {activeSlide.title}
                  </h1>

                  {/* Subtitle with Stable Reserved Height */}
                  <p className="text-xs sm:text-base md:text-lg text-stone-200 font-sans leading-relaxed max-w-2xl font-normal line-clamp-3 sm:line-clamp-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] min-h-[44px] sm:min-h-[56px] lg:min-h-[64px]">
                    {activeSlide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2.5 sm:gap-4 items-center mt-4 sm:mt-6">
              <Link
                href={`/${lang}/rfq`}
                className="inline-flex items-center justify-center flex-1 sm:flex-initial px-4 sm:px-7 py-2.5 sm:py-3 bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#3b76b3]/20 active:scale-[0.98] transition-all text-center gap-1.5"
              >
                <span>{dict.hero.ctaRfq}</span>
                <ArrowIcon className="w-3.5 h-3.5 text-white" />
              </Link>

              <a
                href={`/${lang}#services`}
                onClick={(e) => {
                  const el = document.getElementById('services');
                  if (el) {
                    e.preventDefault();
                    const navHeight = 75;
                    const pos = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                    window.history.pushState(null, '', `#services`);
                  }
                }}
                className="inline-flex items-center justify-center flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 font-medium text-xs sm:text-sm rounded-xl transition-all text-center cursor-pointer"
              >
                <span>{dict.hero.ctaServices}</span>
              </a>
            </div>

            {/* Mobile-Only Analytics Counter */}
            <div className="sm:hidden mt-4 pt-3 border-t border-white/10 w-full">
              <div className="flex items-center justify-between gap-1 text-xs font-mono">
                <div className="flex items-baseline gap-1">
                  <div className="flex items-baseline gap-0.5">
                    {isRtl ? (
                      <>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={partnersCount} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={partnersCount} />
                        </span>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-300 font-sans font-medium">{dict.hero.stats.partners.label}</span>
                </div>

                <span className="text-stone-600">•</span>

                <div className="flex items-baseline gap-1">
                  <div className="flex items-baseline gap-0.5">
                    {isRtl ? (
                      <>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={solutionsCount} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={solutionsCount} />
                        </span>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-300 font-sans font-medium">{dict.hero.stats.solutions.label}</span>
                </div>

                <span className="text-stone-600">•</span>

                <div className="flex items-baseline gap-1">
                  <div className="flex items-baseline gap-0.5">
                    {isRtl ? (
                      <>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={experienceCount} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-base font-bold text-white tracking-tight">
                          <AnimatedCounter target={experienceCount} />
                        </span>
                        <span className="text-[#3b76b3] font-bold text-base">+</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-300 font-sans font-medium">{dict.hero.stats.experience.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop-Only Metrics Counter */}
        <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full mb-3">
          <div className="flex items-center justify-start gap-7 text-xs font-mono">
            <div className="flex items-baseline gap-1.5">
              <div className="flex items-baseline gap-0.5">
                {isRtl ? (
                  <>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={partnersCount} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={partnersCount} />
                    </span>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                  </>
                )}
              </div>
              <span className="text-xs text-stone-300 font-sans font-medium">{dict.hero.stats.partners.label}</span>
            </div>

            <span className="text-stone-600">•</span>

            <div className="flex items-baseline gap-1.5">
              <div className="flex items-baseline gap-0.5">
                {isRtl ? (
                  <>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={solutionsCount} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={solutionsCount} />
                    </span>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                  </>
                )}
              </div>
              <span className="text-xs text-stone-300 font-sans font-medium">{dict.hero.stats.solutions.label}</span>
            </div>

            <span className="text-stone-600">•</span>

            <div className="flex items-baseline gap-1.5">
              <div className="flex items-baseline gap-0.5">
                {isRtl ? (
                  <>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={experienceCount} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-white tracking-tight">
                      <AnimatedCounter target={experienceCount} />
                    </span>
                    <span className="text-[#3b76b3] font-bold text-xl">+</span>
                  </>
                )}
              </div>
              <span className="text-xs text-stone-300 font-sans font-medium">{dict.hero.stats.experience.label}</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-20 w-full pt-3 sm:pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Sleek Dot Pagination System */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                {normalizedSlides.map((s, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={`dark-dot-${s.id}`}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}: ${s.tag}`}
                      title={s.tag}
                      className={`relative h-2.5 sm:h-3 rounded-full transition-all duration-300 active:scale-90 overflow-hidden flex items-center ${
                        isActive
                          ? 'w-9 sm:w-12 bg-black border border-[#3b76b3]/80 shadow-[0_0_10px_rgba(59,118,179,0.35)]'
                          : 'w-2.5 sm:w-3 bg-stone-600/70 hover:bg-stone-400 hover:scale-110'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          key={`dark-prog-${s.id}-${currentSlide}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: Number(s.duration) > 0 ? Number(s.duration) : 6, ease: 'linear' }}
                          className="absolute inset-0 bg-[#3b76b3] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Slide Tag Minimal Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-sans text-stone-300 shadow-none">
                <span className="font-mono font-bold text-[#3b76b3]">0{currentSlide + 1}</span>
                <span className="text-stone-600">/</span>
                <span className="font-mono text-stone-500">0{normalizedSlides.length}</span>
                <span className="text-stone-600">•</span>
                <span className="font-medium text-white truncate max-w-[140px] sm:max-w-[200px]">{normalizedSlides[currentSlide]?.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. LIGHT MODE HERO: Split Architectural Layout with Free-Form Blended Image
          ========================================================================= */}
      <div className="flex dark:hidden relative min-h-[92svh] sm:min-h-[720px] flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-10 bg-[#FBF9F5] text-[#0F172A] overflow-hidden">
        
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.035] pointer-events-none" />

        {/* =========================================================================
            DESKTOP FULL-BLEED UNLEASHED HALF (LEFT on RTL / RIGHT on LTR)
            Takes 100% full height and 100% full width of the entire screen half!
            Zero box, zero card, completely unconstrained, with organic center blend.
            ========================================================================= */}
        <div 
          className={`hidden lg:block absolute inset-y-0 ${
            isRtl ? 'left-0 w-1/2 xl:w-[52%]' : 'right-0 w-1/2 xl:w-[52%]'
          } overflow-hidden select-none z-0`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`light-desktop-${activeSlide.id}-${activeSlide.mediaUrl}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              {activeSlide.type === 'video' ? (
                <video
                  key={activeSlide.mediaUrl}
                  src={activeSlide.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <Image
                  src={activeSlide.mediaUrl}
                  alt={activeSlide.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Seamless Multi-Directional Feathered Blenders:
              1. Deep Organic Dissolve towards the center (melting the image into the text half)
              2. Top Dissolve below navbar
              3. Bottom Dissolve into partners section
          */}
          <div 
            className={`absolute inset-y-0 ${
              isRtl 
                ? 'right-0 bg-gradient-to-r from-transparent via-[#FBF9F5]/50 via-60% to-[#FBF9F5]' 
                : 'left-0 bg-gradient-to-l from-transparent via-[#FBF9F5]/50 via-60% to-[#FBF9F5]'
            } w-64 lg:w-80 xl:w-[460px] pointer-events-none z-10`} 
          />
          <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#FBF9F5] via-[#FBF9F5]/60 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Main Content Grid: Right half for Typography (on RTL) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full my-auto py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
            
            {/* RIGHT COLUMN (Arabic): Typography & Editorial Information */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-6">
              
              {/* Tag Pill with Live Pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DFD3] text-xs font-sans text-[#3b76b3] shadow-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b76b3] animate-pulse" />
                <span className="font-semibold">{activeSlide.tag}</span>
                {activeSlide.metrics && (
                  <>
                    <span className="text-stone-300">|</span>
                    <span className="text-[#475569] font-mono text-[11px] sm:text-xs">{activeSlide.metrics}</span>
                  </>
                )}
              </div>

              {/* Free-Form Image on Mobile Screen (< lg) - PRESERVED EXACTLY AS PRAISED */}
              <div className="lg:hidden relative w-full h-[220px] sm:h-[280px] my-1 overflow-hidden select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mob-light-${activeSlide.id}-${activeSlide.mediaUrl}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    {activeSlide.type === 'video' ? (
                      <video
                        key={`mob-${activeSlide.mediaUrl}`}
                        src={activeSlide.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <Image
                        src={activeSlide.mediaUrl}
                        alt={activeSlide.title}
                        fill
                        priority
                        className="object-cover object-center"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Soft multi-edge gradient dissolves into #FBF9F5 (NO box or borders) */}
                <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#FBF9F5] to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/70 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FBF9F5] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#FBF9F5] to-transparent pointer-events-none z-10" />
              </div>

              {/* High Contrast Editorial Headline & Subtitle with Stable Reserved Height Box */}
              <div className="relative min-h-[160px] sm:min-h-[185px] lg:min-h-[210px] flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`light-headline-${activeSlide.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="space-y-2.5 sm:space-y-3.5"
                  >
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0F172A] leading-[1.25] sm:leading-[1.2] tracking-tight min-h-[58px] sm:min-h-[80px] lg:min-h-[96px] flex items-center">
                      {activeSlide.title}
                    </h1>

                    <p className="text-sm sm:text-base lg:text-lg text-[#334155] font-sans leading-relaxed max-w-2xl font-normal min-h-[48px] sm:min-h-[54px] lg:min-h-[64px] line-clamp-3 sm:line-clamp-none">
                      {activeSlide.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons (CTAs) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <Link
                  href={`/${lang}/rfq`}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#3b76b3]/20 active:scale-[0.98] transition-all gap-2"
                >
                  <span>{dict.hero.ctaRfq}</span>
                  <ArrowIcon className="w-4 h-4 text-white" />
                </Link>

                <a
                  href={`/${lang}#services`}
                  onClick={(e) => {
                    const el = document.getElementById('services');
                    if (el) {
                      e.preventDefault();
                      const navHeight = 75;
                      const pos = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                      window.history.pushState(null, '', `#services`);
                    }
                  }}
                  className="inline-flex items-center justify-center px-5 sm:px-7 py-3 bg-white hover:bg-stone-50 text-[#0F172A] border border-[#E6DFD3] font-semibold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span>{dict.hero.ctaServices}</span>
                </a>
              </div>

              {/* Architectural Numerical Metrics Bar */}
              <div className="pt-5 sm:pt-6 border-t border-[#E6DFD3]">
                <div className="flex items-center justify-start gap-5 sm:gap-8 text-xs font-mono">
                  {/* Partners */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-0.5">
                      {isRtl ? (
                        <>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={partnersCount} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={partnersCount} />
                          </span>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                        </>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs text-[#64748B] font-sans font-medium">{dict.hero.stats.partners.label}</span>
                  </div>

                  <span className="text-stone-300 h-6 w-[1px] bg-stone-300" />

                  {/* Solutions */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-0.5">
                      {isRtl ? (
                        <>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={solutionsCount} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={solutionsCount} />
                          </span>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                        </>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs text-[#64748B] font-sans font-medium">{dict.hero.stats.solutions.label}</span>
                  </div>

                  <span className="text-stone-300 h-6 w-[1px] bg-stone-300" />

                  {/* Experience */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-0.5">
                      {isRtl ? (
                        <>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={experienceCount} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            <AnimatedCounter target={experienceCount} />
                          </span>
                          <span className="text-[#3b76b3] font-bold text-lg sm:text-xl">+</span>
                        </>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs text-[#64748B] font-sans font-medium">{dict.hero.stats.experience.label}</span>
                  </div>
                </div>
              </div>

              {/* Light Mode Integrated Controls System */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#E6DFD3]/60">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Dot Pagination */}
                  <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-stone-200/70 border border-[#E6DFD3] shadow-inner">
                    {normalizedSlides.map((s, idx) => {
                      const isActive = currentSlide === idx;
                      return (
                        <button
                          key={`light-dot-${s.id}`}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                            isActive
                              ? 'w-7 sm:w-9 bg-[#0F172A]'
                              : 'w-2 bg-stone-400/80 hover:bg-stone-600'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              key={`light-prog-${s.id}-${currentSlide}`}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: Number(s.duration) > 0 ? Number(s.duration) : 6, ease: 'linear' }}
                              className="absolute inset-0 bg-[#3b76b3] rounded-full"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Slide Counter Badge */}
                  <div className="px-2.5 py-1 rounded-full bg-white border border-[#E6DFD3] text-[11px] font-mono text-[#334155] flex items-center gap-1.5 shadow-sm">
                    <span className="text-[#3b76b3] font-bold">0{currentSlide + 1}</span>
                    <span className="text-stone-300">/</span>
                    <span className="text-stone-500">0{normalizedSlides.length}</span>
                  </div>
                </div>

                {/* Arrow Nav Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-[#0F172A] border border-[#E6DFD3] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                  >
                    <PrevChevron className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-[#0F172A] border border-[#E6DFD3] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                  >
                    <NextChevron className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* SPACER COLUMN ON DESKTOP: Leaves the left half open for the full-bleed background image */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full pointer-events-none" />

          </div>
        </div>
      </div>
    </section>
  );
}
