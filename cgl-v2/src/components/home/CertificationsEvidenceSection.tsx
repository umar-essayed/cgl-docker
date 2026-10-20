'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileText } from 'lucide-react';
import { CGL_STANDARDS_COMPLIANCE } from '@/lib/data';

export default function CertificationsEvidenceSection() {
  return (
    <section id="compliance" className="min-h-screen py-20 sm:py-28 flex flex-col justify-center bg-[#FBF9F5] dark:bg-[#000000] border-b border-[#E6DFD3] dark:border-white/5 text-[#18181B] dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-white dark:bg-[#181b22] border border-[#82B74B]/40 text-xs font-sans text-[#689938] dark:text-[#97C369] shadow-sm mb-3">
            <span className="w-2 h-2 bg-[#82B74B] rounded-full animate-pulse" />
            <span className="font-semibold">سجل الامتثال والاعتماد الهندسي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#18181B] dark:text-white mb-3">
            سجل الامتثال للمعايير والمواصفات القياسية
          </h2>
          <p className="text-[#52525B] dark:text-stone-300 text-xs sm:text-base font-sans leading-relaxed">
            جدول مرجعي يوضح أطر المعايير الفنية المعتمدة لضمان قبول واعتماد كافة التقارير لدى المكاتب الاستشارية والجهات الإشرافية.
          </p>
        </div>

        {/* Desktop Table View (Hidden on mobile / shown on md+) */}
        <div className="hidden md:block engineering-card rounded-xl overflow-hidden shadow-sm dark:shadow-2xl mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#F3ECE2] dark:bg-black/60 text-[#3F3F46] dark:text-stone-300 font-mono text-xs uppercase tracking-wider border-b border-[#E6DFD3] dark:border-white/10">
                <tr>
                  <th className="p-5">المعيار / الكود المعتمد</th>
                  <th className="p-5">الجهة المرجعية</th>
                  <th className="p-5">نطاق التطبيق الملزم</th>
                  <th className="p-5">حالة الامتثال</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD3] dark:divide-white/5 font-sans text-[#3F3F46] dark:text-stone-300">
                {CGL_STANDARDS_COMPLIANCE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-bold font-display text-base text-[#18181B] dark:text-white">
                      {item.name}
                    </td>
                    <td className="p-5 font-mono text-xs text-[#689938] dark:text-[#97C369] font-medium">
                      {item.issuingOrg}
                    </td>
                    <td className="p-5 text-sm text-[#52525B] dark:text-stone-300 leading-relaxed max-w-md">
                      {item.verifiedScopeAr}
                    </td>
                    <td className="p-5 font-mono text-xs">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-700/60 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 ml-1.5 text-emerald-600 dark:text-emerald-400" />
                        ساري وممتثل رسمياً
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Responsive Cards View (Shown only on mobile / hidden on md+) */}
        <div className="md:hidden space-y-4 mb-8">
          {CGL_STANDARDS_COMPLIANCE.map((item, idx) => (
            <div key={idx} className="engineering-card p-5 rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-bold text-base text-[#18181B] dark:text-white">
                  {item.name}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-700/60 text-[10px] font-mono whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3 ml-1 text-emerald-600 dark:text-emerald-400" />
                  ممتثل
                </span>
              </div>
              <div className="text-xs font-mono text-[#689938] dark:text-[#97C369] font-medium">
                الجهة: {item.issuingOrg}
              </div>
              <p className="text-xs text-[#52525B] dark:text-stone-300 font-sans leading-relaxed">
                {item.verifiedScopeAr}
              </p>
            </div>
          ))}
        </div>

        {/* Data Integrity Transparency Note */}
        <div className="p-4 sm:p-5 engineering-card rounded-xl flex items-start space-x-3 space-x-reverse text-xs text-[#3F3F46] dark:text-stone-300 font-sans">
          <Lock className="w-4 h-4 text-[#82B74B] ml-2.5 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-[#18181B] dark:text-white font-bold">سياسة تدقيق وسلامة البيانات:</strong> تلتزم CGL بعدم إدراج أي ادعاءات أو شهادات غير مدققة. تتوفر نسخ تقارير المعايرة الدورية للمعدات وسجلات ضبط الجودة للمشاريع عند طلب المكاتب الاستشارية وجهات الإشراف.
          </p>
        </div>
      </div>
    </section>
  );
}
