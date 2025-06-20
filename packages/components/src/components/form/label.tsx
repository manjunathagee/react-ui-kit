import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useFieldContext } from './field'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      variant: {
        default: '',
        destructive: 'text-destructive',
        muted: 'text-muted-foreground',
      },
      required: {
        true: "after:content-['*'] after:ml-1 after:text-destructive",
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      required: false,
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, variant, required, children, htmlFor, ...props }, ref) => {
    const field = useFieldContext()
    
    // Use field context values as defaults
    const finalHtmlFor = htmlFor || field?.id
    const finalRequired = required ?? field?.required
    
    return (
      <label
        className={cn(labelVariants({ size, variant, required: finalRequired, className }))}
        htmlFor={finalHtmlFor}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label, labelVariants }