import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const popoverContentVariants = cva(
  'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground border',
        primary: 'bg-primary text-primary-foreground border-primary',
        secondary: 'bg-secondary text-secondary-foreground border-secondary',
        muted: 'bg-muted text-muted-foreground border-muted',
      },
      size: {
        sm: 'w-56 p-3 text-sm',
        md: 'w-72 p-4 text-sm',
        lg: 'w-80 p-5 text-base',
        xl: 'w-96 p-6 text-base',
        auto: 'w-auto p-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContentVariants> {}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, variant, size, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ variant, size }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Simple popover wrapper component for easier usage
export interface SimplePopoverProps {
  children: React.ReactElement
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  variant?: 'default' | 'primary' | 'secondary' | 'muted'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto'
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  contentClassName?: string
}

const SimplePopover = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  SimplePopoverProps
>(({ 
  children, 
  content, 
  side = 'bottom', 
  align = 'center', 
  variant = 'default',
  size = 'md',
  modal = false,
  open,
  onOpenChange,
  className,
  contentClassName,
  ...props 
}, ref) => {
  return (
    <Popover modal={modal} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger ref={ref} asChild className={className} {...props}>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        side={side} 
        align={align} 
        variant={variant} 
        size={size}
        className={contentClassName}
      >
        {content}
      </PopoverContent>
    </Popover>
  )
})
SimplePopover.displayName = 'SimplePopover'

// Rich popover with header, body, and footer sections
export interface RichPopoverProps extends Omit<SimplePopoverProps, 'content'> {
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  showClose?: boolean
  onClose?: () => void
}

const RichPopover = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  RichPopoverProps
>(({ 
  children, 
  title, 
  description,
  footer,
  showClose = true,
  onClose,
  side = 'bottom', 
  align = 'center', 
  variant = 'default',
  size = 'md',
  modal = false,
  open,
  onOpenChange,
  className,
  contentClassName,
  ...props 
}, ref) => {
  const handleClose = () => {
    onClose?.()
    onOpenChange?.(false)
  }

  return (
    <Popover modal={modal} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger ref={ref} asChild className={className} {...props}>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        side={side} 
        align={align} 
        variant={variant} 
        size={size}
        className={cn('p-0', contentClassName)}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between border-b px-4 py-3">
            {title && (
              <h4 className="text-sm font-semibold leading-none tracking-tight">
                {title}
              </h4>
            )}
            {showClose && (
              <button
                onClick={handleClose}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7 7 10 10" />
                  <path d="m17 7-10 10" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            )}
          </div>
        )}
        {description && (
          <div className="p-4">
            {description}
          </div>
        )}
        {footer && (
          <div className="border-t px-4 py-3">
            {footer}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
})
RichPopover.displayName = 'RichPopover'

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  SimplePopover,
  RichPopover,
  popoverContentVariants,
}