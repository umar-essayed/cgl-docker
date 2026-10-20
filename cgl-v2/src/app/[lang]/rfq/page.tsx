import React from 'react';
import type { Metadata } from 'next';
import { Locale, isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { getDynamicSiteData } from '@/lib/dynamicData';
import RfqClient from './RfqClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  if (isRtl) {
    return {
      title: 'طلب عرض سعر فني (RFQ) | مختبرات CGL',
      description: 'بوابة تخصيص عروض الأسعار والدراسات الجيوتقنية وفحص المواد لكافة مشاريع المملكة وفق كود البناء السعودي.',
    };
  }

  return {
    title: 'Request a Quotation (RFQ) | CGL Laboratories',
    description: 'Online RFQ engineering proposal portal for soil investigation, pile testing, materials quality control, and surveying.',
  };
}

export default async function RfqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const siteData = await getDynamicSiteData();

  return <RfqClient lang={lang} companyInfo={siteData.settings} />;
}
