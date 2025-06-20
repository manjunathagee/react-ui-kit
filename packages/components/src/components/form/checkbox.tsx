import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      variant: {
        default: 'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        destructive: 'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground',
        outline: 'border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, variant, indeterminate, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size, variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      {indeterminate ? (
        <svg
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// Checkbox with Label Component
export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: React.ReactNode
  description?: React.ReactNode
  labelPosition?: 'left' | 'right'
  id?: string
}

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ 
  label, 
  description, 
  labelPosition = 'right', 
  id: providedId,
  className,
  ...props 
}, ref) => {
  const id = providedId || React.useId()
  
  const checkboxElement = (
    <Checkbox
      ref={ref}
      id={id}
      {...props}
    />
  )

  const labelElement = label && (
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )

  return (
    <div className={cn('flex items-start space-x-2', className)}>
      {labelPosition === 'left' && labelElement}
      {checkboxElement}
      {labelPosition === 'right' && labelElement}
    </div>
  )
})

CheckboxWithLabel.displayName = 'CheckboxWithLabel'

// Checkbox Group Component
export interface CheckboxGroupProps {
  value?: string[]
  onValueChange?: (value: string[]) => void
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value = [],
  onValueChange,
  children,
  className,
  orientation = 'vertical',
  disabled = false,
}) => {
  const handleValueChange = (itemValue: string, checked: boolean) => {
    if (!onValueChange) return

    const newValue = checked
      ? [...value, itemValue]
      : value.filter(v => v !== itemValue)
    
    onValueChange(newValue)
  }

  return (
    <div 
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row flex-wrap gap-4',
        className
      )}
      role="group"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CheckboxWithLabel) {
          const itemValue = child.props.value
          const isChecked = value.includes(itemValue)
          
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: isChecked,
            onCheckedChange: (checked: boolean) => 
              handleValueChange(itemValue, checked),
            disabled: disabled || child.props.disabled,
          })
        }
        return child
      })}
    </div>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export { Checkbox, CheckboxWithLabel, CheckboxGroup, checkboxVariants }