import { 
  ServiceItem, 
  ProjectEvidence, 
  OperationalCapability, 
  ComplianceCertification,
  AuthorizedPartner,
  EquipmentItem,
  NewsArticle
} from './types';

export const CGL_COMPANY_INFO = {
  themeColor: 'blue' as 'blue' | 'green',
  nameAr: 'CGL (Creative Geotechnical Laboratories)',
  nameEn: 'Creative Geotechnical Laboratories (CGL)',
  affiliationAr: 'فرع معتمد لمجموعة CGI العالمية (USA & KSA)',
  affiliationEn: 'A proud franchise of CGI Group (USA & KSA)',
  headquartersAr: 'المملكة العربية السعودية • الولايات المتحدة الأمريكية',
  email: 'info@creativegeotechnical.com.sa',
  phone: '+966 535157009',
  phone1: '+966 535157009',
  phone2: '+966 503691609',
  phone1Raw: '966535157009',
  phone2Raw: '966503691609',
  whatsapp1: '+966 535157009',
  whatsapp2: '+966 503691609',
  whatsapp1Raw: '966535157009',
  whatsapp2Raw: '966503691609',
  addressAr: 'جدة 23215، حي الرويس، المملكة العربية السعودية',
  addressEn: '23215 Al-Ruwais, Jeddah KSA',
  postalCode: '23215',
  districtAr: 'الرويس',
  cityAr: 'جدة',
  countryAr: 'المملكة العربية السعودية',
  coordinates: {
    lat: 21.5231047,
    lng: 39.177774,
  },
  googleMapsUrl: 'https://maps.google.com/?cid=15720498232305587362',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?cid=15720498232305587362&output=embed',
  establishedYear: '2000',
  aboutEn: 'Creative Geotechnical Laboratories (CGL), a proud franchise of CGI, offers comprehensive services including geotechnical and soil investigation, building integrity assessment, material testing, surveying, mining tests, shoring, dewatering, and environmental testing. With offices in the USA and KSA, our expert team uses advanced technology to deliver accurate, reliable, and tailored solutions for every project.',
  aboutAr: 'مختبرات CGL (Creative Geotechnical Laboratories)، فرع معتمد لمجموعة CGI العالمية، تقدم منظومة خدمات هندسية واستشارية متكاملة تشمل الدراسات الجيوتقنية واستكشاف التربة، الفحوصات اللاإتلافية وتقييم سلامة المباني، اختبارات المواد وضبط الجودة، المسح الطبوغرافي والهندسي، اختبارات التعدين، أعمال سند جوانب الحفر، نزح المياه الجوفية، والاختبارات البيئية. مع مكاتبنا في المملكة العربية السعودية والولايات المتحدة الأمريكية، يعتمد فريقنا الاستشاري على أحدث التقنيات الهندسية لتقديم حلول دقيقة وموثوقة ومخصصة لكل مشروع.',
  stats: {
    globalPartners: 650,
    innovativeSolutions: 300,
    yearsOfGrowth: 20,
  },
  missionEn: 'To provide high quality Geotechnical Engineering Services, with high value to our client and to ourselves.',
  missionAr: 'تقديم خدمات هندسة جيوتقنية فائقة الجودة، تحقق أعلى قيمة لعملائنا ولفريقنا المهني.',
  visionEn: {
    lead: 'CGL aims to be recognized as:',
    points: [
      'Experts in the field of Geotechnical and Materials Testing.',
      'Technologically advanced, while practical and business oriented.',
      'Partner of choice for our clients.'
    ],
    partnerPillars: [
      'Adding value to their projects.',
      'Being worthy of their confidence by remaining accountable for our actions.',
      'Delivering services based on real needs.'
    ]
  },
  visionAr: {
    lead: 'تسعى CGL إلى ترسيخ مكانتها والاعتراف بها بصفتها:',
    points: [
      'خبراء معتمدين ورواد في مجال الهندسة الجيوتقنية واختبارات المواد.',
      'صرحاً هندسياً متقدماً تكنولوجياً مع الحفاظ على النهج العملي والجدوى الاقتصادية.',
      'الشريك الهندسي الأول والمفضل لعملائنا.'
    ],
    partnerPillars: [
      'إضافة قيمة حقيقية واستثنائية لكافة المشاريع.',
      'أن نكون أهلاً لثقتهم عبر الشفافية والمسؤولية التامة عن كافة أعمالنا.',
      'تقديم خدمات هندسية مبنية بدقة على الاحتياجات الميدانية الواقعية.'
    ]
  },
  values: [
    {
      en: 'To be recognized for the quality of our professional services to provide those services for a reasonable fee.',
      ar: 'الاعتراف بجودة واحترافية خدماتنا المهنية وتقديمها بتكلفة عادلة ومدروسة.'
    },
    {
      en: 'Providing a superior investment for our clients.',
      ar: 'توفير عائد استثماري استثنائي وحماية لأصول ومشاريع عملائنا.'
    },
    {
      en: 'To be respected for the ethics of our practice and our contribution to the profession and to society at large.',
      ar: 'الاحترام التام لأخلاقيات المهنة والمساهمة الفاعلة في رفعة القطاع الهندسي والمجتمع ككل.'
    },
    {
      en: 'Maintaining broadly-based employee ownership.',
      ar: 'الحفاظ على مبدأ المشاركة المؤسسية الموسعة وتقدير جهود منسوبي المؤسسة.'
    },
    {
      en: 'Providing an environment for a satisfying and challenging career.',
      ar: 'توفير بيئة عمل محفزة ومجزية تتيح مساراً مهنياً متقدماً ومثمراً.'
    },
    {
      en: 'Providing an umbrella for ambitious staff members to grow their client base and their reputations in directions of their own choosing.',
      ar: 'توفير مظلة داعمة للكوادر الطموحة لتطوير قاعدة العملاء وبناء سمعتهم المهنية في الاتجاهات التي يختارونها.'
    },
    {
      en: 'Maintaining an environment which is conducive to innovative thinking and solutions.',
      ar: 'ترسيخ بيئة ملهمة حاضنة للتفكير المبتكر والحلول الهندسية الإبداعية.'
    },
    {
      en: 'Recognizing and rewarding excellence and achievement.',
      ar: 'الاعتراف الدائم بالتميز ومكافأة الإنجازات والنجاحات النوعية المستمرة.'
    }
  ]
};

