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
    icon: false,
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
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    ),
  },
}

export const TitleOnly: Story = {
  args: {
    variant: 'warning',
    children: (
      <AlertTitle>Critical System Alert</AlertTitle>
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
      <Alert dismissible onDismiss={() => setShow(false)}>
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>
          This alert can be dismissed by clicking the X button.
        </AlertDescription>
      </Alert>
    )
  },
}

// Multiple Alerts Showcase
export const MultipleVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          System maintenance scheduled for tonight at 2 AM EST.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Consider upgrading your plan.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to save changes. Please try again.
        </AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your profile has been updated successfully.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Custom Icons
export const CustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert icon={<CheckCircle className="h-4 w-4" />}>
        <AlertTitle>Custom Icon</AlertTitle>
        <AlertDescription>
          This alert uses a custom icon instead of the default variant icon.
        </AlertDescription>
      </Alert>
      
      <Alert variant="info" icon={<AlertTriangle className="h-4 w-4" />}>
        <AlertTitle>Info with Warning Icon</AlertTitle>
        <AlertDescription>
          This info alert uses a warning icon to show custom icon override.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Dismissible Examples
export const DismissibleVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" dismissible>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning" dismissible>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review your settings before proceeding.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive" dismissible>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert size="sm" variant="info">
        <AlertTitle>Small Alert</AlertTitle>
        <AlertDescription>
          Compact alert with smaller padding and text.
        </AlertDescription>
      </Alert>
      
      <Alert size="md" variant="info">
        <AlertTitle>Medium Alert (Default)</AlertTitle>
        <AlertDescription>
          Standard alert with default padding and text size.
        </AlertDescription>
      </Alert>
      
      <Alert size="lg" variant="info">
        <AlertTitle>Large Alert</AlertTitle>
        <AlertDescription>
          Spacious alert with larger padding and text for emphasis.
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
        <AlertTitle>Responsive Alert</AlertTitle>
        <AlertDescription>
          This alert stacks vertically on mobile and horizontally on desktop.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

