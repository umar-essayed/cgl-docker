import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync('/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json', 'utf8')
);

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// 13 Real Verified Partners from CGL Company Profile (Page 24/25)
const REAL_PROFILE_PARTNERS = [
  {
    id: 'proceq',
    nameAr: 'بروسيك السويسرية',
    nameEn: 'Proceq Switzerland',
    category: 'Equipment & NDT',
    categoryAr: 'تقنيات وفحوصات لاإتلافية',
    categoryEn: 'NDT & Laboratory Tech',
    logo: '/api/media/partners/proceq.png',
    order: 1,
    featured: true,
  },
  {
    id: 'weber',
    nameAr: 'ويبر سان جوبان',
    nameEn: 'Weber Saint-Gobain',
    category: 'Materials',
    categoryAr: 'مواد البناء المتطورة',
    categoryEn: 'Advanced Materials',
    logo: '/api/media/partners/weber.png',
    order: 2,
    featured: true,
  },
  {
    id: 'hilti',
    nameAr: 'هيلتي العالمية',
    nameEn: 'Hilti Group',
    category: 'Engineering Systems',
    categoryAr: 'أنظمة التثبيت والهندسة',
    categoryEn: 'Fastening Systems',
    logo: '/api/media/partners/hilti.png',
    order: 3,
    featured: true,
  },
  {
    id: 'levels',
    nameAr: 'شركة ليفلز للمقاولات',
    nameEn: 'LEVELS Contracting',
    category: 'Contracting',
    categoryAr: 'مقاولات وأبراج',
    categoryEn: 'Contracting & Towers',
    logo: '/api/media/partners/levels.png',
    order: 4,
    featured: true,
  },
  {
    id: 'hesco',
    nameAr: 'شركة هيسكو للإنشاءات',
    nameEn: 'Hesco Construction Partner',
    category: 'Contracting',
    categoryAr: 'مقاولات متخصصة',
    categoryEn: 'Specialized Contracting',
    logo: '/api/media/partners/hesco.png',
    order: 5,
    featured: true,
  },
  {
    id: 'mbl',
    nameAr: 'شركة قادة البناء الحديث (MBL)',
    nameEn: 'Modern Building Leaders (MBL)',
    category: 'Infrastructure',
    categoryAr: 'بنية تحتية كبرى',
    categoryEn: 'Mega Infrastructure',
    logo: '/api/media/partners/mbl.png',
    order: 6,
    featured: true,
  },
  {
    id: 'orient_weavers',
    nameAr: 'شركة الشرق للإنشاءات - ويفرز المحدودة',
    nameEn: 'Orient Construction Company - Weavers Ltd',
    category: 'Industrial Contracting',
    categoryAr: 'إنشاءات صناعية ومصانع',
    categoryEn: 'Industrial Construction',
    logo: '/api/media/partners/orient_weavers.png',
    order: 7,
    featured: true,
  },
  {
    id: 'abuljadayel',
    nameAr: 'شركة أبو الجدايل للمقاولات والصيانة',
    nameEn: 'Abuljadayel Co. for Contracting & Maintenance',
    category: 'Contracting',
    categoryAr: 'مقاولات وصيانة',
    categoryEn: 'Contracting & Maintenance',
    logo: '/api/media/partners/abuljadayel.png',
    order: 8,
    featured: true,
  },
  {
    id: 'shec',
    nameAr: 'شركة شيراك للاستشارات الهندسية (SHEC)',
    nameEn: 'SHEC Engineering Consulting',
    category: 'Consulting',
    categoryAr: 'استشارات وتصميم هندسي',
    categoryEn: 'Engineering Consulting',
    logo: '/api/media/partners/shec.png',
    order: 9,
    featured: true,
  },
  {
    id: 'sky_jeddah',
    nameAr: 'شركة نجب جدة للمقاولات المحدودة (سكاي)',
    nameEn: 'Sky Jeddah For Construction Co. Ltd',
    category: 'Contracting',
    categoryAr: 'إنشاءات ومباني',
    categoryEn: 'Building Construction',
    logo: '/api/media/partners/sky_jeddah.png',
    order: 10,
    featured: true,
  },
  {
    id: 'albalad',
    nameAr: 'برنامج جدة التاريخية (البلد)',
    nameEn: 'Jeddah Historic District (Al Balad)',
    category: 'Heritage & Infrastructure',
    categoryAr: 'تراث وتقييم إنشائي',
    categoryEn: 'Heritage Preservation',
    logo: '/api/media/partners/albalad.png',
    order: 11,
    featured: true,
  },
  {
    id: 'binladin',
    nameAr: 'مجموعة بن لادن السعودية',
    nameEn: 'Saudi Binladin Group',
    category: 'Mega Infrastructure',
    categoryAr: 'مشاريع ضخمة وأبراج',
    categoryEn: 'Mega Projects',
    logo: '/api/media/partners/binladin.png',
    order: 12,
    featured: true,
  },
  {
    id: 'abdul_latif_jameel',
    nameAr: 'مجموعة عبد اللطيف جميل',
    nameEn: 'Abdul Latif Jameel Commercial',
    category: 'Commercial & Development',
    categoryAr: 'تطوير وتجاري',
    categoryEn: 'Commercial Development',
    logo: '/api/media/partners/abdul_latif_jameel.png',
    order: 13,
    featured: true,
  },
];

async function resetAndSeedPartners() {
  console.log('🗑️ Deleting all existing partners in Firestore...');
  const snapshot = await db.collection('partners').get();
  
  const batchDelete = db.batch();
  snapshot.docs.forEach((doc) => {
    batchDelete.delete(doc.ref);
    console.log(`  - Deleted partner: ${doc.id}`);
  });
  await batchDelete.commit();
  console.log(`✅ Cleared all ${snapshot.size} partners from Firestore.\n`);

  console.log('🌱 Seeding the 13 REAL verified partners from CGL profile...');
  const batchInsert = db.batch();
  
  REAL_PROFILE_PARTNERS.forEach((partner) => {
    const docRef = db.collection('partners').doc(partner.id);
    batchInsert.set(docRef, {
      ...partner,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log(`  + Seeded verified partner: ${partner.id} (${partner.nameAr})`);
  });

  await batchInsert.commit();
  console.log(`\n🎉 Successfully populated Firestore with exactly 13 verified partners from CGL Profile!`);
}

resetAndSeedPartners()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding partners:', err);
    process.exit(1);
  });