export const CGL_SERVICES: ServiceItem[] = [
  {
    id: 'geotechnical-investigation',
    titleAr: 'الدراسات الجيوتقنية واستكشاف التربة',
    titleEn: 'Geotechnical & Soil Investigation',
    shortDescAr: 'حفر الجسات الآلية، استخراج العينات الصخرية والترابية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
    shortDescEn: 'Borehole drilling, undisturbed sampling, bearing capacity analysis, and geotechnical foundation recommendations.',
    fullDescAr: 'توفير منظومة متكاملة لاستكشاف باطن الأرض تبدأ من حفر الجسات الاستكشافية بالأعماق المطلوبة، واختبار الاختراق القياسي (SPT)، وتحديد مناسيب المياه الجوفية، وصولاً إلى التحاليل المعملية الميكانيكية لتقديم تقرير جيوتقني شامل معتمد.',
    standards: ['ASTM D1586', 'ASTM D1587', 'ASTM D4220', 'SBC 303'],
    fieldMethods: ['Rotary Core Drilling', 'Standard Penetration Test (SPT)', 'Shelby Tube Undisturbed Sampling'],
    labDeliverables: ['Geotechnical Investigation Report', 'Soil Strata Logs', 'Bearing Capacity Calculations'],
    icon: 'Layers',
    image: '/uploads/user_provided/geotech_investigation.jpeg',
    scopeListAr: [
      'حفر الجسات الاستكشافية لمختلف أعماق التأسيس',
      'أخذ العينات المقلقلة وغير المقلقلة بدقة معيارية',
      'تحديد خواص انتفاخ وانهيار التربة',
      'تحديد قدرة التحمل المسموحة والتوصيات الإنشائية'
    ]
  },
  {
    id: 'structural-integrity',
    titleAr: 'تقييم سلامة المباني والفحوصات غير الإتلافية',
    titleEn: 'Structural Integrity & NDT Testing',
    shortDescAr: 'الكشف عن عيوب الخرسانة والحديد، تقييم متانة المنشآت القائمة، والفحوصات غير الإتلافية بأحدث أجهزة الرادار والألتراسونيك.',
    shortDescEn: 'Non-destructive concrete evaluation, rebar detection, integrity audits, and load capacity assessments.',
    fullDescAr: 'إجراء مسح هندسي شامل للهياكل الخرسانية القائمة للكشف عن التصدعات، عمق التكربن، أماكن وسمك حديد التسليح عبر الرادار الأرضي، وقياس مقاومة الضغط بالصلادة والموجات فوق الصوتية.',
    standards: ['ASTM C805', 'ASTM C597', 'ACI 228.1R', 'BS 1881'],
    fieldMethods: ['Schmidt Rebound Hammer', 'Ultrasonic Pulse Velocity (UPV)', 'Ground Penetrating Radar (GPR) Scan'],
    labDeliverables: ['Structural Integrity Assessment Report', 'Rebar Mapping Diagrams', 'Remediation Recommendations'],
    icon: 'ShieldCheck',
    image: '/uploads/user_provided/structural_integrity.jpeg',
    scopeListAr: [
      'فحص مطرقة شميدت والموجات فوق الصوتية',
      'تحديد مسارات وأقطار حديد التسليح رادارياً (GPR)',
      'استخراج واختبار القلوب الخرسانية (Core Tests)',
      'تقييم السلامة الإنشائية للمباني المتصدعة والقديمة'
    ]
  },
  {
    id: 'materials-testing',
    titleAr: 'مختبرات فحص مواد البناء والخرسانة',
    titleEn: 'Construction Materials Testing Lab',
    shortDescAr: 'فحص مطابقة الخرسانة الطازجة والمتصلدة، الركام، الأسمنت، حديد التسليح، والخلطات الإسفلتية للمواصفات والمقاييس القياسية.',
    shortDescEn: 'Comprehensive laboratory testing for concrete, aggregates, steel rebar, cement, and asphalt compliance.',
    fullDescAr: 'مختبرات مركزية مجهزة بماكينات كسر وضغط آلية معايرة، لإجراء كافة التجارب الكيميائية والفيزيائية والميكانيكية للمواد الإنشائية لضمان جودة التوريد ومطابقة اشتراطات المشروع.',
    standards: ['ASTM C39', 'ASTM A615', 'ASTM C136', 'SASO Standards'],
    fieldMethods: ['Slump Test', 'Concrete Cube & Cylinder Sampling', 'Field Density Testing'],
    labDeliverables: ['Compressive Strength Certificates', 'Sieve Analysis Curves', 'Tensile Test Curves'],
    icon: 'Beaker',
    image: '/uploads/user_provided/materials_testing.jpeg',
    scopeListAr: [
      'اختبار مقاومة الضغط للخرسانة (Compressive Strength)',
      'فحص الشد والاستطالة لحديد التسليح (Tensile Test)',
      'التحليل المنخلي وفحوصات تآكل الركام (Los Angeles)',
      'تصميم وضبط جودة الخلطات الخرسانية والأسفلتية'
    ]
  },
  {
    id: 'engineering-surveying',
    titleAr: 'أعمال المسح الهندسي والجيوديسي',
    titleEn: 'Land & Engineering Surveying',
    shortDescAr: 'الرفع الطبوغرافي عالي الدقة، تثبيت الإحداثيات والشبكات الجيوديسية، ورصد الهبوط والتشوهات الإنشائية بمحطات الرصد المتطورة.',
    shortDescEn: 'Topographic surveys, geodetic grid establishment, precise leveling, and structural deformation monitoring.',
    fullDescAr: 'تطبيق أحدث تقنيات الرفع المساحي باستخدام محطات الرصد الشاملة (Total Stations) وأجهزة GNSS/RTK الفضائية، لإنشاء الخرائط الكنتورية ونماذج التضاريس الرقمية وحساب الكميات بدقة مليمترية.',
    standards: ['FGDC Geodetic Standards', 'MOMRA Survey Specifications'],
    fieldMethods: ['Total Station High-Accuracy Traverse', 'RTK/GNSS Satellite Surveying', 'Digital Precision Leveling'],
    labDeliverables: ['CAD Topographic Drawings (DWG/DXF)', 'Digital Elevation Models (DEM)', 'Volume Calculation Reports'],
    icon: 'Crosshair',
    image: '/uploads/user_provided/engineering_surveying.jpeg',
    scopeListAr: [
      'الرفع المساحي الطبوغرافي والتفصيلي للمشاريع',
      'تثبيت محاور المنشآت والأساسات والمنشآت الحيوية',
      'رصد الهبوط والحركات الإنشائية للمباني المجاورة',
      'حساب كميات الحفر والردم بدقة رقمية'
    ]
  },
  {
    id: 'mining-testing',
    titleAr: 'اختبارات التعدين والجيولوجيا',
    titleEn: 'Mining & Geological Testing',
    shortDescAr: 'تقييم الصخور والمعادن، تحاليل خواص المحاجر، ودراسات نقاء الخامات للاستخدامات الصناعية والإنشائية والبنية التحتية.',
    shortDescEn: 'Rock mechanics, quarry material suitability, mineral composition, and industrial raw material qualification.',
    fullDescAr: 'فحوصات جيولوجية متخصصة تشمل اختبار ضغط الصخور أحادي المحور (UCS)، واختبار معامل الحمل النقطي (Point Load Test)، وتحديد الخواص البتروغرافية والكيميائية للكتل الصخرية.',
    standards: ['ASTM D7012', 'ASTM D5731', 'ISRM Suggested Methods'],
    fieldMethods: ['Rock Core Logging (RQD)', 'Point Load Field Index', 'Discontinuity Mapping'],
    labDeliverables: ['Unconfined Compressive Strength Reports', 'Rock Mass Rating (RMR)', 'Petrographic Analysis Reports'],
    icon: 'Pickaxe',
    image: '/uploads/user_provided/mining_testing.jpeg',
    scopeListAr: [
      'فحص مقاومة الضغط أحادي المحور للصخور (UCS)',
      'تحديد معامل الجودة الصخرية (RQD) والتشققات',
      'اختبارات متانة الصخور ضد التجوية (Slake Durability)',
      'تقييم صلاحية أحجار المحاجر للردم والركام'
    ]
  },
  {
    id: 'shoring-dewatering',
    titleAr: 'التدعيم ونزح المياه الجوفية',
    titleEn: 'Shoring & Dewatering Engineering',
    shortDescAr: 'تصميم وإشراف أنظمة سند جوانب الحفر العميقة، وحلول خفض المياه الجوفية للمشاريع الساحلية والمواقع المعقدة.',
    shortDescEn: 'Deep excavation retaining systems, groundwater lowering engineering, and excavation stability controls.',
    fullDescAr: 'تقديم الحلول الهندسية المتكاملة لأعمال الحفر العميق في المدن والمناطق ذات المياه السطحية، متضمنة الستائر اللوحية والخوازيق المتداخلة (Secant Piles) وشبكات آبار النزح الميدانية.',
    standards: ['CIRIA C760', 'DIN 4124', 'SBC 303'],
    fieldMethods: ['Pumping Tests & Drawdown Monitoring', 'Inclinometer Installation', 'Piezometer Monitoring'],
    labDeliverables: ['Dewatering System Calculation Sheets', 'Shoring Stability Models', 'Water Discharge Quality Tests'],
    icon: 'Compass',
    image: '/uploads/user_provided/shoring_dewatering.jpeg',
    scopeListAr: [
      'تصميم نظم سند جوانب الحفر (Secant / Contiguous Piles)',
      'دراسة وتصميم منظومات نزح المياه الجوفية العميقة',
      'رصد ميول جوانب الحفر بمجسات الإنكلينوميتر (Inclinometer)',
      'اختبارات ضخ المياه وتحديد نفاذية التربة (Permeability)'
    ]
  },
  {
    id: 'environmental-testing',
    titleAr: 'الفحوصات والدراسات البيئية',
    titleEn: 'Environmental Field Testing',
    shortDescAr: 'فحوصات ملوحة وتلوث التربة والمياه الجوفية بالهيدروكربونات والمعادن الثقيلة لدعم اشتراطات الامتثال البيئي.',
    shortDescEn: 'Soil & groundwater chemical screening, salinity, hydrocarbon contamination, and environmental baseline audits.',
    fullDescAr: 'تحليل العينات الميدانية كيميائياً لتقدير نسب الكبريتات والكلوريدات القابلة للذوبان، ودرجة الحموضة (pH)، ورصد أي تسريبات هيدروكربونية لحماية المنشآت الخرسانية والبيئة المحيطة.',
    standards: ['EPA Test Methods', 'ASTM D516', 'ASTM D512'],
    fieldMethods: ['Groundwater Bailer Sampling', 'Soil Vapor Screening', 'Composite Field Sampling'],
    labDeliverables: ['Chemical Aggressiveness Assessment', 'Groundwater Contaminant Logs', 'Environmental Baseline Reports'],
    icon: 'Trees',
    image: '/uploads/user_provided/environmental_field.jpeg',
    scopeListAr: [
      'تحديد محتوى الكلوريدات والكبريتات الضارة بالخرسانة',
      'قياس الأس الهيدروجيني (pH) والتوصيل الكهربائي (EC)',
      'فحص الملوثات العضوية والمشتقات البترولية بالتربة',
      'تقييم عدوانية التربة والمياه الجوفية على أساسات المباني'
    ]
  }
];

