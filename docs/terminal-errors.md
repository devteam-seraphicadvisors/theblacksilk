# Terminal Errors Analysis & Resolution Plan

**Terminal Source:** `@[TerminalName: node, ProcessId: 23340]`  
**Date:** October 9, 2026  
**Project:** The Black Silk (`dev` branch)  

---

## 1. Summary of Identified Issues

From the terminal buffer logs during client navigation across public routes (`/community/directory`, `/events/upcoming`, `/events/past`, `/events/[slug]`, `/knowledge-hub/blog`, `/knowledge-hub/newsletter`, `/careers/jobs`, `/careers/mentorship`), four distinct categories of errors and warnings were identified:

| # | Issue Description | Location / Route | Severity | Root Cause |
|---|-------------------|------------------|----------|------------|
| **1** | Missing `data-scroll-behavior="smooth"` warning | Next.js Transition / `app/layout.tsx` | Warning | Next.js requires explicit `data-scroll-behavior="smooth"` attribute on `<html>` to safely manage route transition scrolling. |
| **2** | Public API 302 redirects to `/login` & `<!DOCTYPE` JSON parse errors | `proxy.ts`, `/community/directory`, `/knowledge-hub/newsletter`, `/careers/jobs`, `/careers/mentors` | Critical Error | `proxy.ts` middleware `publicRoutes` array did not include public `/api/*` endpoints. Requests were intercepted by NextAuth and redirected with 302 to `/login`, returning HTML instead of JSON. |
| **3** | React `Each child in a list should have a unique "key" prop` warning | `app/events/upcoming/page.tsx`, `app/events/past/page.tsx` | Warning | Pages referenced `e.category` which does not exist in the Prisma `Event` model (the schema defines `eventType`). This created `[ "All", undefined ]`, giving React `key={undefined}`. |
| **4** | Hashnode API `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` | `lib/hashnode.ts`, `/knowledge-hub/blog` | Error | `getHashnodePosts` did not validate HTTP response status (`response.ok`) or `Content-Type: application/json` before calling `response.json()`. When Hashnode returned an HTML error/challenge, JSON parsing crashed. |

---

## 2. Detailed Error Breakdown

### Issue 1: Next.js Smooth Scrolling Warning
```
To disable smooth scrolling during route transitions, add data-scroll-behavior="smooth" to your <html> element. Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior
```
* **Trigger:** Route transitions on the client side when CSS has `html { scroll-behavior: smooth; }`.
* **Impact:** Next.js logs a console warning on page loads.
* **Fix:** Add `data-scroll-behavior="smooth"` to the `<html>` element in `app/layout.tsx`.

---

### Issue 2: Public API Endpoints Intercepted by Auth Middleware
```
GET /api/auth/signin?callbackUrl=%2Fapi%2Fcommunity%2Fdirectory 302
GET /login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcommunity%2Fdirectory 200
[browser] Error fetching members: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON (app/community/directory/page.tsx:190:15)

GET /api/auth/signin?callbackUrl=%2Fapi%2Fknowledge-hub%2Fnewsletter-issues 302
[browser] Failed to fetch newsletter issues: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON (app/knowledge-hub/newsletter/page.tsx:76:17)

GET /api/auth/signin?callbackUrl=%2Fapi%2Fcareers%2Fjobs 302
[browser] Error fetching jobs: Error: Server returned an invalid response. Please try again later. (app/careers/jobs/page.tsx:135:17)

GET /api/auth/signin?callbackUrl=%2Fapi%2Fcareers%2Fmentors 302
[browser] Error fetching mentors: Error: Server returned an invalid response. Please try again later. (app/careers/mentorship/page.tsx:167:17)
```
* **Trigger:** Client components fetching data from public APIs (`/api/community/directory`, `/api/careers/jobs`, `/api/careers/mentors`, `/api/knowledge-hub/newsletter-issues`).
* **Impact:** 
  - Directory shows empty/broken state.
  - Newsletter archives fail to display.
  - Job board and Mentorship pages throw error toasts.
* **Root Cause:**
  In `proxy.ts`, `publicRoutes` contained page paths like `/community` and `/careers`, but NextAuth's `authorized` callback checked `pathname === route || pathname.startsWith(route + "/")`. Because the API calls start with `/api/`, they were flagged as unauthorized and redirected to `/login`.
* **Fix:**
  1. Add public API paths to `publicRoutes` in `proxy.ts`:
     - `/api/community`
     - `/api/careers`
     - `/api/knowledge-hub`
     - `/api/newsletter`
     - `/api/events`
     - `/api/publications`
     - `/api/committees`
     - `/api/stats`
  2. For protected API routes (`/api/user/*`, `/api/admin/*`), ensure middleware returns `{ status: 401 }` JSON rather than redirecting to the HTML login page.

---

