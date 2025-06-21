import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SimpleBreadcrumb,
} from './breadcrumb'

describe('Breadcrumb', () => {
  describe('Basic Breadcrumb', () => {
    it('renders breadcrumb with navigation role', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('renders breadcrumb items and links', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
      expect(screen.getByText('Current Page')).toBeInTheDocument()
    })

    it('applies size classes correctly', () => {
      render(
        <Breadcrumb size="lg" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const breadcrumb = screen.getByTestId('breadcrumb')
      expect(breadcrumb).toHaveClass('text-base')
    })
  })

  describe('BreadcrumbPage', () => {
    it('has correct aria-current attribute', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const currentPage = screen.getByText('Current Page')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
      expect(currentPage).toHaveAttribute('role', 'link')
    })
  })

  describe('BreadcrumbSeparator', () => {
    it('renders default separator icon', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const separator = screen.getByTestId('separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveAttribute('role', 'presentation')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders custom separator content', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByText('/')).toBeInTheDocument()
    })

    it('applies size classes to separator', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="lg" data-testid="separator" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const separator = screen.getByTestId('separator')
      expect(separator).toHaveClass('text-base', 'mx-2')
    })
  })

  describe('BreadcrumbEllipsis', () => {
    it('renders ellipsis with correct attributes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const ellipsis = screen.getByTestId('ellipsis')
      expect(ellipsis).toBeInTheDocument()
      expect(ellipsis).toHaveAttribute('role', 'presentation')
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
      expect(screen.getByText('More')).toBeInTheDocument() // Screen reader text
    })
  })

  describe('SimpleBreadcrumb', () => {
    const mockItems = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', current: true },
    ]

    it('renders items from array', () => {
      render(<SimpleBreadcrumb items={mockItems} />)

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Electronics' })).toBeInTheDocument()
      expect(screen.getByText('Smartphones')).toBeInTheDocument()
    })

    it('handles current item correctly', () => {
      render(<SimpleBreadcrumb items={mockItems} />)

      const currentItem = screen.getByText('Smartphones')
      expect(currentItem).toHaveAttribute('aria-current', 'page')
    })

    it('renders home icon when showHome is true', () => {
      render(<SimpleBreadcrumb items={mockItems.slice(1)} showHome />)

      const homeLink = screen.getByRole('link', { name: '' }) // Home icon has no text
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('handles custom separator', () => {
      render(<SimpleBreadcrumb items={mockItems} separator="/" />)

      // Should have separators between items
      const separators = screen.getAllByText('/')
      expect(separators).toHaveLength(mockItems.length - 1)
    })

    it('handles maxItems with ellipsis', () => {
      const manyItems = [
        { label: 'Home', href: '/' },
        { label: 'Level 1', href: '/level1' },
        { label: 'Level 2', href: '/level1/level2' },
        { label: 'Level 3', href: '/level1/level2/level3' },
        { label: 'Level 4', href: '/level1/level2/level3/level4' },
        { label: 'Current', current: true },
      ]

      render(<SimpleBreadcrumb items={manyItems} maxItems={4} />)

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByText('More')).toBeInTheDocument() // Ellipsis
      expect(screen.getByText('Current')).toBeInTheDocument()
    })

    it('calls onItemClick when item is clicked', async () => {
      const onItemClick = vi.fn()
      const user = userEvent.setup()

      const itemsWithClick = [
        { label: 'Home', onClick: vi.fn() },
        { label: 'Products', onClick: vi.fn() },
        { label: 'Current', current: true },
      ]

      render(
        <SimpleBreadcrumb 
          items={itemsWithClick} 
          onItemClick={onItemClick}
        />
      )

      const homeButton = screen.getByRole('button', { name: 'Home' })
      await user.click(homeButton)

      expect(itemsWithClick[0].onClick).toHaveBeenCalled()
      expect(onItemClick).toHaveBeenCalledWith(itemsWithClick[0], 0)
    })

    it('renders items with icons', () => {
      const itemsWithIcons = [
        { 
          label: 'Home', 
          href: '/',
          icon: <span data-testid="home-icon">🏠</span>
        },
        { 
          label: 'Products', 
          href: '/products',
          icon: <span data-testid="products-icon">📦</span>
        },
        { label: 'Current', current: true },
      ]

      render(<SimpleBreadcrumb items={itemsWithIcons} />)

      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
      expect(screen.getByTestId('products-icon')).toBeInTheDocument()
    })

    it('applies size prop correctly', () => {
      render(
        <SimpleBreadcrumb 
          items={mockItems} 
          size="lg" 
          data-testid="simple-breadcrumb"
        />
      )

      const breadcrumb = screen.getByTestId('simple-breadcrumb')
      expect(breadcrumb).toHaveClass('text-base')
    })
  })

  describe('BreadcrumbLink', () => {
    it('renders as anchor by default', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/test">Test Link</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })

    it('supports asChild prop', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button>Custom Button</button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const button = screen.getByRole('button', { name: 'Custom Button' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    const mockItems = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current', current: true },
    ]
    
    it('has proper navigation structure', () => {
      render(
        <SimpleBreadcrumb items={mockItems} />
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')

      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThan(0)
    })

    it('manages focus correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      const homeLink = screen.getByRole('link', { name: 'Home' })
      const productsLink = screen.getByRole('link', { name: 'Products' })

      await user.tab()
      expect(homeLink).toHaveFocus()

      await user.tab()
      expect(productsLink).toHaveFocus()
    })
  })
})