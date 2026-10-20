import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const sa = JSON.parse(fs.readFileSync('/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json'));
if (!getApps().length) {
  initializeApp({ credential: cert(sa) });
}
const db = getFirestore();

const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://07079473a194adefc9183b88f04405f4.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'f4c1d16361adf60eac38b49953c0be5f',
    secretAccessKey: '3633b7bcab70fcbe6878570c1a9cf0c5f4ad629bcc716a9f310b006a464254fa'
  }
});

const uploads = [
  // Projects
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_11_img_028_1536x1024.jpg',
    r2Key: 'projects/pile_load_testing_reaction.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_11_img_026_1536x1024.jpg',
    r2Key: 'projects/pile_load_testing_jack.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_12_img_018_1536x1024.jpg',
    r2Key: 'projects/pile_load_testing_frame.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_14_img_012_1600x1200.jpg',
    r2Key: 'projects/geodetic_survey_total_station.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_14_img_010_1536x1024.jpg',
    r2Key: 'projects/geodetic_survey_digital_instrument.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_14_img_025_1536x1024.jpg',
    r2Key: 'projects/geodetic_survey_site_layout.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_06_img_325_1024x1536.jpg',
    r2Key: 'projects/mining_rotary_core_drilling_rig.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_06_img_022_1080x675.jpg',
    r2Key: 'projects/mining_quarry_rock_drilling.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_06_img_020_800x600.jpg',
    r2Key: 'projects/mining_subsurface_exploration.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_14_img_010_1536x1024.jpg',
    r2Key: 'projects/quarry_deformation_monitoring_station.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_14_img_012_1600x1200.jpg',
    r2Key: 'projects/quarry_precision_field_survey.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-v2/public/uploads/curated/geodetic_survey_tripod.jpg',
    r2Key: 'projects/quarry_geodetic_tripod.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_09_img_036_1024x1024.jpg',
    r2Key: 'projects/deep_excavation_shoring_piles.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_09_img_038_1024x1024.jpg',
    r2Key: 'projects/trench_shoring_dewatering_system.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-v2/public/uploads/curated/foundation_drilling_site.jpg',
    r2Key: 'projects/excavation_foundation_site.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_08_img_034_512x768.jpg',
    r2Key: 'projects/structural_integrity_ultrasonic_ndt.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_08_img_032_768x512.jpg',
    r2Key: 'projects/structural_concrete_core_sampling.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-profile/extracted_services_projects/page_08_img_028_512x512.jpg',
    r2Key: 'projects/structural_rebar_radar_scanner.jpg',
    type: 'image/jpeg'
  },
  
  // News
  {
    local: '/media/omar/second/cgl/cgl-v2/public/uploads/curated/rebar_steel_inspection.jpg',
    r2Key: 'news/saudi_building_code_rebar_inspection.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-v2/public/uploads/curated/foundation_drilling_site.jpg',
    r2Key: 'news/rotary_drilling_rig_fleet_expansion.jpg',
    type: 'image/jpeg'
  },
  {
    local: '/media/omar/second/cgl/cgl-v2/public/uploads/curated/structural_audit_ndt.jpg',
    r2Key: 'news/3d_radar_gpr_structural_audit.jpg',
    type: 'image/jpeg'
  }
];

