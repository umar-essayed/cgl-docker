import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { triggerWebsiteRevalidation } from '@/lib/revalidateWebsite';

function parseJsonField<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM projects ORDER BY created_at DESC');
    const projects = rows.map((r: any) => ({
      id: r.id,
      nameAr: r.name_ar,
      nameEn: r.name_en,
      sectorAr: r.sector_ar,
      sectorEn: r.sector_en,
      locationAr: r.location_ar,
      locationEn: r.location_en,
      client: r.client,
      clientAr: r.client_ar,
      clientEn: r.client_en,
      scopeOfWorkAr: r.scope_of_work_ar,
      scopeOfWorkEn: r.scope_of_work_en,
      servicesPerformedAr: parseJsonField(r.services_performed_ar, []),
      technicalChallengesAr: r.technical_challenges_ar,
      technicalChallengesEn: r.technical_challenges_en,
      engineeringApproachAr: r.engineering_approach_ar,
      engineeringApproachEn: r.engineering_approach_en,
      testsPerformedAr: parseJsonField(r.tests_performed_ar, []),
      equipmentUsed: parseJsonField(r.equipment_used, []),
      technicalMetrics: parseJsonField(r.technical_metrics, []),
      coverImage: r.cover_image,
      gallery: parseJsonField(r.gallery, []),
      relevantStandards: parseJsonField(r.relevant_standards, []),
      relatedServiceId: r.related_service_id,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    console.error('Error fetching projects from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.id || !body.nameAr) {
      return NextResponse.json({ success: false, message: 'معرف المشروع واسمه بالعربية مطلوبان' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM projects WHERE id = ? LIMIT 1', [body.id]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'مشروع بهذا المعرف موجود بالفعل' }, { status: 409 });
    }

    const servicesPerformed = Array.isArray(body.servicesPerformedAr) ? body.servicesPerformedAr : [];
    const testsPerformed = Array.isArray(body.testsPerformedAr) ? body.testsPerformedAr : [];
    const equipmentUsed = Array.isArray(body.equipmentUsed) ? body.equipmentUsed : [];
    const gallery = Array.isArray(body.gallery) ? body.gallery : [];
    const relevantStandards = Array.isArray(body.relevantStandards) 
      ? body.relevantStandards 
      : (body.relevantStandardsText ? body.relevantStandardsText.split(',').map((s: string) => s.trim()) : []);

    await query(
      `INSERT INTO projects (
        id, name_ar, name_en, sector_ar, sector_en, location_ar, location_en, 
        client, client_ar, client_en, scope_of_work_ar, scope_of_work_en, 
        services_performed_ar, technical_challenges_ar, technical_challenges_en, 
        engineering_approach_ar, engineering_approach_en, tests_performed_ar, 
        equipment_used, cover_image, gallery, relevant_standards, related_service_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
        body.nameAr,
        body.nameEn || '',
        body.sectorAr || '',
        body.sectorEn || '',
        body.locationAr || '',
        body.locationEn || '',
        body.client || '',
        body.clientAr || '',
        body.clientEn || '',
        body.scopeOfWorkAr || '',
        body.scopeOfWorkEn || '',
        JSON.stringify(servicesPerformed),
        body.technicalChallengesAr || '',
        body.technicalChallengesEn || '',
        body.engineeringApproachAr || '',
        body.engineeringApproachEn || '',
        JSON.stringify(testsPerformed),
        JSON.stringify(equipmentUsed),
        body.coverImage || '/api/media/projects/pile_load_testing_reaction.jpg',
        JSON.stringify(gallery),
        JSON.stringify(relevantStandards),
        body.relatedServiceId || 'geotechnical-investigation'
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error creating project in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
