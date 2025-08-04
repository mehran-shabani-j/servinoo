-- 1. جدول پروفایل‌ها برای نگهداری اطلاعات تکمیلی کاربران
-- این جدول به جدول users در بخش auth سوپابیس متصل می‌شود.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT UNIQUE,
  is_provider BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول خدمات اصلی که در پلتفرم ارائه می‌شود
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id INTEGER REFERENCES services(id) -- اضافه کردن این خط برای ساختار درختی
);

-- 3. جدول استان‌ها و شهرها
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  UNIQUE(province, city)
);

-- 4. جدول اطلاعات تکمیلی متخصصان
CREATE TABLE provider_details (
  profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT, -- درباره من متخصص
  iban TEXT, -- شماره شبا برای تسویه حساب
  is_sponsored BOOLEAN DEFAULT FALSE, -- آیا آگهی ویژه است؟
  sponsored_expires_at TIMESTAMPTZ
);

-- 5. جدول اتصال متخصص به خدمات (جدول واسط)
-- یک متخصص می‌تواند چندین خدمت ارائه دهد
CREATE TABLE provider_services (
  id SERIAL PRIMARY KEY,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  price_description TEXT, -- توضیحات قیمت (مثلا: ساعتی، پروژه‌ای)
  base_price NUMERIC(10, 2), -- قیمت پایه
  UNIQUE(provider_id, service_id)
);

-- 6. جدول امتیازات و نظرات
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_id, user_id) -- هر کاربر فقط یکبار می‌تواند به یک متخصص امتیاز دهد
);

-- فعال‌سازی Row Level Security برای امنیت بیشتر
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- تعریف Policy ها (قوانین دسترسی)
-- به همه اجازه خواندن خدمات و شهرها را بده
CREATE POLICY "Public services are viewable by everyone." ON services FOR SELECT USING (true);
CREATE POLICY "Public locations are viewable by everyone." ON locations FOR SELECT USING (true);

-- به کاربران اجازه بده پروفایل خودشان را ببینند و ویرایش کنند
CREATE POLICY "Users can view their own profile." ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);
