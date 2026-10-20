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
    const rows = await query<any[]>('SELECT * FROM equipment ORDER BY created_at DESC');
    const items = rows.map((r: any) => ({
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
    }));

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Error fetching equipment from MySQL:', error);
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
      return NextResponse.json({ success: false, message: 'معرف المعدة واسمها مطلوبان' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM equipment WHERE id = ? LIMIT 1', [body.id]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'معدة بهذا المعرف موجودة بالفعل' }, { status: 409 });
    }

    const specsAr = Array.isArray(body.specsAr) ? body.specsAr : (body.specsArText ? body.specsArText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);
    const specsEn = Array.isArray(body.specsEn) ? body.specsEn : (body.specsEnText ? body.specsEnText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);
    const standards = Array.isArray(body.standards) ? body.standards : (body.standardsText ? body.standardsText.split(',').map((s: string) => s.trim()) : []);

    await query(
      `INSERT INTO equipment (
        id, code, name_ar, name_en, category, category_name_ar, 
        category_name_en, specs_ar, specs_en, standards, image, service_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
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
        body.serviceId || null
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error creating equipment in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
