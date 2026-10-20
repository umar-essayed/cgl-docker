# CGL Enterprise Web Platform

An institutional digital portal and engineering showcase developed for **Creative Geotechnical Laboratories (CGL)** — an accredited geotechnical investigation, pile testing, materials quality control, and digital surveying firm headquartered in Jeddah, Saudi Arabia, affiliated with **CGI Global (USA & KSA)**.

Built on **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS**, this platform delivers sub-second localized page transitions, architectural-grade visual hierarchy, and real-time synchronization with headless operational backends.

---

## Technical Highlights

- **Bilingual Route Architecture (`/ar` & `/en`)**: Zero-flash locale resolution powered by Next.js proxy middleware, dynamic dictionary evaluation (`src/lib/i18n.ts`), and bidirectional layout geometry (`dir="rtl"` / `dir="ltr"`).
- **Dual Architectural Theme System**:
  - **Cinematic Obsidian Dark** (Carbon `#000000` & `#0a0a0a` canvases with precision `#3b76b3` blueprint accents).
  - **Sokari Off-White Architectural Light** (`#FBF9F5` natural stone backdrop, `#18181B` slate typography, and `#E6DFD3` micro-borders).
  - Governed by zero-latency pre-hydration detection and real-time administrator toggle override.
- **Watermark-Free Geotechnical GIS Subsystem**: High-detail Leaflet mapping engine utilizing OpenStreetMap tiles with custom dark-inversion matrix styling (`.cgl-dark-tiles`). Features a pulsing CGL headquarters marker with single-finger touch-drag locking for uninterrupted mobile page traversal.
- **Interactive RFQ Procurement Funnel**: Step-by-step engineering quotation builder capturing soil testing parameters, borehole quantities, project coordinates, and client specifications directly into Firestore.
- **Dynamic Equipment & Case Study Repositories**: Real-time categorized showcase of field rigs, compression testing machines, and milestone civil projects across the Kingdom.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16.3+](https://nextjs.org/) (App Router, Server Components, Turbopack) |
| **Runtime & UI** | [React 19](https://react.dev/), [TypeScript 5+](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS, Custom CSS Variables |
| **Animation Engine** | [Framer Motion 13](https://www.framer.com/motion/) (Hardware-accelerated viewport transitions) |
| **Database & CMS** | [Google Cloud Firestore](https://firebase.google.com/), Firebase Admin SDK |
| **Media & Storage** | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) / S3-Compatible Storage Pipeline |
| **GIS / Mapping** | [Leaflet 1.9](https://leafletjs.com/) with Custom CSS Matrix Tile Filters |
| **Typography** | Cairo & El Messiri (Google Fonts Variable) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## Directory Architecture

```text
cgl/
├── public/
│   ├── assets/              # Brand vectors, partner SVG marks, and UI iconography
│   ├── uploads/             # Curated engineering photography & project case studies
│   ├── og-image.png         # High-resolution OpenGraph preview (1200x630)
│   └── favicon.ico          # Multi-resolution browser favicons
├── src/
│   ├── app/
│   │   ├── [lang]/          # Localized application shell (/ar and /en routes)
│   │   │   ├── layout.tsx   # Root document metadata, font injection & providers
│   │   │   ├── page.tsx     # Institutional landing portal
│   │   │   ├── about/       # Corporate profile, vision & engineering credentials
│   │   │   ├── news/        # Geotechnical publications catalog & detail views
│   │   │   ├── projects/    # Civil projects & testing evidence catalog
│   │   │   └── rfq/         # Engineering tender & quotation portal
│   │   ├── api/             # Internal serverless endpoints (data, media, RFQ submission)
│   │   ├── globals.css      # Design tokens, theme variables, and scrollbar architecture
│   │   └── proxy.ts         # Edge locale negotiator & URL preservation middleware
│   ├── components/
│   │   ├── home/            # Modular landing page slices (Hero, Equipment, Partners, Map)
│   │   ├── navbar/          # Adaptive header with scroll detection & language switch
│   │   ├── footer/          # Corporate credentials, contact channels, and legal notices
│   │   ├── map/             # Interactive Leaflet dark location map component
│   │   └── ui/              # Reusable atomic controls (buttons, badges, inputs)
│   └── lib/
│       ├── data.ts          # Static baseline specifications & fallback datasets
│       ├── firebase.ts      # Client Firebase instance initialization
│       ├── firebaseAdmin.ts # Privileged Firestore Admin instance
│       ├── i18n.ts          # Bilingual dictionary registry & translation resolution
│       ├── r2.ts            # S3/R2 presigned URL and asset resolution client
│       └── types.ts         # TypeScript interfaces & domain models
├── next.config.mjs          # Edge routing rules, remote image domains, and headers
├── tailwind.config.ts       # Color scales, font families, and container breakpoints
└── tsconfig.json            # Path alias configurations (@/*)
```

---

## Environment Configuration

Create a `.env.local` file in the project root containing the following parameters:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Firebase Admin SDK (Server-Side)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudflare R2 / S3 Object Storage
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-access-key-id"
R2_SECRET_ACCESS_KEY="your-secret-access-key"
R2_BUCKET_NAME="cgl-media"
R2_PUBLIC_URL="https://media.creativegeotechnical.com.sa"

# Cache Revalidation Secret
REVALIDATE_SECRET="your-revalidate-token"
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or later (LTS recommended)
- **Package Manager**: `npm` (v10+) or `pnpm`

### 2. Installation
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000). The proxy middleware will automatically direct you to `/ar` based on default preferences.

### 4. Production Build & Verification
```bash
npm run build
npm run start
```

---

## Engineering Standards Compliance

The platform's technical documentation and test classification schemas strictly adhere to:
- **Saudi Building Code**: SBC 303 (Soil & Foundations) & SBC 304 (Concrete Structures)
- **ASTM International**: ASTM D1143 (Pile Load Testing), ASTM D1586 (Standard Penetration Test), ASTM C39 (Compressive Strength of Concrete Cylinders)
- **AASHTO / ACI**: Pavement and structural inspection guidelines

---

## License & Credits

All rights reserved © **Creative Geotechnical Laboratories (CGL)**.  
Unauthorized distribution, replication, or modification of the source code and associated assets is strictly prohibited.

**Developed by EIRA SOLUTIONS**
