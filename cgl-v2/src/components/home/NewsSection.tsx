'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { CGL_LATEST_NEWS } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';
import { NewsArticle } from '@/lib/types';

interface NewsSectionProps {
  lang?: Locale;
  news?: NewsArticle[];
}

export default function NewsSection({ 
  lang = 'ar',
  news = CGL_LATEST_NEWS 
}: NewsSectionProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;
  const currentNews = news && news.length > 0 ? news : CGL_LATEST_NEWS;

  return (
    <section id="news" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#080808] border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-mono text-[#3b76b3] mb-2 tracking-wider">
              {dict.news.badge}
            </p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#18181B] dark:text-white tracking-tight">
              {dict.news.title}
            </h2>
          </div>
          <p className="text-[#52525B] dark:text-stone-400 text-sm max-w-lg leading-relaxed">
            {dict.news.subtitle}
          </p>
        </div>

        {/* Mobile: Horizontal scroll slider | Desktop: Exact same 3-column grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 md:pb-0">
          {currentNews.map((article) => {
            const title = isRtl ? article.titleAr : article.titleEn;
            const excerpt = isRtl ? article.excerptAr : article.excerptEn;
            const category = isRtl ? article.categoryAr : article.categoryEn;
            const date = (isRtl ? article.dateAr : article.dateEn) || article.date;

            return (
              <article
                key={article.id}
                className="w-[82vw] sm:w-[320px] md:w-auto flex-shrink-0 md:flex-shrink snap-center sm:snap-start group flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image */}
                  <Link href={`/${lang}/news/${article.id}`} className="block relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#141414] border border-[#E6DFD3] dark:border-[#1e1e1e] mb-4 shadow-sm">
                    <Image
                      src={article.image || article.coverImage || '/assets/sliders/slider1.jpg'}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Category & Date */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] dark:text-stone-400 mb-2">
                    <span className="text-[#3b76b3] font-medium">{category}</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display font-semibold text-lg text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors leading-snug mb-3">
                    <Link href={`/${lang}/news/${article.id}`}>
                      {title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#52525B] dark:text-stone-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-2">
                  <Link
                    href={`/${lang}/news/${article.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#18181B] dark:text-stone-300 group-hover:text-[#3b76b3] transition-colors"
                  >
                    <span>{dict.news.readArticle}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-[#3b76b3]" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Link to Dedicated News Page */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href={`/${lang}/news`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-stone-200 hover:text-[#3b76b3] dark:hover:text-white font-sans text-xs sm:text-sm font-semibold transition-all shadow-sm group hover:border-[#3b76b3]/50"
          >
            <span>
              {isRtl 
                ? `استعراض كافة المقالات والبيانات الهندسية (${currentNews.length})`
                : `Explore All Engineering Articles & Insights (${currentNews.length})`
              }
            </span>
            <ArrowIcon className="w-4 h-4 text-[#3b76b3] group-hover:-translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
