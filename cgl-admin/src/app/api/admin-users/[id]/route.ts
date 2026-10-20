import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { hashPassword } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;

    if (id === 'root-super-admin' || id === 'admin-master-1') {
      return NextResponse.json({ success: false, message: 'لا يمكن حذف الحساب الرئيسي للنظام' }, { status: 400 });
    }

    await query('DELETE FROM admin_users WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'تم حذف حساب المشرف بنجاح' });
  } catch (error: any) {
    console.error('Error deleting admin user from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { id } = await params;

    if (id === 'root-super-admin') {
      return NextResponse.json({ success: false, message: 'لا يمكن تعديل الحساب الرئيسي من هنا' }, { status: 400 });
    }

    const body = await request.json();
    const rows = await query<any[]>('SELECT * FROM admin_users WHERE id = ? LIMIT 1', [id]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: 'الحساب غير موجود' }, { status: 404 });
    }

    const currentUser = rows[0];
    const newStatus = body.status !== undefined ? (body.status === 'inactive' ? 'inactive' : 'active') : currentUser.status;
    const newRole = body.role !== undefined ? body.role : currentUser.role;
    const newName = (body.name !== undefined && body.name.trim().length >= 2) ? body.name.trim() : currentUser.name;
    const newPasswordHash = (body.password && body.password.length >= 6) ? hashPassword(body.password) : currentUser.password_hash;

    await query(
      `UPDATE admin_users SET
        name = ?,
        role = ?,
        status = ?,
        password_hash = ?
      WHERE id = ?`,
      [newName, newRole, newStatus, newPasswordHash, id]
    );

    return NextResponse.json({ success: true, message: 'تم تحديث بيانات الحساب بنجاح' });
  } catch (error: any) {
    console.error('Error updating admin user in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
