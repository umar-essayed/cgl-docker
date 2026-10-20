-- CGL Enterprise Platform Database Initialization
-- Character set: utf8mb4 for comprehensive Arabic and international text support

CREATE DATABASE IF NOT EXISTS `cgl_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cgl_db`;

-- 1. Organization & Global Settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `theme_color` VARCHAR(20) DEFAULT 'blue',
  `allow_light_mode` BOOLEAN DEFAULT TRUE,
  `phone1` VARCHAR(100) DEFAULT '+966 50 123 4567',
  `phone2` VARCHAR(100) DEFAULT '+966 12 654 3210',
  `whatsapp1` VARCHAR(100) DEFAULT '+966 50 123 4567',
  `whatsapp2` VARCHAR(100) DEFAULT '+966 12 654 3210',
  `whatsapp1_raw` VARCHAR(100) DEFAULT '966501234567',
  `whatsapp2_raw` VARCHAR(100) DEFAULT '966126543210',
  `email` VARCHAR(255) DEFAULT 'info@creativegeotechnical.com.sa',
  `cr_number` VARCHAR(100) DEFAULT '4030000000',
  `tax_number` VARCHAR(100) DEFAULT '300000000000003',
  `work_start` VARCHAR(20) DEFAULT '08:00',
  `work_end` VARCHAR(20) DEFAULT '17:00',
  `work_days` VARCHAR(50) DEFAULT 'sun-thu',
  `working_hours_ar` VARCHAR(255) DEFAULT 'الأحد - الخميس: 8:00 ص - 5:00 م',
  `working_hours_en` VARCHAR(255) DEFAULT 'Sun - Thu: 8:00 AM - 5:00 PM',
  `headquarters_ar` VARCHAR(255) DEFAULT 'المملكة العربية السعودية، جدة - حي مشرفة',
  `headquarters_en` VARCHAR(255) DEFAULT 'Jeddah, Mushrifah District, Kingdom of Saudi Arabia',
  `lat` DOUBLE DEFAULT 21.5231047,
  `lng` DOUBLE DEFAULT 39.177774,
  `stats` JSON,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Hero Slider Sequence
CREATE TABLE IF NOT EXISTS `hero_slides` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `order_num` INT DEFAULT 1,
  `is_active` BOOLEAN DEFAULT TRUE,
  `type` VARCHAR(20) DEFAULT 'image',
  `media_url` TEXT NOT NULL,
  `tag_ar` VARCHAR(255),
  `tag_en` VARCHAR(255),
  `metrics_ar` VARCHAR(255),
  `metrics_en` VARCHAR(255),
  `title_ar` VARCHAR(500) NOT NULL,
  `title_en` VARCHAR(500) NOT NULL,
  `subtitle_ar` TEXT,
  `subtitle_en` TEXT,
  `duration` INT DEFAULT 6,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Core Engineering Services
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title_ar` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `short_desc_ar` TEXT,
  `short_desc_en` TEXT,
  `full_desc_ar` TEXT,
  `full_desc_en` TEXT,
  `standards` JSON,
  `scope_list_ar` JSON,
  `scope_list_en` JSON,
  `field_methods` JSON,
  `lab_deliverables` JSON,
  `icon` VARCHAR(100) DEFAULT 'Layers',
  `image` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Projects & Technical Evidence
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `sector_ar` VARCHAR(255),
  `sector_en` VARCHAR(255),
  `location_ar` VARCHAR(255),
  `location_en` VARCHAR(255),
  `client` VARCHAR(255),
  `client_ar` VARCHAR(255),
  `client_en` VARCHAR(255),
  `scope_of_work_ar` TEXT,
  `scope_of_work_en` TEXT,
  `services_performed_ar` JSON,
  `technical_challenges_ar` TEXT,
  `technical_challenges_en` TEXT,
  `engineering_approach_ar` TEXT,
  `engineering_approach_en` TEXT,
  `tests_performed_ar` JSON,
  `equipment_used` JSON,
  `technical_metrics` JSON,
  `cover_image` TEXT,
  `gallery` JSON,
  `relevant_standards` JSON,
  `related_service_id` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Equipment Fleet Catalog
CREATE TABLE IF NOT EXISTS `equipment` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `code` VARCHAR(100),
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `category_name_ar` VARCHAR(255),
  `category_name_en` VARCHAR(255),
  `specs_ar` JSON,
  `specs_en` JSON,
  `standards` JSON,
  `standards_ar` JSON,
  `standards_en` JSON,
  `image` TEXT,
  `service_id` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Technical Publications & Articles
CREATE TABLE IF NOT EXISTS `news` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title_ar` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `excerpt_ar` TEXT,
  `excerpt_en` TEXT,
  `content_ar` LONGTEXT,
  `content_en` LONGTEXT,
  `category_ar` VARCHAR(100),
  `category_en` VARCHAR(100),
  `date` VARCHAR(50),
  `date_ar` VARCHAR(50),
  `date_en` VARCHAR(50),
  `read_time_ar` VARCHAR(50),
  `read_time_en` VARCHAR(50),
  `read_minutes` INT DEFAULT 5,
  `image` TEXT,
  `cover_image` TEXT,
  `featured` BOOLEAN DEFAULT FALSE,
  `tags` JSON,
  `author_ar` VARCHAR(255),
  `author_en` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Authorized Partners & Clients
