"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Handshake, Award, Calendar, Globe, Building2, ArrowRight } from "lucide-react"

const partnershipOptions = [
  {
    title: "Become A Sponsor",
    href: "/partnerships/sponsor",
    icon: Award,
    description: "Support our mission and gain visibility",
    badge: "Popular",
  },
  {
    title: "Conference Sponsorship",
    href: "/partnerships/conference-sponsorship",
    icon: Calendar,
    description: "Sponsor our flagship events and conferences",
  },
  {
    title: "Global Sponsor",
    href: "/partnerships/global-sponsor",
    icon: Globe,
    description: "Become our premier global partner",
    badge: "Premium",
  },
  {
    title: "Allied Organizations",
    href: "/partnerships/allied-organizations",
    icon: Building2,
    description: "Join our network of allied organizations",
  },
]

export function PartnershipSidebar() {
  const pathname = usePathname()

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Handshake className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Partner With Us</h3>
        </div>

        <div className="space-y-3">
          {partnershipOptions.map((option) => {
            const isActive = pathname === option.href
            const Icon = option.icon

            return (
              <Link
                key={option.href}
                href={option.href}
                className={`block p-4 rounded-lg border transition-all duration-200 group ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`font-semibold text-sm ${
                            isActive ? "text-white" : "text-gray-900 group-hover:text-gray-900"
                          }`}
                        >
                          {option.title}
                        </h4>
                        {option.badge && (
                          <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${isActive ? "text-white/80" : "text-gray-600"}`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Need Custom Partnership?</h4>
          <p className="text-sm text-blue-700 mb-3">
            Looking for a tailored partnership solution? Let's discuss your specific needs.
          </p>
          <Link
            href="/get-involved/contact"
            className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Contact Us
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
