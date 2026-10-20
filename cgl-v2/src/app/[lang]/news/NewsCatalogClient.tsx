'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowUpLeft, ArrowUpRight, Star, RefreshCw, X } from 'lucide-react';
import { NewsArticle } from '@/lib/types';
import { Locale, getDictionary } from '@/lib/i18n';

interface NewsCatalogClientProps {
  lang: Locale;
  initialNews: NewsArticle[];
}

const BATCH_SIZE = 10;

export default function NewsCatalogClient({ lang, initialNews }: NewsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialNews.forEach((n) => {
      const cat = isRtl ? n.categoryAr : n.categoryEn;
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [initialNews, isRtl]);

  const filteredNews = useMemo(() => {
    return initialNews.filter((article) => {
      const title = (isRtl ? article.titleAr : article.titleEn) || '';
      const excerpt = (isRtl ? article.excerptAr : article.excerptEn) || '';
      const cat = (isRtl ? article.categoryAr : article.categoryEn) || '';

      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialNews, searchQuery, selectedCategory, isRtl]);

  // Reset visible count when search query or category filter changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery, selectedCategory]);

  const visibleNews = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  const hasMore = visibleCount < filteredNews.length;
  const remainingCount = filteredNews.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredNews.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredNews.length);
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
            placeholder={isRtl ? 'البحث بالعنوان، الكلمات المفتاحية، أو كود البناء...' : 'Search articles by title, keywords, or codes...'}
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

        {/* Results Counter */}
        <div className="text-xs font-mono text-[#52525B] dark:text-stone-400 bg-white/80 dark:bg-white/5 px-4 py-2 rounded-full border border-[#E6DFD3] dark:border-stone-800 shadow-sm w-fit self-start sm:self-auto flex items-center gap-2">
          <span>{isRtl ? 'المقالات المعروضة:' : 'Articles Displayed:'}</span>
          <span className="text-[#3b76b3] font-bold">
            {String(Math.min(visibleCount, filteredNews.length)).padStart(2, '0')} / {String(filteredNews.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Category Tabs - matching EquipmentSection (rounded-full pills, no horizontal scroll, flex-wrap) */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-8 border-b border-[#E6DFD3] dark:border-[#1a1a1a]">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#3b76b3] text-white font-semibold shadow-md shadow-[#3b76b3]/20'
              : 'text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-[#141414] border border-[#E6DFD3] dark:border-transparent shadow-sm'
          }`}
        >
          {isRtl ? 'كافة التصنيفات' : 'All Categories'}
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#3b76b3] text-white font-semibold shadow-md shadow-[#3b76b3]/20'
                  : 'text-[#52525B] dark:text-stone-400 hover:text-[#18181B] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-[#141414] border border-[#E6DFD3] dark:border-transparent shadow-sm'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#E6DFD3] dark:border-[#1f1f1f] p-8">
          <p className="text-[#52525B] dark:text-stone-400 text-sm font-sans mb-3">
            {isRtl ? 'لا توجد أي مقالات أو أخبار مطابقة لمعايير البحث' : 'No news articles match your search criteria'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="text-xs text-[#3b76b3] hover:underline font-bold"
          >
            {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleNews.map((article, index) => {
              const title = isRtl ? article.titleAr : article.titleEn;
              const excerpt = isRtl ? article.excerptAr : article.excerptEn;
              const category = isRtl ? article.categoryAr : article.categoryEn;
              const date = (isRtl ? article.dateAr : article.dateEn) || article.date;
              const readTime = isRtl
                ? (article.readTimeAr || `${article.readMinutes || 3} دقائق قراءة`)
                : (article.readTimeEn && !/[\u0600-\u06FF]/.test(article.readTimeEn)
                    ? article.readTimeEn
                    : `${article.readMinutes || 3} min read`);

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min((index % BATCH_SIZE) * 0.05, 0.4) }}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3]/40 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/80"
                >
                  {/* Image */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#111111]">
                    <Image
                      src={article.image || '/assets/sliders/slider1.jpg'}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-black/30 dark:from-[#0a0a0a] dark:to-black/30" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white font-semibold">
                        {category}
                      </span>
                    </div>

                    {article.featured && (
                      <div className="absolute top-3.5 left-3.5">
                        <span className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-400 flex items-center justify-center backdrop-blur-md">
                          <Star className="w-3 h-3 fill-amber-400" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Meta Row */}
                      <div className="flex items-center gap-3 text-xs text-[#71717A] dark:text-stone-400 mb-2.5 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#3b76b3] dark:text-stone-500" />
                          <span>{date}</span>
                        </span>
                        <span className="text-stone-400 dark:text-stone-700">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#3b76b3] dark:text-stone-500" />
                          <span>{readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-lg sm:text-xl text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors leading-snug mb-3">
                        <Link href={`/${lang}/news/${article.id}`}>
                          {title}
                        </Link>
                      </h3>

                      <p className="text-[#52525B] dark:text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-sans">
                        {excerpt}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4 border-t border-[#E6DFD3] dark:border-[#1f1f1f] flex items-center justify-between">
                      <Link
                        href={`/${lang}/news/${article.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#18181B] dark:text-stone-300 group-hover:text-[#3b76b3] transition-colors"
                      >
                        <span>{dict.news.readArticle}</span>
                        <ArrowIcon className="w-3.5 h-3.5 text-[#3b76b3]" />
                      </Link>

                      <span className="text-[10px] font-mono text-[#71717A] dark:text-stone-500">CGL Insights</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Pagination & Load More Controls */}
          {filteredNews.length > BATCH_SIZE && (
            <div className="pt-4 pb-2 flex flex-col items-center justify-center gap-4">
              {/* Progress Indicator */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-[#52525B] dark:text-stone-400">
                <span>
                  {isRtl
                    ? `عرض ${Math.min(visibleCount, filteredNews.length)} من أصل ${filteredNews.length} مقال`
                    : `Showing ${Math.min(visibleCount, filteredNews.length)} of ${filteredNews.length} articles`}
                </span>
                <div className="w-36 sm:w-48 h-1.5 bg-[#E6DFD3] dark:bg-[#141414] rounded-full overflow-hidden border border-[#D4C8B8] dark:border-[#222]">
                  <div
                    className="h-full bg-[#3b76b3] transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.min(100, (visibleCount / filteredNews.length) * 100)}%`
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
                          ? `تحميل باقي المقالات (متبقي ${remainingCount})`
                          : `Load More (${remainingCount} remaining)`}
                      </span>
                    </button>

                    {remainingCount > BATCH_SIZE && (
                      <button
                        type="button"
                        onClick={handleShowAll}
                        className="text-xs font-mono text-[#52525B] dark:text-stone-400 hover:text-[#3b76b3] dark:hover:text-[#508ecb] transition-colors underline"
                      >
                        {isRtl ? 'عرض كافة المقالات دفعة واحدة' : 'Show All Articles'}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#71717A] dark:text-stone-500">
                      {isRtl ? '✓ تم عرض كافة المقالات بنجاح' : '✓ All articles displayed'}
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
