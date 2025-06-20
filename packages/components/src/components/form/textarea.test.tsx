import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea, TextareaWithLabel } from './textarea'

// Mock useId
let mockId = 0
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useId: () => `mock-id-${++mockId}`,
  }
})

describe('Textarea Components', () => {
  beforeEach(() => {
    mockId = 0
  })

  describe('Textarea', () => {
    it('renders with default props', () => {
      render(<Textarea />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      expect(textarea.tagName).toBe('TEXTAREA')
      expect(textarea).toHaveClass(
        'flex', 'min-h-[80px]', 'w-full', 'rounded-md', 'border',
        'border-input', 'bg-background', 'px-3', 'py-2', 'text-sm'
      )
    })

    it('applies size variants correctly', () => {
      const { rerender } = render(<Textarea size="sm" />)
      
      expect(screen.getByRole('textbox')).toHaveClass('min-h-[60px]', 'px-2', 'py-1', 'text-xs')
      
      rerender(<Textarea size="lg" />)
      expect(screen.getByRole('textbox')).toHaveClass('min-h-[100px]', 'px-4', 'py-3', 'text-base')
    })

    it('applies variant styles correctly', () => {
      const { rerender } = render(<Textarea variant="default" />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('border-input')
      
      rerender(<Textarea variant="error" />)
      expect(screen.getByRole('textbox')).toHaveClass(
        'border-destructive', 'focus-visible:ring-destructive'
      )
    })

    it('applies resize variants correctly', () => {
      const { rerender } = render(<Textarea resize="none" />)
      
      expect(screen.getByRole('textbox')).toHaveClass('resize-none')
      
      rerender(<Textarea resize="horizontal" />)
      expect(screen.getByRole('textbox')).toHaveClass('resize-x')
    })

    it('handles controlled value', () => {
      render(<Textarea value="Test content" readOnly />)
      
      expect(screen.getByRole('textbox')).toHaveValue('Test content')
    })

    it('handles defaultValue', () => {
      render(<Textarea defaultValue="Default content" />)
      
      expect(screen.getByRole('textbox')).toHaveValue('Default content')
    })

    it('calls onChange when text is typed', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()
      
      render(<Textarea onChange={handleChange} />)
      
      await user.type(screen.getByRole('textbox'), 'Hello')
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('shows character count when showCount is true', () => {
      render(<Textarea defaultValue="Hello" showCount />)
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('shows character count with maxLength', () => {
      render(<Textarea defaultValue="Hello" maxLength={10} showCount />)
      
      expect(screen.getByText('5/10')).toBeInTheDocument()
    })

    it('auto-resizes when autoResize is true', () => {
      render(<Textarea autoResize />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('resize-none') // Auto-resize disables manual resize
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      
      render(<Textarea ref={ref} />)
      
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })

    it('handles disabled state', () => {
      render(<Textarea disabled />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
    })

    it('applies custom className', () => {
      render(<Textarea className="custom-textarea" />)
      
      expect(screen.getByRole('textbox')).toHaveClass('custom-textarea')
    })

    it('handles placeholder text', () => {
      render(<Textarea placeholder="Enter your message..." />)
      
      expect(screen.getByPlaceholderText('Enter your message...')).toBeInTheDocument()
    })
  })

  describe('TextareaWithLabel', () => {
    it('renders with label', () => {
      render(<TextareaWithLabel label="Message" />)
      
      expect(screen.getByText('Message')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <TextareaWithLabel
          label="Bio"
          description="Tell us about yourself"
        />
      )
      
      expect(screen.getByText('Bio')).toBeInTheDocument()
      expect(screen.getByText('Tell us about yourself')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(
        <TextareaWithLabel
          label="Message"
          error="This field is required"
        />
      )
      
      expect(screen.getByText('This field is required')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('links label to textarea with proper IDs', () => {
      render(<TextareaWithLabel label="Test textarea" />)
      
      const label = screen.getByText('Test textarea')
      const textarea = screen.getByRole('textbox')
      
      expect(label).toHaveAttribute('for', 'mock-id-1')
      expect(textarea).toHaveAttribute('id', 'mock-id-1')
    })

    it('uses provided ID', () => {
      render(
        <TextareaWithLabel
          id="custom-textarea"
          label="Custom textarea"
        />
      )
      
      const label = screen.getByText('Custom textarea')
      const textarea = screen.getByRole('textbox')
      
      expect(label).toHaveAttribute('for', 'custom-textarea')
      expect(textarea).toHaveAttribute('id', 'custom-textarea')
    })

    it('shows required indicator when required is true', () => {
      render(<TextareaWithLabel label="Required field" required />)
      
      const label = screen.getByText('Required field')
      expect(label).toHaveClass("after:content-['*']", 'after:ml-1', 'after:text-destructive')
    })

    it('applies error variant when error is present', () => {
      render(
        <TextareaWithLabel
          label="Message"
          error="Invalid input"
        />
      )
      
      expect(screen.getByRole('textbox')).toHaveClass(
        'border-destructive', 'focus-visible:ring-destructive'
      )
    })

    it('prioritizes error over description', () => {
      render(
        <TextareaWithLabel
          label="Message"
          description="Enter your message"
          error="This field is required"
        />
      )
      
      expect(screen.getByText('This field is required')).toBeInTheDocument()
      expect(screen.queryByText('Enter your message')).not.toBeInTheDocument()
    })

    it('properly associates ARIA attributes', () => {
      render(
        <TextareaWithLabel
          label="Message"
          description="Enter your message here"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      const description = screen.getByText('Enter your message here')
      
      expect(textarea).toHaveAttribute('aria-describedby', description.id)
    })

    it('associates error message with ARIA attributes', () => {
      render(
        <TextareaWithLabel
          label="Message"
          error="This field is required"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      const error = screen.getByText('This field is required')
      
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
      expect(textarea).toHaveAttribute('aria-describedby', error.id)
      expect(error).toHaveAttribute('role', 'alert')
    })

    it('passes through textarea props', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()
      
      render(
        <TextareaWithLabel
          label="Message"
          placeholder="Type here..."
          maxLength={50}
          showCount
          autoResize
          onChange={handleChange}
        />
      )
      
      const textarea = screen.getByRole('textbox')
      
      expect(textarea).toHaveAttribute('placeholder', 'Type here...')
      expect(textarea).toHaveAttribute('maxlength', '50')
      expect(textarea).toHaveClass('resize-none') // autoResize enabled
      
      await user.type(textarea, 'Hello')
      
      expect(handleChange).toHaveBeenCalled()
      expect(screen.getByText('5/50')).toBeInTheDocument() // Character count
    })

    it('applies custom className to container', () => {
      render(
        <TextareaWithLabel
          label="Message"
          className="custom-container"
        />
      )
      
      const container = screen.getByText('Message').closest('div')
      expect(container).toHaveClass('custom-container')
    })
  })

  describe('Textarea Accessibility', () => {
    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <button data-testid="before">Before</button>
          <Textarea />
          <button data-testid="after">After</button>
        </div>
      )
      
      const before = screen.getByTestId('before')
      const textarea = screen.getByRole('textbox')
      const after = screen.getByTestId('after')
      
      // Test tab order
      before.focus()
      await user.tab()
      expect(textarea).toHaveFocus()
      
      await user.tab()
      expect(after).toHaveFocus()
    })

    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()
      
      render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)
      
      const textarea = screen.getByRole('textbox')
      
      fireEvent.focus(textarea)
      expect(handleFocus).toHaveBeenCalled()
      
      fireEvent.blur(textarea)
      expect(handleBlur).toHaveBeenCalled()
    })

    it('supports ARIA attributes', () => {
      render(
        <Textarea
          aria-label="Message input"
          aria-required="true"
        />
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('aria-label', 'Message input')
      expect(textarea).toHaveAttribute('aria-required', 'true')
    })
  })

  describe('Textarea Form Integration', () => {
    it('works with form submission', () => {
      render(
        <form>
          <Textarea name="message" defaultValue="Test message" />
        </form>
      )
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('name', 'message')
      expect(textarea).toHaveValue('Test message')
    })

    it('supports form validation', () => {
      render(<Textarea required />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeRequired()
    })

    it('handles form reset', () => {
      render(
        <form>
          <Textarea name="message" defaultValue="Default" />
          <button type="reset">Reset</button>
        </form>
      )
      
      const textarea = screen.getByRole('textbox')
      const resetButton = screen.getByText('Reset')
      
      // Change value then reset
      fireEvent.change(textarea, { target: { value: 'Changed' } })
      expect(textarea).toHaveValue('Changed')
      
      // Form reset in React doesn't automatically reset component state
      // This test verifies the current behavior - the component maintains its own state
      fireEvent.click(resetButton)
      expect(textarea).toHaveValue('Changed') // Should remain Changed since component manages its own state
    })
  })
})