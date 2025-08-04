import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Skeleton className="h-8 w-32" />
            <div className="flex space-x-4 space-x-reverse">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-blue-500 rounded mx-auto mb-4 max-w-md opacity-70"></div>
            <div className="h-6 bg-blue-500 rounded mx-auto mb-8 max-w-sm opacity-60"></div>
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-8">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <span className="text-blue-200 mr-3">در حال بارگذاری اطلاعات...</span>
            </div>
          </div>

          {/* Search Form Skeleton */}
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <Skeleton className="h-6 w-32 mb-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <Skeleton className="h-10 w-24 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Skeleton */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Providers Skeleton */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-40 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-5 w-20 bg-gray-700" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <Skeleton className="h-4 w-48 mx-auto bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
