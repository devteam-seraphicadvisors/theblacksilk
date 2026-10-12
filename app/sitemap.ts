import type { MetadataRoute } from "next"

type Entry = [path: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number]

// Public, indexable routes only. Login/register, dashboard, admin, API,
// payment, and redirect-only routes are excluded (see app/robots.ts).
const routes: Entry[] = [
  // Root
  ["", "daily", 1],

  // About Section
  ["/about", "monthly", 0.8],
  ["/about/mission", "monthly", 0.7],
  ["/about/approach", "monthly", 0.7],
  ["/about/leadership", "monthly", 0.7],
  ["/about/impact", "monthly", 0.7],

  // Community Section
  ["/community/membership", "monthly", 0.9],
  ["/community/committees", "weekly", 0.7],
  ["/community/directory", "weekly", 0.6],
  ["/forum", "daily", 0.6],

  // Events
  ["/events", "weekly", 0.9],

  // Knowledge Hub
  ["/knowledge-hub", "weekly", 0.8],
  ["/knowledge-hub/blog", "daily", 0.8],
  ["/knowledge-hub/fact-sheets", "weekly", 0.7],
  ["/knowledge-hub/newsletter", "weekly", 0.7],

  // Careers
  ["/careers/jobs", "weekly", 0.7],
  ["/careers/mentorship", "monthly", 0.6],

  // Get Involved & Partnerships
  ["/get-involved/contact", "monthly", 0.6],
  ["/get-involved/volunteer", "monthly", 0.6],
  ["/get-involved/partnerships", "monthly", 0.6],
  ["/partnerships/sponsor", "monthly", 0.6],
  ["/partnerships/global-sponsor", "monthly", 0.5],
  ["/partnerships/allied-organizations", "monthly", 0.5],
  ["/partnerships/conference-sponsorship", "monthly", 0.5],

  // Legal
  ["/privacy", "yearly", 0.3],
  ["/terms", "yearly", 0.3],
  ["/cookies", "yearly", 0.3],
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://theblacksilk.org"
  const lastModified = new Date()

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
