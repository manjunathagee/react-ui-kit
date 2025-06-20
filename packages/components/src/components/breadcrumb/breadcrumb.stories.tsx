import type { Meta, StoryObj } from '@storybook/react'
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

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => (
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
          <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Smartphones</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const WithCustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <Breadcrumb size="sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="sm" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="sm" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (Default)</h3>
        <Breadcrumb size="md">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="md" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="md" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <Breadcrumb size="lg">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="lg" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator size="lg" />
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  ),
}

export const SimpleBreadcrumbStory: Story = {
  name: 'Simple Breadcrumb',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Simple Breadcrumb</h3>
        <SimpleBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Smartphones', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">With Home Icon</h3>
        <SimpleBreadcrumb
          showHome
          items={[
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Smartphones', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">With Custom Separator</h3>
        <SimpleBreadcrumb
          separator="→"
          items={[
            { label: 'Docs', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Navigation', href: '/docs/components/navigation' },
            { label: 'Breadcrumb', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">With Icons</h3>
        <SimpleBreadcrumb
          items={[
            { 
              label: 'Dashboard', 
              href: '/dashboard',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
            { 
              label: 'Projects', 
              href: '/projects',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )
            },
            { 
              label: 'React UI Kit', 
              current: true,
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )
            },
          ]}
        />
      </div>
    </div>
  ),
}

export const WithOverflow: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Max 4 Items (Auto Ellipsis)</h3>
        <SimpleBreadcrumb
          maxItems={4}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Computers', href: '/products/electronics/computers' },
            { label: 'Laptops', href: '/products/electronics/computers/laptops' },
            { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
            { label: 'ASUS ROG', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Max 3 Items</h3>
        <SimpleBreadcrumb
          maxItems={3}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Navigation', href: '/docs/components/navigation' },
            { label: 'Breadcrumb', href: '/docs/components/navigation/breadcrumb' },
            { label: 'Examples', current: true },
          ]}
        />
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('/products/electronics/smartphones')
    
    const pathItems = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', href: '/products/electronics/smartphones' },
    ]

    const handleItemClick = (item: any) => {
      if (item.href) {
        setCurrentPath(item.href)
      }
    }

    const processedItems = pathItems.map(item => ({
      ...item,
      current: item.href === currentPath,
      onClick: () => handleItemClick(item),
    }))

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Interactive Breadcrumb</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Current path: {currentPath}
          </p>
          <SimpleBreadcrumb
            items={processedItems}
            onItemClick={handleItemClick}
          />
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            Quick navigation:
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPath('/')}
              className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
            >
              Go to Home
            </button>
            <button
              onClick={() => setCurrentPath('/products')}
              className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
            >
              Go to Products
            </button>
            <button
              onClick={() => setCurrentPath('/products/electronics/smartphones')}
              className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
            >
              Go to Smartphones
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const CustomSeparators: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Arrow Separator</h3>
        <SimpleBreadcrumb
          separator="→"
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Team', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Slash Separator</h3>
        <SimpleBreadcrumb
          separator="/"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Tech Articles', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Dot Separator</h3>
        <SimpleBreadcrumb
          separator="•"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Web Development', current: true },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Icon Separator</h3>
        <SimpleBreadcrumb
          separator={
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          }
          items={[
            { label: 'Home', href: '/' },
            { label: 'Portfolio', href: '/portfolio' },
            { label: 'Web Projects', current: true },
          ]}
        />
      </div>
    </div>
  ),
}