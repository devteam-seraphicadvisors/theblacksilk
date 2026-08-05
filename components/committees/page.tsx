import { ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { committees } from "@/data/committees"

export default function CommitteesPage() {
  return (
    <div className="container py-12">
      <section className="mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-6">
          <Lightbulb className="h-4 w-4 text-black mr-2" />
          <span className="text-sm font-medium text-black">Specialized Committees</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Explore Our Committees</h1>
        <p className="text-gray-600">
          Dive into the heart of our organization by exploring our specialized committees. Each committee plays a vital
          role in shaping our initiatives and driving progress in key areas.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {committees.map((committee) => (
          <Card key={committee.id}>
            <CardHeader>
              <CardTitle>{committee.name}</CardTitle>
              <CardDescription>{committee.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button className="flex-1 bg-black hover:bg-gray-800 text-white" asChild>
                  <Link href={`/committees/${committee.id}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-black text-black hover:bg-gray-50" asChild>
                  <Link href={`/committees/${committee.id}/apply`}>Apply</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
        <p className="text-gray-600 mb-6">
          Ready to make a difference? Join our organization and contribute to our committees.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white" asChild>
            <Link href="/membership">Become a Member</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-50" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
