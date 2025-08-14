import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card with default classes', () => {
      render(<Card data-testid="card">Card content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
    })

    it('accepts custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      let ref: HTMLDivElement | null = null
      render(<Card ref={(el) => { ref = el }}>Content</Card>)
      expect(ref).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardHeader', () => {
    it('renders card header with correct classes', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('can contain CardTitle and CardDescription', () => {
      render(
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      )
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })
  })

  describe('CardTitle', () => {
    it('renders as h3 by default with correct classes', () => {
      render(<CardTitle>Card Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
      expect(title).toHaveTextContent('Card Title')
    })

    it('accepts custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveClass('custom-title')
    })
  })

  describe('CardDescription', () => {
    it('renders paragraph with correct classes', () => {
      render(<CardDescription>Card description text</CardDescription>)
      const description = screen.getByText('Card description text')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
      expect(description.tagName).toBe('P')
    })

    it('accepts custom className', () => {
      render(<CardDescription className="custom-desc">Description</CardDescription>)
      const description = screen.getByText('Description')
      expect(description).toHaveClass('custom-desc')
    })
  })

  describe('CardContent', () => {
    it('renders with correct padding classes', () => {
      render(<CardContent data-testid="content">Card content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('can contain any content', () => {
      render(
        <CardContent>
          <p>Paragraph content</p>
          <button>Button in content</button>
        </CardContent>
      )
      expect(screen.getByText('Paragraph content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Button in content' })).toBeInTheDocument()
    })
  })

  describe('CardFooter', () => {
    it('renders with correct flex classes', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('can contain buttons and other elements', () => {
      render(
        <CardFooter>
          <button>Cancel</button>
          <button>Submit</button>
        </CardFooter>
      )
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })
  })

  describe('Complete Card Structure', () => {
    it('renders complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Service Card</CardTitle>
            <CardDescription>This is a service description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content with details about the service</p>
          </CardContent>
          <CardFooter>
            <button>Learn More</button>
          </CardFooter>
        </Card>
      )

      const card = screen.getByTestId('complete-card')
      expect(card).toBeInTheDocument()
      
      expect(screen.getByRole('heading', { name: 'Service Card' })).toBeInTheDocument()
      expect(screen.getByText('This is a service description')).toBeInTheDocument()
      expect(screen.getByText('Card content with details about the service')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument()
    })

    it('maintains proper semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
            <CardDescription>Accessible description</CardDescription>
          </CardHeader>
          <CardContent>
            Accessible content
          </CardContent>
        </Card>
      )

      // Check that header comes before content
      const title = screen.getByRole('heading', { name: 'Accessible Card' })
      const content = screen.getByText('Accessible content')
      expect(title.compareDocumentPosition(content)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    })
  })
})