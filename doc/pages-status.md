# The Black Silk — Page Theme & Duplicate CTA Audit Status

> **Audit Date**: 2026-10-09 (re-audit of the 2026-10-08 pass)
> **Target Theme**: Pure Black & White (`#000000`, `#ffffff`, neutral grayscale borders/typography; no colored badges like green/purple/blue/orange pills, no colored icons, no pastel/gradient backgrounds, high-contrast buttons, single global `CallToAction` rendered above footer).
> **Verification**: every public route returns 200 on the dev server, `npm run build` passes, and each changed page was checked with full-page screenshots.

---

## 1. Summary Status

| Category | Total Pages | Updated & Verified | Pending / In Progress |
| :--- | :--- | :--- | :--- |
| **Home & Core** | 1 | 1 | 0 |
| **About Section** | 5 | 5 | 0 |
| **Community Section** | 5 | 5 | 0 |
| **Events Section** | 6 | 6 | 0 |
| **Careers Section** | 4 | 4 | 0 |
| **Get Involved Section** | 3 | 3 | 0 |
| **Knowledge Hub** | 6 | 6 | 0 |
| **Partnerships** | 4 | 4 | 0 |
| **Community Forum** | 1 | 1 | 0 |
| **Legal** | 3 | 3 (draft copy) | Legal review of text |
| **Authentication & User Flow** | 4 | 4 | 0 |
| **Maintenance & 404** | 2 | 2 | 0 |
| **Dashboard / Admin / Onboarding** | 25+ | - | Protected / Internal |

---

## 2. Site-wide Fixes (2026-10-09)

- **Hero text invisible on ~20 pages** — `app/globals.css` default text-color rules (`.bg-white p`, `.bg-white div`, …) out-ranked Tailwind utilities, so any black hero inside `<main className="bg-white">` rendered its subtitle and eyebrow label dark gray on black. Rules now use `:where()` (zero specificity) so explicit `text-*` classes always win, and dark sections reset nested text.
- **Navbar** — "Join Us" / "Login" buttons, mobile menu, and search inputs converted from rounded slate (`btn-primary`) to square black.
- **Footer** — added a "Get Involved" column (Volunteer, Partner With Us, Sponsorship, Contact Us); these pages were previously unreachable from navigation.
- **Sitemap** — `app/sitemap.ts` rewritten to list only real public routes (previously listed ~15 non-existent URLs such as `/advocacy/*`, `/auth/login`, `/careers/internships`).
- **Legal pages** — `/privacy`, `/terms`, `/cookies` created (were 404 but linked from the footer and payment page). Shared layout in `components/legal-page.tsx`.

---

## 3. Detailed Page Tracking

### A. Home & Core
- [x] `/` (`app/page.tsx`) — **Completed**
  - **Theme**: Pure Black & White hero, sharp monochrome typography and cards.
  - **Duplicate CTA**: Removed redundant local CTA; single global CTA active above footer.

---

### B. About Section
- [x] `/about` (`app/about/page.tsx`) — **Completed**
- [x] `/about/mission` (`app/about/mission/page.tsx`) — **Completed**
- [x] `/about/leadership` (`app/about/leadership/page.tsx`) — **Completed** (hover shadow replaced with border hover)
- [x] `/about/approach` (`app/about/approach/page.tsx`) — **Completed**
- [x] `/about/impact` (`app/about/impact/page.tsx`) — **Completed**
  - All five: hero subtitle/eyebrow visibility fixed by the `globals.css` change; single global CTA.

---

### C. Community Section
- [x] `/community/membership` (`app/community/membership/page.tsx`) — **Completed**
- [x] `/community/membership/payment` (`app/community/membership/payment/page.tsx`) — **Completed 2026-10-09**
  - **Theme**: Removed gradient card headers, rounded corners, shadows, green/blue info boxes; monospace labels, square inputs, black pay button.
