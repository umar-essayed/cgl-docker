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
    const rows = await query<any[]>('SELECT * FROM services ORDER BY created_at ASC');
    const items = rows.map((r: any) => ({
      id: r.id,
      titleAr: r.title_ar,
      titleEn: r.title_en,
      shortDescAr: r.short_desc_ar,
      shortDescEn: r.short_desc_en,
      fullDescAr: r.full_desc_ar,
      fullDescEn: r.full_desc_en,
      standards: parseJsonField(r.standards, []),
      scopeListAr: parseJsonField(r.scope_list_ar, []),
      scopeListEn: parseJsonField(r.scope_list_en, []),
      fieldMethods: parseJsonField(r.field_methods, []),
      labDeliverables: parseJsonField(r.lab_deliverables, []),
      icon: r.icon || 'Layers',
      image: r.image,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Error fetching services from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.id || !body.titleAr) {
      return NextResponse.json({ success: false, message: 'معرف الخدمة وعنوانها بالعربية مطلوبان' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM services WHERE id = ? LIMIT 1', [body.id]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'خدمة بهذا المعرف موجودة بالفعل' }, { status: 409 });
    }

    const standards = Array.isArray(body.standards) ? body.standards : (body.standardsText ? body.standardsText.split(',').map((s: string) => s.trim()) : []);
    const scopeListAr = Array.isArray(body.scopeListAr) ? body.scopeListAr : (body.scopeText ? body.scopeText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);

    await query(
      `INSERT INTO services (
        id, title_ar, title_en, short_desc_ar, short_desc_en, 
        full_desc_ar, full_desc_en, standards, scope_list_ar, icon, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
        body.titleAr,
        body.titleEn || '',
        body.shortDescAr || '',
        body.shortDescEn || '',
        body.fullDescAr || '',
        body.fullDescEn || '',
        JSON.stringify(standards),
        JSON.stringify(scopeListAr),
        body.icon || 'Layers',
        body.image || ''
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error creating service in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
