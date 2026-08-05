"use client"

import { useEffect, useState } from "react"
import { SimpleLoader } from "./simple-loader"

interface MainLoaderProps {
  isLoading?: boolean
  onComplete?: () => void
}

export function MainLoader({ isLoading = true, onComplete }: MainLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, onComplete])

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 200)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-neutral-1000 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">TBS</span>
          </div>
          <div>
            <div className="font-bold text-xl text-neutral-1000">The Black Silk</div>
            <div className="text-sm text-neutral-500">Legal Technology Platform</div>
          </div>
        </div>

        {/* Loader */}
        <div className="flex flex-col items-center space-y-4">
          <SimpleLoader size="lg" />
          <div className="text-sm text-neutral-600">Loading your experience...</div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-1000 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
