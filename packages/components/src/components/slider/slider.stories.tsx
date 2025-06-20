import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Feedback/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider component for selecting values from a range. All examples include proper width containers for easy interaction.',
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
  render: () => (
    <div className="w-96">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="w-96">
      <Slider defaultValue={[25]} max={100} step={1} showValue />
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="w-96">
      <Slider defaultValue={[25, 75]} max={100} step={1} showValue />
    </div>
  ),
}

export const WithMarks: Story = {
  render: () => (
    <div className="w-96">
      <Slider 
        defaultValue={[50]} 
        max={100} 
        step={25} 
        showMarks 
        marks={[
          { value: 0, label: '0%' },
          { value: 25, label: '25%' },
          { value: 50, label: '50%' },
          { value: 75, label: '75%' },
          { value: 100, label: '100%' },
        ]}
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <p className="text-sm font-medium mb-4">Small</p>
        <Slider size="sm" defaultValue={[33]} showValue />
      </div>
      <div>
        <p className="text-sm font-medium mb-4">Medium (default)</p>
        <Slider size="md" defaultValue={[50]} showValue />
      </div>
      <div>
        <p className="text-sm font-medium mb-4">Large</p>
        <Slider size="lg" defaultValue={[67]} showValue />
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-64 w-32 flex justify-center">
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
  render: () => (
    <div className="w-96">
      <Slider defaultValue={[50]} max={100} step={1} disabled showValue />
    </div>
  ),
}

export const CustomFormatting: Story = {
  render: () => (
    <div className="w-96">
      <Slider 
        defaultValue={[25]} 
        max={100} 
        step={1} 
        showValue 
        formatValue={(value: number) => `$${value}`}
      />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState([50])
    const [rangeValue, setRangeValue] = React.useState([20, 80])
    
    return (
      <div className="space-y-8 w-96">
        <div>
          <p className="text-sm font-medium mb-4">Single Value: {value[0]}</p>
          <Slider 
            value={value} 
            onValueChange={setValue} 
            max={100} 
            step={1} 
            showValue 
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Range: {rangeValue[0]} - {rangeValue[1]}</p>
          <Slider 
            value={rangeValue} 
            onValueChange={setRangeValue} 
            max={100} 
            step={1} 
            showValue 
          />
        </div>
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-6">Basic Sliders</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Simple Slider</p>
            <Slider defaultValue={[30]} max={100} step={1} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">With Value Display</p>
            <Slider defaultValue={[45]} max={100} step={1} showValue />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Range Slider</p>
            <Slider defaultValue={[20, 75]} max={100} step={1} showValue />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-6">With Marks</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Step Marks</p>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={10} 
              showMarks 
              showValue 
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Custom Marks</p>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={1} 
              showMarks 
              showValue
              marks={[
                { value: 0, label: 'Min' },
                { value: 25, label: 'Low' },
                { value: 50, label: 'Med' },
                { value: 75, label: 'High' },
                { value: 100, label: 'Max' },
              ]}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-6">Specialized</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Temperature (°C)</p>
            <Slider 
              defaultValue={[22]} 
              min={-10}
              max={40} 
              step={1} 
              showValue
              formatValue={(value) => `${value}°C`}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Price Range</p>
            <Slider 
              defaultValue={[25, 175]} 
              min={0}
              max={200} 
              step={5} 
              showValue
              formatValue={(value) => `$${value}`}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Volume (Disabled)</p>
            <Slider 
              defaultValue={[60]} 
              max={100} 
              step={1} 
              disabled
              showValue
              formatValue={(value) => `${value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}