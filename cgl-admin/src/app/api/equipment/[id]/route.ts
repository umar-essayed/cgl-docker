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
    const rows = await query<any[]>('SELECT * FROM equipment WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'المعدة غير موجودة' }, { status: 404 });
    }

    const r = rows[0];
    const data = {
      id: r.id,
      code: r.code,
      nameAr: r.name_ar,
      nameEn: r.name_en,
      category: r.category,
      categoryNameAr: r.category_name_ar,
      categoryNameEn: r.category_name_en,
      specsAr: parseJsonField(r.specs_ar, []),
      specsEn: parseJsonField(r.specs_en, []),
      standards: parseJsonField(r.standards, []),
      standardsAr: parseJsonField(r.standards_ar, undefined),
      standardsEn: parseJsonField(r.standards_en, undefined),
      image: r.image,
      serviceId: r.service_id,
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

    const specsAr = Array.isArray(body.specsAr) ? body.specsAr : (body.specsArText ? body.specsArText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);
    const specsEn = Array.isArray(body.specsEn) ? body.specsEn : (body.specsEnText ? body.specsEnText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);
    const standards = Array.isArray(body.standards) ? body.standards : (body.standardsText ? body.standardsText.split(',').map((s: string) => s.trim()) : []);

    await query(
      `UPDATE equipment SET
        code = ?,
        name_ar = ?,
        name_en = ?,
        category = ?,
        category_name_ar = ?,
        category_name_en = ?,
        specs_ar = ?,
        specs_en = ?,
        standards = ?,
        image = ?,
        service_id = ?
      WHERE id = ?`,
      [
        body.code || '',
        body.nameAr,
        body.nameEn || '',
        body.category || 'drilling',
        body.categoryNameAr || '',
        body.categoryNameEn || '',
        JSON.stringify(specsAr),
        JSON.stringify(specsEn),
        JSON.stringify(standards),
        body.image || '/uploads/equipment_fleet/rotary_core_rig.jpg',
        body.serviceId || null,
        id
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    console.error('Error updating equipment in MySQL:', error);
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
    await query('DELETE FROM equipment WHERE id = ?', [id]);
    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, message: 'تم حذف المعدة بنجاح' });
  } catch (error: any) {
    console.error('Error deleting equipment from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
