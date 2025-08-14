import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { LandingSearchForm } from '@/components/landing-search-form'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

const mockPush = vi.fn()
const mockRouter = {
  push: mockPush,
  replace: vi.fn(),
  refresh: vi.fn(),
}

const mockServices = [
  {
    id: 1,
    name: 'خدمات منزل',
    sub_services: [
      { id: 1, name: 'تعمیرات لوازم خانگی' },
      { id: 2, name: 'نظافت منزل' },
    ],
  },
  {
    id: 2,
    name: 'خدمات آموزشی',
    sub_services: [
      { id: 3, name: 'تدریس ریاضی' },
      { id: 4, name: 'آموزش زبان انگلیسی' },
    ],
  },
]

const mockLocations = [
  { id: 1, name: 'تهران' },
  { id: 2, name: 'اصفهان' },
  { id: 3, name: 'شیراز' },
]

describe('LandingSearchForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as any).mockReturnValue(mockRouter)
  })

  it('renders search form with correct elements', () => {
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    expect(screen.getByText('جستجوی خدمات')).toBeInTheDocument()
    expect(screen.getByText('خدمت مورد نیاز خود را پیدا کنید')).toBeInTheDocument()
    expect(screen.getByText('نوع خدمت')).toBeInTheDocument()
    expect(screen.getByText('موقعیت مکانی')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'جستجو' })).toBeInTheDocument()
  })

  it('displays service categories and sub-services correctly', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const serviceSelect = screen.getByRole('combobox', { name: /نوع خدمت/i })
    await user.click(serviceSelect)

    await waitFor(() => {
      expect(screen.getByText('خدمات منزل')).toBeInTheDocument()
      expect(screen.getByText('تعمیرات لوازم خانگی')).toBeInTheDocument()
      expect(screen.getByText('نظافت منزل')).toBeInTheDocument()
      expect(screen.getByText('خدمات آموزشی')).toBeInTheDocument()
    })
  })

  it('displays locations correctly', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const locationSelect = screen.getByRole('combobox', { name: /موقعیت مکانی/i })
    await user.click(locationSelect)

    await waitFor(() => {
      expect(screen.getByText('تهران')).toBeInTheDocument()
      expect(screen.getByText('اصفهان')).toBeInTheDocument()
      expect(screen.getByText('شیراز')).toBeInTheDocument()
    })
  })

  it('submits form with selected service and location', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    // Select service
    const serviceSelect = screen.getByRole('combobox', { name: /نوع خدمت/i })
    await user.click(serviceSelect)
    await user.click(screen.getByText('تعمیرات لوازم خانگی'))

    // Select location
    const locationSelect = screen.getByRole('combobox', { name: /موقعیت مکانی/i })
    await user.click(locationSelect)
    await user.click(screen.getByText('تهران'))

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'جستجو' })
    await user.click(submitButton)

    expect(mockPush).toHaveBeenCalledWith('/search?serviceId=1&locationId=1')
  })

  it('submits form with only service selected', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    // Select only service
    const serviceSelect = screen.getByRole('combobox', { name: /نوع خدمت/i })
    await user.click(serviceSelect)
    await user.click(screen.getByText('نظافت منزل'))

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'جستجو' })
    await user.click(submitButton)

    expect(mockPush).toHaveBeenCalledWith('/search?serviceId=2')
  })

  it('submits form with only location selected', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    // Select only location
    const locationSelect = screen.getByRole('combobox', { name: /موقعیت مکانی/i })
    await user.click(locationSelect)
    await user.click(screen.getByText('اصفهان'))

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'جستجو' })
    await user.click(submitButton)

    expect(mockPush).toHaveBeenCalledWith('/search?locationId=2')
  })

  it('submits empty form (navigates to search without params)', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const submitButton = screen.getByRole('button', { name: 'جستجو' })
    await user.click(submitButton)

    expect(mockPush).toHaveBeenCalledWith('/search?')
  })

  it('handles quick suggestion clicks', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const suggestionButton = screen.getByRole('button', { name: 'تعمیرات لوازم خانگی' })
    await user.click(suggestionButton)

    expect(mockPush).toHaveBeenCalledWith('/search?serviceId=1')
  })

  it('displays quick suggestions correctly', () => {
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    expect(screen.getByText('جستجوهای محبوب:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'تعمیرات لوازم خانگی' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'نظافت منزل' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'تدریس خصوصی' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'طراحی گرافیک' })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const serviceSelect = screen.getByRole('combobox', { name: /نوع خدمت/i })
    const locationSelect = screen.getByRole('combobox', { name: /موقعیت مکانی/i })
    const submitButton = screen.getByRole('button', { name: 'جستجو' })

    expect(serviceSelect).toHaveAttribute('id', 'service-type')
    expect(locationSelect).toHaveAttribute('id', 'location')
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup()
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockPush).toHaveBeenCalledWith('/search?')
  })

  it('displays icons correctly', () => {
    render(
      <LandingSearchForm services={mockServices} locations={mockLocations} />
    )

    // Check for search icon in title and button
    const searchIcons = screen.getAllByTestId('search-icon') || screen.getAllByRole('img')
    expect(searchIcons.length).toBeGreaterThan(0)
  })
})