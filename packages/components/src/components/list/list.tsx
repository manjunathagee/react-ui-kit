import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'

const listVariants = cva(
  'space-y-0',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border rounded-lg divide-y',
        card: 'space-y-2',
        flush: 'border-x-0 border-t-0',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const listItemVariants = cva(
  'flex items-center transition-colors',
  {
    variants: {
      variant: {
        default: 'py-2',
        bordered: 'p-4 first:rounded-t-lg last:rounded-b-lg',
        card: 'p-4 border rounded-lg bg-card',
        flush: 'py-2 border-b last:border-b-0',
      },
      size: {
        sm: 'py-1 text-sm',
        md: 'py-2 text-base',
        lg: 'py-3 text-lg',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent/50 focus:bg-accent focus:outline-none',
        false: '',
      },
      selected: {
        true: 'bg-accent text-accent-foreground',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
      selected: false,
    },
  }
)

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  ordered?: boolean
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, size, ordered = false, children, ...props }, ref) => {
    const Component = ordered ? 'ol' : 'ul'
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          listVariants({ variant, size }),
          ordered && 'list-decimal list-inside',
          !ordered && variant === 'default' && 'list-disc list-inside',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
List.displayName = 'List'

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  href?: string
  selected?: boolean
  disabled?: boolean
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    selected, 
    icon, 
    action, 
    href, 
    disabled,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const isInteractive = interactive || !!onClick || !!href
    
    const content = (
      <>
        {icon && (
          <span className={cn('mr-3 flex-shrink-0', disabled && 'opacity-50')}>
            {icon}
          </span>
        )}
        <span className={cn('flex-1', disabled && 'opacity-50')}>
          {children}
        </span>
        {action && (
          <span className={cn('ml-3 flex-shrink-0', disabled && 'opacity-50')}>
            {action}
          </span>
        )}
      </>
    )

    if (href && !disabled) {
      return (
        <li
          ref={ref}
          className={cn(
            listItemVariants({ variant, size, interactive: true, selected }),
            className
          )}
          {...props}
        >
          <a
            href={href}
            className="flex items-center w-full"
            onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          >
            {content}
          </a>
        </li>
      )
    }

    return (
      <li
        ref={ref}
        className={cn(
          listItemVariants({ 
            variant, 
            size, 
            interactive: isInteractive && !disabled, 
            selected 
          }),
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={disabled ? undefined : onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        onKeyDown={
          isInteractive && !disabled
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick?.(e as any)
                }
              }
            : undefined
        }
        {...props}
      >
        {content}
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

// Description List Components
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {}

const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    />
  )
)
DescriptionList.displayName = 'DescriptionList'

export interface DescriptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  term: string
  description: React.ReactNode
  horizontal?: boolean
}

const DescriptionItem = React.forwardRef<HTMLDivElement, DescriptionItemProps>(
  ({ className, term, description, horizontal = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        horizontal ? 'grid grid-cols-3 gap-4' : 'space-y-1',
        className
      )}
      {...props}
    >
      <dt className={cn(
        'font-medium text-foreground',
        horizontal && 'col-span-1'
      )}>
        {term}
      </dt>
      <dd className={cn(
        'text-muted-foreground',
        horizontal && 'col-span-2'
      )}>
        {description}
      </dd>
    </div>
  )
)
DescriptionItem.displayName = 'DescriptionItem'

// Simple List Component
export interface SimpleListData {
  id: string | number
  content: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  href?: string
  selected?: boolean
  disabled?: boolean
}

export interface SimpleListProps extends Omit<ListProps, 'children'> {
  data: SimpleListData[]
  onItemClick?: (item: SimpleListData, index: number) => void
  selectable?: boolean
  multiSelect?: boolean
  selectedItems?: (string | number)[]
  onSelectionChange?: (selectedItems: (string | number)[]) => void
}

const SimpleList = React.forwardRef<HTMLUListElement, SimpleListProps>(
  ({ 
    data,
    onItemClick,
    selectable = false,
    multiSelect = false,
    selectedItems = [],
    onSelectionChange,
    variant,
    size,
    className,
    ...props
  }, ref) => {
    const handleItemClick = (item: SimpleListData, index: number) => {
      if (item.disabled) return

      if (selectable) {
        const isSelected = selectedItems.includes(item.id)
        let newSelection: (string | number)[]

        if (multiSelect) {
          newSelection = isSelected
            ? selectedItems.filter(id => id !== item.id)
            : [...selectedItems, item.id]
        } else {
          newSelection = isSelected ? [] : [item.id]
        }

        onSelectionChange?.(newSelection)
      }

      onItemClick?.(item, index)
    }

    return (
      <List ref={ref} variant={variant} size={size} className={className} {...props}>
        {data.map((item, index) => (
          <ListItem
            key={item.id}
            variant={variant}
            size={size}
            icon={item.icon}
            action={item.action}
            href={item.href}
            selected={selectable && selectedItems.includes(item.id)}
            disabled={item.disabled}
            interactive={!!onItemClick || selectable || !!item.href}
            onClick={() => handleItemClick(item, index)}
          >
            {item.content}
          </ListItem>
        ))}
      </List>
    )
  }
)
SimpleList.displayName = 'SimpleList'

