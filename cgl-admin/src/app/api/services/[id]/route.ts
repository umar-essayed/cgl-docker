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
    const rows = await query<any[]>('SELECT * FROM services WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'الخدمة غير موجودة' }, { status: 404 });
    }

    const r = rows[0];
    const data = {
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

    const standards = Array.isArray(body.standards) ? body.standards : (body.standardsText ? body.standardsText.split(',').map((s: string) => s.trim()) : []);
    const scopeListAr = Array.isArray(body.scopeListAr) ? body.scopeListAr : (body.scopeText ? body.scopeText.split('\n').map((s: string) => s.trim()).filter(Boolean) : []);

    await query(
      `UPDATE services SET
        title_ar = ?,
        title_en = ?,
        short_desc_ar = ?,
        short_desc_en = ?,
        full_desc_ar = ?,
        full_desc_en = ?,
        standards = ?,
        scope_list_ar = ?,
        icon = ?,
        image = ?
      WHERE id = ?`,
      [
        body.titleAr,
        body.titleEn || '',
        body.shortDescAr || '',
        body.shortDescEn || '',
        body.fullDescAr || '',
        body.fullDescEn || '',
        JSON.stringify(standards),
        JSON.stringify(scopeListAr),
        body.icon || 'Layers',
        body.image || '',
        id
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    console.error('Error updating service in MySQL:', error);
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
    await query('DELETE FROM services WHERE id = ?', [id]);
    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, message: 'تم حذف الخدمة بنجاح' });
  } catch (error: any) {
    console.error('Error deleting service from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
