"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 bg-black border border-neutral-700 text-white text-xs uppercase tracking-widest font-mono mb-6">
            Error 404
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-black mb-4 tracking-tight">Page Not Found</h1>
          <p className="text-neutral-600 font-sans font-light leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-black hover:bg-neutral-800 !text-white rounded-none font-mono text-xs uppercase tracking-wider"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-none border-black text-black hover:bg-black hover:text-white font-mono text-xs uppercase tracking-wider"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
