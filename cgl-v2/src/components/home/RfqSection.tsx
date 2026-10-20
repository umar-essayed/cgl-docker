'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import { CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';

interface RfqSectionProps {
  lang?: Locale;
}

export default function RfqSection({ lang = 'ar' }: RfqSectionProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const whatsappMsg = encodeURIComponent(
    isRtl
      ? 'السلام عليكم، أود الاستفسار وطلب تسعير فني لمشروع هندسي من مختبرات CGL.'
      : 'Hello, I would like to inquire and request a technical proposal for an engineering project from CGL Laboratories.'
  );

  return (
    <section id="rfq" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#000000] border-b border-[#E6DFD3] dark:border-[#1f1f1f] text-[#18181B] dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16 border-y border-[#E6DFD3] dark:border-[#1f1f1f] py-12 sm:py-16">
          
          {/* Authority Callout */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#3b76b3] mb-3 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#3b76b3]" />
              <span>{dict.rfq.badge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#18181B] dark:text-white mb-4 leading-tight">
              {isRtl ? 'جاهز لإطلاق التحريات الجيوتقنية لمشروعك؟' : 'Ready to Launch Geotechnical Investigations for Your Project?'}
            </h2>
            
            <p className="text-[#52525B] dark:text-stone-300 text-xs sm:text-sm lg:text-base font-sans leading-relaxed mb-6">
              {isRtl
                ? 'بوابتنا المخصصة تتيح للمطورين والاستشاريين تحديد نطاق الحفر والاستكشاف المخبري بخطوات معيارية، ليتولى الفريق الهندسي إعداد العرض المطابق لاشتراطات كود البناء السعودي.'
                : 'Our dedicated portal enables developers and consultants to specify borehole scopes and laboratory testing in structured steps for immediate technical evaluation.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#52525B] dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3b76b3] flex-shrink-0" />
                <span>SBC 303 • SBC 304 Standards</span>
              </span>
              <span className="text-[#A1A1AA] dark:text-stone-700">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3b76b3] flex-shrink-0" />
                <span>{isRtl ? 'دراسة المتطلبات خلال ساعات العمل' : 'Rapid 24h Project Review'}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:w-auto w-full flex-shrink-0">
            <Link
              href={`/${lang}/rfq`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:shadow-[#3b76b3]/20 active:scale-[0.99]"
            >
              <span>{isRtl ? 'بدء تخصيص ونطاق التسعير الفني' : 'Start Technical RFQ Scope'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${CGL_COMPANY_INFO.whatsapp1Raw}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#25D366]/40 text-[#18181B] dark:text-stone-200 hover:text-[#25D366] dark:hover:text-white font-bold text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isRtl ? 'محادثة المهندس المناوب (WhatsApp)' : 'Duty Engineer Hotline (WhatsApp)'}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