async function run() {
  console.log('Uploading images to R2...');
  for (const item of uploads) {
    const fileBuffer = fs.readFileSync(item.local);
    await s3.send(new PutObjectCommand({
      Bucket: 'cgl',
      Key: item.r2Key,
      Body: fileBuffer,
      ContentType: item.type
    }));
    console.log('  Uploaded to R2:', item.r2Key);
  }

  console.log('\nUpdating Firestore projects...');
  await db.collection('projects').doc('cgl-proj-001').set({
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
    relatedServiceId: 'geotechnical-investigation',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('projects').doc('cgl-proj-002').set({
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
    relatedServiceId: 'engineering-surveying',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('projects').doc('cgl-proj-003').set({
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
    relatedServiceId: 'mining-testing',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('projects').doc('cgl-proj-004').set({
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
    relatedServiceId: 'engineering-surveying',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('projects').doc('cgl-proj-005').set({
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
    relatedServiceId: 'shoring-dewatering',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('projects').doc('cgl-proj-006').set({
    nameAr: 'تقييم السلامة الإنشائية والفحوص غير المتلفة للأبراج القائمة',
    nameEn: 'Structural Integrity Assessment & Non-Destructive Testing for High-Rise Towers',
    sectorAr: 'تقييم المنشآت وضبط الجودة الإنشائية',
    sectorEn: 'Building Integrity & Structural Health',
    locationAr: 'جدة، المملكة العربية السعودية',
    locationEn: 'Jeddah, Saudi Arabia',
    client: 'شركة ليفلز للمقاولات - مشروع برج سيسيان القابضة',
    scopeOfWorkAr: 'تنفيذ الفحوصات الإنشائية غير الإتلافيّة (NDT)، واختبارات الموجات فوق الصوتية، ومسح حديد التسليح بالرادار الخرساني لتقييم السلامة الإنشائية وتحديد مطابقة العناصر الحاملة.',
    scopeOfWorkEn: 'Executing non-destructive testing (NDT), ultrasonic pulse velocity, and GPR concrete radar scanning to evaluate structural integrity and assess load-bearing elements.',
    technicalChallengesAr: 'فحص وتحديد مواقع التسليح والعيوب الداخلية في العناصر الخرسانية الكثيفة دون الإضرار بالسلامة الإنشائية للبرج القائم.',
    engineeringApproachAr: 'استخدام أحدث أجهزة المسح الكهرومغناطيسي وفوق الصوتي المعايرة، مع عمل نمذجة ثلاثية الأبعاد لتوزيع التسليح ومطابقتها مع المخططات الإنشائية المعتمدة.',
    relevantStandards: ['ASTM C597 (Ultrasonic Pulse)', 'BS 1881-204', 'ACI 228.1R', 'SBC 304'],
    relatedServiceId: 'building-integrity',
    equipmentUsed: [
      'Proceq Ultrasonic Pulse Velocity Tester (Pundit PL-200)',
      'Hilti PS 1000 X-Scan 3D Concrete Radar',
      'Calibrated Rebound Schmidt Test Hammer'
    ],
    testsPerformedAr: [
      'Ultrasonic Pulse Velocity Test (ASTM C597)',
      'High-Frequency GPR Rebar & Void Mapping',
      'Concrete Core Compressive Strength Verification'
    ],
    servicesPerformedAr: [
      'مسح وتحديد كثافة وتغطية حديد التسليح بالرادار ثلاثي الأبعاد',
      'تقييم التجانس الإنشائي واكتشاف التعشيش والشروخ الداخلية',
      'إصدار تقارير هندسية متكاملة مدعمة بنماذج المطابقة الإنشائية'
    ],
    coverImage: '/api/media/projects/structural_integrity_ultrasonic_ndt.jpg',
    gallery: [
      '/api/media/projects/structural_integrity_ultrasonic_ndt.jpg',
      '/api/media/projects/structural_concrete_core_sampling.jpg',
      '/api/media/projects/structural_rebar_radar_scanner.jpg'
    ],
    updatedAt: new Date().toISOString()
  });

  console.log('\nUpdating Firestore news...');
  await db.collection('news').doc('news-01').set({
    coverImage: '/api/media/news/saudi_building_code_rebar_inspection.jpg',
    image: '/api/media/news/saudi_building_code_rebar_inspection.jpg',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('news').doc('news-02').set({
    coverImage: '/api/media/news/rotary_drilling_rig_fleet_expansion.jpg',
    image: '/api/media/news/rotary_drilling_rig_fleet_expansion.jpg',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  await db.collection('news').doc('news-03').set({
    coverImage: '/api/media/news/3d_radar_gpr_structural_audit.jpg',
    image: '/api/media/news/3d_radar_gpr_structural_audit.jpg',
    updatedAt: new Date().toISOString()
  }, { merge: true });

  console.log('\n=== DONE ALL SUCCESSFULLY ===');
}

run().catch(console.error);
