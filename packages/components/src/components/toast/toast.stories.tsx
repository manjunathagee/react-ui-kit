import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { 
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  useToast,
  toast as toastFn,
  Toaster
} from './toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toast notification component for displaying temporary messages.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Component to demonstrate the toast hook using global toaster
const ToastDemo = ({ variant = 'default' }: { variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' }) => {
  return (
    <div>
      <Button
        onClick={() => {
          if (variant === 'success') {
            toastFn.success({
              title: 'Success!',
              description: 'Your action was completed successfully.',
            })
          } else if (variant === 'destructive') {
            toastFn.error({
              title: 'Error occurred',
              description: 'There was a problem with your request.',
            })
          } else if (variant === 'warning') {
            toastFn.warning({
              title: 'Warning',
              description: 'Please check your input and try again.',
            })
          } else if (variant === 'info') {
            toastFn.info({
              title: 'Information',
              description: 'Here is some useful information for you.',
            })
          } else {
            toastFn.success({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
            })
          }
        }}
      >
        Show {variant.charAt(0).toUpperCase() + variant.slice(1)} Toast
      </Button>
      <Toaster />
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}

export const Success: Story = {
  render: () => <ToastDemo variant="success" />,
}

export const Warning: Story = {
  render: () => <ToastDemo variant="warning" />,
}

export const Error: Story = {
  render: () => <ToastDemo variant="destructive" />,
}

export const Info: Story = {
  render: () => <ToastDemo variant="info" />,
}

export const WithAction: Story = {
  render: () => {
    const ToastWithAction = () => {
      const { toast } = useToast()

      return (
        <div>
          <Button
            onClick={() => {
              toast({
                title: 'Uh oh! Something went wrong',
                description: 'There was a problem with your request.',
                action: (
                  <ToastAction altText="Try again">
                    Try again
                  </ToastAction>
                ),
                variant: 'destructive',
              })
            }}
          >
            Show Toast with Action
          </Button>
          <Toaster />
        </div>
      )
    }

    return <ToastWithAction />
  },
}

export const ConvenienceMethods: Story = {
  render: () => {
    const ConvenienceDemo = () => {
      return (
        <div>
          <div className="space-x-2">
            <Button onClick={() => toastFn.success({ title: 'Success!', description: 'Operation completed successfully.' })}>
              Success Toast
            </Button>
            <Button onClick={() => toastFn.error({ title: 'Error!', description: 'Something went wrong.' })}>
              Error Toast
            </Button>
            <Button onClick={() => toastFn.warning({ title: 'Warning!', description: 'Please check your input.' })}>
              Warning Toast
            </Button>
            <Button onClick={() => toastFn.info({ title: 'Info', description: 'Here is some information.' })}>
              Info Toast
            </Button>
          </div>
          <Toaster />
        </div>
      )
    }
    
    return <ConvenienceDemo />
  },
}

export const ManualToast: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div className="grid gap-1">
          <ToastTitle>Scheduled: Catch up</ToastTitle>
          <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
}

export const PracticalExample: Story = {
  render: () => {
    const PracticalDemo = () => {
      const handleSave = () => {
        // Simulate a save operation
        toastFn.success({
          title: 'Settings saved',
          description: 'Your preferences have been updated successfully.',
        })
      }

      const handleDelete = () => {
        // Simulate a delete operation with confirmation
        toastFn.error({
          title: 'Delete failed',
          description: 'Unable to delete item. Please try again.',
        })
      }

      const handleWarning = () => {
        // Simulate a warning scenario
        toastFn.warning({
          title: 'Storage almost full',
          description: 'You have used 90% of your storage space.',
        })
      }

      const handleInfo = () => {
        // Simulate an info notification
        toastFn.info({
          title: 'New feature available',
          description: 'Check out the new dashboard analytics.',
        })
      }

      return (
        <div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Practical Toast Examples</h3>
            <div className="space-x-2">
              <Button onClick={handleSave} variant="default">
                Save Settings
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                Delete Item
              </Button>
              <Button onClick={handleWarning} variant="outline">
                Show Warning
              </Button>
              <Button onClick={handleInfo} variant="secondary">
                Show Info
              </Button>
            </div>
          </div>
          <Toaster />
        </div>
      )
    }

    return <PracticalDemo />
  },
}