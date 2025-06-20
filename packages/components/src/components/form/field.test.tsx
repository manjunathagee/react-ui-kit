import { render, screen } from '@testing-library/react'
import { Field, FieldError, FieldDescription } from './field'
import { FormProvider } from './form'
import { Label } from './label'
import { Input } from '../input'

// Mock useId to ensure consistent testing
let mockId = 0
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useId: () => `mock-id-${++mockId}`,
  }
})

describe('Field Components', () => {
  beforeEach(() => {
    mockId = 0
  })

  describe('Field', () => {
    it('renders with basic props', () => {
      render(
        <Field name="email">
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('generates unique IDs for form elements', () => {
      render(
        <Field name="email">
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      const label = screen.getByText('Email')
      const input = screen.getByRole('textbox')
      
      expect(label).toHaveAttribute('for', 'mock-id-1')
      expect(input).toHaveAttribute('id', 'mock-id-1')
    })

    it('uses provided ID', () => {
      render(
        <Field name="email">
          <Label htmlFor="custom-email">Email</Label>
          <Input id="custom-email" />
        </Field>
      )
      
      const label = screen.getByText('Email')
      const input = screen.getByRole('textbox')
      
      expect(label).toHaveAttribute('for', 'custom-email')
      expect(input).toHaveAttribute('id', 'custom-email')
    })

    it('displays field description', () => {
      render(
        <Field name="email" description="We'll never share your email">
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'mock-id-1-description'
      )
    })

    it('displays field error', () => {
      render(
        <Field name="email" error="Please enter a valid email">
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'mock-id-1-error'
      )
    })

    it('prioritizes error over description', () => {
      render(
        <Field 
          name="email" 
          description="Enter your email address"
          error="Invalid email format"
        >
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      expect(screen.getByText('Invalid email format')).toBeInTheDocument()
      expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'mock-id-1-error'
      )
    })

    it('applies layout variant correctly', () => {
      render(
        <Field name="email" layout="horizontal">
          <Label>Email</Label>
          <Input />
        </Field>
      )
      
      const fieldContainer = screen.getByText('Email').closest('div')
      expect(fieldContainer).toHaveClass('flex', 'items-center', 'space-x-4', 'space-y-0')
    })

    it('gets errors from form context', () => {
      const errors = { email: 'Email is required' }
      
      render(
        <FormProvider errors={errors}>
          <Field name="email">
            <Label>Email</Label>
            <Input />
          </Field>
        </FormProvider>
      )
      
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('local error overrides context error', () => {
      const errors = { email: 'Context error' }
      
      render(
        <FormProvider errors={errors}>
          <Field name="email" error="Local error">
            <Label>Email</Label>
            <Input />
          </Field>
        </FormProvider>
      )
      
      expect(screen.getByText('Local error')).toBeInTheDocument()
      expect(screen.queryByText('Context error')).not.toBeInTheDocument()
    })
  })

  describe('FieldError', () => {
    it('renders error message', () => {
      render(<FieldError>This field is required</FieldError>)
      
      const error = screen.getByText('This field is required')
      expect(error).toBeInTheDocument()
      expect(error).toHaveClass('text-sm', 'font-medium', 'text-destructive')
      expect(error).toHaveAttribute('role', 'alert')
    })

    it('applies size variants', () => {
      const { rerender } = render(
        <FieldError size="sm">Small error</FieldError>
      )
      
      expect(screen.getByText('Small error')).toHaveClass('text-xs')
      
      rerender(<FieldError size="lg">Large error</FieldError>)
      expect(screen.getByText('Large error')).toHaveClass('text-base')
    })

    it('applies custom className', () => {
      render(
        <FieldError className="custom-error">Error message</FieldError>
      )
      
      expect(screen.getByText('Error message')).toHaveClass('custom-error')
    })
  })

  describe('FieldDescription', () => {
    it('renders description text', () => {
      render(<FieldDescription>Enter your email address</FieldDescription>)
      
      const description = screen.getByText('Enter your email address')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('applies size variants', () => {
      const { rerender } = render(
        <FieldDescription size="sm">Small description</FieldDescription>
      )
      
      expect(screen.getByText('Small description')).toHaveClass('text-xs')
      
      rerender(<FieldDescription size="lg">Large description</FieldDescription>)
      expect(screen.getByText('Large description')).toHaveClass('text-base')
    })

    it('applies custom className', () => {
      render(
        <FieldDescription className="custom-desc">Description</FieldDescription>
      )
      
      expect(screen.getByText('Description')).toHaveClass('custom-desc')
    })
  })

  describe('Field Accessibility', () => {
    it('properly associates labels, inputs, and descriptions', () => {
      render(
        <Field name="password" description="Must be at least 8 characters">
          <Label>Password</Label>
          <Input type="password" />
        </Field>
      )
      
      const input = screen.getByLabelText('Password')
      const description = screen.getByText('Must be at least 8 characters')
      
      expect(input).toHaveAttribute('aria-describedby', description.id)
    })

    it('properly associates error messages with inputs', () => {
      render(
        <Field name="password" error="Password is too short">
          <Label>Password</Label>
          <Input type="password" />
        </Field>
      )
      
      const input = screen.getByLabelText('Password')
      const error = screen.getByText('Password is too short')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(input).toHaveAttribute('aria-describedby', error.id)
      expect(error).toHaveAttribute('role', 'alert')
    })

    it('handles multiple ARIA relationships correctly', () => {
      render(
        <div>
          <Field name="email" description="Primary email">
            <Label htmlFor="email-id">Email</Label>
            <Input id="email-id" type="email" />
          </Field>
          <Field name="phone" error="Invalid phone number">
            <Label htmlFor="phone-id">Phone</Label>
            <Input id="phone-id" type="tel" />
          </Field>
        </div>
      )
      
      const emailInput = screen.getByLabelText('Email')
      const phoneInput = screen.getByLabelText('Phone')
      
      expect(emailInput).toHaveAttribute('aria-describedby', expect.stringContaining('description'))
      expect(phoneInput).toHaveAttribute('aria-describedby', expect.stringContaining('error'))
      expect(phoneInput).toHaveAttribute('aria-invalid', 'true')
    })
  })
})