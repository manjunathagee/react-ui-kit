import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </>
    ),
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </>
    ),
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action cannot be undone. This will permanently delete your data.
        </AlertDescription>
      </>
    ),
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </>
    ),
  },
}

export const InfoAlert: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          New features are available! Check out the latest updates.
        </AlertDescription>
      </>
    ),
  },
}

// Size Variants
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <Info className="h-3 w-3" />
        <AlertTitle>Small Alert</AlertTitle>
        <AlertDescription>
          This is a small alert with condensed spacing.
        </AlertDescription>
      </>
    ),
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <Info className="h-5 w-5" />
        <AlertTitle>Large Alert</AlertTitle>
        <AlertDescription>
          This is a large alert with expanded spacing and larger text.
        </AlertDescription>
      </>
    ),
  },
}

// Content Variations
export const WithoutIcon: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Simple Alert</AlertTitle>
        <AlertDescription>
          This alert doesn't have an icon, just title and description.
        </AlertDescription>
      </>
    ),
  },
}

export const DescriptionOnly: Story = {
  args: {
    children: (
      <>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This alert only has a description without a title.
        </AlertDescription>
      </>
    ),
  },
}

export const TitleOnly: Story = {
  args: {
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical System Alert</AlertTitle>
      </>
    ),
  },
}

// Interactive Examples
export const Dismissible: Story = {
  render: () => {
    const [show, setShow] = React.useState(true)
    
    if (!show) {
      return (
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Show Alert
        </button>
      )
    }
    
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <div className="flex-1">
          <AlertTitle>Dismissible Alert</AlertTitle>
          <AlertDescription>
            This alert can be dismissed by clicking the X button.
          </AlertDescription>
        </div>
        <button
          onClick={() => setShow(false)}
          className="ml-2 p-1 hover:bg-black/10 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    )
  },
}

// Multiple Alerts Showcase
export const MultipleVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          System maintenance scheduled for tonight at 2 AM EST.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Consider upgrading your plan.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to save changes. Please try again.
        </AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your profile has been updated successfully.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Responsive Layout
export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert className="flex-col sm:flex-row">
        <Info className="h-4 w-4 mb-2 sm:mb-0" />
        <div className="flex-1">
          <AlertTitle>Responsive Alert</AlertTitle>
          <AlertDescription>
            This alert stacks vertically on mobile and horizontally on desktop.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  ),
}

