import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const formVariants = cva('space-y-6', {
  variants: {
    layout: {
      vertical: 'space-y-6',
      horizontal: 'space-y-4',
      inline: 'flex flex-wrap gap-4 items-end',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    size: 'md',
  },
})

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formVariants> {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading?: boolean
  errors?: Record<string, string | string[]>
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ 
    className,
    layout,
    size,
    onSubmit,
    isLoading = false,
    errors = {},
    children,
    ...props 
  }, ref) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!isLoading && onSubmit) {
        onSubmit(event)
      }
    }

    return (
      <FormProvider errors={errors} isLoading={isLoading} size={size}>
        <form
          className={cn(formVariants({ layout, size, className }))}
          onSubmit={handleSubmit}
          role="form"
          ref={ref}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
    )
  }
)

Form.displayName = 'Form'

// Form Context for sharing state between form components
interface FormContextValue {
  errors: Record<string, string | string[]>
  isLoading: boolean
  size?: 'sm' | 'md' | 'lg' | null
}

const FormContext = React.createContext<FormContextValue>({
  errors: {},
  isLoading: false,
})

interface FormProviderProps extends FormContextValue {
  children: React.ReactNode
}

const FormProvider: React.FC<FormProviderProps> = ({ 
  children, 
  errors, 
  isLoading, 
  size 
}) => {
  const value = React.useMemo(
    () => ({ errors, isLoading, size }),
    [errors, isLoading, size]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// Hook to access form context
export const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a Form component')
  }
  return context
}

// Helper function to get field error
export const getFieldError = (errors: Record<string, string | string[]>, name: string): string | undefined => {
  const error = errors[name]
  if (Array.isArray(error)) {
    return error[0]
  }
  return error
}

// Form Submit Button Component
const formSubmitVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface FormSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof formSubmitVariants> {
  isLoading?: boolean
  loadingText?: string
}

const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ 
    className,
    variant,
    size,
    isLoading: propLoading,
    loadingText = 'Loading...',
    children,
    disabled,
    ...props 
  }, ref) => {
    const { isLoading: contextLoading, size: contextSize } = useFormContext()
    const isLoading = propLoading ?? contextLoading
    const buttonSize = size ?? contextSize ?? 'md'

    return (
      <button
        className={cn(formSubmitVariants({ variant, size: buttonSize, className }))}
        disabled={disabled || isLoading}
        ref={ref}
        type="submit"
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {loadingText}
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

FormSubmit.displayName = 'FormSubmit'

export { Form, formVariants, FormSubmit, formSubmitVariants, FormProvider }