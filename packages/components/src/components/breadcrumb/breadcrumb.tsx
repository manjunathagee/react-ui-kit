import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const breadcrumbVariants = cva(
  'flex items-center space-x-1 text-sm text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const breadcrumbItemVariants = cva(
  'inline-flex items-center transition-colors hover:text-foreground',
  {
    variants: {
      variant: {
        default: '',
        link: 'hover:underline focus:underline',
        button: 'rounded px-2 py-1 hover:bg-accent',
      },
      current: {
        true: 'text-foreground font-medium',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
      current: false,
    },
  }
)

const breadcrumbSeparatorVariants = cva(
  'flex items-center justify-center text-muted-foreground/60',
  {
    variants: {
      size: {
        sm: 'text-xs mx-1',
        md: 'text-sm mx-1.5',
        lg: 'text-base mx-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<'nav'>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode
}

const Breadcrumb = React.forwardRef<
  HTMLElement,
  BreadcrumbProps
>(({ className, size, children, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="Breadcrumb"
    className={cn(breadcrumbVariants({ size }), className)}
    {...props}
  >
    <ol className="flex items-center space-x-1">
      {children}
    </ol>
  </nav>
))
Breadcrumb.displayName = 'Breadcrumb'

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<'ol'> {}

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  BreadcrumbListProps
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn('flex items-center space-x-1', className)}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<'li'>,
    VariantProps<typeof breadcrumbItemVariants> {}

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ className, variant, current, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(breadcrumbItemVariants({ variant, current }), className)}
    {...(current && { 'aria-current': 'page' })}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, asChild, children, ...props }, ref) => {
  if (asChild) {
    return <>{children}</>
  }
  
  return (
    <a
      ref={ref}
      className={cn(
        'transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:underline',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<'span'> {}

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbPageProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-current="page"
    className={cn('font-medium text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof breadcrumbSeparatorVariants> {}

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, size, children, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbSeparatorVariants({ size }), className)}
    {...props}
  >
    {children || (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )}
  </span>
))
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export interface BreadcrumbEllipsisProps
  extends React.ComponentPropsWithoutRef<'span'> {}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-6 w-6 items-center justify-center', className)}
    {...props}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More</span>
  </span>
))
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

// Simple breadcrumb component for easier usage
export interface SimpleBreadcrumbProps extends Omit<BreadcrumbProps, 'children'> {
  items: Array<{
    label: React.ReactNode
    href?: string
    onClick?: () => void
    current?: boolean
    icon?: React.ReactNode
  }>
  separator?: React.ReactNode
  maxItems?: number
  showHome?: boolean
  homeIcon?: React.ReactNode
  onItemClick?: (item: any, index: number) => void
}

interface BreadcrumbItemWithEllipsis {
  label: React.ReactNode
  href?: string
  onClick?: () => void
  current?: boolean
  icon?: React.ReactNode
  ellipsis?: boolean
}

const SimpleBreadcrumb = React.forwardRef<
  HTMLElement,
  SimpleBreadcrumbProps
>(({ 
  items, 
  separator, 
  maxItems, 
  showHome = false,
  homeIcon,
  onItemClick,
  size,
  className,
  ...props 
}, ref) => {
  const processedItems = React.useMemo((): BreadcrumbItemWithEllipsis[] => {
    let processedItems: BreadcrumbItemWithEllipsis[] = [...items]
    
    // Add home item if requested
    if (showHome && !items.some(item => item.href === '/')) {
      const homeItem: BreadcrumbItemWithEllipsis = {
        label: homeIcon || (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        ),
        href: '/',
      }
      processedItems = [homeItem, ...processedItems]
    }

    // Handle overflow with ellipsis
    if (maxItems && processedItems.length > maxItems) {
      const startItems = processedItems.slice(0, 1)
      const endItems = processedItems.slice(-(maxItems - 2))
      const ellipsisItem: BreadcrumbItemWithEllipsis = { label: '...', ellipsis: true }
      processedItems = [...startItems, ellipsisItem, ...endItems]
    }

    return processedItems
  }, [items, showHome, homeIcon, maxItems])

  const handleItemClick = (item: any, index: number) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item, index)
    }
  }

  return (
    <Breadcrumb ref={ref} size={size} className={className} {...props}>
      <BreadcrumbList>
        {processedItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem current={item.current}>
              {item.ellipsis ? (
                <BreadcrumbEllipsis />
              ) : item.current ? (
                <BreadcrumbPage>
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <button
                  onClick={() => handleItemClick(item, index)}
                  className="flex items-center transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:underline"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </BreadcrumbItem>
            {index < processedItems.length - 1 && (
              <BreadcrumbSeparator size={size}>
                {separator}
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
})
SimpleBreadcrumb.displayName = 'SimpleBreadcrumb'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SimpleBreadcrumb,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
}