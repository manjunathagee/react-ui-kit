import type { Meta, StoryObj } from '@storybook/react'
import { Progress, CircularProgress } from './progress'
import { Button } from '../button/button'
import * as React from 'react'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: 'number',
      min: 0,
      max: 100,
    },
    max: {
      control: 'number',
      min: 1,
      max: 1000,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    value: 60,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
}

export const WithCustomLabel: Story = {
  args: {
    value: 45,
    label: 'Upload Progress',
    showLabel: true,
  },
}

export const CustomFormat: Story = {
  args: {
    value: 3,
    max: 10,
    showLabel: true,
    formatLabel: (value, max) => `${value} of ${max} items`,
  },
}

// Variants
export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
    label: 'Complete!',
  },
}

export const Warning: Story = {
  args: {
    value: 85,
    variant: 'warning',
    showLabel: true,
    label: 'Almost Full',
  },
}

export const Destructive: Story = {
  args: {
    value: 95,
    variant: 'destructive',
    showLabel: true,
    label: 'Critical',
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Progress value={60} size="sm" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium</p>
        <Progress value={60} size="md" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
}

// Indeterminate
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
}

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0)
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
      }, 500)
      return () => clearTimeout(timer)
    }, [progress])
    
    return (
      <div className="space-y-4">
        <Progress value={progress} showLabel />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setProgress(0)}>
            Reset
          </Button>
          <Button size="sm" onClick={() => setProgress(25)}>
            25%
          </Button>
          <Button size="sm" onClick={() => setProgress(50)}>
            50%
          </Button>
          <Button size="sm" onClick={() => setProgress(75)}>
            75%
          </Button>
          <Button size="sm" onClick={() => setProgress(100)}>
            100%
          </Button>
        </div>
      </div>
    )
  },
}

// File Upload Example
export const FileUpload: Story = {
  render: () => {
    const [uploads, setUploads] = React.useState([
      { name: 'document.pdf', progress: 100, status: 'complete' },
      { name: 'image.jpg', progress: 65, status: 'uploading' },
      { name: 'video.mp4', progress: 30, status: 'uploading' },
      { name: 'presentation.pptx', progress: 0, status: 'error' },
    ])
    
    return (
      <div className="space-y-3">
        <h3 className="font-medium">File Uploads</h3>
        {uploads.map((file, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{file.name}</span>
              <span className={
                file.status === 'complete' ? 'text-green-600' :
                file.status === 'error' ? 'text-red-600' :
                'text-blue-600'
              }>
                {file.status === 'complete' ? 'Complete' :
                 file.status === 'error' ? 'Failed' :
                 `${file.progress}%`}
              </span>
            </div>
            <Progress
              value={file.progress}
              variant={
                file.status === 'complete' ? 'success' :
                file.status === 'error' ? 'destructive' :
                'default'
              }
              size="sm"
            />
          </div>
        ))}
      </div>
    )
  },
}

// Circular Progress Examples
export const CircularDefault: Story = {
  render: () => <CircularProgress value={75} showLabel />,
}

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <CircularProgress value={60} size="sm" showLabel />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <CircularProgress value={60} size="md" showLabel />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <CircularProgress value={60} size="lg" showLabel />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <CircularProgress value={60} size="xl" showLabel />
        <p className="text-xs mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

export const CircularVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <CircularProgress value={75} variant="default" showLabel />
        <p className="text-xs mt-2">Default</p>
      </div>
      <div className="text-center">
        <CircularProgress value={100} variant="success" showLabel />
        <p className="text-xs mt-2">Success</p>
      </div>
      <div className="text-center">
        <CircularProgress value={85} variant="warning" showLabel />
        <p className="text-xs mt-2">Warning</p>
      </div>
      <div className="text-center">
        <CircularProgress value={95} variant="destructive" showLabel />
        <p className="text-xs mt-2">Critical</p>
      </div>
    </div>
  ),
}

export const CircularIndeterminate: Story = {
  render: () => (
    <div className="text-center">
      <CircularProgress indeterminate />
      <p className="text-sm mt-2">Loading...</p>
    </div>
  ),
}

// Dashboard Example
export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Storage Usage</h3>
        <CircularProgress value={68} variant="info" showLabel strokeWidth={6} />
        <p className="text-xs text-muted-foreground mt-2">6.8 GB of 10 GB used</p>
      </div>
      
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Memory</h3>
        <CircularProgress value={45} variant="success" showLabel />
        <p className="text-xs text-muted-foreground mt-2">4.5 GB of 10 GB used</p>
      </div>
      
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">CPU</h3>
        <CircularProgress value={92} variant="destructive" showLabel />
        <p className="text-xs text-muted-foreground mt-2">High usage detected</p>
      </div>
      
      <div className="p-4 border rounded-lg md:col-span-2 lg:col-span-3">
        <h3 className="font-medium mb-3">Project Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Frontend Development</span>
              <span>85%</span>
            </div>
            <Progress value={85} variant="success" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Backend API</span>
              <span>60%</span>
            </div>
            <Progress value={60} variant="default" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Testing</span>
              <span>30%</span>
            </div>
            <Progress value={30} variant="warning" />
          </div>
        </div>
      </div>
    </div>
  ),
}

// Multi-step Process
export const MultiStep: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(2)
    const steps = [
      'Account Setup',
      'Profile Information', 
      'Preferences',
      'Verification',
      'Complete'
    ]
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Registration Progress</h3>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        
        <Progress 
          value={(currentStep / steps.length) * 100} 
          showLabel
          formatLabel={(value) => `${Math.round(value)}% Complete`}
        />
        
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 text-sm ${
                index < currentStep ? 'text-green-600' :
                index === currentStep ? 'text-blue-600' :
                'text-muted-foreground'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                index < currentStep ? 'bg-green-600' :
                index === currentStep ? 'bg-blue-600' :
                'bg-muted-foreground'
              }`} />
              {step}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            size="sm"
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
        </div>
      </div>
    )
  },
}