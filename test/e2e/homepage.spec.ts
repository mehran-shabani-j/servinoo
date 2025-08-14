import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage with correct title and content', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/سرویسو/)

    // Check main heading
    await expect(page.getByRole('heading', { name: /بهترین متخصصان را پیدا کنید/ })).toBeVisible()

    // Check navigation elements
    await expect(page.getByText('سرویسو').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'ورود' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'ثبت نام' })).toBeVisible()
  })

  test('should display hero section with stats', async ({ page }) => {
    // Check hero content
    await expect(page.getByText('پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران')).toBeVisible()
    
    // Check stats
    await expect(page.getByText('250+')).toBeVisible()
    await expect(page.getByText('متخصص')).toBeVisible()
    await expect(page.getByText('1000+')).toBeVisible()
    await expect(page.getByText('مشتری راضی')).toBeVisible()
    await expect(page.getByText('98%')).toBeVisible()
    await expect(page.getByText('رضایت')).toBeVisible()
  })

  test('should display features section', async ({ page }) => {
    await expect(page.getByText('چرا سرویسو؟')).toBeVisible()
    await expect(page.getByText('متخصصان تایید شده')).toBeVisible()
    await expect(page.getByText('ضمانت کیفیت')).toBeVisible()
    await expect(page.getByText('تجربه آسان')).toBeVisible()
  })

  test('should display popular services section', async ({ page }) => {
    await expect(page.getByText('خدمات محبوب')).toBeVisible()
    
    // Check service cards
    await expect(page.getByText('خدمات منزل')).toBeVisible()
    await expect(page.getByText('خدمات آموزشی')).toBeVisible()
    await expect(page.getByText('خدمات پزشکی')).toBeVisible()
    
    // Check service descriptions
    await expect(page.getByText('تعمیرات، نظافت، باغبانی و سایر خدمات منزل')).toBeVisible()
    await expect(page.getByText('تدریس خصوصی، آموزش زبان، موسیقی و هنر')).toBeVisible()
    await expect(page.getByText('پرستاری، فیزیوتراپی و مراقبت در منزل')).toBeVisible()
  })

  test('should display featured providers section', async ({ page }) => {
    await expect(page.getByText('متخصصان برتر')).toBeVisible()
    
    // Check provider cards
    await expect(page.getByText('احمد محمدی')).toBeVisible()
    await expect(page.getByText('فاطمه احمدی')).toBeVisible()
    await expect(page.getByText('علی رضایی')).toBeVisible()
    await expect(page.getByText('مریم کریمی')).toBeVisible()
    
    // Check ratings
    await expect(page.getByText('4.9').first()).toBeVisible()
    await expect(page.getByText('4.8')).toBeVisible()
    await expect(page.getByText('4.7')).toBeVisible()
  })

  test('should have working search form', async ({ page }) => {
    // Check search form elements
    await expect(page.getByText('جستجوی خدمات')).toBeVisible()
    await expect(page.getByText('نوع خدمت')).toBeVisible()
    await expect(page.getByText('موقعیت مکانی')).toBeVisible()
    await expect(page.getByRole('button', { name: 'جستجو' })).toBeVisible()
    
    // Check quick suggestions
    await expect(page.getByText('جستجوهای محبوب:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'تعمیرات لوازم خانگی' })).toBeVisible()
  })

  test('should navigate to search page when clicking quick suggestions', async ({ page }) => {
    // Click on a quick suggestion
    await page.getByRole('button', { name: 'تعمیرات لوازم خانگی' }).click()
    
    // Should navigate to search page
    await expect(page).toHaveURL(/\/search/)
    await expect(page).toHaveURL(/serviceId=1/)
  })

  test('should allow service selection and form submission', async ({ page }) => {
    // Click on service dropdown
    await page.getByRole('combobox', { name: /نوع خدمت/i }).click()
    
    // Select a service
    await page.getByText('تعمیرات لوازم خانگی').click()
    
    // Click search button
    await page.getByRole('button', { name: 'جستجو' }).click()
    
    // Should navigate to search page with service parameter
    await expect(page).toHaveURL(/\/search/)
    await expect(page).toHaveURL(/serviceId/)
  })

  test('should allow location selection and form submission', async ({ page }) => {
    // Click on location dropdown
    await page.getByRole('combobox', { name: /موقعیت مکانی/i }).click()
    
    // Select a location
    await page.getByText('تهران').click()
    
    // Click search button
    await page.getByRole('button', { name: 'جستجو' }).click()
    
    // Should navigate to search page with location parameter
    await expect(page).toHaveURL(/\/search/)
    await expect(page).toHaveURL(/locationId/)
  })

  test('should allow both service and location selection', async ({ page }) => {
    // Select service
    await page.getByRole('combobox', { name: /نوع خدمت/i }).click()
    await page.getByText('نظافت منزل').click()
    
    // Select location
    await page.getByRole('combobox', { name: /موقعیت مکانی/i }).click()
    await page.getByText('اصفهان').click()
    
    // Submit form
    await page.getByRole('button', { name: 'جستجو' }).click()
    
    // Should navigate with both parameters
    await expect(page).toHaveURL(/\/search/)
    await expect(page).toHaveURL(/serviceId/)
    await expect(page).toHaveURL(/locationId/)
  })

  test('should have working footer links', async ({ page }) => {
    // Check footer content
    await expect(page.getByText('سرویسو').last()).toBeVisible()
    await expect(page.getByText('پلتفرم آنلاین برای یافتن و ارائه خدمات در سراسر ایران').last()).toBeVisible()
    
    // Check footer links sections
    await expect(page.getByText('خدمات').last()).toBeVisible()
    await expect(page.getByText('شرکت')).toBeVisible()
    await expect(page.getByText('تماس با ما')).toBeVisible()
    
    // Check contact information
    await expect(page.getByText('021-12345678')).toBeVisible()
    await expect(page.getByText('info@servinoo.com')).toBeVisible()
  })

  test('should navigate to service search when clicking service buttons', async ({ page }) => {
    // Click on a service card button
    await page.getByRole('link', { name: 'مشاهده متخصصان' }).first().click()
    
    // Should navigate to search page
    await expect(page).toHaveURL(/\/search/)
  })

  test('should have proper RTL layout', async ({ page }) => {
    // Check that html has dir="rtl"
    const htmlElement = page.locator('html')
    await expect(htmlElement).toHaveAttribute('dir', 'rtl')
    
    // Check that text is aligned properly
    const mainHeading = page.getByRole('heading', { name: /بهترین متخصصان را پیدا کنید/ })
    await expect(mainHeading).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that main elements are still visible
    await expect(page.getByText('سرویسو').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /بهترین متخصصان را پیدا کنید/ })).toBeVisible()
    await expect(page.getByRole('button', { name: 'جستجو' })).toBeVisible()
    
    // Check that navigation is properly styled for mobile
    await expect(page.getByRole('link', { name: 'ورود' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'ثبت نام' })).toBeVisible()
  })

  test('should handle empty form submission', async ({ page }) => {
    // Click search without selecting anything
    await page.getByRole('button', { name: 'جستجو' }).click()
    
    // Should still navigate to search page
    await expect(page).toHaveURL(/\/search/)
  })

  test('should show loading state and then content', async ({ page }) => {
    // Navigate to page and check for loading indicators
    await page.goto('/')
    
    // Wait for content to load
    await expect(page.getByText('بهترین متخصصان را پیدا کنید')).toBeVisible({ timeout: 10000 })
    
    // Ensure no loading indicators remain
    await expect(page.getByText('در حال بارگذاری اطلاعات...')).not.toBeVisible()
  })
})