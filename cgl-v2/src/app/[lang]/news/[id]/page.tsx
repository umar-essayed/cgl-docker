import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Tag, 
  ArrowUpLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  FileText, 
  Building2, 
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { CGL_LATEST_NEWS, CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, isValidLocale, locales, getDictionary } from '@/lib/i18n';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BackToHomeButton from '@/components/common/BackToHomeButton';
import { getDynamicNewsArticle, getDynamicSiteData } from '@/lib/dynamicData';

interface NewsDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const paths: { lang: string; id: string }[] = [];
  for (const lang of locales) {
    for (const article of CGL_LATEST_NEWS) {
      paths.push({ lang, id: article.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const article = await getDynamicNewsArticle(id);
  if (!article) return { title: 'Article Not Found | CGL' };

  const isRtl = lang === 'ar';
  return {
    title: `${isRtl ? article.titleAr : article.titleEn} | CGL Insights`,
    description: isRtl ? article.excerptAr : article.excerptEn,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { lang, id } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const article = await getDynamicNewsArticle(id);

  if (!article) {
    notFound();
  }

  const siteData = await getDynamicSiteData();
  const otherArticles = siteData.news.filter((n) => n.id !== id).slice(0, 2);

  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const title = isRtl ? article.titleAr : article.titleEn;
  const excerpt = isRtl ? article.excerptAr : article.excerptEn;
  const category = isRtl ? article.categoryAr : article.categoryEn;
  const date = (isRtl ? article.dateAr : article.dateEn) || article.date;
  const readTime = isRtl
    ? (article.readTimeAr || `${article.readMinutes || 3} دقائق قراءة`)
    : (article.readTimeEn && !/[\u0600-\u06FF]/.test(article.readTimeEn)
        ? article.readTimeEn
        : `${article.readMinutes || 3} min read`);
  const author = isRtl 
    ? (article.authorAr || 'الفريق الاستشاري لمختبرات CGL')
    : (article.authorEn || 'CGL Technical Advisory Team');

  // Rich body paragraph fallback if full text is not set
  const articleContent = isRtl
    ? (article.contentAr || `
في إطار مواكبة التطورات المتسارعة في قطاع التشييد والبنية التحتية بالمملكة العربية السعودية، تؤكد مختبرات CGL (المعامل الإبداعية للجيوتقنية) التزامها الصارم بتطبيق أعلى المعايير الفنية واللوائح الإلزامية الصادرة عن الهيئة السعودية للمهندسين وكود البناء السعودي (SBC).

تتطلب طبيعة الأراضي والتكوينات الجيولوجية في المنطقة الغربية والوسطى استراتيجيات استكشاف معمقة، حيث يتم توظيف أحدث أسطول من حفارات الجسات الهيدروليكية ذات الأعماق الكبيرة لأخذ عينات مقلقلة وغير مقلقلة وفق مواصفات ASTM D1586 و ASTM D1587.

كما تساهم تقنيات الفحص غير المتلف (NDT) والرادار الأرضي (GPR) ثلاثي الأبعاد في توفير حلول تشخيصية فائقة الدقة لتقييم متانة الخرسانة المسلحة وتحديد مسارات حديد التسليح دون الحاجة لأي تكسير أو إتلاف في العناصر الحاملة، مما يضمن أقصى معايير الأمان والاستدامة للأصول الإنشائية.
`)
    : (article.contentEn || `
In line with rapid developments across the Kingdom of Saudi Arabia's construction and mega infrastructure sectors, Creative Geotechnical Laboratories (CGL) reaffirms its unwavering commitment to enforcing the highest engineering standards and mandatory protocols governed by the Saudi Building Code (SBC).

The complex geological formations across Saudi coastal and inland regions demand sophisticated exploration methodologies. CGL deploys state-of-the-art hydraulic rotary drilling rigs capable of continuous sampling and in-situ standard penetration testing strictly adhering to ASTM D1586 and ASTM D1587 standards.

Furthermore, our deployment of advanced Non-Destructive Testing (NDT) and 3D Ground Penetrating Radar (GPR) systems provides decisive diagnostic insights into reinforced concrete integrity and rebar layout without compromising structural elements, ensuring long-term asset resilience and regulatory compliance.
`);

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#030303] text-[#18181B] dark:text-stone-100 flex flex-col font-sans selection:bg-[#3b76b3] selection:text-white">
      <Navbar lang={lang} />

      {/* Hero / Header */}
      <header className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 border-b border-[#E6DFD3] dark:border-white/10 bg-[#F3ECE2] dark:bg-[#060606]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <BackToHomeButton lang={lang} />
              <Link
                href={`/${lang}/news`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#52525B] dark:text-stone-400 hover:text-[#3b76b3] transition-colors group px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-[#E6DFD3] dark:border-white/10 shadow-sm"
              >
                <BackIcon className="w-3.5 h-3.5 text-[#3b76b3] group-hover:-translate-x-1 transition-transform" />
                <span>{isRtl ? 'الأخبار والدراسات' : 'News & Insights'}</span>
              </Link>
            </div>

            <span className="px-3 py-1 rounded-full bg-white dark:bg-[#111111] border border-[#E6DFD3] dark:border-white/10 text-xs font-mono text-[#3b76b3] shadow-sm font-semibold">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#18181B] dark:text-white leading-tight tracking-tight mb-6">
            {title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E6DFD3] dark:border-white/10 text-xs font-mono text-[#52525B] dark:text-stone-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[#18181B] dark:text-stone-300">
                <Calendar className="w-4 h-4 text-[#3b76b3]" />
                <span>{date}</span>
              </div>
              <span className="text-stone-400 dark:text-stone-700">•</span>
              <div className="flex items-center gap-1.5 text-[#18181B] dark:text-stone-300">
                <Clock className="w-4 h-4 text-[#3b76b3]" />
                <span>{readTime}</span>
              </div>
            </div>

            <div className="text-[#52525B] dark:text-stone-400">
              {isRtl ? 'إعداد:' : 'By:'} <span className="text-[#18181B] dark:text-stone-200 font-semibold">{author}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 w-full">
        
        {/* Featured Image */}
        <div className="relative w-full h-[320px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#E6DFD3] dark:border-white/10 shadow-md dark:shadow-2xl bg-[#0e0e0e]">
          <Image
            src={article.image || '/assets/sliders/slider1.jpg'}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center filter contrast-105"
          />
        </div>

        {/* Lead Excerpt Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0a0a0a] border ${isRtl ? 'border-r-4 border-r-[#3b76b3]' : 'border-l-4 border-l-[#3b76b3]'} border-[#E6DFD3] dark:border-white/10 text-[#18181B] dark:text-stone-200 text-base sm:text-lg leading-relaxed font-sans font-normal shadow-sm`}>
          {excerpt}
        </div>

        {/* Article Body Typography */}
        <article className="prose dark:prose-invert prose-stone max-w-none text-[#3F3F46] dark:text-stone-300 font-sans leading-relaxed text-base sm:text-lg font-light space-y-6">
          {articleContent.split('\n\n').map((paragraph, pIdx) => {
            if (!paragraph.trim()) return null;
            return (
              <p key={pIdx} className="leading-relaxed">
                {paragraph.trim()}
              </p>
            );
          })}
        </article>

        {/* Technical Compliance Callout Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0c0c0c] dark:to-[#060606] border border-[#E6DFD3] dark:border-white/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#3b76b3] text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? 'الاعتماد الهندسي واللوائح' : 'ENGINEERING COMPLIANCE & STANDARDS'}</span>
            </div>
            <h4 className="text-base font-bold text-[#18181B] dark:text-white font-display">
              {isRtl ? 'مطابق لاشتراطات كود البناء السعودي ومعايير ASTM' : 'Compliant with Saudi Building Code & ASTM Protocols'}
            </h4>
            <p className="text-xs text-[#52525B] dark:text-stone-400 font-sans">
              {isRtl 
                ? 'تقارير فحص معتمدة وموثقة تضمن قبول التراخيص الإنشائية لدى كافة الجهات البلدية والاستشارية.'
                : 'Certified investigation deliverables recognized by municipal authorities and consultant bureaus.'}
            </p>
          </div>

          <Link
            href={`/${lang}/rfq`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs shadow-lg transition-all flex-shrink-0"
          >
            <span>{dict.nav.rfq}</span>
            <ArrowIcon className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Share & Inquire Bar */}
        <div className="pt-6 border-t border-[#E6DFD3] dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#52525B] dark:text-stone-400">
          <div className="flex items-center gap-2 text-[#18181B] dark:text-stone-300">
            <Tag className="w-3.5 h-3.5 text-[#3b76b3]" />
            <span>{isRtl ? 'التصنيف:' : 'Category:'}</span>
            <span className="text-[#18181B] dark:text-white font-bold">{category}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteData.settings?.phone2 || CGL_COMPANY_INFO.phone2}`}
              className="inline-flex items-center gap-1.5 text-[#52525B] dark:text-stone-300 hover:text-[#18181B] dark:hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#3b76b3]" />
              <span>{siteData.settings?.phone2 || CGL_COMPANY_INFO.phone2}</span>
            </a>
          </div>
        </div>

        {/* Other Related Articles */}
        {otherArticles.length > 0 && (
          <section className="pt-12 border-t border-[#E6DFD3] dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-[#18181B] dark:text-white">
                {isRtl ? 'مقالات وأخبار ذات صلة' : 'Related Articles & Reports'}
              </h3>
              <Link
                href={`/${lang}/news`}
                className="text-xs font-mono text-[#3b76b3] hover:underline font-bold"
              >
                {isRtl ? 'عرض كافة الأخبار' : 'View All'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {otherArticles.map((rel) => {
                const relTitle = isRtl ? rel.titleAr : rel.titleEn;
                const relDate = (isRtl ? rel.dateAr : rel.dateEn) || rel.date;
                return (
                  <Link
                    key={rel.id}
                    href={`/${lang}/news/${rel.id}`}
                    className="p-5 rounded-xl bg-white dark:bg-[#0a0a0a] border border-[#E6DFD3] dark:border-white/10 hover:border-[#3b76b3]/40 transition-all group flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="relative h-40 w-full rounded-lg overflow-hidden bg-black/50 mb-3">
                        <Image
                          src={rel.image || '/assets/sliders/slider1.jpg'}
                          alt={relTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-[#3b76b3] block mb-1 font-bold">
                        {isRtl ? rel.categoryAr : rel.categoryEn}
                      </span>
                      <h4 className="text-sm font-bold text-[#18181B] dark:text-white group-hover:text-[#3b76b3] transition-colors line-clamp-2">
                        {relTitle}
                      </h4>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E6DFD3] dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-stone-500">
                      <span>{relDate}</span>
                      <span className="inline-flex items-center gap-1 text-[#3b76b3] font-semibold">
                        <span>{dict.news.readArticle}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </main>

      <Footer lang={lang} companyInfo={siteData.settings} />
    </div>
  );
}
