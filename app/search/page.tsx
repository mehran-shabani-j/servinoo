import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServices, getLocations, getProviders, type ProviderSearchResult } from "../data"
import { SearchFilters } from "@/components/search-filters"
import Link from "next/link"

function ProviderCard({ provider }: { provider: ProviderSearchResult }) {
  const rating = Math.round(provider.avg_rating * 2) / 2 // Round to nearest 0.5

  return (
    <Card
      className={`transition-shadow hover:shadow-lg ${provider.is_sponsored ? "border-2 border-yellow-400 bg-yellow-50" : ""}`}
    >
      <CardContent className="p-4 flex items-start space-x-4 space-x-reverse">
        <Avatar className="w-16 h-16 border">
          <AvatarImage
            src={provider.avatar_url || `/placeholder.svg?height=64&width=64&query=professional+${provider.first_name}`}
          />
          <AvatarFallback>{provider.first_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{`${provider.first_name} ${provider.last_name}`}</h3>
            {provider.is_sponsored && (
              <div className="text-xs font-bold text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">آگهی ویژه</div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{provider.service_name}</p>
          <div className="flex items-center space-x-1 space-x-reverse mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 text-yellow-400 ${i < rating ? "fill-yellow-400" : "fill-transparent"}`}
              />
            ))}
            <span className="text-sm font-medium mr-1">{provider.avg_rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({provider.rating_count} نظر)</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4 ml-1" /> {provider.city}
          </div>
        </div>
        <div className="text-left">
          <Button asChild>
            <Link href={`/providers/${provider.id}`}>مشاهده پروفایل</Link>
          </Button>
          {/* Price info can be added later */}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    serviceId?: string
    locationId?: string
    price?: string
  }
}) {
  const services = await getServices()
  const locations = await getLocations()

  const serviceId = searchParams?.serviceId ? Number.parseInt(searchParams.serviceId) : undefined
  const locationId = searchParams?.locationId ? Number.parseInt(searchParams.locationId) : undefined

  const providers = await getProviders({ serviceId, locationId })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <SearchFilters services={services} locations={locations} />
        </aside>

        <main className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">
            {providers.length > 0 ? `${providers.length} ارائه‌دهنده خدمت یافت شد` : "نتیجه‌ای یافت نشد"}
          </h1>
          <div className="space-y-4">
            {providers.length > 0 ? (
              providers.map((provider) => <ProviderCard key={provider.id} provider={provider} />)
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>هیچ متخصصی با فیلترهای انتخابی شما یافت نشد. لطفاً فیلترها را تغییر دهید.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
