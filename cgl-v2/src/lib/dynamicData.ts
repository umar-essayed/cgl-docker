import pool, { query } from '@/lib/db';
import { 
  CGL_PROJECTS_EVIDENCE, 
  CGL_EQUIPMENT_FLEET, 
  CGL_LATEST_NEWS, 
  CGL_AUTHORIZED_PARTNERS, 
  CGL_COMPANY_INFO,
  CGL_SERVICES
} from '@/lib/data';
import { ProjectEvidence, EquipmentItem, NewsArticle, AuthorizedPartner, HeroSlide, ServiceItem } from '@/lib/types';
import { cache } from 'react';

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-slide-1',
    order: 1,
    isActive: true,
    type: 'image',
    mediaUrl: '/assets/sliders/slider1.jpg',
    tagAr: 'الدراسات الجيوتقنية واستكشاف التربة',
    tagEn: 'Geotechnical & Soil Investigation',
    titleAr: 'الدقة الهندسية في فحص التربة التي ترتكز عليها كبرى مشاريع المملكة',
    titleEn: 'The Engineering Precision Anchoring the Kingdom’s Mega Projects',
    subtitleAr: 'حفر الجسات الآلية، استخراج العينات الصخرية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
    subtitleEn: 'Automated deep drilling, soil bearing capacity evaluation, and foundation recommendations compliant with SBC.',
    metricsAr: 'أعماق حفر تتجاوز 50 متراً',
    metricsEn: 'Drilling Depths +50m',
    duration: 6
  },
  {
    id: 'hero-slide-2',
    order: 2,
    isActive: true,
    type: 'image',
    mediaUrl: '/uploads/projects_images/project_688d08b6e73ee4.36242119.jpg',
    tagAr: 'اختبارات التحميل الاستاتيكي',
    tagEn: 'Static Pile Load Testing',
    titleAr: 'تأكيد سلامة الأساسات العميقة بروافع تتجاوز 1000 طن',
    titleEn: 'Deep Foundation Verification with Test Loads Exceeding 1,000 Tons',
    subtitleAr: 'منظومة هيدروليكية وخلايا ضغط معايرة لحساب الهبوط بدقة مليمترية وفق المعايير القياسية المعتمدة.',
    subtitleEn: 'Calibrated hydraulic systems and load cells for millimeter settlement analysis per ASTM D1143.',
    metricsAr: 'أحمال فحص تتجاوز 1000 طن',
    metricsEn: 'Test Loads +1,000 Tons',
    duration: 6
  },
  {
    id: 'hero-slide-3',
    order: 3,
    isActive: true,
    type: 'image',
    mediaUrl: '/uploads/projects_images/project_688d0f1061e875.99060450.jpg',
    tagAr: 'المسح الطبوغرافي والجيوديسي',
    tagEn: 'Topographic & Geodetic Survey',
    titleAr: 'رصد مساحي رقمي دقيق ونمذجة ثلاثية الأبعاد للمواقع',
    titleEn: 'High-Precision Digital Surveying & 3D Reality Capture',
    subtitleAr: 'أحدث محطات الرصد الشاملة وتقنيات المسح الفضائي لتثبيت محاور المنشآت وحساب الكميات بدقة قطعية.',
    subtitleEn: 'Advanced electronic total stations and GNSS receivers for axis layout and volume calculations.',
    metricsAr: 'دقة رصد ثانية واحدة',
    metricsEn: '1-Arcsecond Accuracy',
    duration: 6
  }
];

export interface DynamicSiteData {
  projects: ProjectEvidence[];
  equipment: EquipmentItem[];
  news: NewsArticle[];
  partners: AuthorizedPartner[];
  services: ServiceItem[];
  heroSlides: HeroSlide[];
  settings: typeof CGL_COMPANY_INFO;
}

function parseJsonField<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------
// Global In-Memory Cache (Protects MySQL from excess reads)
// ---------------------------------------------------------
let memoryCachedData: DynamicSiteData | null = null;
let memoryCacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL for fast updates
let inFlightFetch: Promise<DynamicSiteData> | null = null;

/**
 * Clear the in-memory cache on demand (called by /api/revalidate)
 */
export function invalidateSiteDataCache(): void {
  memoryCachedData = null;
  memoryCacheTimestamp = 0;
  inFlightFetch = null;
  console.log('[dynamicData] In-memory cache invalidated successfully.');
}

/**
 * Internal worker to read from MySQL once
 */
