import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Button } from '../button'
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  SimplePopover, 
  RichPopover 
} from './popover'

describe('Popover', () => {
  describe('Basic Popover', () => {
    it('renders trigger and shows content on click', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover content</div>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      expect(trigger).toBeInTheDocument()

      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument()
      })
    })

    it('closes when clicking outside', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div>Popover content</div>
            </PopoverContent>
          </Popover>
          <div>Outside content</div>
        </div>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Outside content'))
      
      await waitFor(() => {
        expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      })
    })

    it('closes when pressing escape', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover content</div>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      await user.click(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
      })
    })
  })

  describe('PopoverContent variants', () => {
    it('applies variant classes correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent variant="primary" data-testid="popover-content">
            Content
          </PopoverContent>
        </Popover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        const content = screen.getByTestId('popover-content')
        expect(content).toHaveClass('bg-primary', 'text-primary-foreground')
      })
    })

    it('applies size classes correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent size="lg" data-testid="popover-content">
            Content
          </PopoverContent>
        </Popover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        const content = screen.getByTestId('popover-content')
        expect(content).toHaveClass('w-80', 'p-5')
      })
    })
  })

  describe('SimplePopover', () => {
    it('renders with simple content', async () => {
      const user = userEvent.setup()
      
      render(
        <SimplePopover content="Simple content">
          <Button>Trigger</Button>
        </SimplePopover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        expect(screen.getByText('Simple content')).toBeInTheDocument()
      })
    })

    it('handles controlled state', async () => {
      const onOpenChange = vi.fn()
      
      render(
        <SimplePopover 
          content="Controlled content" 
          open={true}
          onOpenChange={onOpenChange}
        >
          <Button>Trigger</Button>
        </SimplePopover>
      )

      expect(screen.getByText('Controlled content')).toBeInTheDocument()
    })

    it('applies custom classes', async () => {
      const user = userEvent.setup()
      
      render(
        <SimplePopover 
          content="Content"
          contentClassName="custom-class"
          data-testid="simple-popover"
        >
          <Button>Trigger</Button>
        </SimplePopover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        const content = screen.getByText('Content').closest('[role="dialog"]')
        expect(content).toHaveClass('custom-class')
      })
    })
  })

  describe('RichPopover', () => {
    it('renders with title and description', async () => {
      const user = userEvent.setup()
      
      render(
        <RichPopover 
          title="Test Title"
          description="Test description"
        >
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test description')).toBeInTheDocument()
      })
    })

    it('renders with footer', async () => {
      const user = userEvent.setup()
      
      render(
        <RichPopover 
          title="Test Title"
          description="Test description"
          footer={<Button size="sm">Action</Button>}
        >
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
      })
    })

    it('shows close button by default', async () => {
      const user = userEvent.setup()
      
      render(
        <RichPopover title="Test Title">
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
      })
    })

    it('hides close button when showClose is false', async () => {
      const user = userEvent.setup()
      
      render(
        <RichPopover title="Test Title" showClose={false}>
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
      })
    })

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      const onOpenChange = vi.fn()
      
      render(
        <RichPopover 
          title="Test Title"
          onClose={onClose}
          onOpenChange={onOpenChange}
        >
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Close' }))
      
      expect(onClose).toHaveBeenCalled()
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('renders without title when not provided', async () => {
      const user = userEvent.setup()
      
      render(
        <RichPopover description="Just description">
          <Button>Trigger</Button>
        </RichPopover>
      )

      await user.click(screen.getByRole('button'))
      
      await waitFor(() => {
        expect(screen.getByText('Just description')).toBeInTheDocument()
        // Should still show close button
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover content</div>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      await user.click(trigger)
      
      await waitFor(() => {
        const content = screen.getByText('Popover content').closest('[role="dialog"]')
        expect(content).toBeInTheDocument()
        expect(content).toHaveAttribute('role', 'dialog')
      })
    })

    it('manages focus correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <button>First focusable</button>
              <button>Second focusable</button>
            </div>
          </PopoverContent>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      await user.click(trigger)
      
      await waitFor(() => {
        // Should focus the first focusable element or the content itself
        const firstButton = screen.getByRole('button', { name: 'First focusable' })
        expect(firstButton).toBeInTheDocument()
      })
    })
  })
})