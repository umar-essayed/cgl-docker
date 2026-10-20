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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = await query<any[]>('SELECT * FROM projects WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'المشروع غير موجود' }, { status: 404 });
    }

    const r = rows[0];
    const data = {
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
    };

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const servicesPerformed = Array.isArray(body.servicesPerformedAr) ? body.servicesPerformedAr : [];
    const testsPerformed = Array.isArray(body.testsPerformedAr) ? body.testsPerformedAr : [];
    const equipmentUsed = Array.isArray(body.equipmentUsed) ? body.equipmentUsed : [];
    const gallery = Array.isArray(body.gallery) ? body.gallery : [];
    const relevantStandards = Array.isArray(body.relevantStandards) 
      ? body.relevantStandards 
      : (body.relevantStandardsText ? body.relevantStandardsText.split(',').map((s: string) => s.trim()) : []);

    await query(
      `UPDATE projects SET
        name_ar = ?,
        name_en = ?,
        sector_ar = ?,
        sector_en = ?,
        location_ar = ?,
        location_en = ?,
        client = ?,
        client_ar = ?,
        client_en = ?,
        scope_of_work_ar = ?,
        scope_of_work_en = ?,
        services_performed_ar = ?,
        technical_challenges_ar = ?,
        technical_challenges_en = ?,
        engineering_approach_ar = ?,
        engineering_approach_en = ?,
        tests_performed_ar = ?,
        equipment_used = ?,
        cover_image = ?,
        gallery = ?,
        relevant_standards = ?,
        related_service_id = ?
      WHERE id = ?`,
      [
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
        body.relatedServiceId || 'geotechnical-investigation',
        id
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    console.error('Error updating project in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;
    await query('DELETE FROM projects WHERE id = ?', [id]);
    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, message: 'تم حذف المشروع بنجاح' });
  } catch (error: any) {
    console.error('Error deleting project from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
