import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useFormContext, getFieldError } from './form'

const fieldVariants = cva('space-y-2', {
  variants: {
    layout: {
      vertical: 'space-y-2',
      horizontal: 'flex items-center space-x-4 space-y-0',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
})

const fieldErrorVariants = cva('font-medium text-destructive', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'destructive',
  },
})

const fieldDescriptionVariants = cva('text-muted-foreground', {
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
})

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

    return (
      <div
        className={cn(fieldVariants({ layout, className }))}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Check if it's a Label component
            if (typeof child.type === 'function' && 
                (child.type as any).displayName === 'Label') {
              const childElement = child as React.ReactElement<any>
              return React.cloneElement(childElement, {
                htmlFor: childElement.props.htmlFor || fieldId,
                required: childElement.props.required ?? required,
              })
            }
            
            // Check if it's a form input component
            const componentName = typeof child.type === 'function' 
              ? (child.type as any).displayName 
              : child.type
            
            const isFormInput = child.type === 'input' || 
                               child.type === 'textarea' || 
                               child.type === 'select' ||
                               ['Input', 'Textarea', 'Select', 'Checkbox', 'RadioGroup', 'Switch'].includes(componentName)
            
            if (isFormInput) {
              const childElement = child as React.ReactElement<any>
              return React.cloneElement(childElement, {
                id: childElement.props.id || fieldId,
                name: childElement.props.name || name,
                required: childElement.props.required ?? required,
                'aria-invalid': error ? 'true' : undefined,
                'aria-describedby': error 
                  ? `${fieldId}-error` 
                  : description 
                  ? `${fieldId}-description`
                  : undefined,
              })
            }
            
            return child
          }
          return child
        })}
        
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
    )
  }
)

Field.displayName = 'Field'

// Field Error Component
export interface FieldErrorProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldErrorVariants> {}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <p
        className={cn(fieldErrorVariants({ size, variant, className }))}
        ref={ref}
        role="alert"
        {...props}
      />
    )
  }
)

FieldError.displayName = 'FieldError'

// Field Description Component
export interface FieldDescriptionProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldDescriptionVariants> {}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <p
        className={cn(fieldDescriptionVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

FieldDescription.displayName = 'FieldDescription'

export { Field, fieldVariants, FieldError, fieldErrorVariants, FieldDescription, fieldDescriptionVariants }