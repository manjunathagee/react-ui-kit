import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800',
        info:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800',
        outline: 'text-foreground border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      shape: {
        default: 'rounded-full',
        rounded: 'rounded-md',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  count?: number
  max?: number
  showZero?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape, 
    leftIcon, 
    rightIcon, 
    count, 
    max = 99, 
    showZero = false,
    children, 
    ...props 
  }, ref) => {
    // Handle count display
    const displayCount = React.useMemo(() => {
      if (count === undefined) return children
      if (count === 0 && !showZero) return null
      if (count > max) return `${max}+`
      return count.toString()
    }, [count, max, showZero, children])

    if (count !== undefined && count === 0 && !showZero) {
      return null
    }

    return (
      <div 
        className={cn(badgeVariants({ variant, size, shape }), className)} 
        ref={ref} 
        {...props}
      >
        {leftIcon && (
          <span className="mr-1 h-3 w-3">
            {leftIcon}
          </span>
        )}
        {displayCount}
        {rightIcon && (
          <span className="ml-1 h-3 w-3">
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// Dot Badge for notifications
export interface DotBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof badgeVariants>, 'variant'> {
  show?: boolean
  size?: 'sm' | 'md' | 'lg'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const dotBadgeVariants = cva('absolute rounded-full border-2 border-background', {
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      outline: 'bg-border',
      ghost: 'bg-muted',
    },
    size: {
      sm: 'h-2 w-2',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
    position: {
      'top-right': '-top-1 -right-1',
      'top-left': '-top-1 -left-1',
      'bottom-right': '-bottom-1 -right-1',
      'bottom-left': '-bottom-1 -left-1',
    },
  },
  defaultVariants: {
    variant: 'destructive',
    size: 'md',
    position: 'top-right',
  },
})

const DotBadge = React.forwardRef<HTMLDivElement, DotBadgeProps>(
  ({ className, variant, size, position, show = true, ...props }, ref) => {
    if (!show) return null

    return (
      <div
        className={cn(dotBadgeVariants({ variant, size, position }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

DotBadge.displayName = 'DotBadge'

// Badge with content for wrapping other elements
export interface BadgeWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: React.ReactNode
  badgeProps?: Omit<BadgeProps, 'children'>
  dotBadge?: boolean
  dotBadgeProps?: DotBadgeProps
  children: React.ReactNode
}

const BadgeWrapper = React.forwardRef<HTMLDivElement, BadgeWrapperProps>(
  ({ 
    className, 
    badge, 
    badgeProps, 
    dotBadge, 
    dotBadgeProps, 
    children, 
    ...props 
  }, ref) => {
    return (
      <div className={cn('relative inline-flex', className)} ref={ref} {...props}>
        {children}
        {badge && (
          <Badge
            className="absolute -top-2 -right-2 min-w-[1.25rem] justify-center"
            size="sm"
            {...badgeProps}
          >
            {badge}
          </Badge>
        )}
        {dotBadge && <DotBadge {...dotBadgeProps} />}
      </div>
    )
  }
)

BadgeWrapper.displayName = 'BadgeWrapper'

export { Badge, DotBadge, BadgeWrapper, badgeVariants }