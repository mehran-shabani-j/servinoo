import { Suspense, use } from "react"
import { searchProviders, getServices, getLocations, type ProviderSearchResult } from "@/app/data"
import { SearchFilters } from "@/components/search-filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type SearchPageProps = {
  searchParams: Promise<{
    serviceId?: string
    locationId?: string
    query?: string
  }>
}

function SearchResults({ providersPromise }: { providersPromise: Promise<ProviderSearchResult[]> }) {
  const providers = use(providersPromise)

  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">هیچ متخصصی یافت نشد</h3>
        <p className="text-gray-600">لطفاً فیلترهای جستجو را تغییر دهید و دوباره تلاش کنید.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="relative w-12 h-12">
                  <Image
                    src={provider.avatar_url || "/placeholder-user.jpg"}
                    alt={`${provider.first_name} ${provider.last_name}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {provider.first_name} {provider.last_name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{provider.service_name}</p>
                </div>
              </div>
              {provider.is_sponsored && (
                <Badge variant="secondary" className="text-xs">
                  ویژه
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 ml-1" />
                <span>
                  {provider.city}, {provider.province}
                </span>
              </div>

              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                <span className="text-sm font-medium">{provider.avg_rating.toFixed(1)}</span>
                <span className="text-sm text-gray-600 mr-1">({provider.rating_count} نظر)</span>
              </div>

              <div className="flex space-x-2 space-x-reverse pt-3">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/providers/${provider.id}`}>مشاهده پروفایل</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = use(searchParams)
  const [services, locations] = await Promise.all([getServices(), getLocations()])
  const providersPromise = searchProviders(
    params.serviceId,
    params.locationId,
    params.query,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">جستجوی متخصصان</h1>
          <SearchFilters
            services={services}
            locations={locations}
            initialServiceId={params.serviceId}
            initialLocationId={params.locationId}
            initialQuery={params.query}
          />
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <SearchResults providersPromise={providersPromise} />
        </Suspense>
      </div>
    </div>
  )
}
