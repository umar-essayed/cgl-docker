import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { triggerWebsiteRevalidation } from '@/lib/revalidateWebsite';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = await query<any[]>('SELECT * FROM partners WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'الشريك غير موجود' }, { status: 404 });
    }

    const r = rows[0];
    const data = {
      id: r.id,
      nameAr: r.name_ar,
      nameEn: r.name_en,
      category: r.category,
      sectorAr: r.sector_ar,
      collaborationScopeAr: r.collaboration_scope_ar,
      badge: r.badge,
      logo: r.logo,
      logoLight: r.logo_light,
      order: r.order_num,
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

    await query(
      `UPDATE partners SET
        name_ar = ?,
        name_en = ?,
        category = ?,
        sector_ar = ?,
        collaboration_scope_ar = ?,
        badge = ?,
        logo = ?,
        logo_light = ?,
        order_num = ?
      WHERE id = ?`,
      [
        body.nameAr,
        body.nameEn || '',
        body.category || 'contractor',
        body.sectorAr || '',
        body.collaborationScopeAr || '',
        body.badge || '',
        body.logo || '',
        body.logoLight || '',
        Number(body.order) || 0,
        id
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    console.error('Error updating partner in MySQL:', error);
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
    await query('DELETE FROM partners WHERE id = ?', [id]);
    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, message: 'تم حذف الشريك بنجاح' });
  } catch (error: any) {
    console.error('Error deleting partner from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
