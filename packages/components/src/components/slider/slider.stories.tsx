import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Feedback/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider component for selecting values from a range.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showValue: {
      control: 'boolean',
    },
    showMarks: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: [25],
    max: 100,
    step: 1,
    showValue: true,
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    showValue: true,
  },
}

export const WithMarks: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 25,
    showMarks: true,
    marks: [
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ],
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Slider size="sm" defaultValue={[33]} showValue />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (default)</p>
        <Slider size="md" defaultValue={[50]} showValue />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Slider size="lg" defaultValue={[67]} showValue />
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-48 w-20">
      <Slider
        orientation="vertical"
        defaultValue={[50]}
        max={100}
        step={1}
        showValue
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
    showValue: true,
  },
}

export const CustomFormatting: Story = {
  args: {
    defaultValue: [25],
    max: 100,
    step: 1,
    showValue: true,
    formatValue: (value: number) => `$${value}`,
  },
}