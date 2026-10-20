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

    const [
      projectCountRows,
      equipmentRows,
      newsCountRows,
      partnerCountRows,
      serviceCountRows,
      rfqCountRows,
      newRfqCountRows,
      recentRfqRows,
      settingsRows
    ] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as cnt FROM projects').catch(() => [{ cnt: 0 }]),
      query<any[]>('SELECT category FROM equipment').catch(() => []),
      query<any[]>('SELECT COUNT(*) as cnt FROM news').catch(() => [{ cnt: 0 }]),
      query<any[]>('SELECT COUNT(*) as cnt FROM partners').catch(() => [{ cnt: 0 }]),
      query<any[]>('SELECT COUNT(*) as cnt FROM services').catch(() => [{ cnt: 0 }]),
      query<any[]>('SELECT COUNT(*) as cnt FROM rfq_requests').catch(() => [{ cnt: 0 }]),
      query<any[]>("SELECT COUNT(*) as cnt FROM rfq_requests WHERE status = 'new'").catch(() => [{ cnt: 0 }]),
      query<any[]>('SELECT * FROM rfq_requests ORDER BY created_at DESC LIMIT 5').catch(() => []),
      query<any[]>("SELECT stats FROM settings WHERE id = 'company_info' LIMIT 1").catch(() => [])
    ]);

    const equipmentCategories: Record<string, number> = {};
    equipmentRows.forEach((r: any) => {
      const cat = r.category || 'other';
      equipmentCategories[cat] = (equipmentCategories[cat] || 0) + 1;
    });

    const recentRfqs = recentRfqRows.map((r: any) => ({
      id: r.id,
      refNumber: r.ref_number,
      fullName: r.full_name,
      companyName: r.company_name,
      phone: r.phone,
      email: r.email,
      projectType: r.project_type,
      location: r.location,
      selectedServices: parseJsonField(r.selected_services, []),
      status: r.status,
      createdAt: r.created_at
    }));

    const settingsStats = settingsRows[0]?.stats 
      ? parseJsonField(settingsRows[0].stats, { globalPartners: 650, innovativeSolutions: 300, yearsOfGrowth: 20 })
      : { globalPartners: 650, innovativeSolutions: 300, yearsOfGrowth: 20 };

    return NextResponse.json({
      success: true,
      data: {
        totalProjects: projectCountRows[0]?.cnt || 0,
        totalEquipment: equipmentRows.length,
        totalNews: newsCountRows[0]?.cnt || 0,
        totalPartners: partnerCountRows[0]?.cnt || 0,
        totalServices: serviceCountRows[0]?.cnt || 0,
        totalRfqs: rfqCountRows[0]?.cnt || 0,
        newRfqsCount: newRfqCountRows[0]?.cnt || 0,
        equipmentCategories,
        recentRfqs,
        companyStats: settingsStats,
        systemConnected: true,
        lastChecked: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Stats error from MySQL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
