import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Firebase Admin initialization
const serviceAccountPath = '/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json';
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

// Cloudflare R2 client
const accountId = '07079473a194adefc9183b88f04405f4';
const accessKeyId = 'f4c1d16361adf60eac38b49953c0be5f';
const secretAccessKey = '3633b7bcab70fcbe6878570c1a9cf0c5f4ad629bcc716a9f310b006a464254fa';
const R2_BUCKET = 'cgl';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.gif':
      return 'image/gif';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    default:
      return 'application/octet-stream';
  }
}

const PUBLIC_DIRS = [
  '/media/omar/second/cgl/cgl-v2/public',
  '/media/omar/second/cgl/cgl-blue/public',
  '/media/omar/second/cgl/cgl-admin/public',
];

function findLocalFile(urlPath: string): string | null {
  if (!urlPath || urlPath.startsWith('http') || urlPath.startsWith('data:')) return null;

  const cleanPath = urlPath.replace(/^\/+/, '');

  for (const pubDir of PUBLIC_DIRS) {
    const fullPath = path.join(pubDir, cleanPath);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

// Upload file to R2 and return the /api/media/... path
async function uploadLocalToR2(urlPath: string, folderCategory: string): Promise<string> {
  // If already an R2 api path, keep as is
  if (urlPath.startsWith('/api/media/')) {
    return urlPath;
  }

  const localFilePath = findLocalFile(urlPath);
  if (!localFilePath) {
    console.warn(`  ⚠️ Could not find local file on disk for: ${urlPath}`);
    return urlPath;
  }

  const filename = path.basename(localFilePath).replace(/[^a-zA-Z0-9._-]/g, '_');
  const r2Key = `${folderCategory}/${filename}`;
  const contentType = getMimeType(localFilePath);
  const buffer = readFileSync(localFilePath);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: r2Key,
    Body: buffer,
    ContentType: contentType,
  });

  await r2Client.send(command);
  const r2Url = `/api/media/${r2Key}`;
  console.log(`  ✓ Uploaded to R2: ${localFilePath} -> ${r2Url} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return r2Url;
}

async function migrateAllImages() {
  console.log('🚀 Starting migration of all images to Cloudflare R2 and updating Firestore...\n');

  // 1. Projects
  console.log('📂 1. Processing Projects...');
  const projectsSnap = await db.collection('projects').get();
  for (const doc of projectsSnap.docs) {
    const data = doc.data();
    let updated = false;
    let newCover = data.coverImage;
    let newGallery = data.gallery;

    if (data.coverImage && !data.coverImage.startsWith('/api/media/')) {
      newCover = await uploadLocalToR2(data.coverImage, 'projects');
      updated = true;
    }

    if (Array.isArray(data.gallery) && data.gallery.length > 0) {
      const updatedGallery: string[] = [];
      for (const img of data.gallery) {
        if (!img.startsWith('/api/media/')) {
          const up = await uploadLocalToR2(img, 'projects');
          updatedGallery.push(up);
          updated = true;
        } else {
          updatedGallery.push(img);
        }
      }
      newGallery = updatedGallery;
    }

    if (updated) {
      await doc.ref.update({
        coverImage: newCover,
        gallery: newGallery || [newCover],
        updatedAt: new Date().toISOString()
      });
      console.log(`  ✅ Updated Project in Firestore: ${doc.id} (${data.nameAr || data.nameEn})`);
    } else {
      console.log(`  ℹ️ Project already up-to-date: ${doc.id}`);
    }
  }

  // 2. News Articles
  console.log('\n📰 2. Processing News Articles...');
  const newsSnap = await db.collection('news').get();
  for (const doc of newsSnap.docs) {
    const data = doc.data();
    if (data.image && !data.image.startsWith('/api/media/')) {
      const newImage = await uploadLocalToR2(data.image, 'news');
      await doc.ref.update({
        image: newImage,
        updatedAt: new Date().toISOString()
      });
      console.log(`  ✅ Updated News in Firestore: ${doc.id} -> ${newImage}`);
    } else {
      console.log(`  ℹ️ News already up-to-date: ${doc.id}`);
    }
  }

  // 3. Hero Slides
  console.log('\n🖼️ 3. Processing Hero Slides...');
  const heroSnap = await db.collection('hero_slides').get();
  for (const doc of heroSnap.docs) {
    const data = doc.data();
    if (data.mediaUrl && !data.mediaUrl.startsWith('/api/media/')) {
      const newMedia = await uploadLocalToR2(data.mediaUrl, 'hero');
      await doc.ref.update({
        mediaUrl: newMedia,
        updatedAt: new Date().toISOString()
      });
      console.log(`  ✅ Updated Hero Slide in Firestore: ${doc.id} -> ${newMedia}`);
    } else {
      console.log(`  ℹ️ Hero Slide already up-to-date: ${doc.id}`);
    }
  }

  // 4. Equipment Items
  console.log('\n🚜 4. Processing Equipment Items...');
  const equipSnap = await db.collection('equipment').get();
  for (const doc of equipSnap.docs) {
    const data = doc.data();
    if (data.image && !data.image.startsWith('/api/media/')) {
      const newImage = await uploadLocalToR2(data.image, 'equipment');
      await doc.ref.update({
        image: newImage,
        updatedAt: new Date().toISOString()
      });
      console.log(`  ✅ Updated Equipment in Firestore: ${doc.id} -> ${newImage}`);
    } else {
      console.log(`  ℹ️ Equipment already up-to-date: ${doc.id}`);
    }
  }

  // 5. Partners Logos
  console.log('\n🤝 5. Processing Partners Logos...');
  const partnersSnap = await db.collection('partners').get();
  for (const doc of partnersSnap.docs) {
    const data = doc.data();
    if (data.logo && !data.logo.startsWith('/api/media/')) {
      const newLogo = await uploadLocalToR2(data.logo, 'partners');
      await doc.ref.update({
        logo: newLogo,
        updatedAt: new Date().toISOString()
      });
      console.log(`  ✅ Updated Partner in Firestore: ${doc.id} -> ${newLogo}`);
    } else {
      console.log(`  ℹ️ Partner already up-to-date: ${doc.id}`);
    }
  }

  console.log('\n🎉 ALL MEDIA SUCCESSFULLY UPLOADED TO CLOUDFLARE R2 & LINKED IN FIRESTORE!');
}

migrateAllImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
