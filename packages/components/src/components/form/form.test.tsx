import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, FormSubmit, FormProvider, useFormContext, getFieldError } from './form'
import { Field } from './field'
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

describe('Form Components', () => {
  beforeEach(() => {
    mockId = 0
  })

  describe('Form', () => {
    it('renders with default props', () => {
      render(
        <Form>
          <div>Form content</div>
        </Form>
      )
      
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      expect(form).toHaveClass('space-y-6')
    })

    it('applies layout variants correctly', () => {
      const { rerender } = render(
        <Form layout="horizontal">
          <div>Content</div>
        </Form>
      )
      
      expect(screen.getByRole('form')).toHaveClass('space-y-4')
      
      rerender(
        <Form layout="inline">
          <div>Content</div>
        </Form>
      )
      
      expect(screen.getByRole('form')).toHaveClass('flex', 'flex-wrap', 'gap-4', 'items-end')
    })

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Form size="sm">
          <div>Content</div>
        </Form>
      )
      
      expect(screen.getByRole('form')).toHaveClass('text-sm', 'space-y-6')
      
      rerender(
        <Form size="lg">
          <div>Content</div>
        </Form>
      )
      
      expect(screen.getByRole('form')).toHaveClass('text-lg', 'space-y-6')
    })

    it('handles form submission', async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault())
      
      render(
        <Form onSubmit={handleSubmit}>
          <FormSubmit>Submit</FormSubmit>
        </Form>
      )
      
      fireEvent.click(screen.getByRole('button', { name: /submit/i }))
      
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('provides context values to children', () => {
      const TestComponent = () => {
        const { errors, isLoading, size } = useFormContext()
        return (
          <div>
            <span data-testid="errors">{JSON.stringify(errors)}</span>
            <span data-testid="loading">{isLoading.toString()}</span>
            <span data-testid="size">{size}</span>
          </div>
        )
      }

      const errors = { email: 'Invalid email' }
      
      render(
        <Form errors={errors} isLoading={true} size="lg">
          <TestComponent />
        </Form>
      )
      
      expect(screen.getByTestId('errors')).toHaveTextContent(JSON.stringify(errors))
      expect(screen.getByTestId('loading')).toHaveTextContent('true')
      expect(screen.getByTestId('size')).toHaveTextContent('lg')
    })
  })

  describe('FormSubmit', () => {
    it('renders button with correct text', () => {
      render(
        <Form>
          <FormSubmit>Submit Form</FormSubmit>
        </Form>
      )
      
      expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument()
    })

    it('shows loading state', () => {
      render(
        <Form isLoading={true}>
          <FormSubmit loadingText="Submitting...">Submit</FormSubmit>
        </Form>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveTextContent('Submitting...')
    })

    it('uses default loading text when loading', () => {
      render(
        <Form isLoading={true}>
          <FormSubmit>Submit</FormSubmit>
        </Form>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Loading...')
    })

    it('applies size from form context', () => {
      render(
        <Form size="lg">
          <FormSubmit>Submit</FormSubmit>
        </Form>
      )
      
      expect(screen.getByRole('button')).toHaveClass('h-11', 'rounded-md', 'px-8')
    })

    it('can override form context size', () => {
      render(
        <Form size="lg">
          <FormSubmit size="sm">Submit</FormSubmit>
        </Form>
      )
      
      expect(screen.getByRole('button')).toHaveClass('h-9', 'rounded-md', 'px-3')
    })
  })

  describe('FormProvider', () => {
    it('provides form context without form element', () => {
      const TestComponent = () => {
        const { errors, isLoading } = useFormContext()
        return (
          <div>
            <span data-testid="errors">{Object.keys(errors).length}</span>
            <span data-testid="loading">{isLoading.toString()}</span>
          </div>
        )
      }

      const errors = { email: 'Error', password: 'Error' }
      
      render(
        <FormProvider errors={errors} isLoading={false}>
          <TestComponent />
        </FormProvider>
      )
      
      expect(screen.getByTestId('errors')).toHaveTextContent('2')
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })
  })

  describe('getFieldError utility', () => {
    it('returns string error', () => {
      const errors = { email: 'Invalid email' }
      expect(getFieldError(errors, 'email')).toBe('Invalid email')
    })

    it('returns first error from array', () => {
      const errors = { email: ['Required', 'Invalid format'] }
      expect(getFieldError(errors, 'email')).toBe('Required')
    })

    it('returns undefined for non-existent field', () => {
      const errors = { email: 'Error' }
      expect(getFieldError(errors, 'password')).toBeUndefined()
    })

    it('returns undefined for empty array', () => {
      const errors = { email: [] }
      expect(getFieldError(errors, 'email')).toBeUndefined()
    })
  })

  describe('Integration with Field components', () => {
    it('displays field errors from form context', () => {
      const errors = { email: 'Please enter a valid email' }
      
      render(
        <Form errors={errors}>
          <Field name="email">
            <Label>Email</Label>
            <Input type="email" />
          </Field>
        </Form>
      )
      
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('handles form submission with validation', async () => {
      const user = userEvent.setup()
      let formData = {}
      
      const handleSubmit = vi.fn((e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = new FormData(form)
        formData = Object.fromEntries(data.entries())
      })
      
      render(
        <Form onSubmit={handleSubmit}>
          <Field name="email">
            <Label>Email</Label>
            <Input type="email" name="email" />
          </Field>
          <FormSubmit>Submit</FormSubmit>
        </Form>
      )
      
      await user.type(screen.getByRole('textbox'), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /submit/i }))
      
      expect(handleSubmit).toHaveBeenCalled()
      expect(formData).toEqual({ email: 'test@example.com' })
    })
  })
})