CREATE TABLE IF NOT EXISTS `partners` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `sector_ar` VARCHAR(255),
  `collaboration_scope_ar` TEXT,
  `badge` VARCHAR(255),
  `logo` TEXT,
  `logo_light` TEXT,
  `order_num` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. RFQ Proposals & Procurement Requests
CREATE TABLE IF NOT EXISTS `rfq_requests` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `ref_number` VARCHAR(100) UNIQUE NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255),
  `phone` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255),
  `project_type` VARCHAR(255),
  `location` VARCHAR(255),
  `selected_services` JSON,
  `estimated_area_depth` VARCHAR(255),
  `notes` TEXT,
  `lang` VARCHAR(10) DEFAULT 'ar',
  `status` VARCHAR(50) DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Administrative Users
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `status` VARCHAR(50) DEFAULT 'active',
  `last_login_at` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for high-frequency queries
CREATE INDEX idx_rfq_status ON `rfq_requests` (`status`);
CREATE INDEX idx_rfq_created ON `rfq_requests` (`created_at` DESC);
CREATE INDEX idx_hero_order ON `hero_slides` (`order_num`);
CREATE INDEX idx_equipment_cat ON `equipment` (`category`);
CREATE INDEX idx_admin_email ON `admin_users` (`email`);

-- Seed Default Master Settings
INSERT INTO `settings` (`id`, `theme_color`, `allow_light_mode`, `stats`)
VALUES (
  'company_info',
  'blue',
  TRUE,
  JSON_OBJECT('globalPartners', 650, 'innovativeSolutions', 300, 'yearsOfGrowth', 20)
)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Seed Default Master Admin
-- Password 'cgl2026@secure' with HMAC SHA256 using default secret 'cgl_executive_secure_control_center_key_2026_988421'
-- or simple hash fallback supported by login route
INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `name`, `role`, `status`)
VALUES (
  'admin-master-1',
  'admin@cgl.sa',
  '9e4726bf66dd6eb1b01a182be02161405b6e6ff6ecbfae21db7cce8ee0cb12ef',
  'مدير النظام الرئيسي',
  'superadmin',
  'active'
)
ON DUPLICATE KEY UPDATE `email` = `email`;

