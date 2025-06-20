import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
      },
      variant: {
        default: 'bg-secondary',
        success: 'bg-green-200 dark:bg-green-950',
        warning: 'bg-yellow-200 dark:bg-yellow-950',
        destructive: 'bg-red-200 dark:bg-red-950',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-green-600 dark:bg-green-400',
        warning: 'bg-yellow-600 dark:bg-yellow-400',
        destructive: 'bg-red-600 dark:bg-red-400',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        indeterminate: 'animate-pulse bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] animate-[progress_2s_linear_infinite]',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'none',
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  indeterminate?: boolean
  showLabel?: boolean
  label?: string
  formatLabel?: (value: number, max: number) => string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size, 
    variant, 
    indeterminate = false,
    showLabel = false,
    label,
    formatLabel,
    ...props 
  }, ref) => {
    const percentage = indeterminate ? 100 : Math.min(Math.max((value / max) * 100, 0), 100)
    
    const defaultFormatLabel = React.useCallback(
      (val: number, maximum: number) => `${Math.round((val / maximum) * 100)}%`,
      []
    )

    const displayLabel = label || (showLabel && !indeterminate ? (formatLabel || defaultFormatLabel)(value, max) : undefined)

    return (
      <div className="w-full space-y-2">
        {displayLabel && (
          <div className="flex justify-between text-sm">
            <span>{displayLabel}</span>
            {showLabel && !label && !indeterminate && (
              <span className="text-muted-foreground">
                {(formatLabel || defaultFormatLabel)(value, max)}
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={indeterminate ? 'Loading...' : `Progress: ${percentage.toFixed(0)}%`}
          className={cn(progressVariants({ size, variant }), className)}
          {...props}
        >
          <div
            className={cn(
              progressIndicatorVariants({ 
                variant, 
                animation: indeterminate ? 'indeterminate' : 'none' 
              })
            )}
            style={{
              transform: indeterminate ? 'translateX(-100%)' : `translateX(-${100 - percentage}%)`,
            }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

// Circular Progress Component
const circularProgressVariants = cva('inline-block', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface CircularProgressProps
  extends React.SVGAttributes<SVGElement>,
    VariantProps<typeof circularProgressVariants> {
  value?: number
  max?: number
  indeterminate?: boolean
  showLabel?: boolean
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size,
    indeterminate = false,
    showLabel = false,
    strokeWidth = 8,
    variant = 'default',
    ...props
  }, ref) => {
    const percentage = indeterminate ? 25 : Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = 50 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const colorMap = {
      default: 'text-primary',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      destructive: 'text-red-600 dark:text-red-400',
    }

    return (
      <div className={cn(circularProgressVariants({ size }), className)}>
        <svg
          ref={ref}
          className="h-full w-full -rotate-90 transform"
          viewBox="0 0 100 100"
          {...props}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              colorMap[variant],
              'transition-all duration-300 ease-in-out',
              indeterminate && 'animate-spin'
            )}
            style={{
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        {showLabel && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'

export { Progress, CircularProgress, progressVariants }