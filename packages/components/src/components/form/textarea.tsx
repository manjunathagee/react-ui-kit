import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        md: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[100px] px-4 py-3 text-base',
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      resize: 'vertical',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  autoResize?: boolean
  maxLength?: number
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    size, 
    variant, 
    resize, 
    autoResize = false,
    maxLength,
    showCount = false,
    onChange,
    value: controlledValue,
    defaultValue,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue
    
    // Auto-resize functionality
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (textarea && autoResize) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize])

    React.useEffect(() => {
      if (autoResize) {
        adjustHeight()
      }
    }, [value, adjustHeight, autoResize])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value
      
      // Respect maxLength if provided
      if (maxLength && newValue.length > maxLength) {
        return
      }
      
      if (!isControlled) {
        setInternalValue(newValue)
      }
      
      if (onChange) {
        onChange(event)
      }
    }

    const combinedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
        }
      },
      [ref]
    )

    const characterCount = typeof value === 'string' ? value.length : 0

    return (
      <div className="relative">
        <textarea
          className={cn(
            textareaVariants({ 
              size, 
              variant, 
              resize: autoResize ? 'none' : resize 
            }), 
            className
          )}
          ref={combinedRef}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {(showCount || maxLength) && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {maxLength ? `${characterCount}/${maxLength}` : characterCount}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// Textarea with Label Component
export interface TextareaWithLabelProps extends TextareaProps {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string
  required?: boolean
  id?: string
}

const TextareaWithLabel = React.forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  ({ 
    label, 
    description, 
    error,
    required,
    id: providedId,
    className,
    variant,
    ...props 
  }, ref) => {
    const id = providedId || React.useId()
    
    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              required && "after:content-['*'] after:ml-1 after:text-destructive"
            )}
          >
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          id={id}
          variant={error ? 'error' : variant}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error 
              ? `${id}-error` 
              : description 
              ? `${id}-description`
              : undefined
          }
          {...props}
        />
        {description && !error && (
          <p id={`${id}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

TextareaWithLabel.displayName = 'TextareaWithLabel'

export { Textarea, TextareaWithLabel, textareaVariants }