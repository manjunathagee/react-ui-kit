import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { 
  Avatar,
  AvatarImage,
  AvatarFallback,
  SimpleAvatar,
  AvatarGroup,
  AvatarWithStatus,
} from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample avatar URLs
const avatarUrls = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
]

// Basic Examples
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src={avatarUrls[0]} alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar size="xs">
        <AvatarImage src={avatarUrls[0]} alt="Extra small avatar" />
        <AvatarFallback size="xs">XS</AvatarFallback>
      </Avatar>
      
      <Avatar size="sm">
        <AvatarImage src={avatarUrls[1]} alt="Small avatar" />
        <AvatarFallback size="sm">SM</AvatarFallback>
      </Avatar>
      
      <Avatar size="md">
        <AvatarImage src={avatarUrls[2]} alt="Medium avatar" />
        <AvatarFallback size="md">MD</AvatarFallback>
      </Avatar>
      
      <Avatar size="lg">
        <AvatarImage src={avatarUrls[3]} alt="Large avatar" />
        <AvatarFallback size="lg">LG</AvatarFallback>
      </Avatar>
      
      <Avatar size="xl">
        <AvatarImage src={avatarUrls[4]} alt="Extra large avatar" />
        <AvatarFallback size="xl">XL</AvatarFallback>
      </Avatar>
      
      <Avatar size="2xl">
        <AvatarImage src={avatarUrls[0]} alt="2XL avatar" />
        <AvatarFallback size="2xl">2XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="text-center space-y-2">
        <Avatar variant="circle">
          <AvatarImage src={avatarUrls[0]} alt="Circle avatar" variant="circle" />
          <AvatarFallback variant="circle">C</AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">Circle</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar variant="rounded">
          <AvatarImage src={avatarUrls[1]} alt="Rounded avatar" variant="rounded" />
          <AvatarFallback variant="rounded">R</AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">Rounded</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar variant="square">
          <AvatarImage src={avatarUrls[2]} alt="Square avatar" variant="square" />
          <AvatarFallback variant="square">S</AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">Square</p>
      </div>
    </div>
  ),
}

// Simple Avatar Examples
export const SimpleAvatarBasic: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <SimpleAvatar 
        src={avatarUrls[0]} 
        name="John Doe" 
        alt="John's avatar" 
      />
      
      <SimpleAvatar 
        name="Jane Smith" 
        alt="Jane's avatar" 
      />
      
      <SimpleAvatar 
        fallback="AB" 
        alt="Custom fallback avatar" 
      />
    </div>
  ),
}

export const SimpleAvatarSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <SimpleAvatar size="xs" name="John Doe" />
      <SimpleAvatar size="sm" name="Jane Smith" />
      <SimpleAvatar size="md" name="Alice Brown" />
      <SimpleAvatar size="lg" name="Bob Johnson" />
      <SimpleAvatar size="xl" name="Carol White" />
      <SimpleAvatar size="2xl" name="David Lee" />
    </div>
  ),
}

export const SimpleAvatarVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <SimpleAvatar 
        variant="circle" 
        src={avatarUrls[0]} 
        name="Circle Avatar" 
      />
      <SimpleAvatar 
        variant="rounded" 
        src={avatarUrls[1]} 
        name="Rounded Avatar" 
      />
      <SimpleAvatar 
        variant="square" 
        src={avatarUrls[2]} 
        name="Square Avatar" 
      />
    </div>
  ),
}

// Avatar Group Examples
export const AvatarGroupBasic: Story = {
  render: () => (
    <AvatarGroup>
      <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
      <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
      <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
      <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
      <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
    </AvatarGroup>
  ),
}

export const AvatarGroupWithMax: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Max 3 avatars:</p>
        <AvatarGroup max={3}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
          <SimpleAvatar name="David Lee" />
          <SimpleAvatar name="Emma Wilson" />
        </AvatarGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">No overflow indicator:</p>
        <AvatarGroup max={4} showMore={false}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
          <SimpleAvatar name="David Lee" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

