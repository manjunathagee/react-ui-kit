import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground border',
        primary: 'bg-primary text-primary-foreground border-primary',
        secondary: 'bg-secondary text-secondary-foreground border-secondary',
        destructive: 'bg-destructive text-destructive-foreground border-destructive',
        success: 'bg-green-600 text-white border-green-600 dark:bg-green-500',
        warning: 'bg-yellow-600 text-white border-yellow-600 dark:bg-yellow-500',
        info: 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant, size, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simple tooltip wrapper component for easier usage
export interface SimpleTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  delayDuration?: number
  disabled?: boolean
  className?: string
}

const SimpleTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipTrigger>,
  SimpleTooltipProps
>(({ 
  children, 
  content, 
  side = 'top', 
  align = 'center', 
  variant = 'default',
  size = 'md',
  delayDuration = 700,
  disabled = false,
  className,
  ...props 
}, ref) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger ref={ref} asChild className={className} {...props}>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} variant={variant} size={size}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})
SimpleTooltip.displayName = 'SimpleTooltip'

// Rich tooltip with title and description
export interface RichTooltipProps extends Omit<SimpleTooltipProps, 'content'> {
  title: React.ReactNode
  description?: React.ReactNode
  showArrow?: boolean
}

const RichTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipTrigger>,
  RichTooltipProps
>(({ 
  children, 
  title, 
  description,
  showArrow = true,
  side = 'top', 
  align = 'center', 
  variant = 'default',
  size = 'md',
  delayDuration = 700,
  disabled = false,
  className,
  ...props 
}, ref) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger ref={ref} asChild className={className} {...props}>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align} 
          variant={variant} 
          size={size}
          className="max-w-xs"
        >
          <div className="space-y-1">
            <div className="font-semibold">{title}</div>
            {description && (
              <div className="text-xs opacity-80">{description}</div>
            )}
          </div>
          {showArrow && <TooltipPrimitive.Arrow className="fill-current" />}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})
RichTooltip.displayName = 'RichTooltip'

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
  RichTooltip,
  tooltipContentVariants,
}