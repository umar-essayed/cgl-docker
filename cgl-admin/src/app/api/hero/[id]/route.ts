import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { triggerWebsiteRevalidation } from '@/lib/revalidateWebsite';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = await query<any[]>('SELECT * FROM hero_slides WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'السلايد غير موجود' }, { status: 404 });
    }

    const r = rows[0];
    const data = {
      id: r.id,
      order: Number(r.order_num) || 1,
      isActive: Boolean(r.is_active),
      type: r.type,
      mediaUrl: r.media_url,
      tagAr: r.tag_ar,
      tagEn: r.tag_en,
      metricsAr: r.metrics_ar,
      metricsEn: r.metrics_en,
      titleAr: r.title_ar,
      titleEn: r.title_en,
      subtitleAr: r.subtitle_ar,
      subtitleEn: r.subtitle_en,
      duration: Number(r.duration) || 6,
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

    const orderNum = Number(body.order) > 0 ? Number(body.order) : 1;
    const isActive = body.isActive === false || body.isActive === 'false' ? 0 : 1;
    const duration = Number(body.duration) > 0 ? Number(body.duration) : 6;

    await query(
      `UPDATE hero_slides SET
        order_num = ?,
        is_active = ?,
        type = ?,
        media_url = ?,
        tag_ar = ?,
        tag_en = ?,
        metrics_ar = ?,
        metrics_en = ?,
        title_ar = ?,
        title_en = ?,
        subtitle_ar = ?,
        subtitle_en = ?,
        duration = ?
      WHERE id = ?`,
      [
        orderNum,
        isActive,
        body.type || 'image',
        body.mediaUrl || '/assets/sliders/slider1.jpg',
        body.tagAr || '',
        body.tagEn || '',
        body.metricsAr || '',
        body.metricsEn || '',
        body.titleAr || '',
        body.titleEn || '',
        body.subtitleAr || '',
        body.subtitleEn || '',
        duration,
        id
      ]
    );

    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    console.error('Error updating hero slide in MySQL:', error);
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
    await query('DELETE FROM hero_slides WHERE id = ?', [id]);
    triggerWebsiteRevalidation();

    return NextResponse.json({ success: true, message: 'تم حذف السلايد بنجاح' });
  } catch (error: any) {
    console.error('Error deleting hero slide from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
