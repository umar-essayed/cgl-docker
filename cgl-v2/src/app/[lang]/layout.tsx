import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, isValidLocale } from '@/lib/i18n';
import LangDirSync from '@/components/theme/LangDirSync';
import ThemeSync from '@/components/theme/ThemeSync';
import PageLoader from '@/components/common/PageLoader';
import { getDynamicSiteData } from '@/lib/dynamicData';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const title = isAr
    ? 'CGL | مختبرات الهندسة الجيوتقنية وفحص المواد'
    : 'CGL | Creative Geotechnical Laboratories & Materials Testing';

  const description = isAr
    ? 'مختبرات CGL الجيوتقنية وفحص المواد - فرع معتمد لمجموعة CGI العالمية (USA & KSA). فحص التربة والأساسات، اختبارات المواد، تقييم سلامة المباني، والمسح الطبوغرافي وفق كود البناء السعودي SBC 303/304.'
    : 'Creative Geotechnical Laboratories (CGL) - A proud franchise of CGI Group (USA & KSA). Geotechnical & soil investigation, materials testing, building integrity assessment, and surveying compliant with SBC 303/304.';

  const url = isAr
    ? 'https://cgl-sable.vercel.app/ar'
    : 'https://cgl-sable.vercel.app/en';

  return {
    title: {
      default: title,
      template: '%s | CGL',
    },
    description,
    keywords: isAr ? [
      'CGL',
      'Creative Geotechnical Laboratories',
      'مختبرات جيوتقنية',
      'فحص التربة والأساسات',
      'اختبارات الخرسانة والمواد',
      'تقييم سلامة المباني',
      'المسح الطبوغرافي',
      'كود البناء السعودي',
      'SBC 303',
      'SBC 304',
      'جسات التربة',
      'جدة',
      'السعودية'
    ] : [
      'CGL',
      'Creative Geotechnical Laboratories',
      'Soil Investigation',
      'Geotechnical Engineering',
      'Materials Testing',
      'Building Integrity Assessment',
      'Topographic Surveying',
      'Saudi Building Code',
      'SBC 303',
      'SBC 304',
      'Jeddah',
      'Saudi Arabia'
    ],
    alternates: {
      canonical: url,
      languages: {
        'ar': 'https://cgl-sable.vercel.app/ar',
        'en': 'https://cgl-sable.vercel.app/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      url,
      siteName: isAr ? 'مختبرات CGL الهندسية الجيوتقنية' : 'Creative Geotechnical Laboratories (CGL)',
      title,
      description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isAr ? 'مختبرات CGL الجيوتقنية وفحص المواد' : 'Creative Geotechnical Laboratories (CGL)',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const isRtl = lang === 'ar';
  const data = await getDynamicSiteData();
  const themeColor = ((data.settings as any)?.themeColor || 'blue') as 'blue' | 'green';
  const themeMode = ((data.settings as any)?.themeMode || 'dark') as 'dark' | 'light';
  const allowLightMode = Boolean((data.settings as any)?.allowLightMode);
  const loaderColor = themeColor === 'green' ? '#16a34a' : '#3b76b3';
  const loaderGlow = themeColor === 'green' ? 'rgba(22, 163, 74, 0.45)' : 'rgba(59, 118, 179, 0.45)';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-theme-color={themeColor}
      className={`min-h-screen flex flex-col ${themeColor === 'green' ? 'theme-green' : 'theme-blue'}`}
    >
      <LangDirSync lang={lang} />
      <ThemeSync themeColor={themeColor} themeMode={themeMode} allowLightMode={allowLightMode} />
      <PageLoader color={loaderColor} glowColor={loaderGlow} />
      {children}
    </div>
  );
}
