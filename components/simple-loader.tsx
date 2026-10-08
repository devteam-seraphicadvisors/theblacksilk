import { cn } from "@/lib/utils"

interface SimpleLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SimpleLoader({ size = "md", className }: SimpleLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-neutral-300 border-t-black dark:border-neutral-800 dark:border-t-white",
        sizeClasses[size],
        className,
      )}
    />
  )
}

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <SimpleLoader size="lg" />
        <p className="text-sm text-neutral-600">{message}</p>
      </div>
    </div>
  )
}

interface ButtonLoaderProps {
  size?: "sm" | "md"
  className?: string
}

export function ButtonLoader({ size = "sm", className }: ButtonLoaderProps) {
  return <SimpleLoader size={size} className={cn("text-current", className)} />
}

interface CardLoaderProps {
  className?: string
}

export function CardLoader({ className }: CardLoaderProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded"></div>
          <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}

interface TextLoaderProps {
  lines?: number
  className?: string
}

export function TextLoader({ lines = 3, className }: TextLoaderProps) {
  return (
    <div className={cn("animate-pulse space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={cn("h-3 bg-neutral-200 rounded", i === lines - 1 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  )
}