// Checklist Component
export interface ChecklistItem {
  id: string | number
  label: string
  checked?: boolean
  disabled?: boolean
  description?: string
}

export interface ChecklistProps extends Omit<ListProps, 'children'> {
  items: ChecklistItem[]
  onItemChange?: (item: ChecklistItem, checked: boolean) => void
  showProgress?: boolean
}

const Checklist = React.forwardRef<HTMLUListElement, ChecklistProps>(
  ({ items, onItemChange, showProgress = false, variant, size, className, ...props }, ref) => {
    const completedCount = items.filter(item => item.checked).length
    const totalCount = items.length
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    const handleItemToggle = (item: ChecklistItem) => {
      if (item.disabled) return
      onItemChange?.(item, !item.checked)
    }

    return (
      <div className="space-y-4">
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedCount} of {totalCount} completed</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        
        <List ref={ref} variant={variant} size={size} className={className} {...props}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              variant={variant}
              size={size}
              interactive={!item.disabled}
              disabled={item.disabled}
              onClick={() => handleItemToggle(item)}
              icon={
                <div className={cn(
                  'w-4 h-4 border-2 rounded flex items-center justify-center transition-colors',
                  item.checked 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border bg-background',
                  item.disabled && 'opacity-50'
                )}>
                  {item.checked && <Check className="w-3 h-3" />}
                </div>
              }
            >
              <div>
                <div className={cn(
                  item.checked && 'line-through text-muted-foreground'
                )}>
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </div>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
)
Checklist.displayName = 'Checklist'

// Navigation List Component
export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  children?: NavigationItem[]
  active?: boolean
  disabled?: boolean
}

export interface NavigationListProps extends Omit<ListProps, 'children'> {
  items: NavigationItem[]
  onItemClick?: (item: NavigationItem) => void
  collapsible?: boolean
  defaultExpanded?: string[]
}

const NavigationList = React.forwardRef<HTMLUListElement, NavigationListProps>(
  ({ 
    items, 
    onItemClick, 
    collapsible = true,
    defaultExpanded = [],
    variant, 
    size, 
    className, 
    ...props 
  }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
      new Set(defaultExpanded)
    )

    const toggleExpanded = (itemId: string) => {
      if (!collapsible) return
      
      setExpandedItems(prev => {
        const newSet = new Set(prev)
        if (newSet.has(itemId)) {
          newSet.delete(itemId)
        } else {
          newSet.add(itemId)
        }
        return newSet
      })
    }

    const renderItem = (item: NavigationItem, level = 0) => {
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = expandedItems.has(item.id)
      const paddingLeft = level > 0 ? `${level * 1.5}rem` : undefined

      return (
        <React.Fragment key={item.id}>
          <ListItem
            variant={variant}
            size={size}
            interactive={!item.disabled}
            selected={item.active}
            disabled={item.disabled}
            onClick={() => {
              if (hasChildren && collapsible) {
                toggleExpanded(item.id)
              }
              onItemClick?.(item)
            }}
            href={item.href}
            icon={item.icon}
            action={
              <div className="flex items-center space-x-2">
                {item.badge}
                {hasChildren && collapsible && (
                  <ChevronRight className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )} />
                )}
              </div>
            }
            style={{ paddingLeft }}
          >
            {item.label}
          </ListItem>
          
          {hasChildren && (!collapsible || isExpanded) && (
            <div className="ml-4">
              {item.children!.map(child => renderItem(child, level + 1))}
            </div>
          )}
        </React.Fragment>
      )
    }

    return (
      <List ref={ref} variant={variant} size={size} className={className} {...props}>
        {items.map(item => renderItem(item))}
      </List>
    )
  }
)
NavigationList.displayName = 'NavigationList'

export {
  List,
  ListItem,
  DescriptionList,
  DescriptionItem,
  SimpleList,
  Checklist,
  NavigationList,
  listVariants,
}