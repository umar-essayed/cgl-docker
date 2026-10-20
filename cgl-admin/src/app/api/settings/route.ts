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
    const rows = await query<any[]>("SELECT * FROM settings WHERE id = 'company_info' LIMIT 1");
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'الإعدادات غير موجودة' }, { status: 404 });
    }

    const row = rows[0];
    const data = {
      id: row.id,
      themeColor: row.theme_color || 'blue',
      allowLightMode: Boolean(row.allow_light_mode),
      phone1: row.phone1,
      phone2: row.phone2,
      whatsapp1: row.whatsapp1,
      whatsapp2: row.whatsapp2,
      whatsapp1Raw: row.whatsapp1_raw,
      whatsapp2Raw: row.whatsapp2_raw,
      email: row.email,
      crNumber: row.cr_number,
      taxNumber: row.tax_number,
      workStart: row.work_start,
      workEnd: row.work_end,
      workDays: row.work_days,
      workingHoursAr: row.working_hours_ar,
      workingHoursEn: row.working_hours_en,
      headquartersAr: row.headquarters_ar,
      headquartersEn: row.headquarters_en,
      lat: row.lat,
      lng: row.lng,
      stats: parseJsonField(row.stats, { globalPartners: 650, innovativeSolutions: 300, yearsOfGrowth: 20 }),
      updatedAt: row.updated_at
    };

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching settings from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const body = await request.json();

    await query(
      `INSERT INTO settings (
        id, theme_color, allow_light_mode, phone1, phone2, 
        whatsapp1, whatsapp2, whatsapp1_raw, whatsapp2_raw, email, 
        cr_number, tax_number, work_start, work_end, work_days, 
        working_hours_ar, working_hours_en, stats
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        theme_color = VALUES(theme_color),
        allow_light_mode = VALUES(allow_light_mode),
        phone1 = VALUES(phone1),
        phone2 = VALUES(phone2),
        whatsapp1 = VALUES(whatsapp1),
        whatsapp2 = VALUES(whatsapp2),
        whatsapp1_raw = VALUES(whatsapp1_raw),
        whatsapp2_raw = VALUES(whatsapp2_raw),
        email = VALUES(email),
        cr_number = VALUES(cr_number),
        tax_number = VALUES(tax_number),
        work_start = VALUES(work_start),
        work_end = VALUES(work_end),
        work_days = VALUES(work_days),
        working_hours_ar = VALUES(working_hours_ar),
        working_hours_en = VALUES(working_hours_en),
        stats = VALUES(stats)`,
      [
        'company_info',
        body.themeColor || 'blue',
        body.allowLightMode ? 1 : 0,
        body.phone1 || '',
        body.phone2 || '',
        body.whatsapp1 || '',
        body.whatsapp2 || '',
        body.whatsapp1Raw || '',
        body.whatsapp2Raw || '',
        body.email || '',
        body.crNumber || '',
        body.taxNumber || '',
        body.workStart || '08:00',
        body.workEnd || '17:00',
        body.workDays || 'sun-thu',
        body.workingHoursAr || '',
        body.workingHoursEn || '',
        JSON.stringify(body.stats || { globalPartners: 650, innovativeSolutions: 300, yearsOfGrowth: 20 })
      ]
    );

    triggerWebsiteRevalidation();
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error saving settings to MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
