# سرویسو - پلتفرم ارائه خدمات

پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران

## ✨ ویژگی‌های جدید UI/UX

### 🎨 طراحی بصری مدرن
- **سیستم رنگی پیشرفته**: طیف رنگی مدرن با پشتیبانی از تم تاریک و روشن
- **گرادیان‌های زیبا**: استفاده از گرادیان‌های پیشرفته در بخش‌های مختلف
- **سیستم سایه**: سایه‌های نرم، متوسط و قوی برای عمق بصری بهتر
- **افکت شیشه‌ای**: پس‌زمینه‌های شفاف با blur effect

### 🎬 انیمیشن‌ها و تعاملات
- **انیمیشن fade-in**: ورود نرم المان‌ها
- **انیمیشن slide-up**: حرکت از پایین به بالا
- **انیمیشن scale-in**: بزرگ‌شدن تدریجی
- **Hover effects**: افکت‌های hover پیشرفته با lift و تغییر سایه
- **Micro-interactions**: تعاملات ریز برای تجربه بهتر

### 📱 طراحی ریسپانسیو
- **Grid سیستم**: سیستم Grid انعطاف‌پذیر برای layouts مختلف
- **Container های ریسپانسیو**: کامپوننت‌های container با breakpoint های مختلف
- **Typography ریسپانسیو**: متن‌های انطباقی با اندازه‌های مختلف

### ♿ دسترسی‌پذیری
- **Skip to content**: لینک پرش به محتوا برای screen reader ها
- **ARIA labels**: برچسب‌های ARIA کامل
- **Focus management**: مدیریت focus بهبود یافته
- **Screen reader support**: پشتیبانی کامل از screen reader ها
- **Keyboard navigation**: ناوبری کامل با کیبورد

### 🚀 بهینه‌سازی عملکرد
- **Lazy loading**: بارگذاری تصاویر با lazy loading
- **Performance monitoring**: ردیابی Web Vitals
- **Bundle optimization**: بهینه‌سازی bundle size
- **SSR optimization**: بهینه‌سازی Server-Side Rendering

## 🛠 تکنولوژی‌ها

- **Next.js 15**: فریمورک React
- **TypeScript**: نوع‌گذاری استاتیک
- **Tailwind CSS**: framework CSS
- **Radix UI**: کامپوننت‌های accessible
- **Lucide React**: آیکون‌ها
- **Framer Motion**: انیمیشن‌ها (آماده برای اضافه شدن)

## 🧪 تست‌ها

### Unit Tests (Vitest + React Testing Library)
```bash
# اجرای تست‌های واحد
pnpm test

# اجرای تست‌ها با UI
pnpm test:ui

# اجرای تست‌ها یک بار
pnpm test:run

# تست‌ها با coverage
pnpm test:coverage
```

### End-to-End Tests (Playwright)
```bash
# اجرای تست‌های E2E
pnpm test:e2e

# اجرای تست‌ها با UI
pnpm test:e2e:ui

# اجرای تست‌ها با مرورگر باز
pnpm test:e2e:headed

# اجرای همه تست‌ها
pnpm test:all
```

## 📁 ساختار پروژه

```
├── app/                    # Next.js App Router
│   ├── globals.css        # استایل‌های سراسری پیشرفته
│   ├── layout.tsx         # Layout اصلی با accessibility
│   ├── loading.tsx        # Loading state بهبود یافته
│   └── page.tsx           # صفحه اصلی بهبود یافته
├── components/
│   ├── ui/                # کامپوننت‌های UI اصلی
│   │   ├── accessible-icon.tsx    # آیکون‌های accessible
│   │   ├── lazy-image.tsx         # تصاویر lazy loading
│   │   └── responsive-container.tsx # کانتینرهای ریسپانسیو
│   └── landing-search-form.tsx    # فرم جستجو بهبود یافته
├── hooks/
│   └── use-performance.ts # هوک‌های performance monitoring
├── test/
│   ├── components/        # تست‌های کامپوننت‌ها
│   ├── e2e/              # تست‌های End-to-End
│   └── setup.ts          # تنظیمات تست
├── vitest.config.ts      # تنظیمات Vitest
└── playwright.config.ts  # تنظیمات Playwright
```

## 🚀 راه‌اندازی

```bash
# نصب dependencies
pnpm install

# اجرای development server
pnpm dev

# ساخت پروژه
pnpm build

# اجرای production server
pnpm start

# لینت کردن کد
pnpm lint

# type checking
pnpm type-check
```

## 🎯 ویژگی‌های اضافه شده

### کامپوننت‌های جدید
- `AccessibleIcon`: آیکون‌ها با پشتیبانی accessibility
- `ScreenReaderOnly`: محتوای مخصوص screen reader
- `SkipToContent`: لینک پرش به محتوا
- `LazyImage`: تصاویر با lazy loading
- `ResponsiveContainer`: کانتینرهای ریسپانسیو
- `ResponsiveGrid`: Grid های انعطاف‌پذیر
- `ResponsiveText`: متن‌های ریسپانسیو

### هوک‌های Performance
- `usePerformance`: ردیابی عملکرد عمومی
- `useWebVitals`: ردیابی Web Vitals
- `useRenderPerformance`: ردیابی عملکرد render
- `useAsyncPerformance`: ردیابی عملیات async

### استایل‌های پیشرفته
- سیستم CSS variables بهبود یافته
- کلاس‌های utility جدید برای انیمیشن
- افکت‌های hover و focus بهتر
- پشتیبانی کامل از RTL
- Shimmer effect برای loading

## 📊 متریک‌های عملکرد

پروژه شامل ردیابی کامل متریک‌های Web Vitals است:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

## 🔧 تنظیمات IDE

برای تجربه بهتر توسعه، پیشنهاد می‌شود از این extensions استفاده کنید:

- **VS Code**: 
  - Tailwind CSS IntelliSense
  - TypeScript Hero
  - Auto Rename Tag
  - Prettier
  - ESLint

## 📝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. Feature branch بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.
