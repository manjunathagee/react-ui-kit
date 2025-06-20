import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-md text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted p-1',
        underline: 'border-b border-border',
        pills: 'bg-muted p-1 rounded-lg',
        outline: 'border border-border rounded-md p-1',
      },
      orientation: {
        horizontal: 'h-10 w-full',
        vertical: 'h-auto w-48 flex-col space-y-1 p-2',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'underline',
        orientation: 'horizontal',
        class: 'h-auto bg-transparent p-0 border-b',
      },
      {
        variant: 'underline',
        orientation: 'vertical',
        class: 'w-auto bg-transparent border-l border-b-0 p-0 pl-2',
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: 'h-auto text-xs',
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: 'h-auto text-base',
      },
    ],
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, orientation, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, orientation, size }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'rounded-none border-b-2 border-transparent bg-transparent hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent',
        pills: 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted/50',
        outline: 'border border-transparent data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:shadow-sm',
      },
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
      size: {
        sm: 'h-7 px-2 py-1 text-xs',
        md: 'h-9 px-3 py-1.5 text-sm',
        lg: 'h-11 px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'underline',
        orientation: 'vertical',
        class: 'border-r-2 border-l-0 border-b-0 border-t-0 data-[state=active]:border-primary',
      },
    ],
  }
)

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, orientation, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, orientation, size }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const tabsContentVariants = cva(
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'mt-2',
        underline: 'mt-4',
        pills: 'mt-2',
        outline: 'mt-2',
      },
      orientation: {
        horizontal: '',
        vertical: 'ml-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
    compoundVariants: [
      {
        variant: 'underline',
        orientation: 'vertical',
        class: 'mt-0 ml-4 pl-4',
      },
    ],
  }
)

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, orientation, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant, orientation }), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Compound Tabs component for easier usage
export interface SimpleTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabs: Array<{
    value: string
    label: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
  }>
  variant?: 'default' | 'underline' | 'pills' | 'outline'
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  listClassName?: string
  contentClassName?: string
}

const SimpleTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  SimpleTabsProps
>(({ 
  tabs, 
  variant = 'default',
  orientation = 'horizontal',
  size = 'md',
  className,
  listClassName,
  contentClassName,
  ...props 
}, ref) => {
  return (
    <Tabs
      ref={ref}
      orientation={orientation}
      className={cn(
        orientation === 'vertical' ? 'flex gap-4' : '',
        className
      )}
      {...props}
    >
      <TabsList 
        variant={variant} 
        orientation={orientation} 
        size={size}
        className={listClassName}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            variant={variant}
            orientation={orientation}
            size={size}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <div className={cn(
        orientation === 'vertical' ? 'flex-1' : '',
        contentClassName
      )}>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            variant={variant}
            orientation={orientation}
          >
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
})
SimpleTabs.displayName = 'SimpleTabs'

// Icon Tabs component
export interface IconTabsProps extends Omit<SimpleTabsProps, 'tabs'> {
  tabs: Array<{
    value: string
    label: React.ReactNode
    icon?: React.ReactNode
    content: React.ReactNode
    disabled?: boolean
  }>
}

const IconTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  IconTabsProps
>(({ tabs, ...props }, ref) => {
  const tabsWithIcons = tabs.map(tab => ({
    ...tab,
    label: (
      <div className="flex items-center gap-2">
        {tab.icon}
        {tab.label}
      </div>
    ),
  }))

  return <SimpleTabs ref={ref} tabs={tabsWithIcons} {...props} />
})
IconTabs.displayName = 'IconTabs'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SimpleTabs,
  IconTabs,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
}