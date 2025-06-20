import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      muted: 'text-muted-foreground',
    },
    speed: {
      slow: 'animate-[spin_2s_linear_infinite]',
      normal: 'animate-spin',
      fast: 'animate-[spin_0.5s_linear_infinite]',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    speed: 'normal',
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
  srOnly?: boolean
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, speed, label, srOnly = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label || 'Loading'}
        className={cn('inline-block', className)}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size, variant, speed }))} />
        {label && (
          <span className={cn('ml-2 text-sm', srOnly && 'sr-only')}>
            {label}
          </span>
        )}
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

// Dots Spinner Variant
const dotsSpinnerVariants = cva('inline-flex space-x-1', {
  variants: {
    size: {
      xs: 'space-x-0.5',
      sm: 'space-x-1',
      md: 'space-x-1.5',
      lg: 'space-x-2',
      xl: 'space-x-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const dotVariants = cva('rounded-full animate-pulse', {
  variants: {
    size: {
      xs: 'h-1 w-1',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
    },
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary-foreground',
      destructive: 'bg-destructive',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      muted: 'bg-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface DotsSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotsSpinnerVariants> {
  label?: string
  srOnly?: boolean
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'muted'
}

const DotsSpinner = React.forwardRef<HTMLDivElement, DotsSpinnerProps>(
  ({ className, size, variant = 'default', label, srOnly = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label || 'Loading'}
        className={cn('inline-flex items-center', className)}
        {...props}
      >
        <div className={cn(dotsSpinnerVariants({ size }))}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(dotVariants({ size, variant }))}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s',
              }}
            />
          ))}
        </div>
        {label && (
          <span className={cn('ml-2 text-sm', srOnly && 'sr-only')}>
            {label}
          </span>
        )}
      </div>
    )
  }
)

DotsSpinner.displayName = 'DotsSpinner'

// Pulse Spinner Variant
export interface PulseSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
  srOnly?: boolean
}

const PulseSpinner = React.forwardRef<HTMLDivElement, PulseSpinnerProps>(
  ({ className, size, variant, label, srOnly = true, ...props }, ref) => {
    const pulseVariants = cva('rounded-full animate-pulse', {
      variants: {
        size: {
          xs: 'h-6 w-6',
          sm: 'h-8 w-8',
          md: 'h-12 w-12',
          lg: 'h-16 w-16',
          xl: 'h-24 w-24',
        },
        variant: {
          default: 'bg-primary/20',
          secondary: 'bg-secondary/20',
          destructive: 'bg-destructive/20',
          success: 'bg-green-600/20',
          warning: 'bg-yellow-600/20',
          muted: 'bg-muted-foreground/20',
        },
      },
      defaultVariants: {
        size: 'md',
        variant: 'default',
      },
    })

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label || 'Loading'}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        <div className={cn(pulseVariants({ size, variant }))} />
        {label && (
          <span className={cn('ml-2 text-sm', srOnly && 'sr-only')}>
            {label}
          </span>
        )}
      </div>
    )
  }
)

PulseSpinner.displayName = 'PulseSpinner'

export { Spinner, DotsSpinner, PulseSpinner, spinnerVariants }