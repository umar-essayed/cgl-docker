export type Locale = 'ar' | 'en';

export const defaultLocale: Locale = 'ar';
export const locales: Locale[] = ['ar', 'en'];

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export const dictionaries = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    nav: {
      home: 'الرئيسية',
      about: 'عن المؤسسة',
      services: 'خدماتنا',
      projects: 'مشاريعنا',
      equipment: 'معداتنا',
      news: 'الأخبار',
      rfq: 'طلب عرض سعر',
      contact: 'تواصل معنا',
      callNow: 'اتصل بنا',
      whatsapp: 'واتساب',
      switchLang: 'English',
      switchLangTarget: 'en',
      themeLight: 'الوضع الفاتح',
      themeDark: 'الوضع الداكن',
    },
    hero: {
      affiliation: 'فرع معتمد لمجموعة CGI العالمية (المملكة العربية السعودية وأمريكا)',
      ctaRfq: 'طلب عرض سعر فوري',
      ctaServices: 'استعراض الخدمات الهندسية',
      liveConsultation: 'استشارة هندسية مباشرة',
      sbcCompliance: 'معتمد وفق كود البناء السعودي SBC 303 • SBC 304',
      slides: [
        {
          id: 1,
          tag: 'الدراسات الجيوتقنية واستكشاف التربة',
          title: 'الدقة الهندسية في فحص التربة التي ترتكز عليها كبرى مشاريع المملكة',
          subtitle: 'حفر الجسات الآلية، استخراج العينات الصخرية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
          metrics: 'أعماق حفر تتجاوز 50 متراً'
        },
        {
          id: 2,
          tag: 'اختبارات التحميل الاستاتيكي',
          title: 'تأكيد سلامة الأساسات العميقة بروافع تتجاوز 1000 طن',
          subtitle: 'منظومة هيدروليكية وخلايا ضغط معايرة لحساب الهبوط بدقة مليمترية وفق المعايير القياسية المعتمدة.',
          metrics: 'أحمال فحص تتجاوز 1000 طن'
        },
        {
          id: 3,
          tag: 'المسح الطبوغرافي والجيوديسي',
          title: 'رصد مساحي رقمي دقيق ونمذجة ثلاثية الأبعاد للمواقع',
          subtitle: 'أحدث محطات الرصد الشاملة وتقنيات المسح الفضائي لتثبيت محاور المنشآت وحساب الكميات بدقة قطعية.',
          metrics: 'دقة رصد ثانية واحدة'
        }
      ],
      stats: {
        partners: { num: 650, label: 'شريك استراتيجي', sub: 'حول العالم والمملكة' },
        solutions: { num: 300, label: 'حلول هندسية مبتكرة', sub: 'لأعقد التحديات الإنشائية' },
        experience: { num: 20, label: 'عاماً من الخبرة والنمو', sub: 'مسيرة متواصلة منذ عام 2000' },
        branches: { num: 2, label: 'فرعان دوليان', sub: 'المملكة العربية السعودية وأمريكا' }
      }
    },
    services: {
      badge: 'خدماتنا',
      title: 'خدمات هندسية ومخبرية متكاملة',
      subtitle: 'حلول متكاملة من فحص التربة واستكشاف الموقع إلى اختبارات المواد وضبط الجودة بأعلى المعايير.',
      standardsBadge: 'المعايير المعتمدة:',
      viewDetails: 'تفاصيل الخدمة',
      requestPricing: 'طلب تسعير',
      viewAll: 'استعراض كافة الخدمات المتخصصة',
    },
    partners: {
      badge: 'شركاؤنا',
      title: 'شركاء النجاح',
      subtitle: 'نفخر بثقة كبرى جهات التطوير العقاري وشركات المقاولات الرائدة بالمملكة.',
    },
    projects: {
      badge: 'أعمالنا',
      title: 'مشاريع نفتخر بإنجازها',
      subtitle: 'نماذج واقعية لأعمال فحص التربة، اختبارات الخوازيق، والمسح الهندسي في كبرى مشاريع المملكة.',
      detailsBtn: 'تفاصيل المشروع',
      allProjects: 'استعراض كافة المشاريع',
    },
    equipment: {
      badge: 'تجهيزاتنا',
      title: 'معداتنا وتجهيزات المختبر',
      subtitle: 'أحدث حفارات الجسات وأجهزة الفحص المعايرة لضمان دقة وسرعة نتائج مشروعك.',
      filterAll: 'الكل',
      filterDrilling: 'حفر الجسات',
      filterNdt: 'الفحص غير الإتلافي',
      filterMaterials: 'فحص المواد',
      filterSurveying: 'المسح الهندسي',
      specifications: 'أبرز المواصفات:',
      standardsLabel: 'المعايير:',
      requestRfq: 'طلب استشارة',
    },
    news: {
      badge: 'جديدنا',
      title: 'آخر الأخبار والمستجدات',
      subtitle: 'تابع أحدث أخبار مشاريعنا، تحديثات كود البناء، وأسطول العمل الهندسي.',
      readArticle: 'قراءة المزيد',
      featuredBadge: 'خبر مميز',
      exploreAll: 'مشاهدة كل الأخبار',
    },
    location: {
      badge: 'موقعنا',
      title: 'الموقع ومركز العمليات',
      subtitle: 'مختبرنا في جدة مجهز بأحدث المعدات المعايرة لخدمة كافة مشاريع المنطقة الغربية والمملكة.',
      openInMaps: 'فتح في خرائط Google',
      addressLabel: 'العنوان الرسمي:',
      directCall: 'الاتصال المباشر:',
    },
    rfq: {
      badge: 'تواصل سريع',
      title: 'اطلب عرض سعر لمشروعك',
      subtitle: 'فريقنا الهندسي جاهز لدراسة متطلبات مشروعك وتقديم عرض سعر دقيق خلال 24 ساعة.',
      form: {
        fullName: 'الاسم الكريم / ممثل الجهة',
        fullNamePlaceholder: 'م. أحمد الحربي',
        company: 'اسم الشركة أو الجهة المالكة',
        companyPlaceholder: 'شركة التطوير العقاري...',
        phone: 'رقم الهاتف / الجوال',
        phonePlaceholder: '+966 5X XXX XXXX',
        email: 'البريد الإلكتروني المهني',
        emailPlaceholder: 'name@company.com',
        serviceType: 'نوع الخدمة الهندسية المطلوبة',
        selectServicePlaceholder: 'اختر الخدمة المطلوبة...',
        projectLocation: 'موقع المشروع / المدينة',
        projectLocationPlaceholder: 'جدة - أبحر الشمالية',
        notes: 'تفاصيل ونطاق العمل المطلوب',
        notesPlaceholder: 'يرجى توضيح عدد الجسات المطلوبة، مساحة الأرض، أو تفاصيل الفحوصات...',
        submitBtn: 'إرسال طلب التسعير الهندسي',
        submitting: 'جاري الإرسال والتحقق...',
        successTitle: 'تم استلام طلبكم بنجاح!',
        successDesc: 'شكراً لتواصلكم مع CGL. سيقوم فريقنا الهندسي بالاطلاع على تفاصيل المشروع والتواصل معكم خلال 24 ساعة.',
        newRequestBtn: 'إرسال طلب آخر',
        refNumberLabel: 'الرقم المرجعي للطلب:',
        savedLocallyNotice: 'تم حفظ رقم الطلب وتفاصيله على جهازك بنجاح للرجوع إليه ومتابعته في أي وقت.',
        copyRefBtn: 'نسخ الرقم المرجعي',
        copiedSuccess: 'تم نسخ الرقم!',
        savedRequestsTitle: 'طلباتك المحفوظة على هذا الجهاز',
        noSavedRequests: 'لا توجد طلبات سابقة مسجلة على هذا المتصفح.',
        clearHistory: 'مسح السجل',
        whatsappDirect: 'متابعة الطلب عبر واتساب',
      }
    },
    aboutPage: {
      breadcrumbHome: 'العودة إلى الرئيسية',
      affiliation: 'فرع معتمد لمجموعة CGI العالمية (المملكة العربية السعودية وأمريكا)',
      heroTitle: 'الريادة الجيوتقنية والمعايير العالمية',
      heroSubtitle: 'منظومة متكاملة لاستكشاف التربة، اختبارات المواد، تقييم سلامة المباني والمسح الهندسي وفق كود البناء السعودي والمعايير الدولية.',
      identityBadge: 'الهوية المؤسسية',
      identityTitle: 'مختبرات الهندسة الجيوتقنية الإبداعية (CGL)',
      stats: {
        partners: 'شركاء استراتيجيون',
        partnersSub: 'حول العالم والمملكة',
        solutions: 'حلول هندسية مبتكرة',
        solutionsSub: 'لأعقد التحديات الإنشائية',
        experience: 'عاماً من الخبرة والنمو',
        experienceSub: 'مسيرة متواصلة منذ عام 2000',
        branches: 'السعودية وأمريكا',
        branchesSub: 'امتياز CGI العالمي'
      },
      roadmapBadge: 'تاريخ وتطور المؤسسة',
      roadmapTitle: 'مسار التقدم والريادة الهندسية',
      roadmapSub: 'محطات النجاح والتوسع المؤسسي',
      roadmapStage: 'المرحلة',
      roadmapSteps: [
        {
          year: '2000',
          title: 'التأسيس والانطلاق',
          desc: 'تأسيس المختبر في جدة واعتماده كفرع لمجموعة CGI العالمية لتقديم خدمات فحص التربة والمواد الإنشائية.'
        },
        {
          year: '2010',
          title: 'التوسع التكنولوجي والميداني',
          desc: 'إدخال أحدث حفارات الجسات الآلية وأجهزة الرادار الأرضي (GPR) وتوسيع أسطول الفحوصات اللاإتلافية.'
        },
        {
          year: '2018',
          title: 'كود البناء والمشاريع الحيوية',
          desc: 'الامتثال الكامل لاشتراطات كود البناء السعودي (SBC 303/304) والمشاركة في أضخم مشاريع البنية التحتية بالمملكة.'
        },
        {
          year: '2024+',
          title: 'مشاريع رؤية 2030 المستقبلية',
          desc: 'شريك جيوتقني معتمد لكبرى جهات التطوير العقاري والمقاولات الاستراتيجية لتنفيذ المشاريع التنموية الكبرى.'
        }
      ],
      missionBadge: 'الغاية الهندسية',
      missionTitle: 'رسالتنا المؤسسية',
      missionPillars: [
        'تطبيق أدق معايير الفحص المخبري والحقلي المعتمدة عالمياً ومحلياً.',
        'تقديم حلول هندسية واضحة ومجدية اقتصادياً لكل مشروع.',
        'المسؤولية الكاملة والشفافية في كافة التقارير الفنية الصادرة.'
      ],
      visionBadge: 'الريادة المستقبلية',
      visionTitle: 'رؤيتنا الاستراتيجية',
      valuesBadge: 'المبادئ المهنية',
      valuesTitle: 'ميثاق القيم الهندسية',
      valuesSubtitle: 'المعايير والقيم الراسخة التي تحكم كافة عملياتنا الهندسية والمخبرية',
    },
    projectDetailPage: {
      backBtn: 'العودة إلى دراسات المشاريع',
      sbcBadge: 'معتمد وفق كود البناء السعودي SBC',
      overviewTitle: 'نظرة عامة ونطاق العمل الهندسي',
      approachTitle: 'المنهجية الفنية والمعالجة الهندسية',
      challengesTitle: 'التحديات الجيوتقنية التي تمت معالجتها',
      testsTitle: 'الفحوصات والاختبارات المنفذة',
      equipmentTitle: 'المعدات والأجهزة المتخصصة المستخدمة',
      standardsTitle: 'المعايير والمواصفات المطبقة',
      sidebarTitle: 'طلب استشارة لمشروع مماثل',
      sidebarDesc: 'فريقنا الاستشاري على أتم الجاهزية لتقديم الدعم الفني وتوصيات التأسيس لمشروعك.',
      sidebarCta: 'طلب تسعير للمشروع',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      quickLinks: 'روابط الموقع',
      servicesTitle: 'خدماتنا التخصصية',
      contactTitle: 'بيانات التواصل المباشر',
      sbcNotice: 'جميع الفحوصات والاختبارات متوافقة مع متطلبات كود البناء السعودي SBC 303 & SBC 304 والمعايير الدولية ASTM/ACI.',
      headquarters: 'المركز الرئيسي:',
      jeddahAddress: 'جدة 23215، حي الرويس، المملكة العربية السعودية',
    }
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      projects: 'Projects',
      equipment: 'Equipment',
      news: 'News',
      rfq: 'Request RFQ',
      contact: 'Contact Us',
      callNow: 'Call Us',
      whatsapp: 'WhatsApp',
      switchLang: 'العربية',
      switchLangTarget: 'ar',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
    },
    hero: {
      affiliation: 'A proud franchise of CGI Group (USA & KSA)',
      ctaRfq: 'Request Instant Proposal',
      ctaServices: 'Explore Engineering Services',
      liveConsultation: 'Direct Advisory',
      sbcCompliance: 'Saudi Building Code Standards SBC 303 • SBC 304',
      slides: [
        {
          id: 1,
          tag: 'Geotechnical & Soil Investigation',
          title: 'The Engineering Precision Anchoring the Kingdom’s Mega Projects',
          subtitle: 'Automated deep drilling, soil bearing capacity evaluation, and foundation recommendations compliant with SBC.',
          metrics: 'Drilling Depths +50m'
        },
        {
          id: 2,
          tag: 'Static Pile Load Testing',
          title: 'Deep Foundation Verification with Test Loads Exceeding 1,000 Tons',
          subtitle: 'Calibrated hydraulic systems and load cells for millimeter settlement analysis per ASTM D1143.',
          metrics: 'Test Loads +1,000 Tons'
        },
        {
          id: 3,
          tag: 'Topographic & Geodetic Survey',
          title: 'High-Precision Digital Surveying & 3D Reality Capture',
          subtitle: 'Advanced electronic total stations and GNSS receivers for axis layout and volume calculations.',
          metrics: '1-Arcsecond Accuracy'
        }
      ],
      stats: {
        partners: { num: 650, label: 'Strategic Partners', sub: 'Global & Across KSA' },
        solutions: { num: 300, label: 'Innovative Solutions', sub: 'For Complex Subsurface Challenges' },
        experience: { num: 20, label: 'Years of Growth', sub: 'Continuous Heritage Since 2000' },
        branches: { num: 2, label: 'International Branches', sub: 'Kingdom of Saudi Arabia & USA' }
      }
    },
    services: {
      badge: 'Our Services',
      title: 'Integrated Engineering & Lab Services',
      subtitle: 'End-to-end solutions from soil exploration and testing to certified quality control.',
      standardsBadge: 'Applicable Standards:',
      viewDetails: 'Service Details',
      requestPricing: 'Request Pricing',
      viewAll: 'Explore All Services',
    },
    partners: {
      badge: 'Partners',
      title: 'Trusted by Industry Leaders',
      subtitle: 'Proud engineering partnerships with premier infrastructure and real estate developers across KSA.',
    },
    projects: {
      badge: 'Our Work',
      title: 'Featured Projects',
      subtitle: 'Real-world geotechnical exploration and foundation testing in landmark Saudi projects.',
      detailsBtn: 'Project Details',
      allProjects: 'View All Projects',
    },
    equipment: {
      badge: 'Equipment',
      title: 'Our Equipment & Lab Fleet',
      subtitle: 'Advanced drilling rigs, testing machines, and calibrated sensors for high-precision results.',
      filterAll: 'All',
      filterDrilling: 'Soil Drilling',
      filterNdt: 'NDT Testing',
      filterMaterials: 'Materials Lab',
      filterSurveying: 'Surveying',
      specifications: 'Key Specs:',
      standardsLabel: 'Standards:',
      requestRfq: 'Request Consultation',
    },
    news: {
      badge: 'What’s New',
      title: 'Latest News & Updates',
      subtitle: 'Follow our latest project milestones, building code updates, and fleet expansions.',
      readArticle: 'Read More',
      featuredBadge: 'Featured',
      exploreAll: 'View All News',
    },
    location: {
      badge: 'Our Location',
      title: 'Operations Hub & Testing Lab',
      subtitle: 'Our Jeddah facility is fully equipped to serve projects across the Kingdom.',
      openInMaps: 'Open in Google Maps',
      addressLabel: 'Official Address:',
      directCall: 'Direct Hotline:',
    },
    rfq: {
      badge: 'Fast Response',
      title: 'Request a Project Proposal',
      subtitle: 'Share your project details and our engineering team will provide a tailored quote within 24 hours.',
      form: {
        fullName: 'Full Name / Representative',
        fullNamePlaceholder: 'Eng. Fahad Al-Otaibi',
        company: 'Company / Organization Name',
        companyPlaceholder: 'Development / Contracting Co.',
        phone: 'Phone / Mobile Number',
        phonePlaceholder: '+966 5X XXX XXXX',
        email: 'Professional Email',
        emailPlaceholder: 'name@company.com',
        serviceType: 'Required Engineering Service',
        selectServicePlaceholder: 'Select required service...',
        projectLocation: 'Project Location / City',
        projectLocationPlaceholder: 'Jeddah - North Obhur',
        notes: 'Project Scope & Requirements',
        notesPlaceholder: 'Please describe the number of boreholes, site area, or testing specifications...',
        submitBtn: 'Submit Proposal Request',
        submitting: 'Submitting & Verifying...',
        successTitle: 'Request Received Successfully!',
        successDesc: 'Thank you for reaching out to CGL. Our engineering team will review your project details and contact you within 24 hours.',
        newRequestBtn: 'Submit Another Request',
        refNumberLabel: 'Proposal Reference Number:',
        savedLocallyNotice: 'Your proposal reference number and details are saved on this device for tracking.',
        copyRefBtn: 'Copy Reference',
        copiedSuccess: 'Copied to Clipboard!',
        savedRequestsTitle: 'Your Saved Requests on this Device',
        noSavedRequests: 'No previous requests saved on this browser.',
        clearHistory: 'Clear History',
        whatsappDirect: 'Follow-up via WhatsApp',
      }
    },
    aboutPage: {
      breadcrumbHome: 'Back to Home',
      affiliation: 'A proud franchise of CGI Group (USA & KSA)',
      heroTitle: 'Geotechnical Leadership & Global Standards',
      heroSubtitle: 'An integrated ecosystem for soil exploration, materials testing, structural auditing, and surveying under the Saudi Building Code and international ASTM standards.',
      identityBadge: 'Corporate Identity',
      identityTitle: 'Creative Geotechnical Laboratories (CGL)',
      stats: {
        partners: 'Strategic Partners',
        partnersSub: 'Global & Across KSA',
        solutions: 'Innovative Solutions',
        solutionsSub: 'For Complex Subsurface Challenges',
        experience: 'Years of Growth',
        experienceSub: 'Continuous Heritage Since 2000',
        branches: 'KSA & USA',
        branchesSub: 'CGI Global Franchise'
      },
      roadmapBadge: 'Corporate Evolution',
      roadmapTitle: 'Milestones of Growth & Engineering Leadership',
      roadmapSub: 'Institutional Development & Fleet Expansion',
      roadmapStage: 'Stage',
      roadmapSteps: [
        {
          year: '2000',
          title: 'Establishment & Launch',
          desc: 'Founded in Jeddah as an authorized franchise of CGI Group, providing certified soil investigation and construction materials testing.'
        },
        {
          year: '2010',
          title: 'Technological & Field Expansion',
          desc: 'Introduced automated drilling rigs, ground-penetrating radar (GPR), and expanded our non-destructive testing (NDT) fleet.'
        },
        {
          year: '2018',
          title: 'Building Code Compliance & Landmark Projects',
          desc: 'Full alignment with Saudi Building Code requirements (SBC 303/304) and participation in vital national infrastructure.'
        },
        {
          year: '2024+',
          title: 'Vision 2030 Mega Developments',
          desc: 'Certified geotechnical partner for major giga-project developers and Tier-1 contractors shaping the Kingdom’s future.'
        }
      ],
      missionBadge: 'Engineering Purpose',
      missionTitle: 'Corporate Mission',
      missionPillars: [
        'Upholding the highest international and Saudi testing standards.',
        'Delivering clear, economically sound engineering solutions for every project.',
        'Total accountability, impartiality, and transparency in all published technical reports.'
      ],
      visionBadge: 'Future Leadership',
      visionTitle: 'Strategic Vision',
      valuesBadge: 'Professional Principles',
      valuesTitle: 'Charter of Engineering Values',
      valuesSubtitle: 'Core values governing every field, laboratory, and advisory operation',
    },
    projectDetailPage: {
      backBtn: 'Back to Case Studies',
      sbcBadge: 'Compliant with Saudi Building Code SBC',
      overviewTitle: 'Project Overview & Scope of Work',
      approachTitle: 'Engineering Methodology & Execution',
      challengesTitle: 'Geotechnical Challenges Solved',
      testsTitle: 'Tests & Laboratory Procedures Performed',
      equipmentTitle: 'Specialized Equipment & Fleet Deployed',
      standardsTitle: 'Governing Standards & Codes',
      sidebarTitle: 'Need a Similar Technical Study?',
      sidebarDesc: 'Our geotechnical consultants are prepared to provide foundation recommendations and soil testing for your project.',
      sidebarCta: 'Request Project Proposal',
    },
    footer: {
      rights: 'All rights reserved',
      quickLinks: 'Navigation',
      servicesTitle: 'Specialized Services',
      contactTitle: 'Direct Contact',
      sbcNotice: 'All field and laboratory testing strictly complies with the Saudi Building Code (SBC 303 / SBC 304) and ASTM / ACI standards.',
      headquarters: 'Headquarters:',
      jeddahAddress: '23215 Al-Ruwais, Jeddah, Kingdom of Saudi Arabia',
    }
  }
};

export function getDictionary(lang: Locale) {
  return dictionaries[lang] || dictionaries.ar;
}
