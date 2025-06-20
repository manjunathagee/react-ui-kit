import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Badge, DotBadge, BadgeWrapper } from './badge'
import { CheckCircle, Mail, Star, User, X } from 'lucide-react'
import { Button } from '../button/button'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['default', 'rounded', 'square'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

// Shape Variants
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge shape="default">Default</Badge>
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="square">Square</Badge>
    </div>
  ),
}

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <CheckCircle className="h-3 w-3" />,
    children: 'Verified',
    variant: 'success',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: <X className="h-3 w-3" />,
    children: 'Removable',
    variant: 'destructive',
  },
}

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Star className="h-3 w-3" />,
    rightIcon: <X className="h-3 w-3" />,
    children: 'Premium',
    variant: 'warning',
  },
}

// Count Badges
export const CountBadge: Story = {
  args: {
    count: 5,
    variant: 'destructive',
  },
}

export const CountBadgeWithMax: Story = {
  args: {
    count: 150,
    max: 99,
    variant: 'info',
  },
}

export const ZeroBadge: Story = {
  args: {
    count: 0,
    showZero: true,
    variant: 'secondary',
  },
}

export const ZeroBadgeHidden: Story = {
  args: {
    count: 0,
    showZero: false,
    variant: 'secondary',
  },
}

// Dot Badge Examples
export const DotBadgeDefault: Story = {
  render: () => (
    <div className="relative inline-block">
      <Button variant="outline" size="sm">
        Notifications
      </Button>
      <DotBadge />
    </div>
  ),
}

export const DotBadgeVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Default</Button>
        <DotBadge variant="default" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Success</Button>
        <DotBadge variant="success" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Warning</Button>
        <DotBadge variant="warning" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Info</Button>
        <DotBadge variant="info" />
      </div>
    </div>
  ),
}

export const DotBadgePositions: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Top Right</Button>
        <DotBadge position="top-right" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Top Left</Button>
        <DotBadge position="top-left" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Bottom Right</Button>
        <DotBadge position="bottom-right" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Bottom Left</Button>
        <DotBadge position="bottom-left" />
      </div>
    </div>
  ),
}

export const DotBadgeSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Small</Button>
        <DotBadge size="sm" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Medium</Button>
        <DotBadge size="md" />
      </div>
      <div className="relative inline-block">
        <Button variant="outline" size="sm">Large</Button>
        <DotBadge size="lg" />
      </div>
    </div>
  ),
}

// Badge Wrapper Examples
export const BadgeWrapperWithCount: Story = {
  render: () => (
    <BadgeWrapper badge="3" badgeProps={{ variant: 'destructive', size: 'sm' }}>
      <Button variant="outline">
        <Mail className="h-4 w-4 mr-2" />
        Messages
      </Button>
    </BadgeWrapper>
  ),
}

export const BadgeWrapperWithDot: Story = {
  render: () => (
    <BadgeWrapper dotBadge dotBadgeProps={{ variant: 'success' }}>
      <Button variant="outline">
        <User className="h-4 w-4 mr-2" />
        Profile
      </Button>
    </BadgeWrapper>
  ),
}

export const BadgeWrapperBoth: Story = {
  render: () => (
    <div className="flex gap-4">
      <BadgeWrapper 
        badge="12" 
        badgeProps={{ variant: 'destructive', size: 'sm' }}
      >
        <Button variant="outline">Notifications</Button>
      </BadgeWrapper>
      
      <BadgeWrapper 
        dotBadge 
        dotBadgeProps={{ variant: 'warning', position: 'top-left' }}
      >
        <Button variant="outline">Status</Button>
      </BadgeWrapper>
    </div>
  ),
}

// Comprehensive Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge size="sm" variant="info">Small</Badge>
        <Badge size="md" variant="info">Medium</Badge>
        <Badge size="lg" variant="info">Large</Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge shape="default" variant="warning">Default Shape</Badge>
        <Badge shape="rounded" variant="warning">Rounded</Badge>
        <Badge shape="square" variant="warning">Square</Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge leftIcon={<Star className="h-3 w-3" />} variant="success">With Icon</Badge>
        <Badge count={42} variant="destructive" />
        <Badge count={100} max={99} variant="info" />
      </div>
    </div>
  ),
}

// Status Examples
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">User Status</h3>
        <div className="flex gap-2">
          <Badge variant="success" leftIcon={<CheckCircle className="h-3 w-3" />}>
            Online
          </Badge>
          <Badge variant="warning">Away</Badge>
          <Badge variant="destructive">Busy</Badge>
          <Badge variant="secondary">Offline</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Order Status</h3>
        <div className="flex gap-2">
          <Badge variant="info">Processing</Badge>
          <Badge variant="warning">Shipped</Badge>
          <Badge variant="success">Delivered</Badge>
          <Badge variant="destructive">Cancelled</Badge>
        </div>
      </div>
    </div>
  ),
}