# سروینو - اپلیکیشن خدمات آنلاین

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shabanimehran-1983s-projects/v0-servinoo-web-application)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/P1J5UdhFyi7)

## نمای کلی

سروینو یک پلتفرم آنلاین برای اتصال کاربران به ارائه‌دهندگان خدمات محلی است. این پروژه با Next.js 15، Supabase، و Tailwind CSS ساخته شده است.

## ویژگی‌ها

- 🔐 احراز هویت با OTP (کد یکبار مصرف)
- 🔍 جستجوی پیشرفته متخصصان
- 👤 مدیریت پروفایل کاربران و متخصصان
- ⭐ سیستم امتیازدهی و نظرات
- 📱 طراحی ریسپانسیو
- 🌐 پشتیبانی کامل از زبان فارسی

## راه‌اندازی محلی

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn
- حساب کاربری Supabase

### مراحل نصب

1. **کلون کردن پروژه:**
\`\`\`bash
git clone <repository-url>
cd servinoo-web-application
\`\`\`

2. **نصب وابستگی‌ها:**
\`\`\`bash
npm install
\`\`\`

3. **تنظیم متغیرهای محیطی:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

سپس فایل `.env.local` را ویرایش کنید و مقادیر Supabase خود را وارد کنید.

4. **راه‌اندازی دیتابیس Supabase:**

ابتدا یک پروژه جدید در [Supabase](https://supabase.com) ایجاد کنید، سپس اسکریپت‌های SQL موجود در پوشه `scripts/` را به ترتیب اجرا کنید:

\`\`\`sql
-- در SQL Editor پنل Supabase اجرا کنید:
-- 1. scripts/01-create-tables.sql
-- 2. scripts/02-seed-data.sql  
-- 3. scripts/03-add-provider-locations.sql
-- 4. scripts/04-create-search-function.sql
-- 5. scripts/05-create-provider-details-function.sql
\`\`\`

5. **اجرای پروژه:**
\`\`\`bash
npm run dev
\`\`\`

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

## دیپلوی در Vercel

### روش خودکار (توصیه شده)

1. پروژه را به GitHub پوش کنید
2. به [Vercel](https://vercel.com) بروید و پروژه را import کنید
3. متغیرهای محیطی را در تنظیمات پروژه Vercel اضافه کنید:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### روش دستی

\`\`\`bash
# نصب Vercel CLI
npm i -g vercel

# دیپلوی
vercel --prod
\`\`\`

## ساختار پروژه

\`\`\`
├── app/                    # Next.js App Router
│   ├── (auth)/            # صفحات احراز هویت
│   ├── (dashboard)/       # داشبورد کاربران
│   ├── providers/         # صفحات متخصصان
│   ├── search/           # صفحه جستجو
│   └── data.ts           # توابع دیتابیس
├── components/           # کامپوننت‌های قابل استفاده مجدد
├── lib/                 # کتابخانه‌ها و تنظیمات
├── scripts/             # اسکریپت‌های SQL
└── styles/              # فایل‌های CSS
\`\`\`

## تکنولوژی‌های استفاده شده

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Deployment:** Vercel

## مشارکت

برای مشارکت در این پروژه:

1. Fork کنید
2. یک branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را commit کنید (`git commit -m 'Add some amazing feature'`)
4. به branch خود push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request ایجاد کنید

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## پشتیبانی

اگر با مشکلی مواجه شدید، لطفاً یک issue در GitHub ایجاد کنید.

---

**نکته:** این پروژه با v0.dev ساخته شده و به صورت خودکار با deployments شما همگام‌سازی می‌شود.
\`\`\`

حالا فایل `lib/supabase/server.ts` را بهبود می‌دهیم تا برای production آماده باشد:
