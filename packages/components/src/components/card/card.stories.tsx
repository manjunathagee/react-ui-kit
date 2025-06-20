import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, SimpleCard } from './card'
import { Button } from '../button'
import { Badge } from '../badge'
import { Heart, MessageCircle, Share, Star, User, Calendar, MapPin } from 'lucide-react'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    interactive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description goes here. This provides context about the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm" className="ml-auto">Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <Card variant="default" className="w-80">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card with border and shadow</CardDescription>
        </CardHeader>
        <CardContent>Default styling with subtle shadow</CardContent>
      </Card>

      <Card variant="elevated" className="w-80">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Enhanced shadow for prominence</CardDescription>
        </CardHeader>
        <CardContent>More pronounced shadow effect</CardContent>
      </Card>

      <Card variant="outlined" className="w-80">
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>Emphasized border, no shadow</CardDescription>
        </CardHeader>
        <CardContent>Clean outline style</CardContent>
      </Card>

      <Card variant="filled" className="w-80">
        <CardHeader>
          <CardTitle>Filled Card</CardTitle>
          <CardDescription>Muted background color</CardDescription>
        </CardHeader>
        <CardContent>Subtle background fill</CardContent>
      </Card>

      <Card variant="ghost" className="w-80">
        <CardHeader>
          <CardTitle>Ghost Card</CardTitle>
          <CardDescription>Minimal styling, transparent</CardDescription>
        </CardHeader>
        <CardContent>No border or background</CardContent>
      </Card>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Card size="sm" className="w-80">
        <CardHeader size="sm">
          <CardTitle size="sm">Small Card</CardTitle>
          <CardDescription size="sm">Compact spacing and text</CardDescription>
        </CardHeader>
        <CardContent size="sm">Condensed content area</CardContent>
      </Card>

      <Card size="md" className="w-80">
        <CardHeader size="md">
          <CardTitle size="md">Medium Card</CardTitle>
          <CardDescription size="md">Standard spacing and text</CardDescription>
        </CardHeader>
        <CardContent size="md">Default content area</CardContent>
      </Card>

      <Card size="lg" className="w-80">
        <CardHeader size="lg">
          <CardTitle size="lg">Large Card</CardTitle>
          <CardDescription size="lg">Generous spacing and text</CardDescription>
        </CardHeader>
        <CardContent size="lg">Spacious content area</CardContent>
      </Card>

      <Card size="xl" className="w-80">
        <CardHeader size="xl">
          <CardTitle size="xl">Extra Large Card</CardTitle>
          <CardDescription size="xl">Maximum spacing and text</CardDescription>
        </CardHeader>
        <CardContent size="xl">Very spacious content area</CardContent>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card interactive className="w-80">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click to interact</CardDescription>
        </CardHeader>
        <CardContent>This card responds to hover and focus</CardContent>
      </Card>

      <Card className="w-80">
        <CardHeader>
          <CardTitle>Static Card</CardTitle>
          <CardDescription>No interaction</CardDescription>
        </CardHeader>
        <CardContent>This card has no interactive states</CardContent>
      </Card>
    </div>
  ),
}

// Content Examples
export const WithImage: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400"></div>
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardDescription>A stunning view from our recent trip</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This image was captured during our hiking adventure in the mountains.</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>24</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>8</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          <span className="text-2xl">📱</span>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Premium Smartphone</CardTitle>
          <Badge variant="secondary">New</Badge>
        </div>
        <CardDescription>Latest model with advanced features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$999</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-muted text-muted-foreground" />
            <span className="text-sm text-muted-foreground ml-1">(4.2)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>Sarah Johnson</CardTitle>
            <CardDescription>Product Designer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined March 2023</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Message</Button>
        <Button size="sm" className="ml-auto">Follow</Button>
      </CardFooter>
    </Card>
  ),
}

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <span className="text-sm">💰</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth</CardTitle>
          <span className="text-sm">📈</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12.5%</div>
          <p className="text-xs text-muted-foreground">+2% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Simple Card Examples
export const SimpleCardBasic: Story = {
  render: () => (
    <SimpleCard
      title="Simple Card"
      description="This is a simple card using the SimpleCard component"
      className="w-80"
    >
      <p>Easy to use card with predefined structure.</p>
    </SimpleCard>
  ),
}

export const SimpleCardWithImage: Story = {
  render: () => (
    <SimpleCard
      title="Mountain Adventure"
      description="Explore the beautiful landscapes"
      image="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Cpath d='M0 150 L100 100 L200 120 L300 80 L400 100 L400 200 L0 200 Z' fill='%236b7280'/%3E%3Cpath d='M0 170 L150 130 L250 140 L400 120 L400 200 L0 200 Z' fill='%234b5563'/%3E%3C/svg%3E"
      imageAlt="Mountain landscape"
      footer={<span className="text-sm text-muted-foreground">2 days ago</span>}
      action={<Button size="sm">View Details</Button>}
      className="w-80"
    >
      <p>Join us for an unforgettable hiking experience through scenic mountain trails.</p>
    </SimpleCard>
  ),
}

export const SimpleCardVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SimpleCard
        variant="elevated"
        title="Elevated Style"
        description="Enhanced shadow effect"
        className="w-80"
      >
        <p>This card has an elevated appearance.</p>
      </SimpleCard>

      <SimpleCard
        variant="outlined"
        title="Outlined Style"
        description="Clean border design"
        className="w-80"
      >
        <p>This card emphasizes the border.</p>
      </SimpleCard>
    </div>
  ),
}