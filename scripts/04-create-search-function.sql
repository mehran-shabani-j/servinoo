-- تابع جستجوی متخصصان
-- این تابع فیلترها را به عنوان ورودی دریافت کرده و لیستی از متخصصان را برمی‌گرداند
CREATE OR REPLACE FUNCTION search_providers(
    service_id_filter INTEGER DEFAULT NULL,
    location_id_filter INTEGER DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    service_name TEXT,
    city TEXT,
    province TEXT,
    avg_rating NUMERIC,
    rating_count BIGINT,
    is_sponsored BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.first_name,
        p.last_name,
        p.avatar_url,
        s.name AS service_name,
        l.city,
        l.province,
        -- محاسبه میانگین امتیازات
        COALESCE(avg_ratings.avg_r, 0) AS avg_rating,
        COALESCE(avg_ratings.count_r, 0) AS rating_count,
        pd.is_sponsored
    FROM
        profiles p
    -- اتصال به جزئیات متخصص
    JOIN provider_details pd ON p.id = pd.profile_id
    -- اتصال به خدمات ارائه شده توسط متخصص
    JOIN provider_services ps ON p.id = ps.provider_id
    JOIN services s ON ps.service_id = s.id
    -- اتصال به مناطق خدماتی متخصص
    JOIN provider_locations pl ON p.id = pl.provider_id
    JOIN locations l ON pl.location_id = l.id
    -- اتصال به جدول امتیازات برای محاسبه میانگین
    LEFT JOIN (
        SELECT
            r.provider_id,
            AVG(r.rating) AS avg_r,
            COUNT(r.rating) AS count_r
        FROM ratings r
        GROUP BY r.provider_id
    ) AS avg_ratings ON p.id = avg_ratings.provider_id
    WHERE
        p.is_provider = TRUE
        AND (service_id_filter IS NULL OR ps.service_id = service_id_filter)
        AND (location_id_filter IS NULL OR pl.location_id = location_id_filter)
    -- مرتب‌سازی: ابتدا ویژه، سپس بر اساس امتیاز، سپس تعداد نظرات
    ORDER BY
        pd.is_sponsored DESC,
        avg_rating DESC,
        rating_count DESC;
END;
$$;
