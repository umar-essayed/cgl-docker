'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, ChevronDown, Check } from 'lucide-react';
import { CGL_EQUIPMENT_FLEET } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';
import { EquipmentCategory, EquipmentItem } from '@/lib/types';

interface EquipmentSectionProps {
  lang?: Locale;
  equipment?: EquipmentItem[];
}

export default function EquipmentSection({ 
  lang = 'ar',
  equipment = CGL_EQUIPMENT_FLEET 
}: EquipmentSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('all');
  const [showAll, setShowAll] = useState(false);

  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const currentEquipment = equipment && equipment.length > 0 ? equipment : CGL_EQUIPMENT_FLEET;

  const categories: { id: EquipmentCategory; label: string }[] = [
    { id: 'all', label: dict.equipment.filterAll },
    { id: 'drilling', label: dict.equipment.filterDrilling },
    { id: 'ndt', label: dict.equipment.filterNdt },
    { id: 'materials', label: dict.equipment.filterMaterials },
    { id: 'surveying', label: dict.equipment.filterSurveying },
  ];

  const filteredEquipment = selectedCategory === 'all'
    ? currentEquipment
    : currentEquipment.filter((item) => item.category === selectedCategory);

  const displayedEquipment = showAll ? filteredEquipment : filteredEquipment.slice(0, 3);

  return (
    <section id="equipment" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#F3ECE2] dark:bg-black border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-mono text-[#3b76b3] mb-2 tracking-wider">
            {dict.equipment.badge}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#18181B] dark:text-white tracking-tight">
              {dict.equipment.title}
            </h2>
            <p className="text-[#52525B] dark:text-stone-400 text-sm max-w-xl leading-relaxed">
              {dict.equipment.subtitle}
            </p>
          </div>
        </div>

        {/* Clean Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#E6DFD3] dark:border-[#1a1a1a]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#3b76b3] text-white font-semibold shadow-md shadow-[#3b76b3]/20'
                    : 'text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-[#141414] border border-[#E6DFD3] dark:border-transparent shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile: Horizontal scroll slider | Desktop: Exact same 3-column grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 md:pb-0">
          {displayedEquipment.map((item) => {
            const name = isRtl ? item.nameAr : item.nameEn;
            const categoryName = isRtl ? item.categoryNameAr : item.categoryNameEn;
            const specs = isRtl ? item.specsAr : item.specsEn;

            return (
              <div
                key={item.id}
                className="w-[82vw] sm:w-[320px] md:w-auto flex-shrink-0 md:flex-shrink snap-center sm:snap-start bg-white dark:bg-[#0c0c0c] border border-[#E6DFD3] dark:border-[#1e1e1e] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#3b76b3]/50 dark:hover:border-stone-600 transition-all shadow-sm hover:shadow-xl dark:shadow-none group"
              >
                {/* Clean Image */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 dark:bg-[#141414]">
                  <Image
                    src={item.image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#3b76b3] block mb-2 font-medium">
                      {categoryName}
                    </span>

                    <h3 className="font-display font-semibold text-lg text-[#18181B] dark:text-white leading-snug mb-4 group-hover:text-[#3b76b3] transition-colors">
                      {name}
                    </h3>

                    {/* Clean Specs List */}
                    <div className="space-y-2 mb-6 pt-2 border-t border-[#E6DFD3] dark:border-[#1a1a1a]">
                      {specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-[#52525B] dark:text-stone-300">
                          <Check className="w-3.5 h-3.5 text-[#3b76b3] flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#E6DFD3] dark:border-[#1a1a1a] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {((isRtl ? item.standardsAr : item.standardsEn) || item.standards).slice(0, 2).map((std, stIdx) => (
                        <span
                          key={stIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3ECE2] dark:bg-[#161616] text-[#52525B] dark:text-stone-400 border border-[#E6DFD3] dark:border-[#222222]"
                        >
                          {std}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/${lang}/rfq`}
                      className="inline-flex items-center text-xs font-semibold text-[#18181B] dark:text-stone-200 hover:text-[#3b76b3] transition-colors gap-1"
                    >
                      <span>{dict.equipment.requestRfq}</span>
                      <ArrowIcon className="w-3.5 h-3.5 text-[#3b76b3]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Expand/Collapse Button if more items */}
        {filteredEquipment.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E6DFD3] dark:border-[#262626] hover:border-[#3b76b3]/50 dark:hover:border-stone-500 bg-white dark:bg-[#111111] text-[#18181B] dark:text-stone-300 hover:text-[#3b76b3] dark:hover:text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              <span>
                {showAll
                  ? (isRtl ? 'عرض أقل' : 'Show Less')
                  : (isRtl ? `عرض كل المعدات (${filteredEquipment.length})` : `View All (${filteredEquipment.length})`)
                }
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
