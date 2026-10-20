import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccountPath = '/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json';
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

const DEFAULT_SLIDES = [
  {
    id: 'hero-slide-1',
    order: 1,
    isActive: true,
    type: 'image',
    mediaUrl: '/assets/sliders/slider1.jpg',
    tagAr: 'الدراسات الجيوتقنية واستكشاف التربة',
    tagEn: 'Geotechnical & Soil Investigation',
    titleAr: 'الدقة الهندسية في فحص التربة التي ترتكز عليها كبرى مشاريع المملكة',
    titleEn: 'The Engineering Precision Anchoring the Kingdom’s Mega Projects',
    subtitleAr: 'حفر الجسات الآلية، استخراج العينات الصخرية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
    subtitleEn: 'Automated deep drilling, soil bearing capacity evaluation, and foundation recommendations compliant with SBC.',
    metricsAr: 'أعماق حفر تتجاوز 50 متراً',
    metricsEn: 'Drilling Depths +50m',
    duration: 6
  },
  {
    id: 'hero-slide-2',
    order: 2,
    isActive: true,
    type: 'image',
    mediaUrl: '/uploads/projects_images/project_688d08b6e73ee4.36242119.jpg',
    tagAr: 'اختبارات التحميل الاستاتيكي',
    tagEn: 'Static Pile Load Testing',
    titleAr: 'تأكيد سلامة الأساسات العميقة بروافع تتجاوز 1000 طن',
    titleEn: 'Deep Foundation Verification with Test Loads Exceeding 1,000 Tons',
    subtitleAr: 'منظومة هيدروليكية وخلايا ضغط معايرة لحساب الهبوط بدقة مليمترية وفق المعايير القياسية المعتمدة.',
    subtitleEn: 'Calibrated hydraulic systems and load cells for millimeter settlement analysis per ASTM D1143.',
    metricsAr: 'أحمال فحص تتجاوز 1000 طن',
    metricsEn: 'Test Loads +1,000 Tons',
    duration: 6
  },
  {
    id: 'hero-slide-3',
    order: 3,
    isActive: true,
    type: 'image',
    mediaUrl: '/uploads/projects_images/project_688d0f1061e875.99060450.jpg',
    tagAr: 'المسح الطبوغرافي والجيوديسي',
    tagEn: 'Topographic & Geodetic Survey',
    titleAr: 'رصد مساحي رقمي دقيق ونمذجة ثلاثية الأبعاد للمواقع',
    titleEn: 'High-Precision Digital Surveying & 3D Reality Capture',
    subtitleAr: 'أحدث محطات الرصد الشاملة وتقنيات المسح الفضائي لتثبيت محاور المنشآت وحساب الكميات بدقة قطعية.',
    subtitleEn: 'Advanced electronic total stations and GNSS receivers for axis layout and volume calculations.',
    metricsAr: 'دقة رصد ثانية واحدة',
    metricsEn: '1-Arcsecond Accuracy',
    duration: 6
  }
];

async function seedHeroSlides() {
  console.log('🚀 Seeding hero_slides into Firestore...');
  for (const slide of DEFAULT_SLIDES) {
    await db.collection('hero_slides').doc(slide.id).set({
      ...slide,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`✓ Seeded slide: ${slide.id} - ${slide.titleAr}`);
  }
  console.log('🎉 Successfully seeded hero_slides!');
}

seedHeroSlides().catch(console.error);
