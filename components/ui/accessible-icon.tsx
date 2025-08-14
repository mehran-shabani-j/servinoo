import type React from "react"
import { cn } from "@/lib/utils"

interface AccessibleIconProps {
  children: React.ReactNode
  label?: string
  description?: string
  decorative?: boolean
  className?: string
}

export function AccessibleIcon({
  children,
  label,
  description,
  decorative = false,
  className,
}: AccessibleIconProps) {
  const iconProps = decorative
    ? {
        "aria-hidden": "true" as const,
        role: "presentation" as const,
      }
    : {
        "aria-label": label,
        "aria-describedby": description ? `icon-description-${Math.random().toString(36).substr(2, 9)}` : undefined,
        role: "img" as const,
      }

  return (
    <span className={cn("inline-flex items-center justify-center", className)} {...iconProps}>
      {children}
      {description && !decorative && (
        <span id={iconProps["aria-describedby"]} className="sr-only">
          {description}
        </span>
      )}
    </span>
  )
}

// Screen reader only utility component
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

// Skip to content link for better navigation
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:z-50"
    >
      پرش به محتوای اصلی
    </a>
  )
}