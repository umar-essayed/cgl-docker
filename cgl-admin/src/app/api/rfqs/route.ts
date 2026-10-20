import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';

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
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const rows = await query<any[]>('SELECT * FROM rfq_requests ORDER BY created_at DESC');
    const rfqs = rows.map((r: any) => ({
      id: r.id,
      refNumber: r.ref_number,
      fullName: r.full_name,
      companyName: r.company_name,
      phone: r.phone,
      email: r.email,
      projectType: r.project_type,
      location: r.location,
      selectedServices: parseJsonField(r.selected_services, []),
      estimatedAreaDepth: r.estimated_area_depth,
      notes: r.notes,
      lang: r.lang,
      status: r.status,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));

    return NextResponse.json({ success: true, data: rfqs });
  } catch (error: any) {
    console.error('Error fetching RFQs from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Public endpoint to receive quote requests from CGL website
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.phone) {
      return NextResponse.json({ success: false, message: 'الاسم ورقم الهاتف مطلوبان' }, { status: 400 });
    }

    const id = `rfq_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(10000 + Math.random() * 90000);
    const refNumber = `CGL-RFQ-${year}-${randomSeq}`;

    const selectedServices = Array.isArray(body.selectedServices) 
      ? body.selectedServices 
      : [body.selectedServices].filter(Boolean);

    await query(
      `INSERT INTO rfq_requests (
        id, ref_number, full_name, company_name, phone, email, 
        project_type, location, selected_services, estimated_area_depth, 
        notes, lang, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        refNumber,
        body.fullName.trim(),
        (body.companyName || body.company || '').trim(),
        body.phone.trim(),
        (body.email || '').trim(),
        body.projectType || '',
        body.location || '',
        JSON.stringify(selectedServices),
        body.estimatedAreaDepth || '',
        (body.notes || '').trim(),
        body.lang || 'ar',
        'new'
      ]
    );

    return NextResponse.json({ 
      success: true, 
      data: {
        id,
        refNumber,
        fullName: body.fullName,
        phone: body.phone,
        status: 'new'
      }
    });
  } catch (error: any) {
    console.error('Error creating RFQ in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
