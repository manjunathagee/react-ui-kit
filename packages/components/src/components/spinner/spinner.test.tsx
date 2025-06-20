import { render, screen } from '@testing-library/react'
import { Spinner, DotsSpinner, PulseSpinner } from './spinner'

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Spinner size="lg" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('h-8', 'w-8')
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<Spinner variant="success" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('text-green-600')
  })

  it('applies speed classes correctly', () => {
    const { container } = render(<Spinner speed="fast" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('animate-[spin_0.5s_linear_infinite]')
  })

  it('renders with custom label', () => {
    render(<Spinner label="Processing..." />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Processing...')
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('hides label text when srOnly is true', () => {
    render(<Spinner label="Loading data" srOnly={true} />)
    
    const label = screen.getByText('Loading data')
    expect(label).toHaveClass('sr-only')
  })

  it('shows label text when srOnly is false', () => {
    render(<Spinner label="Loading data" srOnly={false} />)
    
    const label = screen.getByText('Loading data')
    expect(label).not.toHaveClass('sr-only')
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('custom-spinner')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Spinner ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders with extra small size', () => {
    const { container } = render(<Spinner size="xs" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('h-3', 'w-3')
  })

  it('renders with extra large size', () => {
    const { container } = render(<Spinner size="xl" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('h-12', 'w-12')
  })

  it('renders destructive variant correctly', () => {
    const { container } = render(<Spinner variant="destructive" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('text-destructive')
  })

  it('renders slow speed correctly', () => {
    const { container } = render(<Spinner speed="slow" />)
    
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('animate-[spin_2s_linear_infinite]')
  })
})

describe('DotsSpinner', () => {
  it('renders with default props', () => {
    render(<DotsSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders three dots', () => {
    const { container } = render(<DotsSpinner />)
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    expect(dots).toHaveLength(3)
  })

  it('applies size classes correctly', () => {
    const { container } = render(<DotsSpinner size="lg" />)
    
    const dotsContainer = container.querySelector('[class*="space-x-"]')
    expect(dotsContainer).toBeInTheDocument()
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    dots.forEach(dot => {
      expect(dot).toHaveClass('h-3', 'w-3')
    })
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<DotsSpinner variant="success" />)
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    dots.forEach(dot => {
      expect(dot).toHaveClass('bg-green-600')
    })
  })

  it('renders with custom label', () => {
    render(<DotsSpinner label="Loading content..." />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading content...')
    expect(screen.getByText('Loading content...')).toBeInTheDocument()
  })

  it('hides label text when srOnly is true', () => {
    render(<DotsSpinner label="Loading" srOnly={true} />)
    
    const label = screen.getByText('Loading')
    expect(label).toHaveClass('sr-only')
  })

  it('shows label text when srOnly is false', () => {
    render(<DotsSpinner label="Loading" srOnly={false} />)
    
    const label = screen.getByText('Loading')
    expect(label).not.toHaveClass('sr-only')
  })

  it('applies animation delay to dots', () => {
    const { container } = render(<DotsSpinner />)
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    expect(dots[0]).toHaveStyle('animation-delay: 0s')
    expect(dots[1]).toHaveStyle('animation-delay: 0.2s')
    expect(dots[2]).toHaveStyle('animation-delay: 0.4s')
  })

  it('applies custom className', () => {
    render(<DotsSpinner className="custom-dots" />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('custom-dots')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<DotsSpinner ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders extra small size correctly', () => {
    const { container } = render(<DotsSpinner size="xs" />)
    
    const dotsContainer = container.querySelector('[class*="space-x-"]')
    expect(dotsContainer).toBeInTheDocument()
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    dots.forEach(dot => {
      expect(dot).toHaveClass('h-1', 'w-1')
    })
  })

  it('renders extra large size correctly', () => {
    const { container } = render(<DotsSpinner size="xl" />)
    
    const dotsContainer = container.querySelector('[class*="space-x-"]')
    expect(dotsContainer).toBeInTheDocument()
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    dots.forEach(dot => {
      expect(dot).toHaveClass('h-4', 'w-4')
    })
  })

  it('renders destructive variant correctly', () => {
    const { container } = render(<DotsSpinner variant="destructive" />)
    
    const dots = container.querySelectorAll('div[class*="rounded-full"]')
    dots.forEach(dot => {
      expect(dot).toHaveClass('bg-destructive')
    })
  })
})

describe('PulseSpinner', () => {
  it('renders with default props', () => {
    render(<PulseSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders pulse element', () => {
    const { container } = render(<PulseSpinner />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container } = render(<PulseSpinner size="lg" />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toHaveClass('h-16', 'w-16')
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<PulseSpinner variant="success" />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toHaveClass('bg-green-600/20')
  })

  it('renders with custom label', () => {
    render(<PulseSpinner label="Processing data..." />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Processing data...')
    expect(screen.getByText('Processing data...')).toBeInTheDocument()
  })

  it('hides label text when srOnly is true', () => {
    render(<PulseSpinner label="Loading" srOnly={true} />)
    
    const label = screen.getByText('Loading')
    expect(label).toHaveClass('sr-only')
  })

  it('shows label text when srOnly is false', () => {
    render(<PulseSpinner label="Loading" srOnly={false} />)
    
    const label = screen.getByText('Loading')
    expect(label).not.toHaveClass('sr-only')
  })

  it('applies custom className', () => {
    render(<PulseSpinner className="custom-pulse" />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('custom-pulse')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<PulseSpinner ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders extra small size correctly', () => {
    const { container } = render(<PulseSpinner size="xs" />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toHaveClass('h-6', 'w-6')
  })

  it('renders extra large size correctly', () => {
    const { container } = render(<PulseSpinner size="xl" />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toHaveClass('h-24', 'w-24')
  })

  it('renders destructive variant correctly', () => {
    const { container } = render(<PulseSpinner variant="destructive" />)
    
    const pulse = container.querySelector('div[class*="animate-pulse"]')
    expect(pulse).toHaveClass('bg-destructive/20')
  })
})