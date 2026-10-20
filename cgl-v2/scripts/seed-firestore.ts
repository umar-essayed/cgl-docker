import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  CGL_COMPANY_INFO,
  CGL_SERVICES,
  CGL_PROJECTS_EVIDENCE,
  CGL_OPERATIONAL_CAPABILITIES,
  CGL_AUTHORIZED_PARTNERS,
  CGL_STANDARDS_COMPLIANCE,
  CGL_EQUIPMENT_FLEET,
  CGL_LATEST_NEWS
} from '../src/lib/data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = '/media/omar/second/cgl/gcll-70b0d-firebase-adminsdk-fbsvc-ac59a361c0.json';
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedData() {
  console.log('🚀 Starting Firebase Firestore data seeding for CGL...');

  // 1. Projects
  console.log(`📦 Seeding ${CGL_PROJECTS_EVIDENCE.length} projects...`);
  for (const project of CGL_PROJECTS_EVIDENCE) {
    await db.collection('projects').doc(project.id).set({
      ...project,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Project: ${project.id} - ${project.nameAr}`);
  }

  // 2. Equipment
  console.log(`📦 Seeding ${CGL_EQUIPMENT_FLEET.length} equipment items...`);
  for (const item of CGL_EQUIPMENT_FLEET) {
    await db.collection('equipment').doc(item.id).set({
      ...item,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Equipment: ${item.id} - ${item.nameAr}`);
  }

  // 3. News
  console.log(`📦 Seeding ${CGL_LATEST_NEWS.length} news articles...`);
  for (const news of CGL_LATEST_NEWS) {
    await db.collection('news').doc(news.id).set({
      ...news,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ News: ${news.id} - ${news.titleAr}`);
  }

  // 4. Partners
  console.log(`📦 Seeding ${CGL_AUTHORIZED_PARTNERS.length} partners...`);
  for (const partner of CGL_AUTHORIZED_PARTNERS) {
    await db.collection('partners').doc(partner.id).set({
      ...partner,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Partner: ${partner.id} - ${partner.nameAr}`);
  }

  // 5. Services
  console.log(`📦 Seeding ${CGL_SERVICES.length} services...`);
  for (const service of CGL_SERVICES) {
    await db.collection('services').doc(service.id).set({
      ...service,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Service: ${service.id} - ${service.titleAr}`);
  }

  // 6. Operational Capabilities
  console.log(`📦 Seeding ${CGL_OPERATIONAL_CAPABILITIES.length} operational capabilities...`);
  for (const cap of CGL_OPERATIONAL_CAPABILITIES) {
    await db.collection('capabilities').doc(cap.id).set({
      ...cap,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Capability: ${cap.id} - ${cap.nameAr}`);
  }

  // 7. Standards Compliance
  console.log(`📦 Seeding ${CGL_STANDARDS_COMPLIANCE.length} certifications...`);
  for (const certItem of CGL_STANDARDS_COMPLIANCE) {
    await db.collection('compliance').doc(certItem.id).set({
      ...certItem,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`  ✓ Compliance: ${certItem.id} - ${certItem.name}`);
  }

  // 8. Company Info & Stats
  console.log('📦 Seeding company settings & statistics...');
  await db.collection('settings').doc('company_info').set({
    ...CGL_COMPANY_INFO,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  console.log('  ✓ Company info & stats seeded.');

  console.log('🎉 ALL DATA SUCCESSFULLY SEEDED TO FIREBASE FIRESTORE!');
}

seedData().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
