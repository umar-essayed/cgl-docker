'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, ChevronLeft, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CGL_OPERATIONAL_CAPABILITIES } from '@/lib/data';
import { OperationalCapability } from '@/lib/types';

export default function CapabilitiesSection() {
  const [filter, setFilter] = useState<'All' | 'Field' | 'Laboratory'>('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedCap, setSelectedCap] = useState<OperationalCapability | null>(null);

  const filteredCapabilities = CGL_OPERATIONAL_CAPABILITIES.filter((cap) => {
    if (filter === 'All') return true;
    return cap.category.includes(filter);
  });

  const visibleCapabilities = showAll ? filteredCapabilities : filteredCapabilities.slice(0, 3);

  return (
    <section id="capabilities" className="py-16 sm:py-24 bg-[#000000] border-b border-[#1f1f1f] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Concise Section Header & Segment Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 pb-6 border-b border-[#1f1f1f]">
          <div>
            <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-[#111111] border border-[#1f1f1f] text-xs font-sans text-[#3b76b3] mb-2.5">
              <span className="w-1.5 h-1.5 bg-[#3b76b3] rounded-full" />
              <span className="font-semibold">الأسطول الميداني والمخبري</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
              القدرات التشغيلية والجاهزية الميدانية
            </h2>
          </div>

          {/* Minimalist Segmented Switcher */}
          <div className="flex items-center bg-[#111111] p-1 rounded-xl border border-[#1f1f1f] self-start sm:self-auto">
            <button
              onClick={() => { setFilter('All'); setShowAll(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                filter === 'All'
                  ? 'bg-[#3b76b3] text-white font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              الكل ({CGL_OPERATIONAL_CAPABILITIES.length})
            </button>
            <button
              onClick={() => { setFilter('Field'); setShowAll(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                filter === 'Field'
                  ? 'bg-[#3b76b3] text-white font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              الميداني
            </button>
            <button
              onClick={() => { setFilter('Laboratory'); setShowAll(false); }}
              className={`px-4 py-2 rounded-lg text-xs font-sans font-bold transition-all ${
                filter === 'Laboratory'
                  ? 'bg-[#3b76b3] text-white font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              المخبري
            </button>
          </div>
        </div>

        {/* Clean, Tactile Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCapabilities.map((cap, idx) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedCap(cap)}
              className="group cursor-pointer rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#3b76b3]/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-black/80"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full bg-[#111111] overflow-hidden">
                <Image
                  src={cap.image}
                  alt={cap.nameAr}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#3b76b3] font-medium mb-1">
                    {cap.category === 'Field' ? 'فحص ميداني' : cap.category === 'Laboratory' ? 'فحص مخبري' : 'ميداني ومخبري'}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#82B74B] transition-colors line-clamp-1 mb-1">
                    {cap.nameAr}
                  </h3>
                  <p className="text-[11px] font-mono text-stone-400 line-clamp-1 mb-3">
                    {cap.nameEn}
                  </p>
                  <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed mb-4">
                    {cap.applicationAr}
                  </p>
                </div>

                {/* Clean Bottom Metric & Action */}
                <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center text-stone-400 text-[11px] font-mono">
                    <span className="text-[#82B74B] font-bold ml-1.5">•</span>
                    <span className="truncate max-w-[170px]">{cap.applicableStandards[0]}</span>
                  </div>
                  <span className="inline-flex items-center text-[#82B74B] font-bold group-hover:translate-x-[-2px] transition-transform">
                    <span>التفاصيل</span>
                    <ChevronLeft className="w-4 h-4 mr-0.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Toggle Button */}
        {filteredCapabilities.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl bg-[#161a22] hover:bg-[#1f2430] border border-white/10 hover:border-[#82B74B]/40 text-stone-200 hover:text-white font-sans text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <span>{showAll ? 'عرض أقل' : `عرض كافة التجهيزات (${filteredCapabilities.length})`}</span>
              <ChevronLeft className={`w-4 h-4 text-[#82B74B] transition-transform duration-300 ${showAll ? '-rotate-90' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Clean Technical Modal */}
      <AnimatePresence>
        {selectedCap && (
          <div
            onClick={() => setSelectedCap(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl text-right overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCap(null)}
                className="absolute top-4 left-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-5 pb-4 border-b border-[#1f1f1f] pr-1">
                <span className="text-[11px] font-bold text-[#3b76b3] uppercase tracking-wider block mb-1">
                  {selectedCap.category === 'Field' ? 'أسطول ميداني' : 'مختبر مركزي'}
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {selectedCap.nameAr}
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  {selectedCap.nameEn}
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <div>
                  <h4 className="font-bold text-stone-300 mb-2">المعدات والتجهيزات:</h4>
                  <ul className="space-y-1.5 bg-[#111111] p-3 rounded-xl border border-[#1f1f1f]">
                    {selectedCap.equipmentUsedAr.map((eq, i) => (
                      <li key={i} className="text-stone-200 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b76b3] ml-2 flex-shrink-0" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-stone-300 mb-2">طرق الفحص والإجراءات:</h4>
                  <ul className="space-y-1.5 bg-[#111111] p-3 rounded-xl border border-[#1f1f1f]">
                    {selectedCap.testingMethodsAr.map((m, i) => (
                      <li key={i} className="text-stone-200 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b76b3] ml-2 flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedCap.capacityRangeAr && (
                  <div className="p-3 rounded-xl bg-[#3b76b3]/10 border border-[#3b76b3]/20">
                    <span className="text-[11px] text-[#3b76b3] font-bold block mb-1">المدى التشغيلي والطاقة:</span>
                    <span className="text-xs text-white font-mono">{selectedCap.capacityRangeAr}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-stone-400 text-xs ml-1">المواصفات:</span>
                  {selectedCap.applicableStandards.map((std, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#111111] border border-[#1f1f1f] text-[11px] font-mono text-stone-300">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-6 pt-4 border-t border-[#1f1f1f] flex justify-end">
                <Link
                  href="/rfq"
                  onClick={() => setSelectedCap(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  طلب تسعير بهذه الخدمة
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


