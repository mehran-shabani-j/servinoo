-- این تابع تمام جزئیات یک متخصص را برای نمایش در صفحه پروفایلش برمی‌گرداند
CREATE OR REPLACE FUNCTION get_provider_details(provider_id_input UUID)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    provider_profile json;
    provider_extra_details json;
    provider_services json;
    provider_locations json;
    provider_ratings json;
BEGIN
    -- 1. اطلاعات اصلی پروفایل (فقط فیلدهای عمومی)
    SELECT json_build_object(
        'id', p.id,
        'first_name', p.first_name,
        'last_name', p.last_name,
        'is_provider', p.is_provider,
        'avatar_url', p.avatar_url
    ) INTO provider_profile
    FROM profiles p
    WHERE p.id = provider_id_input;

    -- 2. اطلاعات تکمیلی (بیوگرافی و...)
    SELECT to_jsonb(pd) INTO provider_extra_details
    FROM provider_details pd
    WHERE pd.profile_id = provider_id_input;

    -- 3. لیست خدمات ارائه شده
    SELECT json_agg(json_build_object('id', s.id, 'name', s.name)) INTO provider_services
    FROM provider_services ps
    JOIN services s ON ps.service_id = s.id
    WHERE ps.provider_id = provider_id_input;

    -- 4. لیست مناطق تحت پوشش
    SELECT json_agg(json_build_object('id', l.id, 'city', l.city, 'province', l.province)) INTO provider_locations
    FROM provider_locations pl
    JOIN locations l ON pl.location_id = l.id
    WHERE pl.provider_id = provider_id_input;

    -- 5. میانگین امتیاز و تعداد نظرات
    SELECT json_build_object(
        'avg_rating', COALESCE(AVG(rating), 0),
        'rating_count', COUNT(id)
    ) INTO provider_ratings
    FROM ratings
    WHERE provider_id = provider_id_input;

    -- ترکیب تمام اطلاعات در یک آبجکت JSON
    RETURN json_build_object(
        'profile', provider_profile,
        'details', provider_extra_details,
        'services', COALESCE(provider_services, '[]'::json),
        'locations', COALESCE(provider_locations, '[]'::json),
        'ratings', provider_ratings
    );
END;
$$;
