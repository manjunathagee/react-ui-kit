import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Button } from '../button'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  SimpleTooltip,
  RichTooltip,
} from './tooltip'

const meta: Meta<typeof SimpleTooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: SimpleTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component for displaying contextual information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'success', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button variant="outline">Hover me</Button>,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <SimpleTooltip content="Default tooltip" variant="default">
        <Button variant="outline">Default</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Primary tooltip" variant="primary">
        <Button variant="outline">Primary</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Secondary tooltip" variant="secondary">
        <Button variant="outline">Secondary</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Success tooltip" variant="success">
        <Button variant="outline">Success</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Warning tooltip" variant="warning">
        <Button variant="outline">Warning</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Destructive tooltip" variant="destructive">
        <Button variant="outline">Error</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Info tooltip" variant="info">
        <Button variant="outline">Info</Button>
      </SimpleTooltip>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleTooltip content="Small tooltip" size="sm">
        <Button variant="outline">Small</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Medium tooltip" size="md">
        <Button variant="outline">Medium</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Large tooltip" size="lg">
        <Button variant="outline">Large</Button>
      </SimpleTooltip>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 place-items-center">
      <SimpleTooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </SimpleTooltip>
    </div>
  ),
}

export const Rich: Story = {
  render: () => (
    <div className="flex gap-4">
      <RichTooltip
        title="Rich Tooltip"
        description="This tooltip has both a title and description, perfect for more detailed explanations."
      >
        <Button variant="outline">Rich Tooltip</Button>
      </RichTooltip>
      <RichTooltip
        title="Action Required"
        description="Please save your work before continuing with this action."
        variant="warning"
      >
        <Button variant="destructive">Delete</Button>
      </RichTooltip>
    </div>
  ),
}

export const ManualControl: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Manual Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip is manually controlled</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const LongContent: Story = {
  render: () => (
    <SimpleTooltip
      content="This is a very long tooltip content that demonstrates how the tooltip handles longer text. It should wrap nicely and remain readable."
      size="lg"
    >
      <Button variant="outline">Long Content</Button>
    </SimpleTooltip>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleTooltip
        content="Fast tooltip (100ms delay)"
        delayDuration={100}
      >
        <Button variant="outline">Fast</Button>
      </SimpleTooltip>
      <SimpleTooltip
        content="Default tooltip (700ms delay)"
        delayDuration={700}
      >
        <Button variant="outline">Default</Button>
      </SimpleTooltip>
      <SimpleTooltip
        content="Slow tooltip (1500ms delay)"
        delayDuration={1500}
      >
        <Button variant="outline">Slow</Button>
      </SimpleTooltip>
    </div>
  ),
}