export const AvatarGroupSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Small:</p>
        <AvatarGroup size="sm" max={4}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
          <SimpleAvatar name="David Lee" />
        </AvatarGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Large:</p>
        <AvatarGroup size="lg" max={4}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
          <SimpleAvatar name="David Lee" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

export const AvatarGroupSpacing: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Tight spacing:</p>
        <AvatarGroup spacing="tight" max={4}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
        </AvatarGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Normal spacing:</p>
        <AvatarGroup spacing="normal" max={4}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
        </AvatarGroup>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Loose spacing:</p>
        <AvatarGroup spacing="loose" max={4}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
        </AvatarGroup>
      </div>
    </div>
  ),
}

// Avatar with Status Examples
export const AvatarWithStatusBasic: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="text-center space-y-2">
        <AvatarWithStatus 
          src={avatarUrls[0]} 
          name="John Doe" 
          status="online" 
        />
        <p className="text-sm text-muted-foreground">Online</p>
      </div>
      
      <div className="text-center space-y-2">
        <AvatarWithStatus 
          src={avatarUrls[1]} 
          name="Jane Smith" 
          status="away" 
        />
        <p className="text-sm text-muted-foreground">Away</p>
      </div>
      
      <div className="text-center space-y-2">
        <AvatarWithStatus 
          src={avatarUrls[2]} 
          name="Alice Brown" 
          status="busy" 
        />
        <p className="text-sm text-muted-foreground">Busy</p>
      </div>
      
      <div className="text-center space-y-2">
        <AvatarWithStatus 
          src={avatarUrls[3]} 
          name="Bob Johnson" 
          status="offline" 
        />
        <p className="text-sm text-muted-foreground">Offline</p>
      </div>
    </div>
  ),
}

export const AvatarWithStatusSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <AvatarWithStatus size="sm" name="John Doe" status="online" />
      <AvatarWithStatus size="md" name="Jane Smith" status="away" />
      <AvatarWithStatus size="lg" name="Alice Brown" status="busy" />
      <AvatarWithStatus size="xl" name="Bob Johnson" status="offline" />
    </div>
  ),
}

// Complex Examples
export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <AvatarWithStatus 
        size="xl" 
        src={avatarUrls[0]} 
        name="Sarah Johnson" 
        status="online" 
      />
      <div>
        <h3 className="text-lg font-semibold">Sarah Johnson</h3>
        <p className="text-sm text-muted-foreground">Product Designer</p>
        <p className="text-xs text-green-600 flex items-center mt-1">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Currently online
        </p>
      </div>
    </div>
  ),
}

export const TeamMembers: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Team Members</h3>
        <AvatarGroup max={3}>
          <SimpleAvatar src={avatarUrls[0]} name="John Doe" />
          <SimpleAvatar src={avatarUrls[1]} name="Jane Smith" />
          <SimpleAvatar src={avatarUrls[2]} name="Alice Brown" />
          <SimpleAvatar src={avatarUrls[3]} name="Bob Johnson" />
          <SimpleAvatar src={avatarUrls[4]} name="Carol White" />
          <SimpleAvatar name="David Lee" />
        </AvatarGroup>
      </div>
      
      <div className="space-y-3">
        {[
          { name: 'John Doe', role: 'Team Lead', status: 'online' as const },
          { name: 'Jane Smith', role: 'Developer', status: 'away' as const },
          { name: 'Alice Brown', role: 'Designer', status: 'busy' as const },
          { name: 'Bob Johnson', role: 'Developer', status: 'offline' as const },
        ].map((member, index) => (
          <div key={member.name} className="flex items-center space-x-3">
            <AvatarWithStatus 
              src={avatarUrls[index]} 
              name={member.name} 
              status={member.status}
              size="sm"
            />
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}