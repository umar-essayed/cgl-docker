import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

function parseJsonField<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

// Query proposal status by refNumber or ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    const id = searchParams.get('id');

    if (!ref && !id) {
      return NextResponse.json({ success: false, message: 'Reference number or ID required' }, { status: 400 });
    }

    let rows: any[] = [];
    if (id) {
      rows = await query('SELECT * FROM rfq_requests WHERE id = ? LIMIT 1', [id]);
    } else if (ref) {
      rows = await query('SELECT * FROM rfq_requests WHERE ref_number = ? LIMIT 1', [ref.trim()]);
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Proposal not found' }, { status: 404 });
    }

    const row = rows[0];

    return NextResponse.json({
      success: true,
      data: {
        id: row.id,
        refNumber: row.ref_number,
        fullName: row.full_name,
        companyName: row.company_name,
        phone: row.phone,
        email: row.email,
        projectType: row.project_type,
        location: row.location,
        selectedServices: parseJsonField(row.selected_services, []),
        estimatedAreaDepth: row.estimated_area_depth,
        notes: row.notes,
        status: row.status || 'new',
        createdAt: row.created_at
      }
    });
  } catch (error: any) {
    console.error('Error fetching RFQ from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Submit proposal request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'الاسم ورقم الهاتف مطلوبان' }, 
        { status: 400 }
      );
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
      id, 
      refNumber, 
      data: {
        id,
        refNumber,
        fullName: body.fullName,
        phone: body.phone,
        status: 'new'
      }
    });
  } catch (error: any) {
    console.error('Error saving RFQ to MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