export const CGL_PROJECTS_EVIDENCE: ProjectEvidence[] = [
  {
    id: 'cgl-proj-001',
    nameAr: 'أعمال فحص التحميل الاستاتيكي للخوازيق الهندسية',
    nameEn: 'Static Axial Compressive Pile Load Testing Project',
    sectorAr: 'الأساسات العميقة والمنشآت الكبرى',
    sectorEn: 'Deep Foundations & Heavy Infrastructure',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Kingdom of Saudi Arabia',
    scopeOfWorkAr: 'تنفيذ وتوثيق فحص التحميل المحوري الاستاتيكي على الخوازيق الخرسانية المسلحة للتحقق من قدرة التحمل التصميمية ومقدار الهبوط الفعلي.',
    scopeOfWorkEn: 'Executing and monitoring full-scale static compressive pile load test to verify structural capacity and settlement criteria.',
    servicesPerformedAr: [
      'تركيب منظومة كمرات رد الفعل الفولاذية (Reaction Beam Assembly)',
      'تطبيق الأحمال المتدرجة عبر رافعة هيدروليكية معايرة',
      'رصد الهبوط بدقة مليمترية باستخدام 4 ساعات قياس حساسة (Dial Gauges)'
    ],
    technicalChallengesAr: 'تطبيق أحمال ضخمة بأمان تام ورصد الهبوط المتناهي في الصغر وفق دورات التحميل والتفريغ المعيارية المحددة.',
    engineeringApproachAr: 'استخدام منظومة روافع معايرة مرتبطة بخلايا قياس ضغط معتمدة، مع تثبيت جسور المراقبة المرجعية على مسافات كافية تضمن عزل أجهزة القياس عن أي تأثيرات جانبية.',
    testsPerformedAr: [
      'Static Axial Compressive Load Test (ASTM D1143)',
      'Settlement vs. Load Curves Recording',
      'Elastic Rebound Monitoring'
    ],
    equipmentUsed: [
      'High-Tonnage Hydraulic Jack System',
      'Calibrated Precision Dial Indicators (0.01mm)',
      'Heavy Steel Reaction Beam Frame & Concrete Kentledge'
    ],
    coverImage: '/api/media/projects/pile_load_testing_reaction.jpg',
    gallery: [
      '/api/media/projects/pile_load_testing_reaction.jpg',
      '/api/media/projects/pile_load_testing_jack.jpg',
      '/api/media/projects/pile_load_testing_frame.jpg'
    ],
    relevantStandards: ['ASTM D1143 / D1143M', 'SBC 303 Requirements'],
    relatedServiceId: 'geotechnical-investigation'
  },
  {
    id: 'cgl-proj-002',
    nameAr: 'أعمال المسح الطبوغرافي والرصد المساحي الميداني',
    nameEn: 'Topographic Field Surveying & Geodetic Monitoring',
    sectorAr: 'المسح الهندسي ونظم المعلومات الجغرافية',
    sectorEn: 'Engineering Geomatics & Infrastructure Layout',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Kingdom of Saudi Arabia',
    scopeOfWorkAr: 'إجراء مسح طبوغرافي شامل للموقع، تثبيت نقاط التحكم المساحية الأرضية (GCPs)، وإنشاء المخططات الكنتورية الرقمية.',
    scopeOfWorkEn: 'Comprehensive topographic ground survey, benchmark network establishment, and high-precision digital elevation modeling.',
    servicesPerformedAr: [
      'إنشاء شبكة مضلعات مغلقة للرصد عالي الدقة',
      'رفع تفاصيل التضاريس والمنشآت المجاورة',
      'إنشاء خرائط رقمية ثلاثية الأبعاد بدقة هندسية'
    ],
    technicalChallengesAr: 'العمل في ظروف تضاريس مفتوحة متباينة مع الحفاظ على دقة الإحداثيات وتكاملها مع المرجع الجيوديسي الوطني.',
    engineeringApproachAr: 'الدمج بين أجهزة المحطة الشاملة (Total Station) عالية الدقة وأجهزة التسوية الرقمية، وتطبيق موازنة الشبكة حسابياً لتقليل نسبة الخطأ إلى أدنى حد ممكن.',
    testsPerformedAr: [
      'Traverse Balancing & Angle Adjustment',
      'Digital Precision Leveling Loops',
      'Coordinate Verification & Transformation'
    ],
    equipmentUsed: [
      'High-Precision Electronic Total Station with Optical Plummet',
      'Precision Tripods & Prism Assemblies',
      'Digital Surveying Controllers'
    ],
    coverImage: '/api/media/projects/geodetic_survey_total_station.jpg',
    gallery: [
      '/api/media/projects/geodetic_survey_total_station.jpg',
      '/api/media/projects/geodetic_survey_digital_instrument.jpg',
      '/api/media/projects/geodetic_survey_site_layout.jpg'
    ],
    relevantStandards: ['National Geodetic Guidelines', 'MOMRA Topographic Standards'],
    relatedServiceId: 'engineering-surveying'
  },
  {
    id: 'cgl-proj-003',
    nameAr: 'الاستكشاف الجيوتقني وحفر الجسات الصخرية لمواقع التعدين',
    nameEn: 'Mining Quarry Core Drilling & Geotechnical Exploration',
    sectorAr: 'قطاع التعدين والمحاجر والجيولوجيا',
    sectorEn: 'Mining, Quarry Geology & Deep Core Drilling',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Kingdom of Saudi Arabia',
    scopeOfWorkAr: 'تنفيذ برنامج حفر آلي استكشافي عميق لاستخراج العينات اللبية الصخرية وتحليل ثبات المنحدرات الصخرية في مناطق المحاجر والمناجم المفتوحة.',
    scopeOfWorkEn: 'Deep exploratory diamond core drilling program to extract rock cores and evaluate slope stability in open-pit mining operations.',
    servicesPerformedAr: [
      'حفر استكشافي باستخدام حفارات هيدروليكية مجنزرة متطورة',
      'استخراج عينات لبية صخرية مستمرة وحفظها في صناديق عينات معيارية',
      'توصيف فواصل وتشوهات الصخور وحساب مؤشر جودة الصخر (RQD)'
    ],
    technicalChallengesAr: 'التعامل مع تراكيب صخرية شديدة القساومة ومتشققة، والحفاظ على سلامة العينات اللبية دون تفتت لضمان دقة الفحوص المخبرية.',
    engineeringApproachAr: 'استخدام أحدث حفارات الجسات المجنزرة مع رؤوس حفر ماسية مبردة، وتنفيذ الاختبارات الميكانيكية الميدانية في الموقع وفق مواصفات ISRM و ASTM.',
    testsPerformedAr: [
      'Rock Core Quality Designation (RQD - ASTM D6032)',
      'Unconfined Compressive Strength (UCS - ASTM D7012)',
      'Point Load Strength Index (ASTM D5731)'
    ],
    equipmentUsed: [
      'Track-Mounted Hydraulic Rotary Core Drill Rig',
      'Double-Tube Wireline Diamond Core Barrels',
      'Field Point Load Testing Apparatus'
    ],
    coverImage: '/api/media/projects/mining_rotary_core_drilling_rig.jpg',
    gallery: [
      '/api/media/projects/mining_rotary_core_drilling_rig.jpg',
      '/api/media/projects/mining_quarry_rock_drilling.jpg',
      '/api/media/projects/mining_subsurface_exploration.jpg'
    ],
    relevantStandards: ['ASTM D7012', 'ASTM D6032', 'ISRM Suggested Methods'],
    relatedServiceId: 'mining-testing'
  },
  {
    id: 'cgl-proj-004',
    nameAr: 'الرصد المساحي عالي الدقة والتثبيت الجيوديسي للمشاريع المفتوحة',
    nameEn: 'High-Precision Quarry Topographic & Deformation Survey',
    sectorAr: 'المسح الهندسي ونظم الرصد الجغرافي',
    sectorEn: 'Engineering Geomatics & Open-Pit Monitoring',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Kingdom of Saudi Arabia',
    scopeOfWorkAr: 'إنشاء شبكة رصد جيوديسي متقدمة لرصد حركة الجروف والمنحدرات وحساب كميات التكديس والحفر الدوري بمحطات الرصد الآلية.',
    scopeOfWorkEn: 'Establishment of precision geodetic monitoring network to track slope displacements and compute periodic extraction volumes.',
    servicesPerformedAr: [
      'رصد ثلاثي الأبعاد لجدران الحفر والكتل الصخرية',
      'حساب كميات الحفر والردم وكتل المواد المستخرجة دورياً',
      'تحديث المخططات الطبوغرافية للموقع وربطها بالشبكة الوطنية'
    ],
    technicalChallengesAr: 'تأمين دقة مليمترية عبر مسافات رصد شاسعة في بيئة مفتوحة ذات تغيرات حرارية وغبارية عالية.',
    engineeringApproachAr: 'نشر محطات رصد إلكترونية شاملة عالية الدقة مع عواكس زجاجية مستقرة على نقاط مرجعية ثابتة في الصخر الصلب.',
    testsPerformedAr: [
      'Precise Angle and Distance Electronic Measurement',
      'Deformation Vector Analysis',
      'Volumetric Surface Differential Analysis'
    ],
    equipmentUsed: [
      'Sub-Second High Precision Total Station',
      'High-Precision Prisms & Invar Leveling Rods',
      'CAD / GIS Terrain Modeling Software'
    ],
    coverImage: '/api/media/projects/quarry_deformation_monitoring_station.jpg',
    gallery: [
      '/api/media/projects/quarry_deformation_monitoring_station.jpg',
      '/api/media/projects/quarry_precision_field_survey.jpg',
      '/api/media/projects/quarry_geodetic_tripod.jpg'
    ],
    relevantStandards: ['FGDC Geodetic Standards', 'MOMRA Topographic Specifications'],
    relatedServiceId: 'engineering-surveying'
  },
  {
    id: 'cgl-proj-005',
    nameAr: 'هندسة سند الحفر العميق وتثبيت الخنادق ونزح المياه',
    nameEn: 'Deep Excavation Shoring, Trench Support & Dewatering',
    sectorAr: 'التدعيم ونزح المياه الجوفية',
    sectorEn: 'Deep Shoring, Trench Support & Geotechnical Safety',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Kingdom of Saudi Arabia',
    scopeOfWorkAr: 'تصميم ومتابعة نظم تدعيم وسند جوانب الحفر العميق لخطوط المرافق والبنية التحتية، مع التحكم في منسوب المياه الجوفية ومنع الانهيارات.',
    scopeOfWorkEn: 'Geotechnical supervision and monitoring of trench shoring boxes, deep excavation stability, and groundwater control.',
    servicesPerformedAr: [
      'الإشراف الجيوتقني على تنفيذ صناديق وخوازيق سند جوانب الحفر',
      'رصد استقرار التربة المحيطة والمباني المجاورة للمسار',
      'تنفيذ تجارب فحص دمك التربة وطبقات التأسيس'
    ],
    technicalChallengesAr: 'وجود منسوب مياه جوفية مرتفع بجوار خطوط خدمات حيوية قائمة تتطلب حماية صارمة ضد أي هبوطات تفاضلية.',
    engineeringApproachAr: 'تطبيق نمذجة استقرار متكاملة، ونشر آبار نزح نقطية مع مراقبة يومية لخطوط الهبوط عبر مقاييس الميل الرقمية.',
    testsPerformedAr: [
      'Nuclear Field Density Compaction Testing (ASTM D6938)',
      'Excavation Deflection Inclinometer Monitoring',
      'Groundwater Drawdown Flow Rate Recording'
    ],
    equipmentUsed: [
      'Heavy Hydraulic Trench Shoring Shield Systems',
      'Nuclear Density Gauge (Calibrated Troxler)',
      'Submersible Deep Well Dewatering Pumps'
    ],
    coverImage: '/api/media/projects/deep_excavation_shoring_piles.jpg',
    gallery: [
      '/api/media/projects/deep_excavation_shoring_piles.jpg',
      '/api/media/projects/trench_shoring_dewatering_system.jpg',
      '/api/media/projects/excavation_foundation_site.jpg'
    ],
    relevantStandards: ['OSHA Subpart P (Excavations)', 'CIRIA C760', 'SBC 303'],
    relatedServiceId: 'shoring-dewatering'
  },
  {
    id: 'cgl-proj-006',
    nameAr: 'تقييم السلامة الإنشائية والفحوص غير المتلفة للأبراج القائمة',
    nameEn: 'Structural Integrity Assessment & Non-Destructive Testing for High-Rise Towers',
    sectorAr: 'تقييم المنشآت وضبط الجودة الإنشائية',
    sectorEn: 'Building Integrity & Structural Health',
    locationAr: 'جدة، المملكة العربية السعودية',
    locationEn: 'Jeddah, Saudi Arabia',
    scopeOfWorkAr: 'تنفيذ الفحوصات الإنشائية غير الإتلافيّة (NDT)، واختبارات الموجات فوق الصوتية، ومسح حديد التسليح بالرادار الخرساني لتقييم السلامة الإنشائية وتحديد مطابقة العناصر الحاملة.',
    scopeOfWorkEn: 'Executing non-destructive testing (NDT), ultrasonic pulse velocity, and GPR concrete radar scanning to evaluate structural integrity and assess load-bearing elements.',
    servicesPerformedAr: [
      'مسح وتحديد كثافة وتغطية حديد التسليح بالرادار ثلاثي الأبعاد',
      'تقييم التجانس الإنشائي واكتشاف التعشيش والشروخ الداخلية',
      'إصدار تقارير هندسية متكاملة مدعمة بنماذج المطابقة الإنشائية'
    ],
    technicalChallengesAr: 'فحص وتحديد مواقع التسليح والعيوب الداخلية في العناصر الخرسانية الكثيفة دون الإضرار بالسلامة الإنشائية للبرج القائم.',
    engineeringApproachAr: 'استخدام أحدث أجهزة المسح الكهرومغناطيسي وفوق الصوتي المعايرة، مع عمل نمذجة ثلاثية الأبعاد لتوزيع التسليح ومطابقتها مع المخططات الإنشائية المعتمدة.',
    testsPerformedAr: [
      'Ultrasonic Pulse Velocity Test (ASTM C597)',
      'High-Frequency GPR Rebar & Void Mapping',
      'Concrete Core Compressive Strength Verification'
    ],
    equipmentUsed: [
      'Proceq Ultrasonic Pulse Velocity Tester (Pundit PL-200)',
      'Hilti PS 1000 X-Scan 3D Concrete Radar',
      'Calibrated Rebound Schmidt Test Hammer'
    ],
    coverImage: '/api/media/projects/structural_integrity_ultrasonic_ndt.jpg',
    gallery: [
      '/api/media/projects/structural_integrity_ultrasonic_ndt.jpg',
      '/api/media/projects/structural_concrete_core_sampling.jpg',
      '/api/media/projects/structural_rebar_radar_scanner.jpg'
    ],
    relevantStandards: ['ASTM C597', 'BS 1881-204', 'ACI 228.1R', 'SBC 304'],
    relatedServiceId: 'building-integrity'
  }
];

