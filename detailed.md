# The Black Silk — Comprehensive Project Documentation & Architecture Guide

> **Platform Overview**: The Black Silk is an enterprise-grade digital platform connecting legal practitioners, technology leaders, policy makers, and academics. It serves as an ecosystem for committee collaboration, specialized legal-tech practice development, event registrations, membership management, mentorship, career opportunities, thought leadership publishing, and community discussions.

---

## 📑 Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Tech Stack & Library Mapping](#2-tech-stack--library-mapping)
3. [Design System & UI Template](#3-design-system--ui-template)
4. [Database & Data Modeling (Prisma ORM)](#4-database--data-modeling-prisma-orm)
5. [Routing, Middleware & Security Architecture](#5-routing-middleware--security-architecture)
6. [Key Features & Functional Modules](#6-key-features--functional-modules)
7. [External Integrations & Services](#7-external-integrations--services)
8. [Directory Structure](#8-directory-structure)
9. [Developer Workflow & How-To Guides](#9-developer-workflow--how-to-guides)
10. [Troubleshooting & Common Pitfalls](#10-troubleshooting--common-pitfalls)

---

## 1. High-Level Architecture

The Black Silk is built on the **Next.js 16 App Router** pattern with full-stack TypeScript, utilizing a combination of React Server Components (RSC) for performance/SEO and Client Components for rich interactions.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                            │
│  - Public Portal (Home, About, Events, Blog, Committees, Careers)      │
│  - User Dashboard (/dashboard) & Onboarding Flow (/onboarding)         │
│  - Admin Control Suite (/admin)                                        │
└───────────────────▲──────────────────────────────▲─────────────────────┘
                    │                              │ WebSockets
                    │ HTTPS Requests               │ (Real-time updates)
┌───────────────────▼──────────────────────────────│─────────────────────┐
│                          EDGE PROXY & MIDDLEWARE │                     │
│  [proxy.ts]                                      │                     │
│  - Maintenance Mode Switch & Cookie Bypass       │                     │
│  - NextAuth JWT Session Verification             │                     │
│  - Role-based Access Control (Admin vs Member)   │                     │
│  - Membership Status & Onboarding Gate           │                     │
└───────────────────┬──────────────────────────────│─────────────────────┘
                    │                              │
┌───────────────────▼──────────────────────────────▼─────────────────────┐
│                       NEXT.JS 16 APPLICATION SERVER                    │
│                                                                        │
│  ┌───────────────────────┐              ┌───────────────────────────┐  │
│  │   Server Components   │              │   API Route Handlers      │  │
│  │   & App Router Pages  │              │   (/app/api/*)            │  │
│  └───────────┬───────────┘              └─────────────┬─────────────┘  │
│              │                                        │                │
│              ▼                                        ▼                │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Core Libraries & Services                     │  │
│  │  - Auth Engine (NextAuth + Bcrypt + TOTP)                        │  │
│  │  - Prisma Client ORM                                             │  │
│  │  - Stripe & Razorpay Payment Helpers                             │  │
│  │  - Pusher Server Event Trigger                                   │  │
│  │  - Hashnode GraphQL Fetcher                                      │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            │                         │                         │
            ▼                         ▼                         ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│     Neon PostgreSQL   │ │    Payment Gateways   │ │    External APIs      │
│   (Cloud DB via SSL)  │ │   - Stripe Checkout   │ │  - Hashnode GraphQL   │
│   - Users & Auth      │ │   - Razorpay API      │ │  - Pusher Channels    │
│   - Committees/Events │ │   - Webhook Handlers  │ │  - Google OAuth 2.0   │
│   - Memberships/Jobs  │ └───────────────────────┘ │  - Google Analytics   │
└───────────────────────┘                           └───────────────────────┘
```

---

## 2. Tech Stack & Library Mapping

| Domain / Layer | Technology / Library | Version | Purpose & Usage in Project |
| :--- | :--- | :--- | :--- |
| **Framework** | `next` | `^16.3.0` | App Router, SSR, RSC, Turbopack, route handlers, metadata API |
| **Frontend Library** | `react`, `react-dom` | `^18.x` | Component architecture, state hooks, suspense streaming |
| **Language** | `typescript` | `^5.x` | Static typing, path aliasing (`@/*`), Prisma type inference |
| **Styling Engine** | `tailwindcss` | `^3.4.17` | Utility-first responsive CSS, brand themes, arbitrary classes |
| **CSS Utilities** | `clsx`, `tailwind-merge` | Latest | Conditional and conflict-free class combination (`cn()`) |
| **Animations** | `tailwindcss-animate` | `^1.0.7` | UI transitions, accordion collapses, modal fade-ins |
| **UI Primitives** | `@radix-ui/*` (25+ packages) | `1.x - 2.x` | Accessible headless primitives (Dialog, Dropdown, Tabs, etc.) |
| **Icons** | `lucide-react` | `^0.454.0` | Modern, consistent icon library used across all views |
| **Data Visualization** | `recharts` | `2.15.0` | Admin analytics graphs, platform metrics, revenue curves |
| **Forms & Validation** | `react-hook-form`, `zod`, `@hookform/resolvers` | Latest | Form state handling, client and server-side schema validation |
| **Carousel / Sliders** | `embla-carousel-react` | `8.5.1` | Touch/swipe compatible featured content and hero carousels |
| **OTP Input** | `input-otp` | `1.4.1` | MFA 6-digit TOTP verification token input |
| **Date Manipulation** | `date-fns` | `4.1.0` | Date formatting, relative timestamps, calendar operations |
| **Date Picker UI** | `react-day-picker` | `^9.4.3` | Event scheduling, calendar UI components |
| **Notifications** | `sonner`, `@radix-ui/react-toast` | Latest | Toast popups for user feedback, errors, and system alerts |
| **Database ORM** | `prisma`, `@prisma/client` | `6.x` | Type-safe PostgreSQL client, schema migrations, relations |
| **Database** | Neon PostgreSQL | Cloud | Hosted serverless PostgreSQL with connection pooling & SSL |
| **Authentication** | `next-auth`, `@auth/core` | `^4.24.15` | Credentials login, Google OAuth, session JWT callbacks |
| **Password Hashing** | `bcryptjs` | Latest | Salted password hashing for credentials-based accounts |
| **Two-Factor Auth** | `otplib`, `qrcode` | Latest | RFC 6238 TOTP generation, secret validation, QR code rendering |
| **Payments (International)**| `stripe` | Latest | Stripe Checkout sessions, hosted customer portal, webhooks |
| **Payments (India)** | `razorpay` | Latest | Domestic UPI, NetBanking, and Card checkout workflows |
| **Real-time WebSockets** | `pusher`, `pusher-js` | Latest | Real-time committee messages, notifications, live updates |
| **Blog & CMS** | Hashnode GraphQL API | Native Fetch | Headless blog content retrieval, post rendering, tag filtering |
| **Email Utility** | `nodemailer` | `^9.0.4` | Email dispatch for invitations, newsletters, notifications |

---

## 3. Design System & UI Template

### 🎨 Color Palette

The project adopts a sophisticated **Legal-Tech Editorial** color aesthetic anchored in **Prussian Blue** and deep monochrome accents:

- **Primary Brand Color**:
  - Prussian Blue: `#003153` (`primary.DEFAULT` / `primary-900`)
  - Accent Shades: `primary-50` (`#f0f9ff`) to `primary-800` (`#075985`)
- **Monochrome & Neutral Scale**:
  - `neutral-0` (`#FFFFFF`) — Pure White
  - `neutral-50` (`#FAFAFA`) to `neutral-200` (`#E5E5E5`) — Page backgrounds, subtle card outlines
  - `neutral-700` (`#404040`) to `neutral-1000` (`#000000`) — Text body, bold headings, dark cards
- **Status Accents**:
  - Success: `#10B981` (Emerald)
  - Warning: `#F59E0B` (Amber)
  - Error: `#EF4444` (Rose / Red)
  - Info: `#3B82F6` (Sky Blue)

### 🔤 Typography

- **Headings & Display**: `DM Serif Display` (Google Font loaded via Next.js Font Optimization in `app/layout.tsx`). Used for hero titles, section titles, and editorial headers.
- **Body & Interface**: `Inter` (Google Font loaded with Latin subsets). Used for navigation, inputs, cards, data tables, and dashboard metrics.

### 🧩 Shadcn UI Components Structure

All atomic components live under `components/ui/` and follow the shadcn convention:
- **Layout & Structure**: `card.tsx`, `separator.tsx`, `scroll-area.tsx`, `resizable.tsx`, `aspect-ratio.tsx`
- **Interactive Controls**: `button.tsx`, `dropdown-menu.tsx`, `tabs.tsx`, `accordion.tsx`, `collapsible.tsx`, `toggle.tsx`, `toggle-group.tsx`
- **Data Entry & Forms**: `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `switch.tsx`, `slider.tsx`, `calendar.tsx`, `input-otp.tsx`, `form.tsx`
- **Overlays & Dialogs**: `dialog.tsx`, `sheet.tsx`, `alert-dialog.tsx`, `popover.tsx`, `tooltip.tsx`, `hover-card.tsx`, `drawer.tsx`, `context-menu.tsx`
- **Feedback & Display**: `badge.tsx`, `avatar.tsx`, `progress.tsx`, `skeleton.tsx`, `alert.tsx`, `sonner.tsx`, `toast.tsx`, `confetti.tsx`

---

## 4. Database & Data Modeling (Prisma ORM)

The relational schema is configured in `prisma/schema.prisma` targeting PostgreSQL.

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o| MFASecret : has
    User ||--o| Membership : holds
    User ||--o{ EventRegistration : registers
    User ||--o{ CommitteeMember : participates
    User ||--o{ CommitteeApplication : submits
    User ||--o{ CommitteeMessage : sends
    User ||--o{ JobApplication : applies
    User ||--o{ MentorRequest : requests
    User ||--o{ ForumPost : authors
    User ||--o{ ForumReply : replies
    User ||--o{ UserPublication : bookmarks

    Event ||--o{ EventRegistration : receives
    Committee ||--o{ CommitteeMember : contains
    Committee ||--o{ CommitteeApplication : reviews
    Committee ||--o{ CommitteePublication : publishes
    Committee ||--o{ CommitteeEvent : hosts
    Committee ||--o{ CommitteeMessage : broadcasts

    Job ||--o{ JobApplication : receives
    Publication ||--o{ UserPublication : saved_by
```

### Key Models Breakdown

1. **Authentication & Identity**:
   - `User`: Central entity containing personal details, role (`"user"` | `"admin"`), bio, organization, social links, and MFA status.
   - `Account`: OAuth accounts (e.g., Google OAuth tokens).
   - `Session`: Database sessions for NextAuth.
   - `MFASecret`: TOTP secret storage with `isEnabled` flag.
2. **Committees & SIGs**:
   - `Committee`: Specialized groups (e.g., Emerging Tech & AI, Cyber Security). Stores leadership (Chair & Co-Chair bios, images, contacts), meeting schedules, focus areas, and activities.
   - `CommitteeMember`: Relational mapping connecting users to committees with roles.
   - `CommitteeApplication`: Membership application workflow with motivations, expertise, and admin review statuses (`pending`, `approved`, `rejected`).
   - `CommitteeEvent` & `CommitteePublication`: Group-specific sub-events and whitepapers.
   - `CommitteeMessage`: Internal committee chat feeds.
3. **Events & Ticketing**:
   - `Event`: Symposia, conferences, workshops. Stores date, location, virtual flag, speakers JSON, timeline JSON, YouTube recording URL, pricing, and ticket capacity.
   - `EventRegistration`: Tickets linked to users with status (`registered`, `attended`, `cancelled`).
4. **Memberships & Subscriptions**:
   - `Membership`: User membership tiers (Individual, Institutional, Student, Patron) with `startDate`, `endDate`, and active status.
5. **Careers & Mentorship**:
   - `Job`: Legal-tech listings, requirements, skills, urgency, salary, and status.
   - `JobApplication`: Resumes, cover letters, and review states.
   - `Mentor`: Expert profiles, ratings, specializations, session counts.
   - `MentorRequest`: Mentee session requests with goals and availability.
6. **Knowledge & Editorial**:
   - `Publication`: Whitepapers and articles with view/download counters and PDF links.
   - `FactSheet`: Downloadable technical/legal guides with page counts and ratings.
   - `Newsletter` & `NewsletterIssue`: Subscribers and periodic editorial issues.
   - `ForumPost` & `ForumReply`: Discussion board threads and replies.
7. **Direct Messaging**:
   - `Message`: Direct 1-to-1 user messaging with read status.

---

## 5. Routing, Middleware & Security Architecture

### Route Map

```
/
├── (public)
│   ├── /about
│   ├── /careers/jobs & /careers/mentorship
│   ├── /community/committees & /community/committees/[slug]
│   ├── /community/directory
│   ├── /events & /events/[slug]
│   ├── /events/upcoming & /events/past
│   ├── /knowledge-hub/blog (Hashnode)
│   ├── /knowledge-hub/fact-sheets
│   ├── /knowledge-hub/newsletter
│   ├── /forum
│   ├── /get-involved
│   ├── /partnerships
│   └── /maintenance
├── (auth)
│   ├── /login
│   └── /register
├── (protected members)
│   ├── /membership (Selection & payment)
│   ├── /onboarding (Profile completion)
│   └── /dashboard
│       ├── /dashboard/profile
│       ├── /dashboard/committees
│       ├── /dashboard/events
│       ├── /dashboard/messages
│       ├── /dashboard/publications
│       ├── /dashboard/membership
│       └── /dashboard/settings
└── (admin suite)
    └── /admin
        ├── /admin/users
        ├── /admin/committees & /admin/committee-messages
        ├── /admin/events
        ├── /admin/jobs
        ├── /admin/mentors
        ├── /admin/memberships
        ├── /admin/fact-sheets
        ├── /admin/publications
        ├── /admin/newsletter & /admin/newsletter-issues
        ├── /admin/database
        ├── /admin/security
        ├── /admin/analytics
        ├── /admin/reports
        └── /admin/system
```

### The Edge Proxy / Middleware (`proxy.ts`)

The root `proxy.ts` implements Next.js middleware using `withAuth`:

1. **Maintenance Mode Switch**:
   - If `MAINTENANCE_MODE=true`, all incoming requests to non-static assets are redirected to `/maintenance` with HTTP 307.
   - **Bypass Mechanism**: Administrators can append `?bypass=admin` or `?preview=true` to set a persistent `bypass_maintenance` cookie and access the site normally.
2. **Access Control Funnel**:
   - **Unauthenticated Users** attempting to access `/dashboard` or `/onboarding` are redirected to `/login`.
   - **Authenticated Users Without Membership** attempting to access `/dashboard` or `/onboarding` are redirected to `/community/membership`.
   - **Authenticated Users With Membership Who Haven't Completed Onboarding** are directed to `/onboarding`.
   - **Admin Protection**: Any route starting with `/admin` strictly requires `token.role === "admin"`. Non-admin users are kicked back to `/dashboard`.

---

## 6. Key Features & Functional Modules

### 1. Authentication & 2FA (`/login`, `/register`, `/api/auth`, `/api/mfa`)
- **Credentials & OAuth**: Email/password authentication using `bcryptjs` paired with Google OAuth 2.0.
- **Session Tokens**: JWT sessions enriched with `hasMembership`, `onboardingCompleted`, and `role`.
- **Two-Factor Setup**: Generates cryptographic secrets via `otplib.authenticator.generateSecret()` and outputs QR codes via `qrcode.toDataURL()`. Users verify the 6-digit code via `input-otp` before activation.

### 2. Specialized Committees (`/community/committees/[slug]`, `/api/committees`)
- Dynamic committee microsites showing mission, focus areas, Chair/Co-Chair cards, upcoming meetings, and linked publications.
- Interactive modal application form (`components/committees/application-dialog.tsx`) with instant DB record creation and admin notification.

### 3. Event Management & Ticketing (`/events`, `/api/events`, `/api/payment`)
- Displays categorized symposia, roundtables, and workshops.
- Dynamic single event views with speaker lineups, agenda timelines, and embedded YouTube session recordings.
- Stripe checkout integration for ticket purchases with automated webhook handling.

### 4. Membership Tier Management (`/community/membership`, `/api/payment/create-checkout`)
- Tiered subscriptions (Individual, Institutional, Student, Patron).
- Creates Stripe Checkout sessions in INR currency with associated user metadata.
- Updates database `Membership` record upon payment verification.

### 5. Career & Mentorship Portal (`/careers/jobs`, `/careers/mentorship`)
- Filterable legal-tech job board with direct application uploads.
- Mentor directory featuring filters for expertise, rating, and availability. Direct mentorship session request workflow.

### 6. Knowledge Hub & Content Publishing (`/knowledge-hub`)
- **Blog**: Direct headless integration with **Hashnode GraphQL API** (`https://gql.hashnode.com/`). Fetches posts, author avatars, cover images, and tags with 5-minute ISR caching.
- **Fact Sheets**: Downloadable PDF knowledge assets with download counters.
- **Newsletters**: Email subscription capture and archive reader.

### 7. Administrative Suite (`/admin`)
- Real-time platform metrics (User growth, event attendance, committee activity).
- Visual charts using `recharts` for tracking member acquisitions and engagement.
- CRUD interfaces for managing committees, events, jobs, mentors, applications, and system logs.
- Database health diagnostics and cache management.

---

## 7. External Integrations & Services

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL INTEGRATIONS                           │
├───────────────────────┬────────────────────────────────────────────────┤
│ Service               │ Purpose & Integration Details                  │
├───────────────────────┼────────────────────────────────────────────────┤
│ Neon PostgreSQL       │ Serverless cloud database hosting; connection   │
│                       │ pooled via SSL (`DATABASE_URL`).               │
├───────────────────────┼────────────────────────────────────────────────┤
│ Stripe                │ International card payments & memberships;      │
│                       │ session checkout and webhook validation.       │
├───────────────────────┼────────────────────────────────────────────────┤
│ Razorpay              │ Domestic Indian payments (UPI, Netbanking);    │
│                       │ order creation & signature verification.       │
├───────────────────────┼────────────────────────────────────────────────┤
│ Hashnode GraphQL      │ Headless blog CMS; queries publications,       │
│                       │ posts, slugs, tags via token auth.             │
├───────────────────────┼────────────────────────────────────────────────┤
│ Pusher Channels       │ WebSockets for real-time messaging, updates,   │
│                       │ and committee notifications (`ap2` cluster).   │
├───────────────────────┼────────────────────────────────────────────────┤
│ Google OAuth 2.0      │ Social sign-on via NextAuth GoogleProvider.    │
├───────────────────────┼────────────────────────────────────────────────┤
│ Google Analytics / GTM│ GA4 & GTM script integration in root layout.   │
└───────────────────────┴────────────────────────────────────────────────┘
```

---

## 8. Directory Structure

```
blacksilkwebsite/
├── app/                              # Next.js App Router (Pages & APIs)
│   ├── (auth)/                       # Auth routes
│   │   ├── login/page.tsx            # Login view (credentials + Google)
│   │   └── register/page.tsx         # Account registration view
│   ├── about/                        # About The Black Silk platform
│   ├── admin/                        # Administrative suite
│   │   ├── analytics/                # Performance analytics & metrics
│   │   ├── committees/               # Committee CRUD & application review
│   │   ├── database/                 # Database tools & health check
│   │   ├── events/                   # Event creation & ticket tracking
│   │   ├── jobs/                     # Job listings management
│   │   ├── memberships/              # Member subscription records
│   │   ├── mentors/                  # Mentor profiles & request review
│   │   ├── security/                 # Audit logs & security alerts
│   │   ├── layout.tsx                # Admin dashboard layout & sidebar
│   │   └── page.tsx                  # Main admin dashboard overview
│   ├── api/                          # REST API Endpoints
│   │   ├── admin/                    # Admin-only mutations & queries
│   │   ├── auth/[...nextauth]/       # NextAuth route handler
│   │   ├── careers/                  # Jobs & mentor endpoints
│   │   ├── committees/               # Committee list & member endpoints
│   │   ├── events/                   # Event CRUD & registration
│   │   ├── knowledge-hub/            # Fact sheet & publication APIs
│   │   ├── mfa/                      # 2FA setup & verify endpoints
│   │   ├── payment/                  # Stripe checkout & webhooks
│   │   └── user/                     # User profile, stats & activity
│   ├── careers/                      # Career portal (Jobs & Mentors)
│   ├── community/                    # Committees, Directory & Membership
│   ├── dashboard/                    # User member dashboard
│   ├── events/                       # Events catalog & single event page
│   ├── forum/                        # Community forum & discussions
│   ├── knowledge-hub/                # Blog, Fact Sheets, Newsletters
│   ├── maintenance/                  # Maintenance mode fallback page
│   ├── onboarding/                   # New member profile completion
│   ├── layout.tsx                    # Root layout with fonts, SEO & loaders
│   ├── page.tsx                      # Homepage with Hero, Stats, CTA
│   ├── robots.ts                     # Search engine crawler instructions
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/                       # Reusable React components
│   ├── admin/                        # Admin form helpers (Speakers, Timeline)
│   ├── admin-sidebar.tsx             # Collapsible admin navigation menu
│   ├── committees/                   # Application dialogs & committee forms
│   ├── ui/                           # 50+ Shadcn UI primitives (Radix)
│   ├── hero.tsx                      # Homepage hero with CTA
│   ├── navbar.tsx                    # Sticky responsive header navigation
│   ├── footer.tsx                    # Platform footer & newsletter subscribe
│   ├── stats.tsx                     # Impact numbers banner
│   ├── featured-content.tsx          # Featured articles carousel
│   └── providers.tsx                 # NextThemes & NextAuth SessionProvider
├── data/                             # Static datasets (leadership, committees)
├── hooks/                            # Custom hooks (use-toast, use-mobile)
├── lib/                              # Core utilities & singleton clients
│   ├── auth.ts                       # NextAuth options, Prisma user queries
│   ├── design-tokens.ts              # Design tokens (colors, spacing, fonts)
│   ├── hashnode.ts                   # Hashnode GraphQL query client
│   ├── json-ld.ts                    # Schema.org structured data generators
│   ├── prisma.ts                     # PrismaClient singleton instance
│   ├── pusher.ts                     # Pusher server & client initializers
│   ├── seo.ts                        # Next.js Metadata generator helper
│   ├── stripe.ts                     # Stripe SDK singleton instance
│   └── utils.ts                      # Tailwind cn() class utility
├── prisma/                           # Database configuration
│   ├── schema.prisma                 # Relational PostgreSQL data models
│   └── migrations/                   # SQL migration history
├── public/                           # Static assets, logos, icons, favicon
├── scripts/                          # Database seeding scripts (TS & SQL)
├── proxy.ts                          # Edge proxy & NextAuth middleware
├── tailwind.config.ts                # Tailwind CSS theme & plugin tokens
├── components.json                   # Shadcn UI configuration file
├── tsconfig.json                     # TypeScript compiler options
├── package.json                      # Dependencies and npm scripts
└── README.md                         # Project summary & quickstart
```

---

## 9. Developer Workflow & How-To Guides

### 1. Prerequisites
- **Node.js**: `v18.17.0+`
- **npm**: `v10.0.0+`
- **PostgreSQL**: Neon cloud instance or local PostgreSQL on port `5432`.

### 2. Environment Configuration
Create a `.env.local` file based on `.env.example`:

```env
# Application URLs
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-sample.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-strong-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Pusher
PUSHER_APP_ID="your-id"
PUSHER_KEY="your-key"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="ap2"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="ap2"

# Hashnode
HASHNODE_PUBLICATION_HOST="theblacksilkblogs.hashnode.dev"
HASHNODE_API_TOKEN="your-hashnode-token"
```

### 3. Database Sync & Seeding
```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Inspect database visually in your browser
npx prisma studio

# Seed initial database datasets
npx ts-node scripts/seed-committees.ts
npx ts-node scripts/seed-jobs.ts
npx ts-node scripts/seed-mentors.ts
```

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Common Development Recipes

#### How to Add a New Page
1. Create a folder in `app/` matching your desired route (e.g., `app/research/page.tsx`).
2. Add SEO metadata using `generateMetadata` from `@/lib/seo`:
   ```tsx
   import { generateMetadata } from "@/lib/seo";

   export const metadata = generateMetadata({
     title: "Research & Insights | The Black Silk",
     description: "Explore legal-tech whitepapers and policy briefs.",
   });

   export default function ResearchPage() {
     return <div className="container py-12">...</div>;
   }
   ```
3. If public, ensure it is added to the `publicRoutes` array in `proxy.ts`.

#### How to Add a New API Endpoint
1. Create a folder in `app/api/` (e.g., `app/api/research/route.ts`).
2. Implement your route handlers:
   ```ts
   import { NextResponse } from "next/server";
   import { prisma } from "@/lib/prisma";
   import { getServerSession } from "next-auth";
   import { authOptions } from "@/lib/auth";

   export async function GET(request: Request) {
     const data = await prisma.publication.findMany();
     return NextResponse.json(data);
   }
   ```

#### How to Add a Database Field
1. Edit `prisma/schema.prisma` to add your field.
2. Run `npx prisma db push` to synchronize with your database.
3. Run `npx prisma generate` to update the TypeScript definitions.

---

## 10. Troubleshooting & Common Pitfalls

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **`Can't reach database server at localhost:5432`** | `.env.local` has an active local `DATABASE_URL` pointing to localhost when local DB is offline. | Comment out the local line or update `DATABASE_URL` to point to your cloud Neon connection string. |
| **User stuck in redirect loop between `/dashboard` & `/membership`** | User is authenticated but does not possess an active `Membership` record in the database. | Grant a membership via `npx prisma studio` or complete the `/membership` checkout flow. |
| **User stuck in redirect loop between `/dashboard` & `/onboarding`** | User has a membership but has empty `bio`, `organization`, and `position` fields. | Fill in the onboarding form at `/onboarding` or populate user profile fields in the database. |
| **`Invalid prisma.user.findUnique() invocation`** | Prisma client out-of-sync with modified schema. | Run `npx prisma generate` and restart the Next.js dev server. |
| **Maintenance mode prevents testing** | `MAINTENANCE_MODE=true` in environment. | Append `?bypass=admin` to any URL in the browser. This sets the `bypass_maintenance` cookie for 24 hours. |
| **Hashnode posts not loading** | Missing `HASHNODE_PUBLICATION_HOST` or `HASHNODE_API_TOKEN`. | Set valid Hashnode credentials in `.env.local`. |
