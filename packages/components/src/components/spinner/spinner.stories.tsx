import type { Meta, StoryObj } from '@storybook/react'
import { Spinner, DotsSpinner, PulseSpinner } from './spinner'
import { Button } from '../button/button'
import * as React from 'react'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'muted'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Loading...',
    srOnly: false,
  },
}

export const ScreenReaderOnly: Story = {
  args: {
    label: 'Loading content...',
    srOnly: true,
  },
}

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner size="xs" />
        <p className="text-xs mt-2">Extra Small</p>
      </div>
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

// Variant Colors
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner variant="default" />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <Spinner variant="secondary" />
        <p className="text-xs mt-2">Secondary</p>
      </div>
      <div className="text-center">
        <Spinner variant="destructive" />
        <p className="text-xs mt-2">Destructive</p>
      </div>
      <div className="text-center">
        <Spinner variant="success" />
        <p className="text-xs mt-2">Success</p>
      </div>
      <div className="text-center">
        <Spinner variant="warning" />
        <p className="text-xs mt-2">Warning</p>
      </div>
      <div className="text-center">
        <Spinner variant="muted" />
        <p className="text-xs mt-2">Muted</p>
      </div>
    </div>
  ),
}

// Speed Variants
export const Speeds: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner speed="slow" />
        <p className="text-xs mt-2">Slow</p>
      </div>
      <div className="text-center">
        <Spinner speed="normal" />
        <p className="text-xs mt-2">Normal</p>
      </div>
      <div className="text-center">
        <Spinner speed="fast" />
        <p className="text-xs mt-2">Fast</p>
      </div>
    </div>
  ),
}

// Dots Spinner Examples
export const DotsDefault: Story = {
  render: () => <DotsSpinner />,
}

export const DotsWithLabel: Story = {
  render: () => <DotsSpinner label="Processing..." srOnly={false} />,
}

export const DotsSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <DotsSpinner size="xs" />
        <p className="text-xs mt-2">Extra Small</p>
      </div>
      <div className="text-center">
        <DotsSpinner size="sm" />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <DotsSpinner size="md" />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <DotsSpinner size="lg" />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <DotsSpinner size="xl" />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

export const DotsVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <DotsSpinner variant="default" />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <DotsSpinner variant="secondary" />
        <p className="text-xs mt-2">Secondary</p>
      </div>
      <div className="text-center">
        <DotsSpinner variant="destructive" />
        <p className="text-xs mt-2">Destructive</p>
      </div>
      <div className="text-center">
        <DotsSpinner variant="success" />
        <p className="text-xs mt-2">Success</p>
      </div>
      <div className="text-center">
        <DotsSpinner variant="warning" />
        <p className="text-xs mt-2">Warning</p>
      </div>
      <div className="text-center">
        <DotsSpinner variant="muted" />
        <p className="text-xs mt-2">Muted</p>
      </div>
    </div>
  ),
}

// Pulse Spinner Examples
export const PulseDefault: Story = {
  render: () => <PulseSpinner />,
}

export const PulseWithLabel: Story = {
  render: () => <PulseSpinner label="Syncing..." srOnly={false} />,
}

export const PulseSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <PulseSpinner size="xs" />
        <p className="text-xs mt-2">Extra Small</p>
      </div>
      <div className="text-center">
        <PulseSpinner size="sm" />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <PulseSpinner size="md" />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <PulseSpinner size="lg" />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <PulseSpinner size="xl" />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

export const PulseVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <PulseSpinner variant="default" />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <PulseSpinner variant="secondary" />
        <p className="text-xs mt-2">Secondary</p>
      </div>
      <div className="text-center">
        <PulseSpinner variant="destructive" />
        <p className="text-xs mt-2">Destructive</p>
      </div>
      <div className="text-center">
        <PulseSpinner variant="success" />
        <p className="text-xs mt-2">Success</p>
      </div>
      <div className="text-center">
        <PulseSpinner variant="warning" />
        <p className="text-xs mt-2">Warning</p>
      </div>
      <div className="text-center">
        <PulseSpinner variant="muted" />
        <p className="text-xs mt-2">Muted</p>
      </div>
    </div>
  ),
}

