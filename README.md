# The Black Silk — Legal, Tech & Policy Network Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

**The Black Silk** is a premier digital platform connecting legal practitioners, technology leaders, policy makers, and academics. The platform provides a dynamic ecosystem for committee collaboration, specialized practice development, event registrations, membership management, mentorship, career opportunities, and thought leadership publishing.

---

## 🌟 Key Features

### 🔐 1. Authentication & Security
- **NextAuth.js Integration**: Multi-provider authentication supporting Credentials (email/password) and Google OAuth 2.0.
- **Two-Factor Authentication (2FA / MFA)**: Built-in TOTP support with QR code scanning powered by `otplib` and `qrcode`.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions separating standard members and administrators.
- **Session & Security Auditing**: Real-time session monitoring and security audit logs in the admin dashboard.

### 🏛️ 2. Committees & Special Interest Groups
- **Specialized Committees**: Emerging Tech & AI, Cyber Security & Privacy, Tech Governance, and Corporate Practice Development.
- **Member Application & Review**: Integrated application portal for joining specialized committees with administrative review workflow.
- **Internal Committee Hub**: Dynamic focus area tracking, leadership team highlights, custom events, and publications.

### 🎟️ 3. Event Management & Ticketing
- **Event Catalog**: Browse upcoming and past symposia, roundtables, and workshops with virtual vs. in-person location details.
- **Seamless Checkout**: Direct Stripe Payment Gateway integration for early-bird and regular event registration tickets.
- **Rich Event Metadata**: Interactive agendas, speaker showcases, and embedded YouTube session recordings.

### 💳 4. Tiered Membership & Payments
- **Membership Plans**: Multi-tier membership options (Individual, Institutional, Student, and Patron).
- **Dual Payment Gateway**: Production support for both **Stripe** and **Razorpay** checkout workflows.
- **Automated Verification**: Automated status updates and member badge assignment upon successful payment.

### 💼 5. Career & Mentorship Network
- **Job Board**: Portal for legal-tech opportunities with application tracking.
- **Mentorship Matching**: Direct mentor-mentee connect requests with expertise categorization.

### 📚 6. Knowledge Hub & Content Management
- **Hashnode Integration**: Headless GraphQL API integration for fetching articles and blog posts directly from Hashnode publications.
- **Fact Sheets & Newsletters**: Structured repository of legal-tech fact sheets and downloadable newsletter archives.

### ⚡ 7. Real-Time Communication
- **Pusher WebSocket Integration**: Real-time channels for committee broadcasts, messaging, and system updates.

### 🛠️ 8. Administration Suite (`/admin`)
- **Dashboard Analytics**: Platform-wide metrics for users, subscriptions, applications, and revenue.
- **Management Portals**: Full CRUD management for Users, Committees, Events, Job Listings, Mentors, Newsletters, and System Settings.
- **Database & System Maintenance**: Built-in tools for database health tracking, cache clearance, and security log inspection.

---

## 🛠️ Tech Stack

### Core Framework & Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, React Server Components)
- **UI Library**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/), `clsx`, `tailwind-merge`, `tailwindcss-animate`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/) (Accordion, Dialog, Dropdown, Tabs, Toast, etc.)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data Viz**: [Recharts](https://recharts.org/)

### Backend, Database & Auth
- **Database**: PostgreSQL (Hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma ORM 6](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/), `bcryptjs`, `@auth/core`
- **MFA / TOTP**: `otplib`, `qrcode`
- **Package Manager**: `npm`

### Payments & Real-Time
- **Payments**: [Stripe SDK](https://stripe.com/), [Razorpay SDK](https://razorpay.com/)
- **WebSockets**: [Pusher JS](https://pusher.com/) & `pusher` server SDK
- **Blog Integration**: Hashnode GraphQL API

---

## 📁 Project Structure

```
blacksilkwebsite/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login, Register, MFA routes
│   ├── admin/                  # Comprehensive Admin Control Suite
│   ├── api/                    # REST API Endpoints (Auth, Payments, Events, etc.)
│   ├── community/              # Committees, Directory, Membership pages
│   ├── dashboard/              # User Dashboard & Profile settings
│   ├── events/                 # Events listing, registration, checkout
│   ├── knowledge-hub/          # Blog, Fact Sheets, Newsletters
│   ├── layout.tsx              # Root layout with ThemeProvider & Providers
│   └── page.tsx                # Homepage featuring Hero, Stats, Committees, CTA
├── components/                 # Reusable UI & Layout Components
│   ├── admin/                  # Admin form inputs & specialized fields
│   ├── committees/             # Committee application dialogs & forms
│   ├── ui/                     # Radix UI primitives & styled components
│   └── navbar.tsx / footer.tsx # Main application navigation elements
├── data/                       # Static JSON datasets (Leadership, Committees)
├── lib/                        # Utility Functions & Client Modules
│   ├── auth.ts                 # NextAuth configuration & helper methods
│   ├── prisma.ts               # Prisma ORM client instance
│   ├── stripe.ts               # Stripe SDK helper with build-time fallbacks
│   ├── pusher.ts               # Pusher server/client instances
│   ├── hashnode.ts             # Hashnode GraphQL fetchers
│   └── utils.ts                # Tailwind class mergers and formatters
├── prisma/                     # Database Schema & Migrations
│   ├── schema.prisma           # Complete relational database models
│   └── migrations/             # SQL migration files
├── public/                     # Public assets (Images, Logos, Icons)
├── scripts/                    # Database seeding scripts
├── DATABASE_SETUP.md           # Database setup and troubleshooting guide
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory for local development, or configure these variables in your deployment environment (e.g. Vercel):

```env
# General
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Database Connection (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-example.neon.tech/neondb?sslmode=require"

# NextAuth.js Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-razorpay-secret"
RAZORPAY_WEBHOOK_SECRET="your-webhook-secret"

# Pusher Real-time Infrastructure
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="ap2"
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="ap2"

# Content Management (Hashnode Blog)
HASHNODE_PUBLICATION_HOST="theblacksilkblogs.hashnode.dev"
HASHNODE_API_TOKEN="your-hashnode-token"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🚀 Local Development Guide

### 1. Prerequisites
Ensure you have the following installed locally:
- **Node.js**: `v18.17.0` or higher
- **npm**: `v10.0.0` or higher
- **PostgreSQL**: Local PostgreSQL instance or a free cloud instance on [Neon](https://neon.tech/)

### 2. Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/devteam-seraphicadvisors/theblacksilk.git
   cd theblacksilk
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and populate the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Database & Prisma Client**:
   Push the schema to your database and generate the Prisma Client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Seed Initial Data (Optional)**:
   ```bash
   npx ts-node scripts/seed-committees.ts
   npx ts-node scripts/seed-jobs.ts
   npx ts-node scripts/seed-mentors.ts
   ```

6. **Run Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reloading |
| `npm run build` | Builds an optimized production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npx prisma studio` | Opens Prisma GUI to inspect & edit database records |
| `npx prisma db push` | Syncs schema changes directly to the database |

---

## 🌐 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to your GitHub repository.
2. Import the project into Vercel.
3. Configure the environment variables in the Vercel Dashboard under **Project Settings > Environment Variables**.
4. Set the **Build Command** to `npm run build` and **Output Directory** to `.next`.
5. Deploy! Prisma Client generation is automatically handled via the `postinstall` script in `package.json`.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
