import React from 'react';
import type { Metadata } from 'next';
import { Locale, isValidLocale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/home/Hero';
import PartnersTicker from '@/components/home/PartnersTicker';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsEvidenceSection from '@/components/home/ProjectsEvidenceSection';
import EquipmentSection from '@/components/home/EquipmentSection';
import NewsSection from '@/components/home/NewsSection';
import CompanyLocationSection from '@/components/home/CompanyLocationSection';
import RfqSection from '@/components/home/RfqSection';
import Footer from '@/components/footer/Footer';
import { getDynamicSiteData } from '@/lib/dynamicData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  if (isRtl) {
    return {
      title: 'CGL | مختبرات الهندسة الجيوتقنية وفحص المواد',
      description: 'فرع معتمد لمجموعة CGI العالمية (USA & KSA). فحص التربة والأساسات، اختبارات المواد، تقييم سلامة المباني، والمسح الطبوغرافي وفق كود البناء السعودي SBC 303/304.',
    };
  }

  return {
    title: 'CGL | Creative Geotechnical Laboratories',
    description: 'A proud franchise of CGI Group (USA & KSA). Geotechnical & soil investigation, materials testing, building integrity assessment, and surveying compliant with SBC.',
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  // Fetch dynamic collections from MySQL (with memory cache)
  const siteData = await getDynamicSiteData();

  return (
    <main className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#000000] text-[#18181B] dark:text-white selection:bg-[#3b76b3] selection:text-white">
      <Navbar lang={lang} />
      <Hero lang={lang} slides={siteData.heroSlides} stats={siteData.settings?.stats} />
      <PartnersTicker lang={lang} partners={siteData.partners} />
      <ServicesSection lang={lang} services={siteData.services} />
      <ProjectsEvidenceSection lang={lang} projects={siteData.projects} />
      <EquipmentSection lang={lang} equipment={siteData.equipment} />
      <NewsSection lang={lang} news={siteData.news} />
      <RfqSection lang={lang} />
      <CompanyLocationSection lang={lang} companyInfo={siteData.settings} />
      <Footer lang={lang} companyInfo={siteData.settings} />
    </main>
  );
}