// Button Loading States
export const ButtonLoadingStates: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false)
    
    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 3000)
    }
    
    return (
      <div className="flex gap-4">
        <Button onClick={handleClick} disabled={loading}>
          {loading && <Spinner size="sm" className="mr-2" />}
          {loading ? 'Loading...' : 'Click me'}
        </Button>
        
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          {loading && <DotsSpinner size="sm" className="mr-2" />}
          {loading ? 'Processing...' : 'Process'}
        </Button>
        
        <Button variant="secondary" onClick={handleClick} disabled={loading}>
          {loading && <PulseSpinner size="sm" className="mr-2" />}
          {loading ? 'Syncing...' : 'Sync'}
        </Button>
      </div>
    )
  },
}

// Loading Overlay Example
export const LoadingOverlay: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false)
    
    return (
      <div className="relative">
        <div className="p-6 border rounded-lg space-y-4">
          <h3 className="font-medium">Content Area</h3>
          <p className="text-sm text-muted-foreground">
            This is some content that might be loading. Toggle the loading state to see the overlay.
          </p>
          <Button onClick={() => setLoading(!loading)}>
            {loading ? 'Hide Loading' : 'Show Loading'}
          </Button>
        </div>
        
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-sm mt-2">Loading content...</p>
            </div>
          </div>
        )}
      </div>
    )
  },
}

// Data Fetching States
export const DataFetching: Story = {
  render: () => {
    const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    
    const fetchData = () => {
      setState('loading')
      // Simulate API call
      setTimeout(() => {
        setState(Math.random() > 0.7 ? 'error' : 'success')
      }, 2000)
    }
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={fetchData} disabled={state === 'loading'}>
            Fetch Data
          </Button>
          <Button variant="outline" onClick={() => setState('idle')}>
            Reset
          </Button>
        </div>
        
        <div className="border rounded-lg p-4 min-h-[120px] flex items-center justify-center">
          {state === 'idle' && (
            <p className="text-muted-foreground">Click "Fetch Data" to start</p>
          )}
          
          {state === 'loading' && (
            <div className="text-center">
              <DotsSpinner size="md" />
              <p className="text-sm mt-2">Fetching data...</p>
            </div>
          )}
          
          {state === 'success' && (
            <div className="text-center text-green-600">
              <p className="font-medium">✓ Data loaded successfully!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Here's your data content...
              </p>
            </div>
          )}
          
          {state === 'error' && (
            <div className="text-center text-red-600">
              <p className="font-medium">✗ Failed to load data</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please try again later
              </p>
            </div>
          )}
        </div>
      </div>
    )
  },
}

// Inline Loading Examples
export const InlineLoading: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <span>Loading user data...</span>
      </div>
      
      <div className="flex items-center gap-2">
        <DotsSpinner size="sm" />
        <span>Processing payment...</span>
      </div>
      
      <div className="flex items-center gap-2">
        <PulseSpinner size="sm" />
        <span>Syncing to cloud...</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Spinner size="xs" variant="success" />
        <span className="text-sm">Auto-saving draft</span>
      </div>
    </div>
  ),
}

// All Spinner Types Showcase
export const AllSpinnerTypes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4 text-center">
        <h3 className="font-medium">Standard Spinner</h3>
        <div className="space-y-3">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <p className="text-xs text-muted-foreground">
          Classic rotating spinner for general loading states
        </p>
      </div>
      
      <div className="space-y-4 text-center">
        <h3 className="font-medium">Dots Spinner</h3>
        <div className="space-y-3">
          <DotsSpinner size="sm" />
          <DotsSpinner size="md" />
          <DotsSpinner size="lg" />
        </div>
        <p className="text-xs text-muted-foreground">
          Pulsing dots for processing or thinking states
        </p>
      </div>
      
      <div className="space-y-4 text-center">
        <h3 className="font-medium">Pulse Spinner</h3>
        <div className="space-y-3">
          <PulseSpinner size="sm" />
          <PulseSpinner size="md" />
          <PulseSpinner size="lg" />
        </div>
        <p className="text-xs text-muted-foreground">
          Gentle pulse for subtle loading indicators
        </p>
      </div>
    </div>
  ),
}