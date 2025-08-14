"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Briefcase } from "lucide-react"
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
    <Card className="mt-8 max-w-4xl mx-auto shadow-strong border-none bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl text-slate-800 flex items-center justify-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          جستجوی خدمات
        </CardTitle>
        <p className="text-slate-600 mt-2">خدمت مورد نیاز خود را پیدا کنید</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-5 space-y-3">
            <Label htmlFor="service-type" className="text-base font-medium text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              نوع خدمت
            </Label>
            <Select onValueChange={setServiceId}>
              <SelectTrigger 
                id="service-type" 
                className="h-12 border-2 border-slate-200 hover:border-primary/50 focus:border-primary transition-colors bg-white"
              >
                <SelectValue placeholder="انتخاب نوع خدمت" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {services.map((service) => (
                  <SelectGroup key={service.id}>
                    <Label className="px-3 py-2 text-sm font-semibold text-primary bg-primary/5 rounded-md mx-1 my-1 block">
                      {service.name}
                    </Label>
                    {service.sub_services.map((sub) => (
                      <SelectItem 
                        key={sub.id} 
                        value={String(sub.id)}
                        className="mr-4 hover:bg-primary/5 focus:bg-primary/10"
                      >
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <Label htmlFor="location" className="text-base font-medium text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              موقعیت مکانی
            </Label>
            <Select onValueChange={setLocationId}>
              <SelectTrigger 
                id="location" 
                className="h-12 border-2 border-slate-200 hover:border-primary/50 focus:border-primary transition-colors bg-white"
              >
                <SelectValue placeholder="انتخاب شهر" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {locations.map((location) => (
                  <SelectItem 
                    key={location.id} 
                    value={String(location.id)}
                    className="hover:bg-primary/5 focus:bg-primary/10"
                  >
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium shadow-medium hover:shadow-strong transition-all duration-300 hover-lift group"
            >
              <Search className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              جستجو
            </Button>
          </div>
        </form>

        {/* Quick suggestions */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">جستجوهای محبوب:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "تعمیرات لوازم خانگی", serviceId: "1" },
              { label: "نظافت منزل", serviceId: "2" },
              { label: "تدریس خصوصی", serviceId: "3" },
              { label: "طراحی گرافیک", serviceId: "4" }
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/search?serviceId=${suggestion.serviceId}`)}
                className="text-xs bg-slate-50 hover:bg-primary/5 border-slate-200 hover:border-primary/30 transition-all duration-200 hover-lift"
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
