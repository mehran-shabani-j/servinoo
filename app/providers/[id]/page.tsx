import { getProviderProfile } from "@/app/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, MessageSquare, Phone, Star } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ProviderProfilePage({ params }: { params: { id: string } }) {
  const data = await getProviderProfile(params.id)

  if (!data || !data.profile) {
    notFound()
  }

  const { profile, details, services, locations, ratings } = data
  const rating = Math.round(ratings.avg_rating * 2) / 2

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ستون اصلی - اطلاعات */}
          <main className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96"} />
                  <AvatarFallback className="text-3xl">{profile.first_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-center sm:text-right">
                  <h1 className="text-3xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 text-yellow-400 ${i < rating ? "fill-yellow-400" : "fill-transparent"}`}
                      />
                    ))}
                    <span className="text-lg font-medium mr-2">{ratings.avg_rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({ratings.rating_count} نظر)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>درباره من</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{details?.bio || "بیوگرافی ثبت نشده است."}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="ml-2" />
                  خدمات ارائه شده
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <Badge key={service.id} variant="secondary">
                    {service.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="ml-2" />
                  مناطق تحت پوشش
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Badge key={location.id} variant="outline">
                    {location.city}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </main>

          {/* ستون کناری - تماس */}
          <aside className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>ارتباط با متخصص</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Phone className="ml-2" />
                  درخواست تماس
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="ml-2" />
                  ارسال پیام
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