async function fetchFreshSiteData(): Promise<DynamicSiteData> {
  try {
    const [
      projectRows,
      equipmentRows,
      newsRows,
      partnerRows,
      serviceRows,
      heroRows,
      settingsRows
    ] = await Promise.all([
      query<any[]>('SELECT * FROM projects ORDER BY created_at DESC').catch(() => []),
      query<any[]>('SELECT * FROM equipment ORDER BY created_at DESC').catch(() => []),
      query<any[]>('SELECT * FROM news ORDER BY date DESC, created_at DESC').catch(() => []),
      query<any[]>('SELECT * FROM partners ORDER BY order_num ASC, created_at ASC').catch(() => []),
      query<any[]>('SELECT * FROM services ORDER BY created_at ASC').catch(() => []),
      query<any[]>('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY order_num ASC').catch(() => []),
      query<any[]>('SELECT * FROM settings WHERE id = ? LIMIT 1', ['company_info']).catch(() => [])
    ]);

    const projects: ProjectEvidence[] = projectRows.length > 0
      ? projectRows.map((r: any) => ({
          id: r.id,
          nameAr: r.name_ar,
          nameEn: r.name_en,
          sectorAr: r.sector_ar,
          sectorEn: r.sector_en,
          locationAr: r.location_ar,
          locationEn: r.location_en,
          client: r.client || undefined,
          scopeOfWorkAr: r.scope_of_work_ar || '',
          scopeOfWorkEn: r.scope_of_work_en || '',
          servicesPerformedAr: parseJsonField(r.services_performed_ar, []),
          technicalChallengesAr: r.technical_challenges_ar || '',
          engineeringApproachAr: r.engineering_approach_ar || '',
          testsPerformedAr: parseJsonField(r.tests_performed_ar, []),
          equipmentUsed: parseJsonField(r.equipment_used, []),
          technicalMetrics: parseJsonField(r.technical_metrics, []),
          coverImage: r.cover_image || '/api/media/projects/pile_load_testing_reaction.jpg',
          gallery: parseJsonField(r.gallery, []),
          relevantStandards: parseJsonField(r.relevant_standards, []),
          relatedServiceId: r.related_service_id || 'geotechnical-investigation'
        }))
      : CGL_PROJECTS_EVIDENCE;

    const equipment: EquipmentItem[] = equipmentRows.length > 0
      ? equipmentRows.map((r: any) => ({
          id: r.id,
          code: r.code || '',
          nameAr: r.name_ar,
          nameEn: r.name_en,
          category: r.category,
          categoryNameAr: r.category_name_ar || '',
          categoryNameEn: r.category_name_en || '',
          specsAr: parseJsonField(r.specs_ar, []),
          specsEn: parseJsonField(r.specs_en, []),
          standards: parseJsonField(r.standards, []),
          standardsAr: parseJsonField(r.standards_ar, undefined),
          standardsEn: parseJsonField(r.standards_en, undefined),
          image: r.image || '/uploads/equipment_fleet/rotary_core_rig.jpg',
          serviceId: r.service_id || undefined
        }))
      : CGL_EQUIPMENT_FLEET;

    const news: NewsArticle[] = newsRows.length > 0
      ? newsRows.map((r: any) => ({
          id: r.id,
          titleAr: r.title_ar,
          titleEn: r.title_en,
          excerptAr: r.excerpt_ar,
          excerptEn: r.excerpt_en,
          contentAr: r.content_ar,
          contentEn: r.content_en,
          categoryAr: r.category_ar,
          categoryEn: r.category_en,
          date: r.date,
          dateAr: r.date_ar,
          dateEn: r.date_en,
          readTimeAr: r.read_time_ar,
          readTimeEn: r.read_time_en,
          readMinutes: r.read_minutes || 5,
          image: r.image,
          coverImage: r.cover_image,
          featured: Boolean(r.featured),
          tags: parseJsonField(r.tags, []),
          authorAr: r.author_ar,
          authorEn: r.author_en
        }))
      : CGL_LATEST_NEWS;

    const partners: AuthorizedPartner[] = partnerRows.length > 0
      ? partnerRows.map((r: any) => ({
          id: r.id,
          nameAr: r.name_ar,
          nameEn: r.name_en,
          category: r.category,
          sectorAr: r.sector_ar,
          collaborationScopeAr: r.collaboration_scope_ar,
          badge: r.badge,
          logo: r.logo,
          logoLight: r.logo_light || undefined
        }))
      : CGL_AUTHORIZED_PARTNERS;

    const services: ServiceItem[] = serviceRows.length > 0
      ? serviceRows.map((r: any) => ({
          id: r.id,
          titleAr: r.title_ar,
          titleEn: r.title_en,
          shortDescAr: r.short_desc_ar,
          shortDescEn: r.short_desc_en,
          fullDescAr: r.full_desc_ar,
          standards: parseJsonField(r.standards, []),
          fieldMethods: parseJsonField(r.field_methods, []),
          labDeliverables: parseJsonField(r.lab_deliverables, []),
          icon: r.icon || 'Layers',
          image: r.image,
          scopeListAr: parseJsonField(r.scope_list_ar, [])
        }))
      : CGL_SERVICES;

    let heroSlides: HeroSlide[] = [];
    if (heroRows.length > 0) {
      heroSlides = heroRows.map((r: any) => ({
        id: r.id,
        order: Number(r.order_num) || 1,
        duration: Number(r.duration) > 0 ? Number(r.duration) : 6,
        isActive: Boolean(r.is_active),
        type: r.type === 'video' ? 'video' : 'image',
        mediaUrl: r.media_url,
        tagAr: r.tag_ar,
        tagEn: r.tag_en,
        metricsAr: r.metrics_ar,
        metricsEn: r.metrics_en,
        titleAr: r.title_ar,
        titleEn: r.title_en,
        subtitleAr: r.subtitle_ar,
        subtitleEn: r.subtitle_en
      })).sort((a: any, b: any) => a.order - b.order);
    }

    if (heroSlides.length === 0) {
      heroSlides = DEFAULT_HERO_SLIDES;
    }

    const settingsRow = settingsRows[0] || null;
    const settings = settingsRow
      ? {
          ...CGL_COMPANY_INFO,
          phone1: settingsRow.phone1 || CGL_COMPANY_INFO.phone1,
          phone2: settingsRow.phone2 || CGL_COMPANY_INFO.phone2,
          whatsapp1: settingsRow.whatsapp1 || CGL_COMPANY_INFO.whatsapp1,
          whatsapp2: settingsRow.whatsapp2 || CGL_COMPANY_INFO.whatsapp2,
          whatsapp1Raw: settingsRow.whatsapp1_raw || CGL_COMPANY_INFO.whatsapp1Raw,
          whatsapp2Raw: settingsRow.whatsapp2_raw || CGL_COMPANY_INFO.whatsapp2Raw,
          email: settingsRow.email || CGL_COMPANY_INFO.email,
          workingHoursAr: settingsRow.working_hours_ar || CGL_COMPANY_INFO.workingHoursAr,
          workingHoursEn: settingsRow.working_hours_en || CGL_COMPANY_INFO.workingHoursEn,
          themeColor: settingsRow.theme_color || 'blue',
          allowLightMode: settingsRow.allow_light_mode !== 0 && settingsRow.allow_light_mode !== false,
          stats: parseJsonField(settingsRow.stats, CGL_COMPANY_INFO.stats)
        }
      : CGL_COMPANY_INFO;

    return {
      projects,
      equipment,
      news,
      partners,
      services,
      heroSlides,
      settings: settings as any
    };
  } catch (e) {
    console.error('Error fetching dynamic site data from MySQL:', e);
    return {
      projects: CGL_PROJECTS_EVIDENCE,
      equipment: CGL_EQUIPMENT_FLEET,
      news: CGL_LATEST_NEWS,
      partners: CGL_AUTHORIZED_PARTNERS,
      services: CGL_SERVICES,
      heroSlides: DEFAULT_HERO_SLIDES,
      settings: CGL_COMPANY_INFO
    };
  }
}

/**
 * Fetch dynamic site data with automatic in-memory caching and request deduplication.
 * Eliminates redundant database reads and provides maximum throughput.
 */
export const getDynamicSiteData = cache(async function getDynamicSiteData(): Promise<DynamicSiteData> {
  const now = Date.now();

  // 1. Return fresh memory cached data if within TTL
  if (memoryCachedData && (now - memoryCacheTimestamp < CACHE_TTL_MS)) {
    return memoryCachedData;
  }

  // 2. Deduplicate concurrent requests (Thundering Herd shield)
  if (inFlightFetch) {
    return inFlightFetch;
  }

  inFlightFetch = fetchFreshSiteData()
    .then((data) => {
      memoryCachedData = data;
      memoryCacheTimestamp = Date.now();
      inFlightFetch = null;
      return data;
    })
    .catch((err) => {
      inFlightFetch = null;
      throw err;
    });

  return inFlightFetch;
});
