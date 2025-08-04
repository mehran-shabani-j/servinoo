"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { ServiceWithSubServices, Location } from "@/app/data"

type LandingSearchFormProps = {
  services: ServiceWithSubServices[]
  locations: Location[]
}

export function LandingSearchForm({ services, locations }: LandingSearchFormProps) {
  const router = useRouter()
  const [serviceId, setServiceId] = useState<string>("")
  const [locationId, setLocationId] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (serviceId) params.set("serviceId", serviceId)
    if (locationId) params.set("locationId", locationId)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <Card className="mt-8 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>جستجوی خدمات</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="service-type">نوع خدمت</Label>
            <Select onValueChange={setServiceId}>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="انتخاب نوع خدمت" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="space-y-2 text-left">
            <Label htmlFor="city">شهر</Label>
            <Select onValueChange={setLocationId}>
              <SelectTrigger id="city">
                <SelectValue placeholder="شهر خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={String(loc.id)}>
                    {loc.city} ({loc.province})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <Button type="submit" className="w-full sm:w-auto mt-2">
              <Search className="ml-2 h-4 w-4" /> جستجو
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
