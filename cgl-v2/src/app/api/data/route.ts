import { NextResponse } from 'next/server';
import { getDynamicSiteData } from '@/lib/dynamicData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getDynamicSiteData();
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('API /data fallback triggered due to error:', error);
    // Return structured success response using dynamicData fallbacks
    const fallbackData = await getDynamicSiteData();
    return NextResponse.json({ success: true, data: fallbackData });
  }
}
