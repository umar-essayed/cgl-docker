import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync('/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json', 'utf8')
);

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// Cloudflare R2
const accountId = '07079473a194adefc9183b88f04405f4';
const accessKeyId = 'f4c1d16361adf60eac38b49953c0be5f';
const secretAccessKey = '3633b7bcab70fcbe6878570c1a9cf0c5f4ad629bcc716a9f310b006a464254fa';
const R2_BUCKET = 'cgl';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const PARTNERS_SOURCE = '/media/omar/second/cgl/cgl-profile/partners';

const profilePartners = [
  {
    id: 'proceq',
    nameAr: 'بروسيك السويسرية للفحص والقياس',
    nameEn: 'Proceq NDT & Geotechnical Instruments',
    category: 'Equipment & Technology',
    file: 'proceq.png',
  },
  {
    id: 'weber',
    nameAr: 'ويبر سان جوبان لمواد البناء',
    nameEn: 'Weber Saint-Gobain Construction Solutions',
    category: 'Materials',
    file: 'weber.png',
  },
  {
    id: 'hilti',
    nameAr: 'شركة هيلتي العالمية',
    nameEn: 'Hilti Engineering & Fastening Systems',
    category: 'Engineering Systems',
    file: 'hilti.png',
  },
  {
    id: 'levels',
    nameAr: 'شركة ليفلز للمقاولات والتطوير',
    nameEn: 'LEVELS Contracting Co.',
    category: 'Contracting',
    file: 'levels.png',
  },
  {
    id: 'hesco',
    nameAr: 'شركة هيسكو للإنشاءات',
    nameEn: 'Hesco Construction Partner',
    category: 'Contracting',
    file: 'hesco.png',
  },
  {
    id: 'mbl',
    nameAr: 'شركة قادة البناء الحديث (MBL)',
    nameEn: 'Modern Building Leaders (MBL)',
    category: 'Infrastructure',
    file: 'mbl.png',
  },
  {
    id: 'orient_weavers',
    nameAr: 'شركة الشرق للإنشاءات - ويفرز المحدودة',
    nameEn: 'Orient Construction Company - Weavers Ltd',
    category: 'Industrial Contracting',
    file: 'orient_weavers.png',
  },
  {
    id: 'abuljadayel',
    nameAr: 'شركة أبو الجدايل للمقاولات والصيانة',
    nameEn: 'Abuljadayel Co. for Contracting & Maintenance',
    category: 'Contracting',
    file: 'abuljadayel.png',
  },
  {
    id: 'shec',
    nameAr: 'شركة شيراك للاستشارات الهندسية (SHEC)',
    nameEn: 'SHEC Engineering Consulting',
    category: 'Consulting',
    file: 'shec.png',
  },
  {
    id: 'sky_jeddah',
    nameAr: 'شركة نجب جدة للمقاولات المحدودة (سكاي)',
    nameEn: 'Sky Jeddah For Construction Co. Ltd',
    category: 'Contracting',
    file: 'sky_jeddah.png',
  },
  {
    id: 'albalad',
    nameAr: 'برنامج جدة التاريخية (البلد)',
    nameEn: 'Jeddah Historic District (Al Balad)',
    category: 'Heritage & Infrastructure',
    file: 'albalad.png',
  },
  {
    id: 'binladin',
    nameAr: 'مجموعة بن لادن السعودية',
    nameEn: 'Saudi Binladin Group',
    category: 'Mega Infrastructure',
    file: 'binladin.png',
  },
  {
    id: 'abdul_latif_jameel',
    nameAr: 'مجموعة عبد اللطيف جميل',
    nameEn: 'Abdul Latif Jameel Commercial',
    category: 'Commercial & Development',
    file: 'abdul_latif_jameel.png',
  },
];

async function syncPartners() {
  console.log('🚀 Syncing profile partners to Cloudflare R2 and Firestore...');

  for (const p of profilePartners) {
    const localPath = path.join(PARTNERS_SOURCE, p.file);
    if (!existsSync(localPath)) {
      console.warn(`File not found: ${localPath}`);
      continue;
    }

    const r2Key = `partners/${p.file}`;
    const buffer = readFileSync(localPath);

    // Upload to R2
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: r2Key,
        Body: buffer,
        ContentType: 'image/png',
      })
    );

    const mediaUrl = `/api/media/${r2Key}`;
    console.log(`  ✓ Uploaded to R2: ${r2Key} (${(buffer.length / 1024).toFixed(1)} KB)`);

    // Upsert to Firestore
    await db.collection('partners').doc(p.id).set(
      {
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        category: p.category,
        logo: mediaUrl,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log(`  ✅ Synced Firestore doc: partners/${p.id}`);
  }

  console.log('🎉 All profile partners successfully synced to R2 & Firestore!');
}

syncPartners()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