export const CGL_OPERATIONAL_CAPABILITIES: OperationalCapability[] = [
  {
    id: 'cap-001',
    nameAr: 'اختبارات التحميل الاستاتيكي للخوازيق (Static Load Testing)',
    nameEn: 'Static Axial Compressive Pile Testing',
    applicationAr: 'التحقق من قدرة تحمل الخوازيق الخرسانية وتأكيد معاملات الأمان في ناطحات السحاب والجسور والموانئ.',
    category: 'Field',
    equipmentUsedAr: [
      'روافع هيدروليكية عالية القدرة مع مقاييس ضغط معايرة',
      'منظومة كمرات فولاذية عملاقة لكتل رد الفعل (Kentledge)',
      'ساعات قياس هبوط ميكانيكية ورقمية بحساسية 0.01 مم'
    ],
    testingMethodsAr: [
      'طريقة التحميل المعتمد (Quick Test Method - ASTM D1143)',
      'طريقة التحميل القياسي مع فترات التثبيت الزمنية',
      'تسجيل منحنيات الحمل مقابل الهبوط (Load-Settlement)'
    ],
    capacityRangeAr: 'قدرات تحميل اختبارية تتجاوز 1,000 طن حسب متطلبات المشروع',
    applicableStandards: ['ASTM D1143 / D1143M', 'SBC 303'],
    typicalDeliverablesAr: [
      'تقرير فحص التحميل المعتمد مع توقيع مهندس معتمد',
      'مخططات بيانية تفصيلية لدورات التحميل والتفريغ',
      'تقييم الهبوط المتبقي والقدرة القصوى للخازوق'
    ],
    image: '/uploads/user_provided/pile_load_test.jpeg',
    relatedServiceId: 'geotechnical-investigation'
  },
  {
    id: 'cap-002',
    nameAr: 'المسح الطبوغرافي والرصد الجيوديسي الدقيق',
    nameEn: 'Precision Geodetic & Engineering Surveying',
    applicationAr: 'تخطيط الطرق، مشاريع البنية التحتية، تحديد حدود الملكيات، ومراقبة هبوط المنشآت الحساسة.',
    category: 'Field',
    equipmentUsedAr: [
      'محطات رصد إلكترونية شاملة (Total Stations) بدقة زاوية ثانية واحدة',
      'أجهزة رصد فضائي تفاضلي GNSS/RTK',
      'أجهزة تسوية وموازنة رقمية بصرية (Digital Levels)'
    ],
    testingMethodsAr: [
      'المسح بالشبكات المضلعة المغلقة (Closed Traverse)',
      'المسح بالرصد القطبي المباشر (Radial Topography)',
      'المراقبة المساحية المستمرة للميول والإزاحات'
    ],
    capacityRangeAr: 'دقة رصد زاوي تصل إلى 1 ثانية، ودقة مسافات تناهز 1 مم + 1.5 جزء في المليون',
    applicableStandards: ['ISO 17123 Standards for Surveying Instruments', 'FGDC Guidelines'],
    typicalDeliverablesAr: [
      'خرائط رقمية تفصيلية بامتداد AutoCAD (DWG)',
      'جداول إحداثيات ومناسيب معتمدة للعلامات الأرضية (BMs)',
      'تقارير حسابات الكميات للقطع والردم'
    ],
    image: '/uploads/user_provided/topographic_survey.jpeg',
    relatedServiceId: 'engineering-surveying'
  },
  {
    id: 'cap-003',
    nameAr: 'الحفر الاستكشافي وأخذ العينات الميدانية (Drilling & Sampling)',
    nameEn: 'Exploratory Core Drilling & Undisturbed Sampling',
    applicationAr: 'استكشاف طبقات الأرض، تتبع منسوب المياه، وتحديد خصائص الطبقات الجيولوجية تحت الأساسات.',
    category: 'Field',
    equipmentUsedAr: [
      'حفارات هيدروليكية دوارة (Rotary Drilling Rigs) مع أنابيب التغليف',
      'أجهزة أخذ العينات الأسطوانية الصخرية (Core Barrels)',
      'أسطوانات شيلبي ذات الجدار الرقيق للتربة الطينية اللينة'
    ],
    testingMethodsAr: [
      'اختبار الاختراق القياسي داخل الجسة (SPT - ASTM D1586)',
      'أخذ العينات المقلقلة وغير المقلقلة (Disturbed & Undisturbed)',
      'قياس ومراقبة منسوب المياه في البيزوميترات'
    ],
    capacityRangeAr: 'أعماق حفر تصل إلى أكثر من 50 متراً في التربة والصخور',
    applicableStandards: ['ASTM D1586', 'ASTM D1587', 'ASTM D2113'],
    typicalDeliverablesAr: [
      'سجلات الجسات الميدانية التفصيلية (Borehole Logs)',
      'صناديق العينات الصخرية الموثقة بالصور (Core Boxes)',
      'تقارير تصنيف التربة المبدئي في الموقع'
    ],
    image: '/uploads/user_provided/exploratory_core_drilling.jpeg',
    relatedServiceId: 'geotechnical-investigation'
  },
  {
    id: 'cap-004',
    nameAr: 'فحوصات الخرسانة والمواد الإنشائية المعتمدة',
    nameEn: 'Laboratory Concrete & Materials Testing',
    applicationAr: 'التحقق من جودة الخرسانة الموردة للمشاريع واعتماد الخلطات الخرسانية وحديد التسليح.',
    category: 'Laboratory',
    equipmentUsedAr: [
      'ماكينات كسر وضغط خرسانة رقمية آلية بمعايرة دورية',
      'أجهزة قياس الصلادة السطحية بالموجات والمطارق',
      'أحواض معالجة حرارية مضبوطة للعينات الخرسانية'
    ],
    testingMethodsAr: [
      'كسر المكعبات والأسطوانات الخرسانية (ASTM C39)',
      'اختبار الهبوط والحرارة للخرسانة الطازجة في الموقع',
      'فحص كسر القلوب الخرسانية المستخرجة من المباني'
    ],
    capacityRangeAr: 'ماكينات ضغط تصل قدرتها إلى 2,000 و 3,000 كيلو نيوتن',
    applicableStandards: ['ASTM C39', 'BS EN 12390', 'SBC 304'],
    typicalDeliverablesAr: [
      'شهادات نتائج فحص كسر الخرسانة بعمر 7 و 28 يوماً',
      'تقييم إحصائي لمطابقة الخرسانة للمقاومة المميزة المطلوبة',
      'سجلات ضبط الجودة المعتمدة لاستشاري المشروع'
    ],
    image: '/uploads/curated/materials_compression_press.jpg',
    relatedServiceId: 'materials-testing'
  },
  {
    id: 'cap-005',
    nameAr: 'أنظمة سند الحفر ورصد الميول والإنكلينوميتر',
    nameEn: 'Deep Shoring Monitoring & Inclinometer Systems',
    applicationAr: 'المراقبة المستمرة لثبات جوانب الحفر العميق وسلامة المباني والخدمات المجاورة.',
    category: 'Field',
    equipmentUsedAr: [
      'مجسات الإنكلينوميتر الرقمية المحورية (Digital Inclinometer Probes)',
      'أجهزة رصد مناسيب وضغط المياه (Piezometers)',
      'نقاط رصد التشويه ثلاثية الأبعاد (3D Deformation Targets)'
    ],
    testingMethodsAr: [
      'تسجيل إزاحات جدران السند بدقة 0.01 مم لكل متر',
      'رصد منسوب المياه الجوفية الديناميكي',
      'حساب متجهات الحركة والتحذير المبكر'
    ],
    capacityRangeAr: 'أعماق رصد إنكلينوميتر تصل إلى 60 متراً رأسياً',
    applicableStandards: ['ASTM D6230', 'CIRIA C760', 'SBC 303'],
    typicalDeliverablesAr: [
      'تقارير الرصد اليومية والأسبوعية للميول',
      'مخططات إزاحة جدران السند مع العمق',
      'شهادات استقرار جوانب الحفر المعتمدة'
    ],
    image: '/uploads/user_provided/inclinometer_monitoring.jpeg',
    relatedServiceId: 'shoring-dewatering'
  },
  {
    id: 'cap-006',
    nameAr: 'الفحوصات غير الإتلافية والرادار الخرساني (NDT & GPR)',
    nameEn: 'Non-Destructive Testing & Ground Penetrating Radar',
    applicationAr: 'تقييم سلامة المباني القائمة، الكشف عن حديد التسليح والفجوات دون أي إتلاف للعناصر الإنشائية.',
    category: 'Field & Lab',
    equipmentUsedAr: [
      'أجهزة الرادار الأرضي عالي التردد (Proceq GPR Live)',
      'مطرقة شميدت الإلكترونية المعايرة (SilverSchmidt)',
      'أجهزة الموجات فوق الصوتية لقياس السرعة (UPV Pundit)'
    ],
    testingMethodsAr: [
      'مسح شبكات حديد التسليح وتحديد عمق الغطاء الخرساني',
      'تحديد مقاومة الخرسانة اللحظية عبر مطرقة الارتداد',
      'الكشف عن التعشيش والتشققات الدقيقة بالموجات فوق الصوتية'
    ],
    capacityRangeAr: 'اختراق راداري يصل لعمق 80 سم في الخرسانة الكثيفة',
    applicableStandards: ['ASTM C805', 'ASTM C597', 'ACI 228.1R'],
    typicalDeliverablesAr: [
      'مخططات كشف حديد التسليح ثلاثية الأبعاد',
      'تقارير السلامة الإنشائية وتقييم متانة المنشآت',
      'توصيات التدعيم والإصلاح الإنشائي'
    ],
    image: '/uploads/user_provided/concrete_ndt_radar.jpeg',
    relatedServiceId: 'structural-integrity'
  }
];

