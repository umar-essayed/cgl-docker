import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { triggerWebsiteRevalidation } from '@/lib/revalidateWebsite';

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM partners ORDER BY order_num ASC, created_at ASC');
    const items = rows.map((r: any) => ({
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
    }));

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    console.error('Error fetching partners from MySQL:', error);
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
      return NextResponse.json({ success: false, message: 'معرف الشريك واسمه مطلوبان' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM partners WHERE id = ? LIMIT 1', [body.id]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'شريك بهذا المعرف موجود بالفعل' }, { status: 409 });
    }

    await query(
      `INSERT INTO partners (
        id, name_ar, name_en, category, sector_ar, 
        collaboration_scope_ar, badge, logo, logo_light, order_num
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
        body.nameAr,
        body.nameEn || '',
        body.category || 'contractor',
        body.sectorAr || '',
        body.collaborationScopeAr || '',
        body.badge || '',
        body.logo || '',
        body.logoLight || '',
        Number(body.order) || 0
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error creating partner in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
