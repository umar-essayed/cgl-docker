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
    const rows = await query<any[]>('SELECT * FROM news ORDER BY date DESC, created_at DESC');
    const items = rows.map((r: any) => ({
      id: r.id,
      titleAr: r.title_ar,
      titleEn: r.title_en,
      excerptAr: r.excerpt_ar,
      excerptEn: r.excerpt_en,
      contentAr: r.content_ar,
      contentEn: r.content_en,
      categoryAr: r.category_ar,
      categoryEn: r.category_en,
      date: r.date,
      dateAr: r.date_ar,
      dateEn: r.date_en,
      readTimeAr: r.read_time_ar,
      readTimeEn: r.read_time_en,
      readMinutes: r.read_minutes,
      image: r.image,
      coverImage: r.cover_image,
      featured: Boolean(r.featured),
      tags: parseJsonField(r.tags, []),
      authorAr: r.author_ar,
      authorEn: r.author_en,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Error fetching news from MySQL:', error);
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
      return NextResponse.json({ success: false, message: 'معرف الخبر وعنوانه بالعربية مطلوبان' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM news WHERE id = ? LIMIT 1', [body.id]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'خبر بهذا المعرف موجود بالفعل' }, { status: 409 });
    }

    const tags = Array.isArray(body.tags) ? body.tags : [];

    await query(
      `INSERT INTO news (
        id, title_ar, title_en, excerpt_ar, excerpt_en, 
        content_ar, content_en, category_ar, category_en, 
        date, date_ar, date_en, read_time_ar, read_time_en, 
        read_minutes, image, cover_image, featured, tags, 
        author_ar, author_en
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
        body.titleAr,
        body.titleEn || '',
        body.excerptAr || '',
        body.excerptEn || '',
        body.contentAr || '',
        body.contentEn || '',
        body.categoryAr || '',
        body.categoryEn || '',
        body.date || new Date().toISOString().split('T')[0],
        body.dateAr || '',
        body.dateEn || '',
        body.readTimeAr || '5 دقائق',
        body.readTimeEn || '5 mins',
        Number(body.readMinutes) || 5,
        body.image || '',
        body.coverImage || '',
        body.featured ? 1 : 0,
        JSON.stringify(tags),
        body.authorAr || '',
        body.authorEn || ''
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error creating news in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