export const CGL_AUTHORIZED_PARTNERS: AuthorizedPartner[] = [
  {
    id: 'proceq',
    nameAr: 'بروسيك السويسرية',
    nameEn: 'Proceq Switzerland',
    category: 'consultant',
    sectorAr: 'تقنيات وفحوصات لاإتلافية',
    collaborationScopeAr: 'أنظمة الفحص غير المتلف واختبارات رادار الخرسانة والموجات فوق الصوتية.',
    badge: 'شريك تقني عالمي',
    logo: '/api/media/partners/proceq.png',
  },
  {
    id: 'weber',
    nameAr: 'ويبر سان جوبان',
    nameEn: 'Weber Saint-Gobain',
    category: 'materials',
    sectorAr: 'مواد البناء المتطورة',
    collaborationScopeAr: 'تطوير وفحص المواد الإنشائية المتطورة والخلطات الصناعية.',
    badge: 'شريك مواد بناء',
    logo: '/api/media/partners/weber.png',
  },
  {
    id: 'hilti',
    nameAr: 'هيلتي العالمية',
    nameEn: 'Hilti Group',
    category: 'consultant',
    sectorAr: 'أنظمة التثبيت والهندسة الميكانيكية',
    collaborationScopeAr: 'فحوصات التثبيت الإنشائي والحلول الهندسية المعتمدة.',
    badge: 'شريك أنظمة هندسية',
    logo: '/api/media/partners/hilti.png',
  },
  {
    id: 'levels',
    nameAr: 'شركة ليفلز للمقاولات',
    nameEn: 'LEVELS Contracting',
    category: 'contractor',
    sectorAr: 'المقاولات العامة والأبراج',
    collaborationScopeAr: 'مشروع برج سيسيان القابضة والدراسات الجيوتقنية الشاملة.',
    badge: 'مقاول رئيسي',
    logo: '/api/media/partners/levels.png',
  },
  {
    id: 'hesco',
    nameAr: 'شركة هيسكو للإنشاءات',
    nameEn: 'Hesco Construction Partner',
    category: 'contractor',
    sectorAr: 'المقاولات المتخصصة والإنشاءات',
    collaborationScopeAr: 'تنفيذ المشاريع الإنشائية ودراسات الأساسات العميقة.',
    badge: 'شريك تنفيذي',
    logo: '/api/media/partners/hesco.png',
  },
  {
    id: 'mbl',
    nameAr: 'شركة قادة البناء الحديث (MBL)',
    nameEn: 'Modern Building Leaders (MBL)',
    category: 'contractor',
    sectorAr: 'البنية التحتية الكبرى والمشاريع الحيوية',
    collaborationScopeAr: 'فحوصات الخرسانة والأسفلت وتصميم نظم سند جوانب الحفر.',
    badge: 'مقاول رئيسي Tier-1',
    logo: '/api/media/partners/mbl.png',
  },
  {
    id: 'orient_weavers',
    nameAr: 'شركة الشرق للإنشاءات - ويفرز',
    nameEn: 'Orient Construction - Weavers Ltd',
    category: 'contractor',
    sectorAr: 'الإنشاءات الصناعية والمصانع',
    collaborationScopeAr: 'دراسات ميكانيكا التربة وفحوصات الأساسات الثقيلة للمنشآت الصناعية.',
    badge: 'مقاول منشآت صناعية',
    logo: '/api/media/partners/orient_weavers.png',
  },
  {
    id: 'abuljadayel',
    nameAr: 'شركة أبو الجدايل للمقاولات والصيانة',
    nameEn: 'Abuljadayel Co.',
    category: 'contractor',
    sectorAr: 'المقاولات العامة والخدمات',
    collaborationScopeAr: 'أعمال المسح الطبوغرافي الرقمي وحفر الجسات وفحوصات المواد.',
    badge: 'مقاول بنية تحتية',
    logo: '/api/media/partners/abuljadayel.png',
  },
  {
    id: 'shec',
    nameAr: 'شركة شيراك للاستشارات الهندسية',
    nameEn: 'SHEC Engineering Consulting',
    category: 'consultant',
    sectorAr: 'الاستشارات والتصميم الهندسي',
    collaborationScopeAr: 'التنسيق الاستشاري والدراسات الجيوتقنية الإنشائية المشتركة.',
    badge: 'شريك استشاري',
    logo: '/api/media/partners/shec.png',
  },
  {
    id: 'sky_jeddah',
    nameAr: 'شركة نجب جدة للمقاولات (سكاي)',
    nameEn: 'Sky Jeddah Construction',
    category: 'contractor',
    sectorAr: 'الإنشاءات والمباني السكنية والتجارية',
    collaborationScopeAr: 'فحوصات التربة وضبط جودة المواد الخرسانية.',
    badge: 'مقاول إنشاءات',
    logo: '/api/media/partners/sky_jeddah.png',
  },
  {
    id: 'albalad',
    nameAr: 'برنامج جدة التاريخية (البلد)',
    nameEn: 'Jeddah Historic District (Al Balad)',
    category: 'development',
    sectorAr: 'التطوير والتأهيل التراثي والعمراني',
    collaborationScopeAr: 'دراسات السلامة الإنشائية للمباني التاريخية وفحوصات الرادار (GPR).',
    badge: 'مشروع تراثي وطني',
    logo: '/api/media/partners/albalad.png',
  },
  {
    id: 'binladin',
    nameAr: 'مجموعة بن لادن السعودية',
    nameEn: 'Saudi Binladin Group',
    category: 'contractor',
    sectorAr: 'الإنشاءات الكبرى والمطارات والبنية التحتية',
    collaborationScopeAr: 'فحوصات استكشاف التربة، اختبارات الخوازيق ومطابقة المواد الإنشائية.',
    badge: 'مقاول معتمد Tier-1',
    logo: '/api/media/partners/binladin.png',
  },
  {
    id: 'abdul_latif_jameel',
    nameAr: 'مجموعة عبد اللطيف جميل',
    nameEn: 'Abdul Latif Jameel Commercial',
    category: 'development',
    sectorAr: 'التطوير التجاري والاستثماري',
    collaborationScopeAr: 'دراسات تقارير التربة وتوصيات الأساسات للمراكز التجارية والمعارض.',
    badge: 'مطور تجاري',
    logo: '/api/media/partners/abdul_latif_jameel.png',
  },
];

