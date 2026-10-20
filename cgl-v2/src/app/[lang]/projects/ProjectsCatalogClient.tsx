'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpLeft, ArrowUpRight, Search, RefreshCw, X } from 'lucide-react';
import { ProjectEvidence } from '@/lib/types';
import { Locale, getDictionary } from '@/lib/i18n';

interface ProjectsCatalogClientProps {
  lang: Locale;
  initialProjects: ProjectEvidence[];
}

const BATCH_SIZE = 10;

export default function ProjectsCatalogClient({ lang, initialProjects }: ProjectsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Extract unique sectors
  const sectors = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      const s = isRtl ? p.sectorAr : p.sectorEn;
      if (s) set.add(s);
    });
    return Array.from(set);
  }, [initialProjects, isRtl]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const name = (isRtl ? project.nameAr : project.nameEn) || '';
      const sector = (isRtl ? project.sectorAr : project.sectorEn) || '';
      const location = (isRtl ? project.locationAr : project.locationEn) || '';
      const scope = (isRtl ? project.scopeOfWorkAr : project.scopeOfWorkEn) || '';

      const matchesSearch = 
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scope.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector = selectedSector === 'all' || sector === selectedSector;

      return matchesSearch && matchesSector;
    });
  }, [initialProjects, searchQuery, selectedSector, isRtl]);

  // Reset pagination when search query or sector changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery, selectedSector]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredProjects.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredProjects.length);
  };

  const handleCollapse = () => {
    setVisibleCount(BATCH_SIZE);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Result Stats Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Box */}
        <div className="relative w-full sm:max-w-md">
          <Search className={`w-4 h-4 text-[#71717A] dark:text-stone-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
          <input
            type="text"
            placeholder={isRtl ? 'البحث باسم المشروع، الموقع، أو نوع الاختبارات...' : 'Search by project name, location, or test type...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-white/80 dark:bg-white/5 border border-[#E6DFD3] dark:border-stone-800 rounded-full ${isRtl ? 'pr-10 pl-9' : 'pl-10 pr-9'} py-2 text-xs sm:text-sm text-[#18181B] dark:text-stone-100 placeholder-[#71717A] dark:placeholder-stone-400 focus:outline-none focus:border-[#3b76b3] focus:ring-1 focus:ring-[#3b76b3] shadow-sm transition-all`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] dark:text-stone-400 dark:hover:text-white p-0.5 rounded-full transition-colors`}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results Count Badge */}
        <div className="text-xs font-mono text-[#52525B] dark:text-stone-400 bg-white/80 dark:bg-white/5 px-4 py-2 rounded-full border border-[#E6DFD3] dark:border-stone-800 shadow-sm w-fit self-start sm:self-auto flex items-center gap-2">
          <span>{isRtl ? 'المشاريع المعروضة:' : 'Projects Displayed:'}</span>
          <span className="text-[#3b76b3] font-bold">
            {String(Math.min(visibleCount, filteredProjects.length)).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Category Tabs - matching EquipmentSection (rounded-full pills, no horizontal scroll, flex-wrap) */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-[#E6DFD3] dark:border-[#1a1a1a]">
        <button
          type="button"
          onClick={() => setSelectedSector('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
            selectedSector === 'all'
              ? 'bg-[#3b76b3] text-white font-semibold shadow-md shadow-[#3b76b3]/20'
              : 'text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-[#141414] border border-[#E6DFD3] dark:border-transparent shadow-sm'
          }`}
        >
          {isRtl ? 'كافة القطاعات' : 'All Sectors'}
        </button>

        {sectors.map((sec) => {
          const isSelected = selectedSector === sec;
          return (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#3b76b3] text-white font-semibold shadow-md shadow-[#3b76b3]/20'
                  : 'text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-[#141414] border border-[#E6DFD3] dark:border-transparent shadow-sm'
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#E6DFD3] dark:border-[#1f1f1f] p-8">
          <p className="text-[#52525B] dark:text-stone-400 text-sm font-sans mb-3">
            {isRtl ? 'لم يتم العثور على أي دراسات مشاريع مطابقة للبحث المحدد' : 'No engineering project case studies match your search criteria'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSector('all'); }}
            className="text-xs text-[#3b76b3] hover:underline font-bold"
          >
            {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleProjects.map((project, index) => {
              const name = isRtl ? project.nameAr : project.nameEn;
              const sector = isRtl ? project.sectorAr : project.sectorEn;
              const location = isRtl ? project.locationAr : project.locationEn;
              const scope = isRtl ? project.scopeOfWorkAr : project.scopeOfWorkEn;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min((index % BATCH_SIZE) * 0.05, 0.4) }}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3]/40 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/80"
                >
                  {/* Card Image */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#111111]">
                    <Image
                      src={project.coverImage || '/assets/sliders/slider1.jpg'}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-black/30 dark:from-[#0a0a0a] dark:to-black/30" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#71717A] dark:text-stone-400 mb-2.5 font-mono">
                        <span className="text-[#3b76b3] font-medium">{sector}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#3b76b3]" />
                          {location}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors line-clamp-2 leading-snug mb-2">
                        {name}
                      </h3>
                      <p className="text-xs text-[#52525B] dark:text-stone-400 font-sans line-clamp-2 leading-relaxed mb-4">
                        {scope}
                      </p>
                    </div>

                    {/* Standards & Link */}
                    <div className="pt-4 border-t border-[#E6DFD3] dark:border-[#1f1f1f] flex items-center justify-between">
                      <div className="text-[11px] font-mono text-[#71717A] dark:text-stone-500">
                        {project.relevantStandards && project.relevantStandards[0] ? (
                          <span className="bg-[#F3ECE2] dark:bg-[#141414] px-2 py-0.5 rounded border border-[#E6DFD3] dark:border-[#1f1f1f]">
                            {project.relevantStandards[0]}
                          </span>
                        ) : (
                          <span>SBC Standard</span>
                        )}
                      </div>

                      <Link
                        href={`/${lang}/projects/${project.id}`}
                        className="inline-flex items-center text-xs font-bold text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors gap-1"
                      >
                        <span>{dict.projects.detailsBtn}</span>
                        <ArrowIcon className="w-4 h-4 text-[#3b76b3] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination & Load More Controls */}
          {filteredProjects.length > BATCH_SIZE && (
            <div className="pt-4 pb-2 flex flex-col items-center justify-center gap-4">
              {/* Progress Indicator */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-[#52525B] dark:text-stone-400">
                <span>
                  {isRtl
                    ? `عرض ${Math.min(visibleCount, filteredProjects.length)} من أصل ${filteredProjects.length} مشروع`
                    : `Showing ${Math.min(visibleCount, filteredProjects.length)} of ${filteredProjects.length} projects`}
                </span>
                <div className="w-36 sm:w-48 h-1.5 bg-[#E6DFD3] dark:bg-[#141414] rounded-full overflow-hidden border border-[#D4C8B8] dark:border-[#222]">
                  <div
                    className="h-full bg-[#3b76b3] transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.min(100, (visibleCount / filteredProjects.length) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {hasMore ? (
                  <>
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white dark:bg-[#111111] hover:bg-stone-50 dark:hover:bg-[#181818] border border-[#E6DFD3] dark:border-[#262626] hover:border-[#3b76b3] text-[#18181B] dark:text-stone-100 hover:text-black dark:hover:text-white font-sans text-xs sm:text-sm font-bold transition-all shadow-sm dark:shadow-lg active:scale-95 group"
                    >
                      <RefreshCw className="w-4 h-4 text-[#3b76b3] group-hover:rotate-180 transition-transform duration-500" />
                      <span>
                        {isRtl
                          ? `تحميل باقي المشاريع (متبقي ${remainingCount})`
                          : `Load More (${remainingCount} remaining)`}
                      </span>
                    </button>

                    {remainingCount > BATCH_SIZE && (
                      <button
                        type="button"
                        onClick={handleShowAll}
                        className="text-xs font-mono text-[#52525B] dark:text-stone-400 hover:text-[#3b76b3] dark:hover:text-[#508ecb] transition-colors underline"
                      >
                        {isRtl ? 'عرض كافة المشاريع دفعة واحدة' : 'Show All Projects'}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#71717A] dark:text-stone-500">
                      {isRtl ? '✓ تم عرض كافة المشاريع بنجاح' : '✓ All projects displayed'}
                    </span>
                    <button
                      type="button"
                      onClick={handleCollapse}
                      className="text-xs font-mono text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-stone-200 transition-colors underline"
                    >
                      {isRtl ? 'طي القائمة' : 'Collapse list'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
