'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  Beaker, 
  ShieldCheck, 
  Crosshair, 
  Waves, 
  Mountain,
  Copy,
  History,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BackToHomeButton from '@/components/common/BackToHomeButton';
import { CGL_COMPANY_INFO } from '@/lib/data';
import { Locale, getDictionary } from '@/lib/i18n';

interface SavedProposal {
  id: string;
  refNumber: string;
  fullName: string;
  service: string;
  sector: string;
  city: string;
  samples: string;
  date: string;
  status: string;
}

interface RfqClientProps {
  lang: Locale;
  companyInfo?: any;
}

export default function RfqClient({ lang, companyInfo }: RfqClientProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  const services = [
    {
      id: 'geotech',
      title: isRtl ? 'فحص واستكشاف التربة والأساسات' : 'Geotechnical & Soil Investigation',
      desc: isRtl ? 'حفر الجسات الحقلية، اختبارات SPT، وتحديد قدرة تحمل التربة وتوصيات التأسيس.' : 'Deep borehole drilling, SPT tests, bearing capacity evaluation, and foundation design.',
      icon: Layers,
    },
    {
      id: 'materials',
      title: isRtl ? 'فحص وضبط جودة المواد والخرسانة' : 'Materials & Concrete Quality Control',
      desc: isRtl ? 'اختبارات كسر مكعبات الخرسانة، فحص الركام، واختبارات صلب التسليح.' : 'Concrete cube compressive strength, aggregate sieving, and rebar tensile testing.',
      icon: Beaker,
    },
    {
      id: 'ndt',
      title: isRtl ? 'تقييم سلامة المنشآت والفحوصات اللاإتلافية' : 'Structural Auditing & NDT Testing',
      desc: isRtl ? 'مسح الرادار الأرضي GPR، الموجات فوق الصوتية، وتقييم شروخ وتصدعات المباني.' : 'Ground penetrating radar (GPR), ultrasonic pulse velocity (UPV), and crack auditing.',
      icon: ShieldCheck,
    },
    {
      id: 'survey',
      title: isRtl ? 'المسح الطبوغرافي والرصد الجيوديسي' : 'Topographic & Geodetic Surveying',
      desc: isRtl ? 'الرفع المساحي الرقمي، أجهزة GNSS/Total Station، وتثبيت المحاور ورصد الهبوط.' : 'Digital topographic layout, GNSS/Total station reality capture, and deformation monitoring.',
      icon: Crosshair,
    },
    {
      id: 'shoring',
      title: isRtl ? 'هندسة سند الحفر ونزح المياه الجوفية' : 'Shoring & Dewatering Engineering',
      desc: isRtl ? 'تصميم وإشراف نظم سند الحفر العميق، دراسات خفض منسوب المياه وتصاميم الخوازيق.' : 'Deep excavation retention design, groundwater drawdown modeling, and secant pile analysis.',
      icon: Waves,
    },
    {
      id: 'mining',
      title: isRtl ? 'اختبارات التعدين والجيولوجيا والبيئة' : 'Mining & Geological Exploration',
      desc: isRtl ? 'اختبارات ضغط الصخور، تقييم المحاجر والمناجم، وتحليل ملوحة وتلوث التربة.' : 'Rock mechanics, quarry evaluation, core classification, and environmental salinity testing.',
      icon: Mountain,
    },
  ];

  const sectors = isRtl
    ? ['أبراج وناطحات سحاب', 'مباني سكنية وتجارية', 'مشاريع بنية تحتية وطرق', 'منشآت صناعية ومستودعات', 'محاجر ومشاريع تعدين', 'مشاريع حكومية واستراتيجية']
    : ['Towers & High-Rises', 'Residential & Commercial Buildings', 'Infrastructure & Highways', 'Industrial & Warehousing', 'Quarries & Mining Operations', 'Governmental & Strategic Projects'];

  const cities = isRtl
    ? ['جدة', 'الرياض', 'مكة المكرمة', 'المنطقة الشرقية / الدمام', 'نيوم / تبوك', 'مدينة أخرى']
    : ['Jeddah', 'Riyadh', 'Makkah', 'Eastern Province / Dammam', 'NEOM / Tabuk', 'Other City'];

  const sampleRanges = isRtl
    ? ['1 - 3 جسات', '4 - 8 جسات', 'أكثر من 8 جسات', 'غير محدد (يحتاج استشارة)']
    : ['1 - 3 Boreholes', '4 - 8 Boreholes', 'More than 8 Boreholes', 'Unspecified (Needs Consultation)'];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedSector, setSelectedSector] = useState(sectors[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedSamples, setSelectedSamples] = useState(sampleRanges[0]);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastRefNumber, setLastRefNumber] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [savedProposals, setSavedProposals] = useState<SavedProposal[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved proposals from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cgl_saved_proposals');
      if (stored) {
        setSavedProposals(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error reading saved proposals from localStorage:', err);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyRef = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleRemoveSavedProposal = (ref: string) => {
    const updated = savedProposals.filter(p => p.refNumber !== ref);
    setSavedProposals(updated);
    try {
      localStorage.setItem('cgl_saved_proposals', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearHistory = () => {
    setSavedProposals([]);
    try {
      localStorage.removeItem('cgl_saved_proposals');
    } catch (e) {
      console.error(e);
    }
  };

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.company,
          phone: formData.phone,
          email: formData.email,
          projectType: selectedSector,
          location: selectedCity,
          selectedServices: [activeServiceObj.title],
          estimatedAreaDepth: selectedSamples,
          notes: formData.notes,
          lang
        })
      });

      const data = await res.json();
      const generatedRef = data.refNumber || `CGL-RFQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setLastRefNumber(generatedRef);

      // Save proposal into device's localStorage
      const newProposalItem: SavedProposal = {
        id: data.id || Date.now().toString(),
        refNumber: generatedRef,
        fullName: formData.fullName,
        service: activeServiceObj.title,
        sector: selectedSector,
        city: selectedCity,
        samples: selectedSamples,
        date: new Date().toISOString(),
        status: 'new'
      };

      try {
        const storedStr = localStorage.getItem('cgl_saved_proposals');
        const list: SavedProposal[] = storedStr ? JSON.parse(storedStr) : [];
        const updatedList = [newProposalItem, ...list.filter(p => p.refNumber !== generatedRef)];
        localStorage.setItem('cgl_saved_proposals', JSON.stringify(updatedList));
        localStorage.setItem('cgl_last_proposal_ref', generatedRef);
        setSavedProposals(updatedList);
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to submit RFQ:', err);
      // Fallback proposal ref
      const fallbackRef = `CGL-RFQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setLastRefNumber(fallbackRef);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMsg = encodeURIComponent(
    isRtl
      ? `مرحباً مهندسي CGL، أرسلت للتو طلب تسعير فني لمشروع (${activeServiceObj.title}) في ${selectedCity}.\nالرقم المرجعي للطلب: ${lastRefNumber}\nالاسم: ${formData.fullName}`
      : `Hello CGL Engineering team, I have just submitted a technical proposal request for (${activeServiceObj.title}) in ${selectedCity}.\nReference: ${lastRefNumber}\nName: ${formData.fullName}`
  );

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#000000] text-[#18181B] dark:text-stone-100 flex flex-col font-sans">
      <Navbar lang={lang} />

      <main className="flex-grow pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <div className="mb-6">
            <BackToHomeButton lang={lang} />
          </div>

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] text-xs font-sans text-[#3b76b3] mb-3.5 shadow-sm">
              <span className="w-2 h-2 bg-[#3b76b3] rounded-full animate-pulse" />
              <span className="font-semibold">{dict.rfq.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#18181B] dark:text-white tracking-tight mb-2.5">
              {dict.rfq.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#52525B] dark:text-stone-400 font-sans leading-relaxed">
              {dict.rfq.subtitle}
            </p>
          </div>

          {!isSuccess ? (
            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-[#E6DFD3] dark:border-[#1f1f1f] p-4 sm:p-8 lg:p-10 shadow-sm dark:shadow-2xl">
              
              {/* 3-Step Progress Indicator (Mobile-optimized) */}
              <div className="relative mb-8 sm:mb-10 px-2 sm:px-6">
                <div className="absolute top-4 sm:top-5 left-8 right-8 h-[2px] bg-[#E6DFD3] dark:bg-[#1f1f1f] -translate-y-1/2 z-0" />
                <div className="relative z-10 flex justify-between">
                  {[1, 2, 3].map((step) => {
                    const isPassed = currentStep > step;
                    const isCurrent = currentStep === step;
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (isPassed) setCurrentStep(step);
                          }}
                          disabled={!isPassed && !isCurrent}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all ${
                            isCurrent
                              ? 'bg-[#3b76b3] text-white font-bold ring-4 ring-[#3b76b3]/20 shadow-lg shadow-[#3b76b3]/30 scale-105'
                              : isPassed
                              ? 'bg-[#3b76b3]/20 text-[#3b76b3] border border-[#3b76b3] cursor-pointer'
                              : 'bg-[#F3ECE2] dark:bg-[#111111] text-[#71717A] dark:text-stone-500 border border-[#E6DFD3] dark:border-[#222222]'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4" /> : `0${step}`}
                        </button>
                        <span className={`text-[11px] sm:text-xs font-sans mt-2 whitespace-nowrap ${isCurrent ? 'text-[#18181B] dark:text-white font-bold' : 'text-[#71717A] dark:text-stone-400'}`}>
                          {step === 1 && (isRtl ? 'الخدمة' : 'Service')}
                          {step === 2 && (isRtl ? 'الموقع والنطاق' : 'Scope')}
                          {step === 3 && (isRtl ? 'بيانات التواصل' : 'Contact')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1: Services & Sector */}
              {currentStep === 1 && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm sm:text-base font-bold text-[#18181B] dark:text-white flex items-center gap-2">
                        <span className="w-1.5 h-4 rounded-full bg-[#3b76b3]" />
                        <span>{isRtl ? '1. نوع الفحص أو الخدمة الهندسية المطلوبة' : '1. Select Required Engineering Service'}</span>
                      </h3>
                      <span className="text-[11px] text-[#71717A] dark:text-stone-500 hidden sm:inline-block font-mono">
                        {services.length} {isRtl ? 'خدمات معتمدة' : 'Accredited Services'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((srv) => {
                        const isSelected = selectedService === srv.id;
                        const IconComponent = srv.icon;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => setSelectedService(srv.id)}
                            className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer transition-all active:scale-[0.99] select-none ${
                              isSelected
                                ? 'bg-[#3b76b3]/10 border-[#3b76b3] ring-1 ring-[#3b76b3]/30 shadow-md'
                                : 'bg-[#FBF9F5] dark:bg-[#111111] border-[#E6DFD3] dark:border-[#1f1f1f] hover:border-[#3b76b3] dark:hover:border-stone-700 hover:bg-white dark:hover:bg-[#151515]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                                isSelected ? 'bg-[#3b76b3] text-white font-bold' : 'bg-white dark:bg-white/5 text-[#52525B] dark:text-stone-400 border border-[#E6DFD3] dark:border-transparent'
                              }`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <h4 className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-[#3b76b3]' : 'text-[#18181B] dark:text-white'}`}>
                                    {srv.title}
                                  </h4>
                                  {isSelected && (
                                    <div className="w-4 h-4 rounded-full bg-[#3b76b3] text-white font-bold flex items-center justify-center flex-shrink-0">
                                      <Check className="w-2.5 h-2.5" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-[11px] sm:text-xs text-[#52525B] dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                                  {srv.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#18181B] dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#3b76b3]" />
                      <span>{isRtl ? '2. تصنيف وقطاع المشروع' : '2. Project Classification / Sector'}</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {sectors.map((sec, sIdx) => {
                        const isSelected = selectedSector === sec;
                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setSelectedSector(sec)}
                            className={`p-3 rounded-xl text-xs font-medium border text-center transition-all active:scale-95 min-h-[44px] flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#3b76b3]/15 border-[#3b76b3] text-[#3b76b3] font-bold shadow-sm'
                                : 'bg-[#FBF9F5] dark:bg-[#111111] border-[#E6DFD3] dark:border-[#1f1f1f] text-[#52525B] dark:text-stone-300 hover:bg-white dark:hover:bg-white/5 hover:border-[#3b76b3]'
                            }`}
                          >
                            <span>{sec}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#3b76b3]/20 transition-all active:scale-[0.98]"
                    >
                      <span>{isRtl ? 'المتابعة: الموقع وحجم العمل' : 'Next: Location & Scope'}</span>
                      <NextIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Work Scope */}
              {currentStep === 2 && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#18181B] dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#3b76b3]" />
                      <span>{isRtl ? '1. موقع المشروع الجغرافي / المدينة' : '1. Project City / Location'}</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {cities.map((city, cIdx) => {
                        const isSelected = selectedCity === city;
                        return (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => setSelectedCity(city)}
                            className={`p-3 rounded-xl text-xs font-medium border text-center transition-all active:scale-95 min-h-[44px] flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#3b76b3]/15 border-[#3b76b3] text-[#3b76b3] font-bold shadow-sm'
                                : 'bg-[#FBF9F5] dark:bg-[#111111] border-[#E6DFD3] dark:border-[#1f1f1f] text-[#52525B] dark:text-stone-300 hover:bg-white dark:hover:bg-white/5 hover:border-[#3b76b3]'
                            }`}
                          >
                            <span>{city}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#18181B] dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#3b76b3]" />
                      <span>{isRtl ? '2. حجم العمل التقديري أو عدد الجسات' : '2. Estimated Boreholes / Investigation Scope'}</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {sampleRanges.map((range, rIdx) => {
                        const isSelected = selectedSamples === range;
                        return (
                          <button
                            key={rIdx}
                            type="button"
                            onClick={() => setSelectedSamples(range)}
                            className={`p-3 rounded-xl text-xs font-medium border text-center transition-all active:scale-95 min-h-[44px] flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#3b76b3]/15 border-[#3b76b3] text-[#3b76b3] font-bold shadow-sm'
                                : 'bg-[#FBF9F5] dark:bg-[#111111] border-[#E6DFD3] dark:border-[#1f1f1f] text-[#52525B] dark:text-stone-300 hover:bg-white dark:hover:bg-white/5 hover:border-[#3b76b3]'
                            }`}
                          >
                            <span>{range}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#18181B] dark:text-stone-300 mb-2 font-bold">
                      {dict.rfq.form.notes}
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={dict.rfq.form.notesPlaceholder}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-white placeholder-[#71717A] dark:placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#3b76b3] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] hover:bg-stone-100 dark:hover:bg-[#181818] text-[#52525B] dark:text-stone-300 font-medium text-xs sm:text-sm border border-[#E6DFD3] dark:border-[#1f1f1f] transition-all active:scale-95 shadow-sm"
                    >
                      <BackIcon className="w-4 h-4" />
                      <span>{isRtl ? 'السابق' : 'Back'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#3b76b3]/20 transition-all active:scale-95"
                    >
                      <span>{isRtl ? 'التالي: بيانات التواصل' : 'Next: Contact'}</span>
                      <NextIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details & Submit */}
              {currentStep === 3 && (
                <form onSubmit={handleFormSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#18181B] dark:text-stone-300 mb-1.5 font-bold">
                        {dict.rfq.form.fullName} *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={dict.rfq.form.fullNamePlaceholder}
                        className="w-full p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-white placeholder-[#71717A] dark:placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#3b76b3] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#18181B] dark:text-stone-300 mb-1.5 font-bold">
                        {dict.rfq.form.company}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={dict.rfq.form.companyPlaceholder}
                        className="w-full p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-white placeholder-[#71717A] dark:placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#3b76b3] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#18181B] dark:text-stone-300 mb-1.5 font-bold">
                        {dict.rfq.form.phone} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={dict.rfq.form.phonePlaceholder}
                        className="w-full p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-white placeholder-[#71717A] dark:placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#3b76b3] transition-colors"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#18181B] dark:text-stone-300 mb-1.5 font-bold">
                        {dict.rfq.form.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={dict.rfq.form.emailPlaceholder}
                        className="w-full p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#222222] text-[#18181B] dark:text-white placeholder-[#71717A] dark:placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-[#3b76b3] transition-colors"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#F3ECE2] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] text-xs space-y-2">
                    <div className="text-[#18181B] dark:text-white font-bold flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4 text-[#3b76b3]" />
                      <span>{isRtl ? 'ملخص نطاق الطلب الهندسي:' : 'Engineering Scope Summary:'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#52525B] dark:text-stone-400">
                      <div><strong className="text-[#18181B] dark:text-stone-300">{isRtl ? 'الخدمة:' : 'Service:'}</strong> {activeServiceObj.title}</div>
                      <div><strong className="text-[#18181B] dark:text-stone-300">{isRtl ? 'القطاع:' : 'Sector:'}</strong> {selectedSector}</div>
                      <div><strong className="text-[#18181B] dark:text-stone-300">{isRtl ? 'المدينة:' : 'City:'}</strong> {selectedCity}</div>
                      <div><strong className="text-[#18181B] dark:text-stone-300">{isRtl ? 'حجم العمل:' : 'Scope:'}</strong> {selectedSamples}</div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] hover:bg-stone-100 dark:hover:bg-[#181818] text-[#52525B] dark:text-stone-300 font-medium text-xs sm:text-sm border border-[#E6DFD3] dark:border-[#1f1f1f] transition-all active:scale-95 shadow-sm"
                    >
                      <BackIcon className="w-4 h-4" />
                      <span>{isRtl ? 'السابق' : 'Back'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#3b76b3] hover:bg-[#2a5b8c] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#3b76b3]/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{dict.rfq.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{dict.rfq.form.submitBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* Success Screen with Reference Number & LocalStorage Notice */
            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-[#E6DFD3] dark:border-[#1f1f1f] p-6 sm:p-12 text-center shadow-sm dark:shadow-2xl space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#3b76b3]/15 text-[#3b76b3] flex items-center justify-center mx-auto ring-8 ring-[#3b76b3]/10 shadow-lg shadow-[#3b76b3]/20">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#18181B] dark:text-white mb-2">
                  {dict.rfq.form.successTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#52525B] dark:text-stone-300 max-w-lg mx-auto leading-relaxed">
                  {dict.rfq.form.successDesc}
                </p>
              </div>

              {/* Highlighted Proposal Reference Number Box */}
              {lastRefNumber && (
                <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#111317] border border-[#3b76b3]/30 shadow-inner">
                  <span className="text-xs font-mono text-[#52525B] dark:text-stone-400 block mb-1">
                    {dict.rfq.form.refNumberLabel}
                  </span>
                  
                  <div className="flex items-center justify-center gap-3 my-2">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#3b76b3] tracking-wider select-all" dir="ltr">
                      {lastRefNumber}
                    </span>
                    <button
                      onClick={() => handleCopyRef(lastRefNumber)}
                      className="p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-[#52525B] dark:text-stone-300 hover:text-black dark:hover:text-white border border-[#E6DFD3] dark:border-white/10 transition-all active:scale-95 shadow-sm"
                      title={dict.rfq.form.copyRefBtn}
                    >
                      {copied ? <Check className="w-4 h-4 text-[#3b76b3]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {copied && (
                    <span className="text-[11px] font-bold text-[#3b76b3] block animate-fade-in">
                      {dict.rfq.form.copiedSuccess}
                    </span>
                  )}

                  <div className="mt-3 pt-3 border-t border-[#E6DFD3] dark:border-white/5 text-[11px] text-[#71717A] dark:text-stone-400 flex items-center justify-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#3b76b3] flex-shrink-0" />
                    <span>{dict.rfq.form.savedLocallyNotice}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${CGL_COMPANY_INFO.whatsapp1Raw}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isRtl ? 'متابعة فورية عبر واتساب' : 'Direct Follow-up via WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setFormData({ fullName: '', company: '', phone: '', email: '', notes: '' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] hover:bg-stone-100 dark:hover:bg-[#181818] text-[#52525B] dark:text-stone-300 font-medium text-xs sm:text-sm border border-[#E6DFD3] dark:border-[#1f1f1f] transition-all active:scale-95 shadow-sm"
                >
                  <span>{dict.rfq.form.newRequestBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Saved Proposals on this Device Section */}
          {savedProposals.length > 0 && (
            <div className="mt-10 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#E6DFD3] dark:border-[#1f1f1f] overflow-hidden shadow-sm dark:shadow-lg">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-stone-50 dark:hover:bg-[#111111] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#3b76b3]/10 text-[#3b76b3]">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#18181B] dark:text-white">
                      {dict.rfq.form.savedRequestsTitle}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#52525B] dark:text-stone-400">
                      {isRtl ? `لديك (${savedProposals.length}) طلبات محفوظة على هذا الجهاز` : `You have ${savedProposals.length} proposal(s) on this device`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#F3ECE2] dark:bg-[#161616] text-[#3b76b3] font-mono text-xs font-bold border border-[#E6DFD3] dark:border-[#222]">
                    {savedProposals.length}
                  </span>
                  {showHistory ? <ChevronUp className="w-4 h-4 text-[#71717A] dark:text-stone-400" /> : <ChevronDown className="w-4 h-4 text-[#71717A] dark:text-stone-400" />}
                </div>
              </button>

              {showHistory && (
                <div className="p-4 sm:p-5 border-t border-[#E6DFD3] dark:border-[#1f1f1f] space-y-3">
                  <div className="flex items-center justify-between pb-2 text-[11px] text-[#52525B] dark:text-stone-400">
                    <span>{isRtl ? 'سجل الطلبات المحلية' : 'Device Proposal Log'}</span>
                    <button
                      onClick={handleClearHistory}
                      className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 inline-flex items-center gap-1 text-[10px] font-bold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{dict.rfq.form.clearHistory}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {savedProposals.map((item) => (
                      <div
                        key={item.refNumber}
                        className="p-3.5 rounded-xl bg-[#FBF9F5] dark:bg-[#111111] border border-[#E6DFD3] dark:border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#3b76b3]" dir="ltr">
                              {item.refNumber}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 text-[#52525B] dark:text-stone-300 border border-[#E6DFD3] dark:border-transparent text-[10px]">
                              {item.service}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#71717A] dark:text-stone-400 mt-1 flex items-center gap-2">
                            <span>{item.city}</span>
                            <span>•</span>
                            <span>{item.sector}</span>
                            <span>•</span>
                            <span className="font-mono text-[10px]">
                              {new Date(item.date).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleCopyRef(item.refNumber)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-[#52525B] dark:text-stone-300 text-[11px] inline-flex items-center gap-1 border border-[#E6DFD3] dark:border-white/5 shadow-sm"
                            title="نسخ الرقم المرجعي"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                          </button>

                          <a
                            href={`https://wa.me/${CGL_COMPANY_INFO.whatsapp1Raw}?text=${encodeURIComponent(
                              isRtl 
                                ? `مرحباً، أود الاستفسار عن طلبي رقم (${item.refNumber}) الخاص بـ ${item.service} في ${item.city}.`
                                : `Hello, I'd like to check on my proposal #${item.refNumber} for ${item.service} in ${item.city}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 text-[11px] inline-flex items-center gap-1 border border-[#25D366]/20 font-bold"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>{isRtl ? 'واتساب' : 'WhatsApp'}</span>
                          </a>

                          <button
                            onClick={() => handleRemoveSavedProposal(item.refNumber)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 transition-colors"
                            title="حذف من السجل المحلي"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer lang={lang} companyInfo={companyInfo} />
    </div>
  );
}
