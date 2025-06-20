import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const radioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      vertical: 'grid-cols-1',
      horizontal: 'grid-flow-col auto-cols-max gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

const radioItemVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      variant: {
        default: 'border-primary text-primary',
        destructive: 'border-destructive text-destructive',
        outline: 'border-input',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

// Radio Group Root
export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'orientation'>,
    VariantProps<typeof radioGroupVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ orientation }), className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

// Radio Group Item
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, variant, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ size, variant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Radio Group Item with Label
export interface RadioGroupItemWithLabelProps extends RadioGroupItemProps {
  label?: React.ReactNode
  description?: React.ReactNode
  id?: string
}

const RadioGroupItemWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemWithLabelProps
>(({ 
  label, 
  description, 
  id: providedId,
  className,
  ...props 
}, ref) => {
  const id = providedId || React.useId()
  
  return (
    <div className={cn('flex items-start space-x-2', className)}>
      <RadioGroupItem
        ref={ref}
        id={id}
        {...props}
      />
      {label && (
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
      )}
    </div>
  )
})

RadioGroupItemWithLabel.displayName = 'RadioGroupItemWithLabel'

// Complete Radio Group with Options
export interface RadioOption {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export interface RadioGroupWithOptionsProps
  extends Omit<RadioGroupProps, 'children'> {
  options: RadioOption[]
  value?: string
  onValueChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'destructive' | 'outline'
}

const RadioGroupWithOptions = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupWithOptionsProps
>(({ 
  options,
  value,
  onValueChange,
  size,
  variant,
  className,
  ...props 
}, ref) => {
  return (
    <RadioGroup
      ref={ref}
      value={value}
      onValueChange={onValueChange}
      className={className}
      {...props}
    >
      {options.map((option) => (
        <RadioGroupItemWithLabel
          key={option.value}
          value={option.value}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
          size={size}
          variant={variant}
        />
      ))}
    </RadioGroup>
  )
})

RadioGroupWithOptions.displayName = 'RadioGroupWithOptions'

export { 
  RadioGroup, 
  RadioGroupItem, 
  RadioGroupItemWithLabel,
  RadioGroupWithOptions,
  radioGroupVariants,
  radioItemVariants,
}