-- Seed Default Hero Slides
INSERT INTO `hero_slides` (`id`, `order_num`, `is_active`, `type`, `media_url`, `tag_ar`, `tag_en`, `metrics_ar`, `metrics_en`, `title_ar`, `title_en`, `subtitle_ar`, `subtitle_en`, `duration`)
VALUES
(
  'hero-slide-1', 1, TRUE, 'image', '/assets/sliders/slider1.jpg',
  'الدراسات الجيوتقنية واستكشاف التربة', 'Geotechnical & Soil Investigation',
  'أعماق حفر تتجاوز 50 متراً', 'Drilling Depths +50m',
  'الدقة الهندسية في فحص التربة التي ترتكز عليها كبرى مشاريع المملكة',
  'The Engineering Precision Anchoring the Kingdom’s Mega Projects',
  'حفر الجسات الآلية، استخراج العينات الصخرية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
  'Automated deep drilling, soil bearing capacity evaluation, and foundation recommendations compliant with SBC.',
  6
),
(
  'hero-slide-2', 2, TRUE, 'image', '/uploads/projects_images/project_688d08b6e73ee4.36242119.jpg',
  'اختبارات التحميل الاستاتيكي', 'Static Pile Load Testing',
  'أحمال فحص تتجاوز 1000 طن', 'Test Loads +1,000 Tons',
  'تأكيد سلامة الأساسات العميقة بروافع تتجاوز 1000 طن',
  'Deep Foundation Verification with Test Loads Exceeding 1,000 Tons',
  'منظومة هيدروليكية وخلايا ضغط معايرة لحساب الهبوط بدقة مليمترية وفق المعايير القياسية المعتمدة.',
  'Calibrated hydraulic systems and load cells for millimeter settlement analysis per ASTM D1143.',
  6
),
(
  'hero-slide-3', 3, TRUE, 'image', '/uploads/projects_images/project_688d0f1061e875.99060450.jpg',
  'المسح الطبوغرافي والجيوديسي', 'Topographic & Geodetic Survey',
  'دقة رصد ثانية واحدة', '1-Arcsecond Accuracy',
  'رصد مساحي رقمي دقيق ونمذجة ثلاثية الأبعاد للمواقع',
  'High-Precision Digital Surveying & 3D Reality Capture',
  'أحدث محطات الرصد الشاملة وتقنيات المسح الفضائي لتثبيت محاور المنشآت وحساب الكميات بدقة قطعية.',
  'Advanced electronic total stations and GNSS receivers for axis layout and volume calculations.',
  6
)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Seed Default Core Services
INSERT INTO `services` (`id`, `title_ar`, `title_en`, `short_desc_ar`, `short_desc_en`, `full_desc_ar`, `full_desc_en`, `standards`, `scope_list_ar`, `icon`, `image`)
VALUES
(
  'geotechnical-investigation',
  'الدراسات الجيوتقنية واستكشاف التربة',
  'Geotechnical & Soil Investigation',
  'حفر الجسات الآلية، استخراج العينات الصخرية والترابية، وتحديد قدرة تحمل التربة وتوصيات الأساسات وفق كود البناء السعودي.',
  'Borehole drilling, undisturbed sampling, bearing capacity analysis, and geotechnical foundation recommendations.',
  'توفير منظومة متكاملة لاستكشاف باطن الأرض تبدأ من حفر الجسات الاستكشافية بالأعماق المطلوبة، واختبار الاختراق القياسي (SPT)، وتحديد مناسيب المياه الجوفية، وصولاً إلى التحاليل المعملية الميكانيكية لتقديم تقرير جيوتقني شامل معتمد.',
  'Comprehensive subsurface exploration including rotary drilling, SPT tests, groundwater monitoring, and certified foundation reports.',
  JSON_ARRAY('ASTM D1586', 'ASTM D1587', 'ASTM D4220', 'SBC 303'),
  JSON_ARRAY('حفر الجسات الاستكشافية لمختلف أعماق التأسيس', 'أخذ العينات المقلقلة وغير المقلقلة بدقة معيارية', 'تحديد خواص انتفاخ وانهيار التربة', 'تحديد قدرة التحمل المسموحة والتوصيات الإنشائية'),
  'Layers',
  '/uploads/user_provided/geotech_investigation.jpeg'
),
(
  'structural-integrity',
  'تقييم سلامة المباني والفحوصات غير الإتلافية',
  'Structural Integrity & NDT Testing',
  'الكشف عن عيوب الخرسانة والحديد، تقييم متانة المنشآت القائمة، والفحوصات غير الإتلافية بأحدث أجهزة الرادار والألتراسونيك.',
  'Non-destructive concrete evaluation, rebar detection, integrity audits, and load capacity assessments.',
  'إجراء مسح هندسي شامل للهياكل الخرسانية القائمة للكشف عن التصدعات، عمق التكربن، أماكن وسمك حديد التسليح عبر الرادار الأرضي، وقياس مقاومة الضغط بالصلادة والموجات فوق الصوتية.',
  'Detailed concrete diagnostics, crack depth mapping, ultrasonic pulse velocity, and GPR rebar detection.',
  JSON_ARRAY('ASTM C805', 'ASTM C597', 'ACI 228.1R', 'BS 1881'),
  JSON_ARRAY('فحص مطرقة شميدت والموجات فوق الصوتية', 'تحديد مسارات وأقطار حديد التسليح رادارياً (GPR)', 'استخراج واختبار القلوب الخرسانية (Core Tests)', 'تقييم السلامة الإنشائية للمباني المتصدعة والقديمة'),
  'ShieldCheck',
  '/uploads/user_provided/structural_integrity.jpeg'
),
(
  'materials-testing',
  'مختبرات فحص مواد البناء والخرسانة',
  'Construction Materials Testing Lab',
  'فحص مطابقة الخرسانة الطازجة والمتصلدة، الركام، الأسمنت، حديد التسليح، والخلطات الإسفلتية للمواصفات والمقاييس القياسية.',
  'Comprehensive laboratory testing for concrete, aggregates, steel rebar, cement, and asphalt compliance.',
  'مختبرات مركزية مجهزة بماكينات كسر وضغط آلية معايرة، لإجراء كافة التجارب الكيميائية والفيزيائية والميكانيكية للمواد الإنشائية لضمان جودة التوريد ومطابقة اشتراطات المشروع.',
  'Calibrated compression machines for testing compressive strength of concrete, tensile rebar properties, and aggregate gradation.',
  JSON_ARRAY('ASTM C39', 'ASTM A615', 'ASTM C136', 'SASO Standards'),
  JSON_ARRAY('اختبار مقاومة الضغط للخرسانة (Compressive Strength)', 'فحص الشد والاستطالة لحديد التسليح (Tensile Test)', 'التحليل المنخلي وفحوصات تآكل الركام (Los Angeles)', 'تصميم وضبط جودة الخلطات الخرسانية والأسفلتية'),
  'Beaker',
  '/uploads/user_provided/materials_testing.jpeg'
),
(
  'engineering-surveying',
  'أعمال المسح الهندسي والجيوديسي',
  'Land & Engineering Surveying',
  'الرفع الطبوغرافي عالي الدقة، تثبيت الإحداثيات والشبكات الجيوديسية، ورصد الهبوط والتشوهات الإنشائية بمحطات الرصد المتطورة.',
  'Topographic surveys, geodetic grid establishment, precise leveling, and structural deformation monitoring.',
  'تطبيق أحدث تقنيات الرفع المساحي باستخدام محطات الرصد الشاملة (Total Stations) وأجهزة GNSS/RTK الفضائية، لإنشاء الخرائط الكنتورية ونماذج التضاريس الرقمية وحساب الكميات بدقة مليمترية.',
  'Advanced total stations and GPS RTK receivers for geodetic reference networks and contour modeling.',
  JSON_ARRAY('FGDC Geodetic Standards', 'MOMRA Survey Specifications'),
  JSON_ARRAY('الرفع المساحي الطبوغرافي والتفصيلي للمشاريع', 'تثبيت محاور المنشآت والأساسات والمنشآت الحيوية', 'رصد الهبوط والحركات الإنشائية للمباني المجاورة', 'حساب كميات الحفر والردم بدقة رقمية'),
  'Crosshair',
  '/uploads/user_provided/engineering_surveying.jpeg'
),
(
  'mining-testing',
  'اختبارات التعدين والجيولوجيا',
  'Mining & Geological Testing',
  'تقييم الصخور والمعادن، تحاليل خواص المحاجر، ودراسات نقاء الخامات للاستخدامات الصناعية والإنشائية والبنية التحتية.',
  'Rock mechanics, quarry material suitability, mineral composition, and industrial raw material qualification.',
  'فحوصات جيولوجية متخصصة تشمل اختبار ضغط الصخور أحادي المحور (UCS)، واختبار معامل الحمل النقطي (Point Load Test)، وتحديد الخواص البتروغرافية والكيميائية للكتل الصخرية.',
  'Specialized rock mechanics testing, unconfined compressive strength, and quarry quality verification.',
  JSON_ARRAY('ASTM D7012', 'ASTM D5731', 'ISRM Suggested Methods'),
  JSON_ARRAY('فحص مقاومة الضغط أحادي المحور للصخور (UCS)', 'تحديد معامل الجودة الصخرية (RQD) والتشققات', 'اختبارات متانة الصخور ضد التجوية (Slake Durability)', 'تقييم صلاحية أحجار المحاجر للردم والركام'),
  'Pickaxe',
  '/uploads/user_provided/mining_testing.jpeg'
),
(
  'shoring-dewatering',
  'التدعيم ونزح المياه الجوفية',
  'Shoring & Dewatering Engineering',
  'تصميم وإشراف أنظمة سند جوانب الحفر العميقة، وحلول خفض المياه الجوفية للمشاريع الساحلية والمواقع المعقدة.',
  'Deep excavation retaining systems, groundwater lowering engineering, and excavation stability controls.',
  'تقديم الحلول الهندسية المتكاملة لأعمال الحفر العميق في المدن والمناطق ذات المياه السطحية، متضمنة الستائر اللوحية والخوازيق المتداخلة (Secant Piles) وشبكات آبار النزح الميدانية.',
  'Shoring wall design, deep well pumping networks, and piezometer monitoring for deep basement construction.',
  JSON_ARRAY('CIRIA C760', 'DIN 4124', 'SBC 303'),
  JSON_ARRAY('تصميم نظم سند جوانب الحفر (Secant / Contiguous Piles)', 'دراسة وتصميم منظومات نزح المياه الجوفية العميقة', 'رصد ميول جوانب الحفر بمجسات الإنكلينوميتر (Inclinometer)', 'اختبارات ضخ المياه وتحديد نفاذية التربة (Permeability)'),
  'Compass',
  '/uploads/user_provided/shoring_dewatering.jpeg'
),
(
  'environmental-testing',
  'الفحوصات والدراسات البيئية',
  'Environmental Field Testing',
  'فحوصات ملوحة وتلوث التربة والمياه الجوفية بالهيدروكربونات والمعادن الثقيلة لدعم اشتراطات الامتثال البيئي.',
  'Soil & groundwater chemical screening, salinity, hydrocarbon contamination, and environmental baseline audits.',
  'تحليل العينات الميدانية كيميائياً لتقدير نسب الكبريتات والكلوريدات القابلة للذوبان، ودرجة الحموضة (pH)، ورصد أي تسريبات هيدروكربونية لحماية المنشآت الخرسانية والبيئة المحيطة.',
  'Chemical screening for aggressive soil chemicals, sulfate, chloride, and hazardous heavy metals.',
  JSON_ARRAY('EPA Test Methods', 'ASTM D516', 'ASTM D512'),
  JSON_ARRAY('تحديد محتوى الكلوريدات والكبريتات الضارة بالخرسانة', 'قياس الأس الهيدروجيني (pH) والتوصيل الكهربائي (EC)', 'فحص الملوثات العضوية والمشتقات البترولية بالتربة', 'تقييم عدوانية التربة والمياه الجوفية على أساسات المباني'),
  'Trees',
  '/uploads/user_provided/environmental_field.jpeg'
)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Seed Default Strategic Partners
INSERT INTO `partners` (`id`, `name_ar`, `name_en`, `category`, `sector_ar`, `collaboration_scope_ar`, `badge`, `logo`, `order_num`)
VALUES
('proceq', 'بروسيك السويسرية', 'Proceq Switzerland', 'consultant', 'تقنيات وفحوصات لاإتلافية', 'أنظمة الفحص غير المتلف واختبارات رادار الخرسانة والموجات فوق الصوتية.', 'شريك تقني عالمي', '/api/media/partners/proceq.png', 1),
('weber', 'ويبر سان جوبان', 'Weber Saint-Gobain', 'materials', 'مواد البناء المتطورة', 'تطوير وفحص المواد الإنشائية المتطورة والخلطات الصناعية.', 'شريك مواد بناء', '/api/media/partners/weber.png', 2),
('hilti', 'هيلتي العالمية', 'Hilti Group', 'consultant', 'أنظمة التثبيت والهندسة الميكانيكية', 'فحوصات التثبيت الإنشائي والحلول الهندسية المعتمدة.', 'شريك أنظمة هندسية', '/api/media/partners/hilti.png', 3),
('levels', 'شركة ليفلز للمقاولات', 'LEVELS Contracting', 'contractor', 'المقاولات العامة والأبراج', 'مشروع برج سيسيان القابضة والدراسات الجيوتقنية الشاملة.', 'مقاول رئيسي', '/api/media/partners/levels.png', 4),
('hesco', 'شركة هيسكو للإنشاءات', 'Hesco Construction Partner', 'contractor', 'المقاولات المتخصصة والإنشاءات', 'تنفيذ المشاريع الإنشائية ودراسات الأساسات العميقة.', 'شريك تنفيذي', '/api/media/partners/hesco.png', 5),
('mbl', 'شركة قادة البناء الحديث (MBL)', 'Modern Building Leaders (MBL)', 'contractor', 'البنية التحتية الكبرى والمشاريع الحيوية', 'فحوصات الخرسانة والأسفلت وتصميم نظم سند جوانب الحفر.', 'مقاول رئيسي Tier-1', '/api/media/partners/mbl.png', 6),
('orient_weavers', 'شركة الشرق للإنشاءات - ويفرز', 'Orient Construction - Weavers Ltd', 'contractor', 'الإنشاءات الصناعية والمصانع', 'دراسات ميكانيكا التربة وفحوصات الأساسات الثقيلة للمنشآت الصناعية.', 'مقاول منشآت صناعية', '/api/media/partners/orient_weavers.png', 7),
('abuljadayel', 'شركة أبو الجدايل للمقاولات والصيانة', 'Abuljadayel Co.', 'contractor', 'المشاريع الكبرى والتشغيل', 'اختبارات جودة الخرسانة والتربة لمشاريع البنية التحتية والمباني.', 'شريك استراتيجي', '/api/media/partners/abuljadayel.png', 8)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Seed Default Equipment Items
INSERT INTO `equipment` (`id`, `code`, `name_ar`, `name_en`, `category`, `category_name_ar`, `category_name_en`, `specs_ar`, `specs_en`, `standards`, `image`, `service_id`)
VALUES
(
  'rotary-core-rig',
  'EQ-GEO-01',
  'حفارات الجسات الهيدروليكية الآلية',
  'Hydraulic Rotary Core Drilling Rig',
  'drilling',
  'استكشاف التربة وحفر الجسات',
  'Soil Investigation & Drilling',
  JSON_ARRAY('قدرة حفر مستمر تتجاوز أعماق 80 متراً', 'منظومة استخراج العينات الصخرية المزدوجة (Double Core Barrels)', 'أخذ عينات التربة المتماسكة (Shelby Tube Samplers)'),
  JSON_ARRAY('Continuous rotary core drilling up to 80m depths', 'Double core barrel wireline recovery system', 'Shelby tube undisturbed soil samplers'),
  JSON_ARRAY('ASTM D1586', 'ASTM D2113', 'SBC 303'),
  '/uploads/equipment_fleet/rotary_core_rig.jpg',
  'geotechnical-investigation'
),
(
  'static-pile-tester',
  'EQ-PLT-01',
  'منظومة اختبار التحميل الاستاتيكي للخوازيق',
  'Static Pile Load Testing System',
  'ndt',
  'اختبارات التحميل والأساسات العميقة',
  'Deep Foundation Load Testing',
  JSON_ARRAY('قدرة تحميل هيدروليكي تصل إلى 1200 طن', 'خلايا ضغط إلكترونية معايرة مع شاشات رقمية بدقة 0.1%', 'مؤشرات قياس الهبوط المليمترية الرقمية (LVDT)'),
  JSON_ARRAY('Hydraulic jack capacity up to 1,200 metric tons', 'Calibrated electronic load cells accurate to 0.1%', 'Digital LVDT displacement gauges for settlement tracking'),
  JSON_ARRAY('ASTM D1143', 'SBC 303'),
  '/uploads/equipment_fleet/static_pile_tester.jpg',
  'geotechnical-investigation'
),
(
  'digital-compression-machine',
  'EQ-MAT-01',
  'ماكينة كسر الخرسانة الرقمية الأوتوماتيكية',
  'Automatic Digital Concrete Compression Machine',
  'materials',
  'مختبرات فحص مواد البناء والخرسانة',
  'Materials & Concrete Quality Control',
  JSON_ARRAY('سعة ضغط قياسية تصل إلى 3000 كيلو نيوتن (300 طن)', 'تحكم إلكتروني بمعدل تطبيق الحمل (Pacing Rate Controller)', 'إصدار منحنيات الإجهاد والانفعال وشهادات الكسر آلياً'),
  JSON_ARRAY('Maximum loading capacity: 3,000 kN (300 metric tons)', 'Closed-loop micro-processor pacing rate control', 'Automatic stress-strain graphing and certified digital reports'),
  JSON_ARRAY('ASTM C39', 'BS EN 12390-4', 'SASO Standards'),
  '/uploads/equipment_fleet/digital_compression_machine.jpg',
  'materials-testing'
),
(
  'gpr-radar-scanner',
  'EQ-NDT-02',
  'جهاز الرادار الأرضي لمسح الخرسانة (GPR)',
  'Concrete Ground Penetrating Radar (GPR)',
  'ndt',
  'الفحوصات غير الإتلافية وتشخيص المباني',
  'Non-Destructive Testing (NDT)',
  JSON_ARRAY('هوائي عالي التردد (2.6 جيجاهرتز) لدقة مسح تصل لعمق 80 سم', 'تحديد أقطار ومسارات حديد التسليح والكابلات مسبقة الإجهاد', 'الكشف عن الفجوات والتعشيش داخل الكتل الخرسانية ثلاثية الأبعاد'),
  JSON_ARRAY('High-frequency 2.6 GHz antenna penetrating up to 80cm depth', 'Rebar diameter, spacing, and cover depth mapping', '3D volumetric defect and subsurface cavity imaging'),
  JSON_ARRAY('ASTM D6432', 'ACI 228.2R'),
  '/uploads/equipment_fleet/gpr_radar_scanner.jpg',
  'structural-integrity'
),
(
  'total-station-survey',
  'EQ-SRV-01',
  'محطة الرصد المساحي الإلكترونية المتكاملة (Total Station)',
  'Electronic Precision Total Station',
  'surveying',
  'المسح الهندسي والجيوديسي',
  'Geodetic & Land Surveying',
  JSON_ARRAY('دقة قياس الزوايا: ثانية قوسية واحدة (1-Arcsecond Accuracy)', 'مدى قياس المسافات بدون عاكس يصل إلى 1000 متر', 'نظام تعويض المحاور الثنائي لضبط المناسيب المليمترية'),
  JSON_ARRAY('1-arcsecond angle measurement accuracy', 'Reflectorless EDM distance measurement up to 1,000m', 'Dual-axis automatic level compensation'),
  JSON_ARRAY('ISO 17123-3', 'MOMRA Survey Guidelines'),
  '/uploads/equipment_fleet/total_station_survey.jpg',
  'engineering-surveying'
)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Seed Default Projects
INSERT INTO `projects` (
  `id`, `name_ar`, `name_en`, `sector_ar`, `sector_en`, `location_ar`, `location_en`, 
  `client`, `client_ar`, `client_en`, `scope_of_work_ar`, `scope_of_work_en`, 
  `services_performed_ar`, `technical_challenges_ar`, `technical_challenges_en`, 
  `engineering_approach_ar`, `engineering_approach_en`, `tests_performed_ar`, 
  `equipment_used`, `cover_image`, `gallery`, `relevant_standards`, `related_service_id`
)
VALUES
(
  'cgl-proj-001',
  'مشروع فحص تربة وأساسات برج سيسيان القابضة',
  'Cecean Holding Tower Geotechnical & Foundation Investigation',
  'الأبراج والمباني الشاهقة',
  'High-Rise Towers & Commercial Developments',
  'المملكة العربية السعودية، جدة',
  'Jeddah, Kingdom of Saudi Arabia',
  'شركة ليفلز للمقاولات العامة (LEVELS)',
  'شركة ليفلز للمقاولات العامة (LEVELS)',
  'LEVELS General Contracting',
  'استكشاف شامل للتربة لبرج تجاري شاهق، حفر جسات عميقة حتى 50 متراً واختبارات التحميل الساكن للخوازيق لتحديد قدرة التحمل والتوصيات الإنشائية.',
  'Comprehensive geotechnical borehole drilling up to 50m and static pile load testing for high-rise commercial development.',
  JSON_ARRAY('حفر جسات استكشافية عميقة بعمق 50 متراً', 'اختبار التحميل الاستاتيكي للخوازيق حتى حمل 1000 طن', 'تحديد قدرة تحمل التربة وتوصيات الأساسات وفق SBC 303'),
  'وجود طبقات حجر جيري متكهف ومنسوب مياه جوفية مرتفع قرب الساحل.',
  'Cavity-prone coralline limestone strata and shallow saline groundwater table.',
  'استخدام حفارات الجسات الهيدروليكية الآلية وأخذ عينات صخرية مستمرة مع فحص التحميل الساكن.',
  'Continuous rotary core drilling and calibrated 1,000-ton static reaction beam load testing.',
  JSON_ARRAY('Standard Penetration Test (SPT)', 'Unconfined Compressive Strength (UCS)', 'Static Pile Load Test ASTM D1143'),
  JSON_ARRAY('حفارات الجسات الهيدروليكية الآلية', 'منظومة اختبار التحميل الاستاتيكي 1000 طن', 'محطة الرصد الشاملة Total Station'),
  '/api/media/projects/pile_load_testing_reaction.jpg',
  JSON_ARRAY('/api/media/projects/pile_load_testing_reaction.jpg', '/uploads/projects_images/project_688d08b6e73ee4.36242119.jpg'),
  JSON_ARRAY('SBC 303', 'ASTM D1143', 'ASTM D1586'),
  'geotechnical-investigation'
),
(
  'cgl-proj-002',
  'مشروع ضبط الجودة والفحوصات اللاإتلافية لمجمع لوجستي',
  'Industrial Logistics Complex Quality Control & NDT Audits',
  'المنشآت الصناعية والمستودعات',
  'Industrial & Logistics Facilities',
  'المملكة العربية السعودية، رابغ',
  'Rabigh, Kingdom of Saudi Arabia',
  'شركة الشرق للإنشاءات (Orient Weavers Ltd)',
  'شركة الشرق للإنشاءات (Orient Weavers Ltd)',
  'Orient Construction - Weavers Ltd',
  'ضبط جودة الخرسانة والخلطات الأسفلتية ومسح راداري لأرضيات المستودعات الثقيلة واختبارات التحميل.',
  'Concrete compressive quality control, asphalt paving testing, and GPR concrete floor scanning.',
  JSON_ARRAY('اختبارات مقاومة الضغط للخرسانة الجاهزة', 'المسح الراداري للأرضيات الصناعية (GPR)', 'فحص الكثافة الحقلية وطبقات الأساس'),
  'مساحات شاسعة من الأرضيات الخرسانية المعرضة لأحمال رافعات شوكية ثقيلة تستلزم فحصاً لاإتلافياً دقيقاً.',
  'Massive heavy-duty slabs subjected to continuous dynamic forklift traffic.',
  'نشر فرق الفحص غير الإتلافي بأجهزة GPR والموجات فوق الصوتية ومطابقة كود SBC 304.',
  'Multi-point ultrasonic pulse testing and non-destructive GPR slab inspection.',
  JSON_ARRAY('Concrete Compressive Strength ASTM C39', 'GPR Slab Scanning', 'Field Density Sand Cone Test'),
  JSON_ARRAY('ماكينة كسر الخرسانة الرقمية 300 طن', 'جهاز الرادار الأرضي GPR', 'مطرقة شميدت الرقمية'),
  '/uploads/projects_images/project_688d0f1061e875.99060450.jpg',
  JSON_ARRAY('/uploads/projects_images/project_688d0f1061e875.99060450.jpg'),
  JSON_ARRAY('SBC 304', 'ASTM C39', 'ASTM C805'),
  'materials-testing'
)
ON DUPLICATE KEY UPDATE `id` = `id`;
