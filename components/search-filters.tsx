"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { ServiceWithSubServices, Location } from "@/app/data"
import { useCallback, useState } from "react"

type SearchFiltersProps = {
  services: ServiceWithSubServices[]
  locations: Location[]
  initialServiceId?: string
  initialLocationId?: string
  initialQuery?: string
}

export function SearchFilters({
  services,
  locations,
  initialServiceId,
  initialLocationId,
  initialQuery,
}: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [serviceId, setServiceId] = useState(initialServiceId || "")
  const [locationId, setLocationId] = useState(initialLocationId || "")
  const [query, setQuery] = useState(initialQuery || "")

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([name, value]) => {
        if (value && value !== "all") {
          newSearchParams.set(name, value)
        } else {
          newSearchParams.delete(name)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  const handleSearch = () => {
    const queryString = createQueryString({
      serviceId,
      locationId,
      query,
    })
    router.push(pathname + "?" + queryString)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>فیلترها</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service-type">نوع خدمت</Label>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger id="service-type">
              <SelectValue placeholder="همه‌ی خدمات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه‌ی خدمات</SelectItem>
              {services.map((service) => (
                <SelectGroup key={service.id}>
                  <Label className="px-2 py-1.5 text-xs font-semibold">{service.name}</Label>
                  {service.sub_services.map((sub) => (
                    <SelectItem key={sub.id} value={String(sub.id)}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">شهر</Label>
          <Select value={locationId} onValueChange={setLocationId}>
            <SelectTrigger id="city">
              <SelectValue placeholder="همه‌ی شهرها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه‌ی شهرها</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={String(loc.id)}>
                  {loc.city} ({loc.province})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-query">جستجو</Label>
          <div className="flex gap-2">
            <Input
              id="search-query"
              placeholder="نام متخصص یا خدمت..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-right"
              dir="rtl"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
