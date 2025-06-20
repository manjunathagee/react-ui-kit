import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        md: 'h-4 w-4 data-[state=checked]:translate-x-4',
        lg: 'h-5 w-5 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

// Switch with Label Component
export interface SwitchWithLabelProps extends SwitchProps {
  label?: React.ReactNode
  description?: React.ReactNode
  labelPosition?: 'left' | 'right'
  id?: string
}

const SwitchWithLabel = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchWithLabelProps
>(({ 
  label, 
  description, 
  labelPosition = 'right', 
  id: providedId,
  className,
  ...props 
}, ref) => {
  const id = providedId || React.useId()
  
  const switchElement = (
    <Switch
      ref={ref}
      id={id}
      {...props}
    />
  )

  const labelElement = label && (
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
    <div className={cn('flex items-center space-x-2', className)}>
      {labelPosition === 'left' && labelElement}
      {switchElement}
      {labelPosition === 'right' && labelElement}
    </div>
  )
})

SwitchWithLabel.displayName = 'SwitchWithLabel'

// Switch Group Component (for multiple switches)
export interface SwitchGroupProps {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

const SwitchGroup: React.FC<SwitchGroupProps> = ({
  children,
  className,
  orientation = 'vertical',
  disabled = false,
}) => {
  return (
    <div 
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col space-y-4' : 'flex-row flex-wrap gap-6',
        className
      )}
      role="group"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            disabled: disabled || (child.props as any).disabled,
          })
        }
        return child
      })}
    </div>
  )
}

SwitchGroup.displayName = 'SwitchGroup'

export { Switch, SwitchWithLabel, SwitchGroup, switchVariants, switchThumbVariants }