### Issue 3: React Missing Key Prop in Events Pages
```
Each child in a list should have a unique "key" prop. See https://react.dev/link/warning-keys for more information.
```
* **Trigger:** Rendering `/events/upcoming` and `/events/past`.
* **Root Cause:**
  Both pages computed category filters as:
  ```ts
  const categories = [
    "All",
    ...Array.from(new Set(upcomingEvents.map((e) => e.category))),
  ];
  ```
  In `prisma/schema.prisma`, the `Event` model does not contain a `category` property; the attribute is named `eventType`. As a result, `e.category` was `undefined`, producing `[ "All", undefined ]`. In JSX, `{categories.map(category => <Button key={category}>)}` passed `key={undefined}`.
* **Fix:**
  - Change `e.category` to `e.eventType`.
  - Filter out undefined or empty values: `.filter((c): c is string => Boolean(c && c.trim()))`.
  - Provide a fallback key: `key={category || index}`.
  - Update event cards in `app/events/upcoming/page.tsx` and `app/events/past/page.tsx` to reference `event.eventType || "Event"` instead of `event.category`.

---

### Issue 4: Hashnode Blog Integration JSON Parse Failure
```
Error fetching Hashnode posts: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
    at JSON.parse (<anonymous>)
```
* **Trigger:** Server rendering `/knowledge-hub/blog`.
* **Root Cause:**
  `lib/hashnode.ts` directly called `response.json()` on the response from Hashnode GraphQL without checking `response.ok` or `response.headers.get("content-type")?.includes("application/json")`. When Hashnode returns an HTML error (due to invalid credentials or upstream challenge), JSON parsing fails.
* **Fix:**
  - Validate `response.ok` and content-type before attempting JSON parsing in `lib/hashnode.ts`.
  - Add fallback curated publications from the database or static articles so `/knowledge-hub/blog` and `/knowledge-hub/blog/[slug]` remain fully functional.

---

## 3. Resolution Plan & Checklist

- [x] **Step 1: Fix Next.js Smooth Scrolling in `app/layout.tsx`**
  - Added `data-scroll-behavior="smooth"` attribute to `<html ...>` in `app/layout.tsx`.
  - *Status:* Verified. Eliminates Next.js route transition scrolling warning.

- [x] **Step 2: Update `proxy.ts` Middleware to Allow Public API Endpoints**
  - Added `/api/community`, `/api/careers`, `/api/knowledge-hub`, `/api/newsletter`, `/api/events`, `/api/publications`, `/api/committees`, and `/api/stats` to `publicRoutes`.
  - Added explicit JSON 401 handling for protected API routes to guarantee no API fetch ever receives a 302 redirect to an HTML login page.
  - *Status:* Verified. `/api/community/directory`, `/api/careers/jobs`, `/api/careers/mentors`, `/api/knowledge-hub/newsletter-issues` now return HTTP `200 application/json` directly.

- [x] **Step 3: Fix Event Category Fields and Missing Keys in `app/events/upcoming` and `app/events/past`**
  - Updated category aggregation from `e.category` (undefined) to `e.eventType`, filtering out empty values.
  - Added safe fallback keys `key={category || "cat-" + index}` to all rendered category buttons.
  - Updated cards in `app/events/upcoming/page.tsx` and `app/events/past/page.tsx` to display `event.eventType || "Event"` instead of `event.category`.
  - Added unique keys to `speakers` and `timeline` in `app/events/[slug]/page.tsx`.
  - *Status:* Verified. No missing key warnings on `/events/upcoming`, `/events/past`, or `/events/[slug]`.

- [x] **Step 4: Harden Hashnode Fetch with Content-Type Verification and Fallback in `lib/hashnode.ts`**
  - Added `response.ok` check and `response.headers.get("content-type")?.includes("application/json")` check prior to calling `response.json()`.
  - Added fallback curated legal tech and policy articles when Hashnode is unavailable or credentials are placeholders.
  - Added safe tag keys in `app/knowledge-hub/blog/page.tsx`.
  - *Status:* Verified. `/knowledge-hub/blog` returns HTTP 200 with zero JSON syntax errors.

- [x] **Step 5: Verify all affected pages**
  - Tested:
    - `/api/community/directory` -> `200 application/json`
    - `/api/careers/jobs` -> `200 application/json`
    - `/api/careers/mentors` -> `200 application/json`
    - `/api/knowledge-hub/newsletter-issues` -> `200 application/json`
    - `/events/upcoming` -> `200 text/html`
    - `/events/past` -> `200 text/html`
    - `/events/colloquy-on-artificial-intelligence-with-ray-sharma-and-kps-kohli` -> `200 text/html`
    - `/knowledge-hub/blog` -> `200 text/html`
    - `/community/directory` -> `200 text/html`
    - `/careers/jobs` -> `200 text/html`
    - `/careers/mentorship` -> `200 text/html`
    - `/knowledge-hub/newsletter` -> `200 text/html`
  - *Status:* All 12 endpoints and routes tested and fully functional.