// Note: Strict Data Integrity Rule applied. Certifications reflect standard compliance frameworks until official certificate files are verified.
export const CGL_STANDARDS_COMPLIANCE: ComplianceCertification[] = [
  {
    id: 'sbc-compliance',
    name: 'كود البناء السعودي (Saudi Building Code)',
    issuingOrg: 'اللجنة الوطنية لكود البناء السعودي (SBCNC)',
    verifiedScopeAr: 'الامتثال لكافة متطلبات واشتراطات الكود السعودي للتربة والأساسات (SBC 303) والأعمال الإنشائية (SBC 304).',
    applicableFacilityAr: 'المختبرات المركزية والفحوصات الميدانية بالمملكة العربية السعودية',
    isVerified: true
  },
  {
    id: 'astm-compliance',
    name: 'المعايير القياسية الأمريكية (ASTM International Standards)',
    issuingOrg: 'ASTM International',
    verifiedScopeAr: 'تطبيق طرق الاختبار القياسية لفحوصات التربة والمواد والأساسات والخرسانة المسلحة (ASTM D-Series & C-Series).',
    applicableFacilityAr: 'كافة عمليات الاختبار الميداني والمعملي بفرعي CGL في المملكة والولايات المتحدة',
    isVerified: true
  },
  {
    id: 'aci-compliance',
    name: 'معهد الخرسانة الأمريكي (American Concrete Institute)',
    issuingOrg: 'American Concrete Institute (ACI)',
    verifiedScopeAr: 'معايير تقييم واختبار المنشآت الخرسانية والفحوصات غير الإتلافية ومطابقة الممارسات المهنية.',
    applicableFacilityAr: 'مختبرات فحص واختبار المواد والتقييم الإنشائي',
    isVerified: true
  }
];

export const CGL_EQUIPMENT_FLEET: EquipmentItem[] = [
  {
    id: 'equip-01',
    code: 'CGL-RIG-500',
    nameAr: 'حفارة الجسات الهيدروليكية الدوارة',
    nameEn: 'Hydraulic Rotary Core Drilling Rig',
    category: 'drilling',
    categoryNameAr: 'حفر واستكشاف التربة',
    categoryNameEn: 'Drilling & Geotechnical',
    specsAr: [
      'عمق حفر استكشافي يصل حتى 80 متراً',
      'استخراج عينات صخرية أسطوانية مستمرة وعالية الدقة',
      'منظومة آلية لاختبار الاختراق القياسي للتربة'
    ],
    specsEn: [
      'Exploratory drilling depth up to 80 meters',
      'Continuous rock coring system (NQ/HQ Core Barrels)',
      'Integrated automated standard penetration hammer (Auto SPT)'
    ],
    standards: ['ASTM D1586', 'ASTM D2113', 'SBC 303'],
    standardsAr: ['كود البناء السعودي SBC 303', 'معايير ASTM الدولية'],
    standardsEn: ['Saudi Building Code SBC 303', 'ASTM International Standards'],
    image: '/uploads/equipments/equip_688f127ce7aef5.17984599.jpg',
    serviceId: 'geotechnical-investigation'
  },
  {
    id: 'equip-02',
    code: 'CGL-PRESS-3000',
    nameAr: 'ماكينة كسر وضغط الخرسانة الرقمية',
    nameEn: 'Digital Concrete Compression Testing Machine (3,000 kN)',
    category: 'materials',
    categoryNameAr: 'مختبر فحص المواد',
    categoryNameEn: 'Materials Testing',
    specsAr: [
      'طاقة تحميل هيدروليكية قصوى تصل إلى 3000 كيلو نيوتن',
      'تحكم رقمي وتسجيل آلي لمنحنى الإجهاد والانفعال',
      'معايرة دورية معتمدة لإصدار شهادات المطابقة للمشاريع'
    ],
    specsEn: [
      'Maximum compressive capacity of 3,000 kN',
      'Closed-loop digital servo control with automated stress-strain plotting',
      'Periodically calibrated and certified for official compliance testing'
    ],
    standards: ['ASTM C39', 'BS EN 12390', 'SBC 304'],
    standardsAr: ['كود البناء السعودي SBC 304', 'معايير ASTM الدولية'],
    standardsEn: ['Saudi Building Code SBC 304', 'ASTM International Standards'],
    image: '/uploads/curated/materials_compression_press.jpg',
    serviceId: 'materials-testing'
  },
  {
    id: 'equip-03',
    code: 'GPR-NDT-PRO',
    nameAr: 'رادار المسح الإنشائي الخرساني ثلاثي الأبعاد',
    nameEn: 'High-Frequency Concrete GPR Radar System',
    category: 'ndt',
    categoryNameAr: 'الفحوصات غير الإتلافية',
    categoryNameEn: 'NDT & Structural Radar',
    specsAr: [
      'كشف شبكات حديد التسليح والفجوات لعمق يصل إلى 80 سم',
      'توليد مخططات مقطعية ثلاثية الأبعاد فورية للخرسانة',
      'فحص راداري غير إتلافي للأبراج والمباني الحيوية والتراثية'
    ],
    specsEn: [
      'Rebar mapping and subsurface void detection up to 80cm depth',
      'Real-time 3D tomographic slice imaging and depth estimation',
      'Ultra-wideband stepped frequency antenna for non-invasive testing'
    ],
    standards: ['ASTM D6432', 'ACI 228.1R', 'BS 1881'],
    standardsAr: ['معايير ASTM القياسية', 'المواصفات البريطانية BS'],
    standardsEn: ['ASTM D6432 Standards', 'British Standards BS 1881'],
    image: '/uploads/user_provided/concrete_ndt_radar.jpeg',
    serviceId: 'structural-integrity'
  },
  {
    id: 'equip-04',
    code: 'TS-GEO-01',
    nameAr: 'محطة الرصد المساحي الإلكترونية الشاملة',
    nameEn: 'High-Precision Geodetic Total Station',
    category: 'surveying',
    categoryNameAr: 'المسح الهندسي والجيوديسي',
    categoryNameEn: 'Geodetic & Surveying',
    specsAr: [
      'دقة رصد زوايا فائقة تبلغ ثانية واحدة',
      'مدى قياس ليزري خالي من العواكس يصل حتى 1000 متر',
      'رصد تشوهات وهبوط المنشآت والجسور بدقة مليمترية مستمرة'
    ],
    specsEn: [
      'Sub-second precision angular measurement (1" accuracy)',
      'Reflectorless EDM distance measurement up to 1,000m',
      'Millimeter structural displacement and deformation monitoring'
    ],
    standards: ['ISO 17123-3', 'MOMRA Standards', 'FGDC Guidelines'],
    standardsAr: ['معايير الآيزو الدولية ISO', 'المواصفات البلدية المعتمدة'],
    standardsEn: ['ISO 17123-3 Standards', 'MOMRA Municipal Standards'],
    image: '/uploads/user_provided/topographic_survey.jpeg',
    serviceId: 'engineering-surveying'
  },
  {
    id: 'equip-05',
    code: 'CGL-PLT-1000',
    nameAr: 'منظومة فحص التحميل الاستاتيكي للخوازيق',
    nameEn: 'Static Axial Pile Load Testing Assembly & Calibrated Jacks',
    category: 'drilling',
    categoryNameAr: 'حفر واستكشاف التربة',
    categoryNameEn: 'Drilling & Geotechnical',
    specsAr: [
      'روافع هيدروليكية معايرة تصل قدرتها حتى 1200 طن',
      'ساعات قياس هبوط رقمية بحساسية فائقة تبلغ 0.01 مم',
      'منظومة كمرات رد فعل فولاذية معتمدة للأحمال الكبرى'
    ],
    specsEn: [
      'Calibrated hydraulic jacking cylinders up to 1,200 tons capacity',
      'High-sensitivity digital dial indicators (0.01mm resolution)',
      'Heavy structural steel reaction beam system for deep foundation verification'
    ],
    standards: ['ASTM D1143 / D1143M', 'SBC 303'],
    standardsAr: ['كود البناء السعودي SBC 303', 'معايير ASTM الدولية'],
    standardsEn: ['Saudi Building Code SBC 303', 'ASTM D1143 Standards'],
    image: '/uploads/equipments/equip_688f1df225e884.34621239.jpg',
    serviceId: 'geotechnical-investigation'
  },
  {
    id: 'equip-06',
    code: 'INC-PROBE-60',
    nameAr: 'مجسات رقمية لرصد ميول الحفر والجدران الساندة',
    nameEn: 'Digital Vertical Inclinometer Probe & Readout System',
    category: 'ndt',
    categoryNameAr: 'الفحوصات غير الإتلافية',
    categoryNameEn: 'NDT & Structural Radar',
    specsAr: [
      'رصد أعماق الحفر والجدران الساندة حتى عمق 60 متراً رأسياً',
      'حساسات تسارع رقمية ثنائية المحور عالية الدقة',
      'كشف أي إزاحة جانبية في جوانب الحفر بدقة 0.01 مم لكل متر'
    ],
    specsEn: [
      'Deep excavation and retaining wall monitoring up to 60m depth',
      'Dual-axis digital MEMS accelerometers with real-time profile logging',
      'Detects horizontal deflections with 0.01mm per meter precision'
    ],
    standards: ['ASTM D6230', 'CIRIA C760', 'SBC 303'],
    standardsAr: ['كود البناء السعودي SBC 303', 'معايير ASTM الدولية'],
    standardsEn: ['Saudi Building Code SBC 303', 'ASTM D6230 Standards'],
    image: '/uploads/user_provided/inclinometer_monitoring.jpeg',
    serviceId: 'shoring-dewatering'
  }
];