- [x] `/community/committees` (`app/community/committees/page.tsx`) — **Completed** (hover shadows removed)
- [x] `/community/committees/[slug]` (`app/community/committees/[slug]/page.tsx`) — **Completed 2026-10-09**
  - **Theme**: Gray gradient hero replaced with black overlay; 27 rounded corners and 15 shadows removed; green badge converted; outline buttons squared.
  - **Bug fixes**: "Contact Chair" hero button was invisible (white text on the outline variant's white background). `ApplicationDialog` ignored its `triggerButton` prop, so the hero showed a full-width rounded button instead of "Join Committee".
  - **Application form** (`components/committees/application-form.tsx`, dialog): fields, labels, checkboxes, buttons converted.
- [x] `/community/directory` (`app/community/directory/page.tsx`) — **Completed** (hover shadows removed)

---

### D. Events Section (Combined Events & Podcasts)
- [x] `/events` (`app/events/page.tsx`) — **Completed & Combined**
  - Sub-routes `/events/upcoming`, `/events/past`, and `/events/[slug]` redirect to `/events` sections.
- [x] `/events/upcoming` — **Redirects to `/events#upcoming`**
- [x] `/events/past` — **Redirects to `/events#past`**
- [x] `/events/[slug]` — **Redirects to `/events`**
- [x] `/events/[slug]/register` (`app/events/[slug]/register/page.tsx`) — **Completed** (radio buttons were navy; now black. Red is kept for validation errors only.)
- [x] `/events/[slug]/register/success` — **Completed**

---

### E. Careers Section
- [x] `/careers/jobs` (`app/careers/jobs/page.tsx`) — **Completed**
- [x] `/careers/jobs/[id]` (`app/careers/jobs/[id]/page.tsx`) — **Completed** (not-found/error state restyled)
- [x] `/careers/jobs/[id]/apply` (`app/careers/jobs/[id]/apply/page.tsx`) — **Completed** (error state restyled; red icon → black)
- [x] `/careers/mentorship` (`app/careers/mentorship/page.tsx`) — **Completed**

---

### F. Get Involved Section — **Rebuilt 2026-10-09**
Previously only the hero had been converted; the page bodies used undefined legacy classes (`gradient-navy`, `shadow-brand`, `bg-brand-gold-600`, `text-text-primary`, `font-heading`, `bg-surface-primary`), which rendered white icons on white tiles (invisible) and unstyled headings.
- [x] `/get-involved/contact` (`app/get-involved/contact/page.tsx`) — **Completed**
  - **FAQ (2026-10-10)**: Static FAQ cards in the side column replaced with a full-width accordion section matching `/community/membership` (single-open, square items, black border when open). FAQPage JSON-LD unchanged.
- [x] `/get-involved/partnerships` (`app/get-involved/partnerships/page.tsx`) — **Completed**
- [x] `/get-involved/volunteer` (`app/get-involved/volunteer/page.tsx`) — **Completed**
  - All three: black icon tiles, serif headings, square bordered cards, monospace form labels, square inputs, black/outline buttons, monochrome badges and checkboxes.

---

### G. Knowledge Hub
- [x] `/knowledge-hub` (`app/knowledge-hub/page.tsx`) — **Completed**
- [x] `/knowledge-hub/blog` (`app/knowledge-hub/blog/page.tsx`) — **Completed**
- [x] `/knowledge-hub/blog/[slug]` (`app/knowledge-hub/blog/[slug]/page.tsx`) — **Completed** (loading skeleton squared)
- [x] `/knowledge-hub/fact-sheets` (`app/knowledge-hub/fact-sheets/page.tsx`) — **Completed**
- [x] `/knowledge-hub/fact-sheets/[id]` (`app/knowledge-hub/fact-sheets/[id]/page.tsx`) — **Completed**
- [x] `/knowledge-hub/newsletter` (`app/knowledge-hub/newsletter/page.tsx`) — **Completed**

---

### H. Partnerships Section — **Converted 2026-10-09**
Previously still contained blue/purple buttons and focus rings, green checkmarks, purple-to-blue gradient cards, a yellow crown icon, rounded corners, and heavy shadows.
- [x] `/partnerships/sponsor` (`app/partnerships/sponsor/page.tsx`) — **Completed**
- [x] `/partnerships/global-sponsor` (`app/partnerships/global-sponsor/page.tsx`) — **Completed**
- [x] `/partnerships/allied-organizations` (`app/partnerships/allied-organizations/page.tsx`) — **Completed**
- [x] `/partnerships/conference-sponsorship` (`app/partnerships/conference-sponsorship/page.tsx`) — **Completed**
  - Shared sidebar (`components/partnership-sidebar.tsx`): blue info box and badges converted.

---

### I. Community Forum, Auth & User Flow
- [x] `/forum` (`app/forum/page.tsx`) — **Completed 2026-10-09** (blue pin / green trending icons → black; cards, inputs, buttons squared)
- [x] `/login` (`app/login/page.tsx`) — **Completed**
- [x] `/register` (`app/register/page.tsx`) — **Completed**
- [ ] `/onboarding` (`app/onboarding/page.tsx`) — **Protected (requires login); not re-audited.** Inputs/badges still use default rounded styling.
- [x] `/membership/success` (`app/membership/success/page.tsx`) — **Completed**

---

### J. Legal — **Created 2026-10-09**
- [x] `/privacy` (`app/privacy/page.tsx`)
- [x] `/terms` (`app/terms/page.tsx`)
- [x] `/cookies` (`app/cookies/page.tsx`)
  - **Status**: Layout complete. **Text is a draft** based on what the code actually does (accounts, Google sign-in, Stripe/Razorpay, Google Analytics, session cookies). It must be reviewed by leadership / legal counsel before launch (see `content.md` §8). No retention periods, refund windows, or grievance-officer details have been invented.

---

### K. Maintenance, 404 & Utilities
- [x] `/maintenance` (`app/maintenance/page.tsx`) — **Completed** (rounded pill, rounded panels, and shadows squared)
- [x] 404 (`app/not-found.tsx`) — **Completed 2026-10-09** (serif heading, square black/outline buttons)
- [x] `/membership` (`app/membership/page.tsx`) — Redirect to `/community/membership`.

---

## 4. Open Items Before Launch

1. **Legal text review** — `/privacy`, `/terms`, `/cookies` copy is a draft.
2. **Unknown URLs redirect to `/login`** instead of showing the 404 page, because `proxy.ts` treats every path not in `publicRoutes` as protected.
3. **Contact details are inconsistent** — footer shows `info@blacksilk.org` / `+91 11 1234 5678`; contact page shows `info@theblacksilk.org` / `+91 11 4567 8900`.
4. **Missing images** — `/images/office-*.jpg` (contact), several partner/success-story logos, and volunteer-story avatars return 404.
5. **Unused components** — `components/latest-content.tsx`, `components/feature-cards.tsx`, `components/committees/page.tsx` are not imported anywhere and still contain off-theme styles.
