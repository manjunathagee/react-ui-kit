import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useFormContext, getFieldError } from './form'

const fieldVariants = cva(
  'space-y-2',
  {
    variants: {
      layout: {
        vertical: 'space-y-2',
        horizontal: 'flex items-center space-x-4 space-y-0',
      },
    },
    defaultVariants: {
      layout: 'vertical',
    },
  }
)

const fieldErrorVariants = cva(
  'font-medium text-destructive',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const fieldDescriptionVariants = cva(
  'text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

// Field Error component
export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldErrorVariants> {}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(fieldErrorVariants({ size }), className)}
        role="alert"
        {...props}
      >
        {children}
      </p>
    )
  }
)
FieldError.displayName = 'FieldError'

// Field Description component
export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldDescriptionVariants> {}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(fieldDescriptionVariants({ size }), className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FieldDescription.displayName = 'FieldDescription'

// Field Context to provide field info to child components
interface FieldContextValue {
  id: string
  name?: string
  error?: string
  description?: string
  required?: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

export const useFieldContext = () => {
  const context = React.useContext(FieldContext)
  return context
}

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  name?: string
  error?: string
  description?: string
  required?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ 
    className,
    layout,
    name,
    error: propError,
    description,
    required,
    children,
    ...props 
  }, ref) => {
    const { errors } = useFormContext()
    const error = propError || (name ? getFieldError(errors, name) : undefined)
    
    const fieldId = React.useId()
    
    const fieldContextValue: FieldContextValue = {
      id: fieldId,
      name,
      error,
      description,
      required
    }

    return (
      <FieldContext.Provider value={fieldContextValue}>
        <div
          className={cn(fieldVariants({ layout, className }))}
          ref={ref}
          {...props}
        >
          {children}
          
          {description && !error && (
            <FieldDescription id={`${fieldId}-description`}>
              {description}
            </FieldDescription>
          )}
          
          {error && (
            <FieldError id={`${fieldId}-error`}>
              {error}
            </FieldError>
          )}
        </div>
      </FieldContext.Provider>
    )
  }
)

Field.displayName = 'Field'

export { Field, FieldError, FieldDescription, fieldVariants, fieldErrorVariants, fieldDescriptionVariants }