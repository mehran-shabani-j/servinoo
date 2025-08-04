"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ServiceWithSubServices, Location } from "@/app/data"
import { useCallback } from "react"

type SearchFiltersProps = {
  services: ServiceWithSubServices[]
  locations: Location[]
}

export function SearchFilters({ services, locations }: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams],
  )

  const handleFilterChange = (filterName: string, value: string) => {
    router.push(pathname + "?" + createQueryString(filterName, value))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>فیلترها</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service-type">نوع خدمت</Label>
          <Select
            defaultValue={searchParams.get("serviceId") || "all"}
            onValueChange={(value) => handleFilterChange("serviceId", value)}
          >
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
          <Select
            defaultValue={searchParams.get("locationId") || "all"}
            onValueChange={(value) => handleFilterChange("locationId", value)}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder="همه‌ی شهرها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه‌ی شهرها</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={String(loc.id)}>
                  {loc.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Price filter can be added here later */}
      </CardContent>
    </Card>
  )
}
