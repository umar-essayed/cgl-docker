import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      await query('UPDATE rfq_requests SET status = ? WHERE id = ?', [body.status, id]);
    }

    return NextResponse.json({ success: true, message: 'تم تحديث حالة الطلب' });
  } catch (error: any) {
    console.error('Error updating RFQ in MySQL:', error);
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
    await query('DELETE FROM rfq_requests WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'تم حذف الطلب' });
  } catch (error: any) {
    console.error('Error deleting RFQ from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
