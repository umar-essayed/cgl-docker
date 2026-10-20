import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { invalidateSiteDataCache } from '@/lib/dynamicData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag') || 'site-data';

    // 1. Immediately purge in-memory server cache
    invalidateSiteDataCache();

    // 2. Next.js cache revalidation
    revalidateTag(tag, 'max');
    revalidateTag('site-data', 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/[lang]', 'layout');
    revalidatePath('/ar');
    revalidatePath('/en');

    return NextResponse.json({
      revalidated: true,
      tag,
      cacheCleared: true,
      now: Date.now()
    });
  } catch (err: any) {
    return NextResponse.json({ revalidated: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
