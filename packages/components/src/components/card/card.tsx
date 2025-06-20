import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border bg-card',
        elevated: 'border-border bg-card shadow-md',
        outlined: 'border-2 border-border bg-card shadow-none',
        filled: 'border-muted bg-muted shadow-none',
        ghost: 'border-transparent bg-transparent shadow-none',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
)

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      size: {
        sm: 'p-3 pb-2',
        md: 'p-4 pb-3',
        lg: 'p-6 pb-4',
        xl: 'p-8 pb-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const cardContentVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'p-3 pt-0',
        md: 'p-4 pt-0',
        lg: 'p-6 pt-0',
        xl: 'p-8 pt-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'p-3 pt-2',
        md: 'p-4 pt-3',
        lg: 'p-6 pt-4',
        xl: 'p-8 pt-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const cardTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const cardDescriptionVariants = cva(
  'text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'div'
    
    if (asChild) {
      return <>{props.children}</>
    }

    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive }), className)}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size }), className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants({ size }), className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size }), className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size }), className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

// Simple card component for easier usage
export interface SimpleCardProps extends Omit<CardProps, 'children'> {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  image?: string
  imageAlt?: string
  action?: React.ReactNode
}

const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ 
    title,
    description,
    children,
    footer,
    image,
    imageAlt,
    action,
    variant,
    size,
    interactive,
    className,
    ...props 
  }, ref) => (
    <Card
      ref={ref}
      variant={variant}
      size={size}
      interactive={interactive}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt || ''}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      {(title || description) && (
        <CardHeader size={size}>
          {title && <CardTitle size={size}>{title}</CardTitle>}
          {description && <CardDescription size={size}>{description}</CardDescription>}
        </CardHeader>
      )}
      
      {children && (
        <CardContent size={size}>
          {children}
        </CardContent>
      )}
      
      {(footer || action) && (
        <CardFooter size={size}>
          {footer && <div className="flex-1">{footer}</div>}
          {action && <div className="ml-auto">{action}</div>}
        </CardFooter>
      )}
    </Card>
  )
)
SimpleCard.displayName = 'SimpleCard'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  SimpleCard,
  cardVariants,
}