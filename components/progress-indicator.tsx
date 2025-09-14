"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ProgressIndicator({ size = "md", className }: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  return <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
}