export const CGL_LATEST_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    titleAr: 'مختبرات CGL تطبق الاشتراطات الإلزامية المحدثة لكود البناء السعودي',
    titleEn: 'CGL Laboratories Upgrades Geotechnical Standards Aligned with Saudi Building Code',
    excerptAr: 'تحديث شامل لبروتوكولات استكشاف التربة، اختبارات الكثافة الحقلية، وفحوصات مطابقة الخرسانة المسلحة بما يتوافق بدقة مع اشتراطات الكود السعودي المعتمد.',
    excerptEn: 'Full enhancement of soil exploration, field compaction tests, and concrete compliance testing strictly aligned with mandatory SBC protocols.',
    categoryAr: 'كود البناء واللوائح',
    categoryEn: 'Building Code & Standards',
    date: '15 سبتمبر 2026',
    dateAr: '15 سبتمبر 2026',
    dateEn: 'September 15, 2026',
    readTimeAr: '3 دقائق قراءة',
    readTimeEn: '3 min read',
    image: '/api/media/news/news_saudi_building_code_lab.jpg',
    featured: true
  },
  {
    id: 'news-02',
    titleAr: 'توسيع أسطول حفارات الجسات الدوارة لدعم مشاريع البنية التحتية بالمنطقة الغربية',
    titleEn: 'Fleet Expansion: Advanced Rotary Drilling Rigs Deployed for Western Province Infrastructure',
    excerptAr: 'تدشين وحدات حفر هيدروليكية دوارة ذات أعماق استكشافية تصل إلى 80 متراً في التكوينات الصخرية والساحلية لخدمة كبرى مشاريع التطوير بجدة ومكة المكرمة.',
    excerptEn: 'Commissioning heavy-duty rotary drilling units with 80m exploration depth in complex coastal rock formations across Jeddah and Makkah.',
    categoryAr: 'الأسطول والعمليات الميدانية',
    categoryEn: 'Fleet & Operations',
    date: '02 سبتمبر 2026',
    dateAr: '02 سبتمبر 2026',
    dateEn: 'September 02, 2026',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    image: '/api/media/news/news_rotary_drilling_rig.jpg'
  },
  {
    id: 'news-03',
    titleAr: 'اعتماد أحدث تقنيات الرادار ثلاثي الأبعاد لتقييم المنشآت الحيوية والتراثية',
    titleEn: 'Next-Gen 3D GPR Radar Solutions Deployed for Heritage & Critical Structural Audits',
    excerptAr: 'تطبيق أحدث حلول الفحص الإنشائي غير الإتلافي للكشف الدقيق عن شبكات حديد التسليح والفجوات الخرسانية وتحديد سلامة الأساسات دون أي ضرر بالمنشآت القائمة.',
    excerptEn: 'Applying non-destructive subsurface scanning for rebar mapping, concrete cover verification, and structural integrity preservation without coring.',
    categoryAr: 'التقنيات الهندسية والابتكار',
    categoryEn: 'Engineering Innovation',
    date: '18 أغسطس 2026',
    dateAr: '18 أغسطس 2026',
    dateEn: 'August 18, 2026',
    readTimeAr: '3 دقائق قراءة',
    readTimeEn: '3 min read',
    image: '/api/media/news/news_3d_gpr_radar_scanner.jpg'
  }
];

export interface KeyPerson {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  bioAr: string;
  bioEn: string;
  experience: string;
  email?: string;
  locationAr: string;
  locationEn: string;
}

export const CGL_KEY_PERSONS: KeyPerson[] = [
  {
    id: 'raymond-haddad',
    nameAr: 'م. ريمون م. حداد',
    nameEn: 'Eng. Raymond M. Haddad',
    roleAr: 'المدير العام - المقر الرئيسي',
    roleEn: 'General Manager, Headquarters',
    bioAr: 'يشغل منصب المدير العام للمقر الرئيسي بكاليفورنيا، الولايات المتحدة الأمريكية، مع أكثر من 25 عاماً من الخبرة الواسعة في الهندسة الجيوتقنية، تحريات المواقع، تصميم الأساسات وتحليل استقرار التربة.',
    bioEn: 'General Manager of headquarters in California, USA, bringing over 25 years of extensive experience in geotechnical engineering, site investigations, foundation design, and soil stability analysis.',
    experience: '+25 سنة خبرة',
    locationAr: 'كاليفورنيا، الولايات المتحدة الأمريكية',
    locationEn: 'California, USA',
  },
  {
    id: 'abdul-manan-jamal',
    nameAr: 'م. عبد المنان جمال الدين',
    nameEn: 'Eng. Abdul Manan Jamal Eddin',
    roleAr: 'المدير العام للمملكة العربية السعودية',
    roleEn: 'General Manager, Saudi Arabia',
    bioAr: 'المدير العام للشركة بالمملكة، يتمتع بخبرة تتجاوز 30 عاماً في الهندسة الجيوتقنية وأعمال استكشاف التربة، تصميم الأساسات العميقة، وتقنيات تحسين التربة بالمملكة.',
    bioEn: 'General Manager of the company, bringing over 30 years of experience in geotechnical engineering in Saudi Arabia, focusing on soil investigation, foundation design, and ground improvement techniques.',
    experience: '+30 سنة خبرة',
    email: 'abdulmanan.Jamal@creativegeotechnical.com.sa',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Saudi Arabia',
  },
  {
    id: 'mostafa-el-sherif',
    nameAr: 'م. مصطفى الشريف',
    nameEn: 'Eng. Mostafa M. El Sherif',
    roleAr: 'المدير التقني',
    roleEn: 'Technical Manager',
    bioAr: 'خبير ومهندس تقني أول بخبرة تزيد عن 30 عاماً في ميكانيكا التربة، تصميم الأساسات، منظومات الخوازيق العميقة، وتقنيات تثبيت وتحسين خواص الأرض.',
    bioEn: 'Seasoned technical engineer with over 30 years of experience in soil mechanics, foundation design, pile systems, and soil improvement techniques.',
    experience: '+30 سنة خبرة',
    email: 'mostafa.elsherif@creativegeotechnical.com.sa',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Saudi Arabia',
  },
  {
    id: 'samir-bakfalouni',
    nameAr: 'م. سمير بقفلوني',
    nameEn: 'Eng. Samir Bakfalouni',
    roleAr: 'مدير المشاريع وتقييم المنشآت',
    roleEn: 'Projects Manager - Structural Assessment',
    bioAr: 'مهندس متخصص في تقييم السلامة الإنشائية بخبرة تتجاوز 15 عاماً في تقييم وتدقيق المباني القائمة بالمملكة، الفحوصات اللاإتلافية (NDT)، وضبط جودة المشاريع الإنشائية.',
    bioEn: 'Structural Assessment Engineer with over 15 years of experience specializing in evaluation of existing buildings, non-destructive testing (NDT), and construction quality control.',
    experience: '+15 سنة خبرة',
    email: 'Samir.bakfalouni@creativegeotechnical.com.sa',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Saudi Arabia',
  },
  {
    id: 'hussam-alkadi',
    nameAr: 'م. حسام القاضي',
    nameEn: 'Eng. Hussam Alkadi',
    roleAr: 'مهندس جيوتقني أول',
    roleEn: 'Senior Geotechnical Engineer',
    bioAr: 'مهندس جيوتقني متمرس بخبرة تزيد عن 10 سنوات في دراسات التحريات الجيوتقنية، الحفر الميداني، وتحليلات وفحوصات التربة المخبرية في المملكة العربية السعودية.',
    bioEn: 'Skilled Geotechnical Engineer with over 10 years of experience in geotechnical investigation studies, field exploration, and soil analysis/testing in Saudi Arabia.',
    experience: '+10 سنوات خبرة',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Saudi Arabia',
  },
  {
    id: 'karim-fattouh',
    nameAr: 'م. كريم محمد فتوح',
    nameEn: 'Eng. Karim Mohamed Fattouh',
    roleAr: 'مهندس جيوتقني وتقني',
    roleEn: 'Technical Geotechnical Engineer',
    bioAr: 'مهندس جيوتقني وإنشائي بخبرة تزيد عن 12 عاماً في ميكانيكا التربة وهندسة الأساسات، متخصص في الإشراف الفني الميداني على المشاريع الجيوتقنية الكبرى.',
    bioEn: 'Geo-structural engineer with over 12 years of experience in soil mechanics and foundation engineering, specializing in supervising major geotechnical field projects.',
    experience: '+12 سنة خبرة',
    locationAr: 'المملكة العربية السعودية',
    locationEn: 'Saudi Arabia',
  },
];

