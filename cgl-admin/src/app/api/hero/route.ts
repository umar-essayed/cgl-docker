import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { triggerWebsiteRevalidation } from '@/lib/revalidateWebsite';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM hero_slides ORDER BY order_num ASC');
    const slides = rows.map((r: any) => ({
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
    }));

    return NextResponse.json({ success: true, data: slides });
  } catch (error: any) {
    console.error('Error fetching hero slides from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const body = await request.json();
    const slideId = body.id || `hero-slide-${Date.now()}`;

    if (!body.titleAr) {
      return NextResponse.json({ success: false, message: 'عنوان السلايد بالعربية مطلوب' }, { status: 400 });
    }

    const orderNum = Number(body.order) > 0 ? Number(body.order) : 99;
    const isActive = body.isActive === false || body.isActive === 'false' ? 0 : 1;
    const type = body.type === 'video' ? 'video' : 'image';
    const mediaUrl = body.mediaUrl || '/assets/sliders/slider1.jpg';
    const duration = Number(body.duration) > 0 ? Number(body.duration) : 6;

    await query(
      `INSERT INTO hero_slides (
        id, order_num, is_active, type, media_url, tag_ar, tag_en, 
        metrics_ar, metrics_en, title_ar, title_en, subtitle_ar, subtitle_en, duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        order_num = VALUES(order_num),
        is_active = VALUES(is_active),
        type = VALUES(type),
        media_url = VALUES(media_url),
        tag_ar = VALUES(tag_ar),
        tag_en = VALUES(tag_en),
        metrics_ar = VALUES(metrics_ar),
        metrics_en = VALUES(metrics_en),
        title_ar = VALUES(title_ar),
        title_en = VALUES(title_en),
        subtitle_ar = VALUES(subtitle_ar),
        subtitle_en = VALUES(subtitle_en),
        duration = VALUES(duration)`,
      [
        slideId,
        orderNum,
        isActive,
        type,
        mediaUrl,
        body.tagAr || '',
        body.tagEn || '',
        body.metricsAr || '',
        body.metricsEn || '',
        body.titleAr || '',
        body.titleEn || '',
        body.subtitleAr || '',
        body.subtitleEn || '',
        duration
      ]
    );

    triggerWebsiteRevalidation();

    return NextResponse.json({ 
      success: true, 
      data: {
        id: slideId,
        order: orderNum,
        isActive: Boolean(isActive),
        type,
        mediaUrl,
        tagAr: body.tagAr,
        tagEn: body.tagEn,
        metricsAr: body.metricsAr,
        metricsEn: body.metricsEn,
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        subtitleAr: body.subtitleAr,
        subtitleEn: body.subtitleEn,
        duration
      }
    });
  } catch (error: any) {
    console.error('Error creating hero slide in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
