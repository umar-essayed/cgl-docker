'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CGL_PROJECTS_EVIDENCE } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';
import { ProjectEvidence } from '@/lib/types';

interface ProjectsEvidenceSectionProps {
  lang?: Locale;
  projects?: ProjectEvidence[];
}

export default function ProjectsEvidenceSection({ 
  lang = 'ar',
  projects = CGL_PROJECTS_EVIDENCE 
}: ProjectsEvidenceSectionProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const currentProjects = projects && projects.length > 0 ? projects : CGL_PROJECTS_EVIDENCE;
  const visibleProjects = showAllProjects ? currentProjects : currentProjects.slice(0, 3);
  const totalCount = currentProjects.length;
  const visibleCount = visibleProjects.length;
  const formattedVisible = String(visibleCount).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-24 bg-[#FBF9F5] dark:bg-black border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-[#E6DFD3] dark:border-[#1f1f1f]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] text-xs font-sans text-[#3b76b3] mb-2.5 shadow-sm">
              <span className="w-2 h-2 bg-[#3b76b3] rounded-full animate-pulse" />
              <span className="font-semibold">{dict.projects.badge}</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-[#18181B] dark:text-white tracking-tight">
              {dict.projects.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#52525B] dark:text-stone-400 font-sans mt-1.5">
              {dict.projects.subtitle}
            </p>
          </div>

          <div className="flex-shrink-0 text-xs font-mono text-[#52525B] dark:text-stone-400 bg-white dark:bg-[#111111] px-3.5 py-1.5 rounded-xl border border-[#E6DFD3] dark:border-[#1f1f1f] self-start sm:self-auto shadow-sm">
            <span>{isRtl ? 'المشاريع: ' : 'Projects: '}</span>
            <span className="text-[#3b76b3] font-bold">{formattedVisible} / {formattedTotal}</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleProjects.map((project, index) => {
            const name = isRtl ? project.nameAr : project.nameEn;
            const sector = isRtl ? project.sectorAr : project.sectorEn;
            const location = isRtl ? project.locationAr : project.locationEn;
            const scope = isRtl ? project.scopeOfWorkAr : project.scopeOfWorkEn;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3]/50 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/80"
              >
                {/* Card Image */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 dark:bg-[#111111]">
                  <Image
                    src={project.coverImage}
                    alt={name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/50 dark:to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#52525B] dark:text-stone-400 mb-2.5 font-mono">
                      <span className="text-[#3b76b3] font-semibold">{sector}</span>
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

                  {/* Standards & Direct Link */}
                  <div className="pt-4 border-t border-[#E6DFD3] dark:border-[#1f1f1f] flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.relevantStandards.slice(0, 1).map((std, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3ECE2] dark:bg-[#111111] text-[#52525B] dark:text-stone-300 border border-[#E6DFD3] dark:border-[#1f1f1f]"
                        >
                          {std}
                        </span>
                      ))}
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

        {/* Link to Dedicated Projects Page */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-stone-200 hover:text-[#3b76b3] dark:hover:text-white font-sans text-xs sm:text-sm font-semibold transition-all shadow-sm group hover:border-[#3b76b3]/50"
          >
            <span>
              {isRtl 
                ? `استعراض كافة دراسات المشاريع الهندسية (${totalCount} مشاريع)`
                : `Explore All Case Studies & Projects (${totalCount} Projects)`
              }
            </span>
            <ArrowIcon className="w-4 h-4 text-[#3b76b3] group-hover:-translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
