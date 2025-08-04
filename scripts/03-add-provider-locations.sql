-- جدول اتصال متخصص به مناطق خدماتی (جدول واسط)
-- یک متخصص می‌تواند در چندین شهر خدمت‌رسانی کند
CREATE TABLE provider_locations (
  id SERIAL PRIMARY KEY,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
  UNIQUE(provider_id, location_id)
);

-- فعال‌سازی امنیت در سطح ردیف
ALTER TABLE provider_locations ENABLE ROW LEVEL SECURITY;

-- تعریف پالیسی‌ها
-- به همه اجازه خواندن اطلاعات را بده
CREATE POLICY "Public provider locations are viewable by everyone." ON provider_locations FOR SELECT TO anon, authenticated USING (true);

-- به متخصصان اجازه بده مناطق خدماتی خود را مدیریت کنند
CREATE POLICY "Providers can manage their own service locations." ON provider_locations
  FOR ALL
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);
