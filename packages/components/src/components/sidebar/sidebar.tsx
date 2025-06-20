import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sidebarVariants = cva(
  'flex flex-col bg-background border-r transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        secondary: 'bg-secondary border-border',
        muted: 'bg-muted border-muted-foreground/20',
      },
      size: {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
        auto: 'w-auto',
      },
      position: {
        left: '',
        right: 'border-r-0 border-l',
      },
      collapsible: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'left',
      collapsible: false,
    },
    compoundVariants: [
      {
        collapsible: true,
        class: 'data-[collapsed=true]:w-16',
      },
    ],
  }
)

const sidebarHeaderVariants = cva(
  'flex items-center justify-between p-4 border-b',
  {
    variants: {
      variant: {
        default: 'border-border',
        secondary: 'border-border',
        muted: 'border-muted-foreground/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const sidebarContentVariants = cva(
  'flex-1 overflow-y-auto p-2',
  {
    variants: {
      spacing: {
        none: 'p-0',
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
)

const sidebarItemVariants = cva(
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        active: 'bg-accent text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, size, position, collapsible, collapsed = false, onCollapsedChange, ...props }, ref) => (
    <div
      ref={ref}
      data-collapsed={collapsed}
      className={cn(sidebarVariants({ variant, size, position, collapsible }), className)}
      {...props}
    />
  )
)
Sidebar.displayName = 'Sidebar'

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarHeaderVariants> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarHeaderVariants({ variant }), className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = 'SidebarHeader'

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarContentVariants> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarContentVariants({ spacing }), className)}
      {...props}
    />
  )
)
SidebarContent.displayName = 'SidebarContent'

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t p-4', className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = 'SidebarFooter'

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {label && (
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
)
SidebarGroup.displayName = 'SidebarGroup'

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
  href?: string
  badge?: React.ReactNode
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, icon, label, active, collapsed, href, badge, variant, size, onClick, ...props }, ref) => {
    const itemVariant = active ? 'active' : variant
    
    const content = (
      <>
        {icon && (
          <span className={cn('flex-shrink-0', collapsed && 'mx-auto')}>
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{label}</span>
            {badge && <span className="ml-auto">{badge}</span>}
          </>
        )}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          className={cn(sidebarItemVariants({ variant: itemVariant, size }), className)}
        >
          {content}
        </a>
      )
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.(e as any)
          }
        }}
        className={cn(sidebarItemVariants({ variant: itemVariant, size }), className)}
        {...props}
      >
        {content}
      </div>
    )
  }
)
SidebarItem.displayName = 'SidebarItem'

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  collapsed?: boolean
  onToggle?: () => void
}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, collapsed, onToggle, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      {...props}
    >
      <svg
        className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
    </button>
  )
)
SidebarToggle.displayName = 'SidebarToggle'

// Simple sidebar component for easier usage
export interface SimpleSidebarProps extends Omit<SidebarProps, 'children'> {
  title?: string
  logo?: React.ReactNode
  items: Array<{
    label: string
    icon?: React.ReactNode
    href?: string
    onClick?: () => void
    active?: boolean
    badge?: React.ReactNode
    group?: string
  }>
  footer?: React.ReactNode
  showToggle?: boolean
}

const SimpleSidebar = React.forwardRef<HTMLDivElement, SimpleSidebarProps>(
  ({ 
    title,
    logo,
    items,
    footer,
    showToggle = true,
    collapsed = false,
    onCollapsedChange,
    variant,
    size,
    position,
    collapsible = true,
    className,
    ...props 
  }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(collapsed)
    
    const isCollapsed = onCollapsedChange ? collapsed : internalCollapsed
    
    const handleToggle = () => {
      if (onCollapsedChange) {
        onCollapsedChange(!collapsed)
      } else {
        setInternalCollapsed(!internalCollapsed)
      }
    }

    // Group items by group property
    const groupedItems = React.useMemo(() => {
      const groups: Record<string, typeof items> = {}
      
      items.forEach(item => {
        const groupName = item.group || 'default'
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(item)
      })
      
      return groups
    }, [items])

    return (
      <Sidebar
        ref={ref}
        variant={variant}
        size={size}
        position={position}
        collapsible={collapsible}
        collapsed={isCollapsed}
        className={className}
        {...props}
      >
        {(title || logo || showToggle) && (
          <SidebarHeader variant={variant}>
            <div className="flex items-center gap-2">
              {logo && <span className="flex-shrink-0">{logo}</span>}
              {!isCollapsed && title && (
                <h2 className="text-lg font-semibold truncate">{title}</h2>
              )}
            </div>
            {showToggle && collapsible && (
              <SidebarToggle collapsed={isCollapsed} onToggle={handleToggle} />
            )}
          </SidebarHeader>
        )}
        
        <SidebarContent>
          {Object.entries(groupedItems).map(([groupName, groupItems]) => (
            <SidebarGroup
              key={groupName}
              label={groupName !== 'default' ? groupName : undefined}
            >
              {groupItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  onClick={item.onClick}
                  active={item.active}
                  collapsed={isCollapsed}
                  badge={item.badge}
                />
              ))}
            </SidebarGroup>
          ))}
        </SidebarContent>
        
        {footer && (
          <SidebarFooter>
            {footer}
          </SidebarFooter>
        )}
      </Sidebar>
    )
  }
)
SimpleSidebar.displayName = 'SimpleSidebar'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarToggle,
  SimpleSidebar,
  sidebarVariants,
  sidebarHeaderVariants,
  sidebarContentVariants,
  sidebarItemVariants,
}