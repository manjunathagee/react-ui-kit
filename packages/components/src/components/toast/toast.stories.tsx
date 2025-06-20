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
  toast as toastFn
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

// Component to demonstrate the toast hook
const ToastDemo = ({ variant = 'default' }: { variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' }) => {
  const { toast } = useToast()

  return (
    <ToastProvider>
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            variant,
          })
        }}
      >
        Show Toast
      </Button>
      <ToastViewport />
    </ToastProvider>
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
        <ToastProvider>
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
          <ToastViewport />
        </ToastProvider>
      )
    }

    return <ToastWithAction />
  },
}

export const ConvenienceMethods: Story = {
  render: () => (
    <ToastProvider>
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
      <ToastViewport />
    </ToastProvider>
  ),
}

export const ManualToast: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
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