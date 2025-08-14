import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  center?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = "7xl",
  padding = "md",
  center = true,
}: ResponsiveContainerProps) {
  const maxWidthClasses: Record<NonNullable<ResponsiveContainerProps["maxWidth"]>, string> = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }

  const paddingClasses = {
    none: "",
    sm: "px-2 sm:px-4",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
  }

  return (
    <div
      className={cn(
        "w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        center && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

// Grid container with responsive breakpoints
interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6
    md?: 1 | 2 | 3 | 4 | 5 | 6
    lg?: 1 | 2 | 3 | 4 | 5 | 6
    xl?: 1 | 2 | 3 | 4 | 5 | 6
  }
  gap?: "sm" | "md" | "lg"
}

export function ResponsiveGrid({
  children,
  className,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  const gridCols: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }

  return (
    <div
      className={cn(
        "grid",
        cols.sm && `${gridCols[cols.sm]}`,
        cols.md && `md:${gridCols[cols.md]}`,
        cols.lg && `lg:${gridCols[cols.lg]}`,
        cols.xl && `xl:${gridCols[cols.xl]}`,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  className?: string
  responsive?: boolean
}

export function ResponsiveText({
  children,
  as: Component = "p",
  size = "base",
  className,
  responsive = false,
}: ResponsiveTextProps) {
  const sizeClasses: Record<NonNullable<ResponsiveTextProps["size"]>, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  }

  const responsiveMap: Record<"2xl" | "3xl" | "4xl" | "5xl" | "6xl", string> = {
    "2xl": "text-lg md:text-xl lg:text-2xl",
    "3xl": "text-xl md:text-2xl lg:text-3xl",
    "4xl": "text-2xl md:text-3xl lg:text-4xl",
    "5xl": "text-3xl md:text-4xl lg:text-5xl",
    "6xl": "text-4xl md:text-5xl lg:text-6xl",
  }

  const computedClass = responsive && size in responsiveMap
    ? responsiveMap[size as keyof typeof responsiveMap]
    : sizeClasses[size]

  return (
    <Component className={cn(computedClass, className)}>
      {children}
    </Component>
  )
}