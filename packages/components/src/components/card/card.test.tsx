import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SimpleCard,
} from './card'

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card data-testid="card">Card content</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Card data-testid="card" variant="elevated" />)
    expect(screen.getByTestId('card')).toHaveClass('shadow-md')

    rerender(<Card data-testid="card" variant="outlined" />)
    expect(screen.getByTestId('card')).toHaveClass('border-2')

    rerender(<Card data-testid="card" variant="filled" />)
    expect(screen.getByTestId('card')).toHaveClass('bg-muted')

    rerender(<Card data-testid="card" variant="ghost" />)
    expect(screen.getByTestId('card')).toHaveClass('border-transparent')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Card data-testid="card" size="sm" />)
    expect(screen.getByTestId('card')).toHaveClass('p-3')

    rerender(<Card data-testid="card" size="lg" />)
    expect(screen.getByTestId('card')).toHaveClass('p-6')
  })

  it('applies interactive classes when interactive', () => {
    render(<Card data-testid="card" interactive />)
    expect(screen.getByTestId('card')).toHaveClass('cursor-pointer')
  })

  it('applies custom className', () => {
    render(<Card data-testid="card" className="custom-class" />)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(<CardHeader data-testid="header">Header content</CardHeader>)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    render(<CardHeader data-testid="header" size="lg" />)
    expect(screen.getByTestId('header')).toHaveClass('p-6')
  })
})

describe('CardTitle', () => {
  it('renders as h3 element', () => {
    render(<CardTitle>Card Title</CardTitle>)
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Card Title')
  })

  it('applies size classes correctly', () => {
    render(<CardTitle data-testid="title" size="lg">Title</CardTitle>)
    expect(screen.getByTestId('title')).toHaveClass('text-xl')
  })
})

describe('CardDescription', () => {
  it('renders correctly', () => {
    render(<CardDescription data-testid="description">Description text</CardDescription>)
    expect(screen.getByTestId('description')).toBeInTheDocument()
    expect(screen.getByTestId('description')).toHaveTextContent('Description text')
  })

  it('applies muted text color', () => {
    render(<CardDescription data-testid="description">Description</CardDescription>)
    expect(screen.getByTestId('description')).toHaveClass('text-muted-foreground')
  })
})

describe('CardContent', () => {
  it('renders correctly', () => {
    render(<CardContent data-testid="content">Content text</CardContent>)
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toHaveTextContent('Content text')
  })

  it('applies size classes correctly', () => {
    render(<CardContent data-testid="content" size="xl">Content</CardContent>)
    expect(screen.getByTestId('content')).toHaveClass('p-8')
  })
})

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(<CardFooter data-testid="footer">Footer content</CardFooter>)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toHaveTextContent('Footer content')
  })

  it('applies flex classes', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId('footer')).toHaveClass('flex', 'items-center')
  })
})

describe('SimpleCard', () => {
  it('renders with title and description', () => {
    render(
      <SimpleCard
        title="Test Title"
        description="Test Description"
        data-testid="simple-card"
      >
        Content
      </SimpleCard>
    )

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Title')
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders without optional parts when not provided', () => {
    render(<SimpleCard data-testid="simple-card">Just content</SimpleCard>)
    
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('Just content')).toBeInTheDocument()
  })

  it('renders with footer and action', () => {
    render(
      <SimpleCard
        title="Test"
        footer={<span>Footer text</span>}
        action={<button>Action</button>}
        data-testid="simple-card"
      >
        Content
      </SimpleCard>
    )

    expect(screen.getByText('Footer text')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('renders with image', () => {
    render(
      <SimpleCard
        title="Test"
        image="/test-image.jpg"
        imageAlt="Test image"
        data-testid="simple-card"
      >
        Content
      </SimpleCard>
    )

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('applies variant and size props correctly', () => {
    render(
      <SimpleCard
        variant="elevated"
        size="lg"
        data-testid="simple-card"
      />
    )

    expect(screen.getByTestId('simple-card')).toHaveClass('shadow-md')
    expect(screen.getByTestId('simple-card')).toHaveClass('p-6')
  })
})

describe('Card Compound Pattern', () => {
  it('renders complete card structure', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
        <CardFooter>
          <button>Test Action</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Title')
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Test Action' })).toBeInTheDocument()
  })
})

describe('Card Accessibility', () => {
  it('supports interactive cards with proper accessibility', () => {
    render(
      <Card
        interactive
        data-testid="interactive-card"
        role="button"
        tabIndex={0}
      >
        Interactive content
      </Card>
    )

    const card = screen.getByTestId('interactive-card')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('has proper heading structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
        </CardHeader>
      </Card>
    )

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Main Title')
  })
})