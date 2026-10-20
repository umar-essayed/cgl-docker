import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, locales } from '@/lib/i18n';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BackToHomeButton from '@/components/common/BackToHomeButton';
import { getDynamicSiteData } from '@/lib/dynamicData';
import NewsCatalogClient from './NewsCatalogClient';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  if (isRtl) {
    return {
      title: 'الأخبار والمقالات والتحليلات الهندسية | CGL',
      description: 'أحدث الأخبار الهندسية، التحديثات التشغيلية، ومقالات كود البناء السعودي والأبحاث الجيوتقنية من شركة CGL.',
    };
  }

  return {
    title: 'Engineering News & Technical Insights | CGL',
    description: 'Latest geotechnical engineering developments, operational updates, and technical insights on Saudi Building Code by CGL.',
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const isRtl = lang === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;
  const siteData = await getDynamicSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-black text-[#18181B] dark:text-white selection:bg-[#3b76b3] selection:text-white">
      <Navbar lang={lang} />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-3 text-xs font-mono text-[#52525B] dark:text-stone-400 mb-6">
            <BackToHomeButton lang={lang} />
            <ChevronIcon className="w-3.5 h-3.5 text-stone-400 dark:text-stone-600" />
            <span className="text-[#18181B] dark:text-white font-semibold">
              {isRtl ? 'الأخبار والمقالات' : 'News & Insights'}
            </span>
          </nav>

          {/* Page Header */}
          <div className="mb-10 sm:mb-12 pb-6 border-b border-[#E6DFD3] dark:border-[#1f1f1f]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] text-xs font-sans text-[#3b76b3] mb-3 shadow-sm">
              <span className="w-2 h-2 bg-[#3b76b3] rounded-full animate-pulse" />
              <span className="font-semibold">{isRtl ? 'المركز الإعلامي والمعرفة الهندسية' : 'Media Center & Engineering Knowledge'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-[#18181B] dark:text-white tracking-tight">
              {isRtl ? 'الأخبار والمقالات والتحليلات الهندسية' : 'Engineering News & Technical Insights'}
            </h1>

            <p className="text-[#52525B] dark:text-stone-400 text-xs sm:text-base font-sans mt-2.5 max-w-2xl leading-relaxed">
              {isRtl
                ? 'مواكبة لأحدث تقنيات فحص التربة، مشاريع البنية التحتية، وأوراق العمل التقنية المتوافقة مع كود البناء السعودي SBC.'
                : 'Stay updated with the latest geotechnical testing technologies, infrastructure developments, and SBC compliance insights.'}
            </p>
          </div>

          {/* Interactive Catalog Component */}
          <NewsCatalogClient lang={lang} initialNews={siteData.news} />
        </div>
      </main>

      <Footer lang={lang} companyInfo={siteData.settings} />
    </div>
  );
}
