import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, StarHalf, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for service providers
const providers = [
  {
    id: 1,
    name: "Ali Rezaei",
    service: "لوله‌کش",
    city: "تهران",
    rating: 4.5,
    jobs: 120,
    price: "اقتصادی",
    isSponsored: true,
  },
  { id: 2, name: "Sara Mohammadi", service: "نظافتچی", city: "تهران", rating: 5, jobs: 85, price: "متوسط" },
  {
    id: 3,
    name: "Kamran Tavakoli",
    service: "برق‌کار",
    city: "اصفهان",
    rating: 4,
    jobs: 210,
    price: "اقتصادی",
  },
  { id: 4, name: "Nazanin Zare", service: "پرستار", city: "شیراز", rating: 4.8, jobs: 50, price: "ویژه" },
]

// TODO: Implement the full ranking algorithm here.
// The algorithm should consider:
// 1. Sponsored listings (show first).
// 2. Star ratings (higher is better).
// 3. Number of jobs completed (more is better).
// 4. Price competitiveness.
const sortedProviders = providers.sort(
  (a, b) => (b.isSponsored ? 1 : -1) - (a.isSponsored ? -1 : 1) || b.rating - a.rating,
)

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>فیلترها</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-type">نوع خدمت</Label>
                <Select>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="همه‌ی خدمات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه‌ی خدمات</SelectItem>
                    <SelectItem value="repair">لوله‌کش</SelectItem>
                    <SelectItem value="cleaning">نظافتچی</SelectItem>
                    <SelectItem value="nursing">پرستار</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">شهر</Label>
                <Select>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="همه‌ی شهرها" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه‌ی شهرها</SelectItem>
                    <SelectItem value="tehran">تهران</SelectItem>
                    <SelectItem value="shiraz">شیراز</SelectItem>
                    <SelectItem value="isfahan">اصفهان</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">محدوده قیمت</Label>
                <Select>
                  <SelectTrigger id="price">
                    <SelectValue placeholder="هر قیمتی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">هر قیمتی</SelectItem>
                    <SelectItem value="affordable">اقتصادی</SelectItem>
                    <SelectItem value="mid-range">متوسط</SelectItem>
                    <SelectItem value="premium">ویژه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">اعمال فیلترها</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <main className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">ارائه‌دهندگان خدمات</h1>
          <div className="space-y-4">
            {sortedProviders.map((provider) => (
              <Card
                key={provider.id}
                className={`transition-shadow hover:shadow-lg ${provider.isSponsored ? "border-2 border-yellow-400 bg-yellow-50" : ""}`}
              >
                <CardContent className="p-4 flex items-start space-x-4">
                  <Avatar className="w-16 h-16 border">
                    <AvatarImage src={`/placeholder.svg?height=64&width=64&query=professional+${provider.name}`} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{provider.name}</h3>
                      {provider.isSponsored && (
                        <div className="text-xs font-bold text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">
                          آگهی ویژه
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.service}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">{provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({provider.jobs} کار موفق)</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4 ml-1" /> {provider.city}
                    </div>
                  </div>
                  <div className="text-right">
                    <Button>مشاهده پروفایل</Button>
                    <p className="text-sm font-semibold mt-2">{provider.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
