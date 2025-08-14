import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24 shimmer" />
              <Sparkles className="w-6 h-6 text-primary/50" />
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <Skeleton className="h-8 w-16 shimmer" />
              <Skeleton className="h-9 w-20 rounded-lg shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="relative gradient-primary text-white py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse space-y-6">
            <div className="space-y-4">
              <div className="h-16 bg-white/20 rounded-lg mx-auto mb-6 max-w-2xl shimmer"></div>
              <div className="h-12 bg-white/15 rounded-lg mx-auto mb-8 max-w-3xl shimmer"></div>
            </div>
            
            {/* Loading dots animation */}
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-12">
              <div className="w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <span className="text-white/70 mr-4 font-medium">در حال بارگذاری اطلاعات...</span>
            </div>

            {/* Stats skeleton */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="h-8 w-16 bg-white/20 rounded mx-auto mb-2 shimmer"></div>
                <div className="h-4 w-12 bg-white/15 rounded mx-auto shimmer"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-16 bg-white/20 rounded mx-auto mb-2 shimmer"></div>
                <div className="h-4 w-16 bg-white/15 rounded mx-auto shimmer"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-16 bg-white/20 rounded mx-auto mb-2 shimmer"></div>
                <div className="h-4 w-12 bg-white/15 rounded mx-auto shimmer"></div>
              </div>
            </div>
          </div>

          {/* Search Form Skeleton */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-strong">
            <div className="text-center mb-6">
              <Skeleton className="h-8 w-48 mx-auto mb-2 shimmer" />
              <Skeleton className="h-4 w-64 mx-auto shimmer" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-5 space-y-3">
                <Skeleton className="h-5 w-20 shimmer" />
                <Skeleton className="h-12 w-full rounded-lg shimmer" />
              </div>
              <div className="lg:col-span-5 space-y-3">
                <Skeleton className="h-5 w-24 shimmer" />
                <Skeleton className="h-12 w-full rounded-lg shimmer" />
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="h-12 w-full rounded-lg shimmer" />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <Skeleton className="h-4 w-32 mb-4 shimmer" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-lg shimmer" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-4 shimmer" />
            <Skeleton className="h-6 w-96 mx-auto shimmer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-soft animate-pulse" style={{animationDelay: `${index * 0.1}s`}}>
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6 shimmer" />
                <Skeleton className="h-6 w-40 mx-auto mb-4 shimmer" />
                <Skeleton className="h-4 w-full mb-2 shimmer" />
                <Skeleton className="h-4 w-4/5 mx-auto shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Services Skeleton */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-4 shimmer" />
            <Skeleton className="h-6 w-72 mx-auto shimmer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl shadow-soft border-none overflow-hidden animate-pulse" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-32 shimmer" />
                    <Skeleton className="h-5 w-20 rounded-full shimmer" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2 shimmer" />
                  <Skeleton className="h-4 w-4/5 mb-6 shimmer" />
                  <Skeleton className="h-10 w-full rounded-lg shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Providers Skeleton */}
      <div className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <Skeleton className="h-10 w-48 mx-auto mb-4 shimmer" />
            <Skeleton className="h-6 w-80 mx-auto shimmer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl shadow-soft p-6 text-center animate-pulse" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative mb-6">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto shimmer" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500/50 rounded-full border-2 border-background animate-pulse"></div>
                </div>
                <Skeleton className="h-5 w-32 mx-auto mb-2 shimmer" />
                <Skeleton className="h-4 w-28 mx-auto mb-3 shimmer" />
                <Skeleton className="h-4 w-20 mx-auto mb-3 shimmer" />
                <Skeleton className="h-8 w-24 mx-auto rounded-lg shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="h-6 w-24 bg-white/20 rounded mb-6 shimmer"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/10 rounded shimmer"></div>
                  <div className="h-4 w-4/5 bg-white/10 rounded shimmer"></div>
                  <div className="h-4 w-3/5 bg-white/10 rounded shimmer"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <div className="h-4 w-64 bg-white/10 rounded mx-auto shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