export const CGL_PROFILE_EQUIPMENT = [
  {
    id: 'okm-geoseeker',
    nameAr: 'OKM GeoSeeker (ألمانيا)',
    nameEn: 'OKM GeoSeeker (Germany)',
    descAr: 'كاشف المياه والتجويفات والكهوف الجيولوجية الكهربائي بتقنية التصوير ثلاثي الأبعاد 3D المباشر حتى عمق 250 متراً.',
    descEn: 'Geoelectric water and void detector measuring ground resistance down to 250m depth with live 3D visualization.',
    depth: '250m',
    badgeAr: 'تصوير ثلاثي الأبعاد 3D',
    badgeEn: '3D Visualization',
  },
  {
    id: 'abem-terraloc',
    nameAr: 'ABEM Terraloc Pro السويدي',
    nameEn: 'ABEM Terraloc Pro Seismograph',
    descAr: 'منظومة السيزموجراف العالمية الرائدة في المسوحات الجيوفيزيائية السطحية والانكسارية، ورسم خرائط المياه والمعادن واهتزازات التربة.',
    descEn: 'Global leader in geophysical seismic surveys, soil vibration monitoring, subsurface refraction, and bedrock mapping.',
    depth: 'High Precision',
    badgeAr: 'مسح زلزالي متقدم',
    badgeEn: 'Seismic Refraction',
  },
  {
    id: 'gssi-sir4000',
    nameAr: 'GSSI SIR 4000 GPR (أمريكا)',
    nameEn: 'GSSI SIR 4000 GPR System',
    descAr: 'رادار اختراق الأرض عالي الأداء مع هوائي 350 HS وعربة المسح للكشف الدقيق عن المرافق التحتية، الفراغات، وشبكات التسليح.',
    descEn: 'Industry-leading GPR data acquisition unit with 350 HS antenna and survey cart for utility detection and structural scanning.',
    depth: 'Multi-Depth',
    badgeAr: 'رادار اختراق الأرض',
    badgeEn: 'Ground Penetrating Radar',
  },
  {
    id: 'ajax-omega',
    nameAr: 'Ajax Detection OMEGA',
    nameEn: 'Ajax Detection OMEGA System',
    descAr: 'نظام الاستشعار بعيد المدى للكشف عن المياه الجوفية والتكهفات حتى عمق 500 متر ومدى أمامي يصل إلى 2850 متراً.',
    descEn: 'Long-range geophysical prospecting system detecting groundwater and deep cavities down to 500m depth and 2,850m front range.',
    depth: '500m / 2850m',
    badgeAr: 'استشعار بعيد المدى',
    badgeEn: 'Long Range Detection',
  },
  {
    id: 'pqwt-l2000',
    nameAr: 'PQWT-L2000 Multi-Sensor',
    nameEn: 'PQWT-L2000 Pipeline Leak Detector',
    descAr: 'كاشف تسربات شبكات وخطوط الأنابيب متعدد الحساسات للتحقق الدقيق وتفادي انهيارات التربة الناتجة عن تدفقات المياه.',
    descEn: 'Advanced multi-sensor pipeline leak detector designed for municipal networks and subterranean leakage monitoring.',
    depth: 'High Precision',
    badgeAr: 'كشف تسربات متقدم',
    badgeEn: 'Multi-Sensor Detection',
  },
];

export const CGL_PROFILE_PARTNERS_GRID = [
  { id: 'proceq', nameAr: 'بروسيك', nameEn: 'Proceq', logo: '/api/media/partners/proceq.png', roleAr: 'تقنيات الفحص والقياس', roleEn: 'NDT & Measurement' },
  { id: 'weber', nameAr: 'ويبر سان جوبان', nameEn: 'Weber Saint-Gobain', logo: '/api/media/partners/weber.png', roleAr: 'مواد البناء المتطورة', roleEn: 'Construction Materials' },
  { id: 'hilti', nameAr: 'هيلتي', nameEn: 'Hilti', logo: '/api/media/partners/hilti.png', roleAr: 'أنظمة التثبيت والتخريم', roleEn: 'Fastening Systems' },
  { id: 'levels', nameAr: 'ليفلز للمقاولات', nameEn: 'LEVELS Contracting', logo: '/api/media/partners/levels.png', roleAr: 'مقاولات وأبراج', roleEn: 'Contracting & Towers' },
  { id: 'hesco', nameAr: 'هيسكو للإنشاءات', nameEn: 'Hesco Construction', logo: '/api/media/partners/hesco.png', roleAr: 'شريك إنشائي', roleEn: 'Construction Partner' },
  { id: 'mbl', nameAr: 'قادة البناء الحديث (MBL)', nameEn: 'MBL Leaders', logo: '/api/media/partners/mbl.png', roleAr: 'بنية تحتية كبرى', roleEn: 'Mega Infrastructure' },
  { id: 'orient_weavers', nameAr: 'الشرق للإنشاءات (ويفرز)', nameEn: 'Orient Weavers Ltd', logo: '/api/media/partners/orient_weavers.png', roleAr: 'منشآت صناعية', roleEn: 'Industrial Plants' },
  { id: 'abuljadayel', nameAr: 'أبو الجدايل للمقاولات', nameEn: 'Abuljadayel Co.', logo: '/api/media/partners/abuljadayel.png', roleAr: 'مقاولات وصيانة', roleEn: 'Contracting & Maintenance' },
  { id: 'shec', nameAr: 'شيراك للاستشارات الهندسية', nameEn: 'SHEC Consulting', logo: '/api/media/partners/shec.png', roleAr: 'استشارات وتصميم', roleEn: 'Engineering Consulting' },
  { id: 'sky_jeddah', nameAr: 'نجب جدة (سكاي)', nameEn: 'Sky Jeddah Construction', logo: '/api/media/partners/sky_jeddah.png', roleAr: 'إنشاءات وأبراج', roleEn: 'Towers & Construction' },
  { id: 'albalad', nameAr: 'جدة التاريخية (البلد)', nameEn: 'Jeddah Historic District', logo: '/api/media/partners/albalad.png', roleAr: 'تراث وتقييم إنشائي', roleEn: 'Heritage Assessment' },
  { id: 'binladin', nameAr: 'مجموعة بن لادن السعودية', nameEn: 'Saudi Binladin Group', logo: '/api/media/partners/binladin.png', roleAr: 'مشاريع ضخمة وأبراج', roleEn: 'Mega Infrastructure' },
  { id: 'abdul_latif_jameel', nameAr: 'عبد اللطيف جميل', nameEn: 'Abdul Latif Jameel', logo: '/api/media/partners/abdul_latif_jameel.png', roleAr: 'مراكز تجارية وتطوير', roleEn: 'Commercial Development' },
];

