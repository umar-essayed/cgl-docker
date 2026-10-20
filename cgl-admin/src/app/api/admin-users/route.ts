import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const rows = await query<any[]>('SELECT * FROM admin_users ORDER BY created_at DESC');
    
    const dbUsers = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role || 'admin',
      status: r.status || 'active',
      createdAt: r.created_at,
      lastLoginAt: r.last_login_at || null,
      isRoot: r.role === 'superadmin' && r.email.toLowerCase() === (process.env.ADMIN_EMAIL || 'admin@cgl.sa').toLowerCase()
    }));

    // If root admin not present in list, add it
    const rootEmail = (process.env.ADMIN_EMAIL || 'admin@cgl.sa').toLowerCase();
    const hasRoot = dbUsers.some(u => u.email.toLowerCase() === rootEmail);

    const finalUsers = hasRoot ? dbUsers : [
      {
        id: 'root-super-admin',
        name: 'مدير النظام الرئيسي (System Owner)',
        email: rootEmail,
        role: 'superadmin',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
        lastLoginAt: null,
        isRoot: true
      },
      ...dbUsers
    ];

    return NextResponse.json({ 
      success: true, 
      data: finalUsers
    });
  } catch (error: any) {
    console.error('Error fetching admin users from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await requireAuth())) {
      return NextResponse.json({ success: false, message: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, role = 'admin' } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'الاسم مطلوب (حرفين على الأقل)' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ success: false, message: 'يرجى إدخال بريد إلكتروني صالح' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, message: 'كلمة المرور يجب أن لا تقل عن 6 خانات' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const rootEmail = (process.env.ADMIN_EMAIL || 'admin@cgl.sa').toLowerCase();

    if (cleanEmail === rootEmail) {
      return NextResponse.json({ success: false, message: 'هذا البريد محجوز لحساب النظام الرئيسي' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM admin_users WHERE email = ? LIMIT 1', [cleanEmail]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, message: 'هذا البريد الإلكتروني مسجل مسبقاً لمشرف آخر' }, { status: 400 });
    }

    const id = `admin_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const passwordHash = hashPassword(password);

    await query(
      `INSERT INTO admin_users (id, email, password_hash, name, role, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, cleanEmail, passwordHash, name.trim(), role, 'active']
    );

    return NextResponse.json({ 
      success: true, 
      message: 'تم إنشاء حساب المشرف بنجاح',
      user: {
        id,
        name: name.trim(),
        email: cleanEmail,
        role,
        status: 'active'
      }
    });
  } catch (error: any) {
    console.error('Error creating admin user in MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
