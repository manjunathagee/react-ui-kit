import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const accordionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'border rounded-md divide-y',
        ghost: 'space-y-2',
        outline: 'border-2 rounded-lg divide-y',
        filled: 'bg-muted rounded-lg divide-y',
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

const accordionItemVariants = cva(
  'border-b',
  {
    variants: {
      variant: {
        default: 'border-border',
        ghost: 'border-transparent',
        outline: 'border-border',
        filled: 'border-muted-foreground/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      variant: {
        default: 'px-4',
        ghost: 'px-0',
        outline: 'px-4',
        filled: 'px-4',
      },
      size: {
        sm: 'py-2 text-sm',
        md: 'py-4 text-base',
        lg: 'py-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: 'px-4 pb-4 pt-0',
        ghost: 'px-0 pb-4 pt-0',
        outline: 'px-4 pb-4 pt-0',
        filled: 'px-4 pb-4 pt-0',
      },
      size: {
        sm: 'px-2 pb-2 text-xs',
        md: 'px-4 pb-4 text-sm',
        lg: 'px-6 pb-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface AccordionProps
  extends VariantProps<typeof accordionVariants> {
  className?: string
}

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(accordionVariants({ variant, size }), className)}
    {...props}
  />
))
Accordion.displayName = 'Accordion'

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  hideIcon?: boolean
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, variant, size, hideIcon = false, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {!hideIcon && (
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant, size }), className)}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Simple accordion component for easier usage
export interface AccordionData {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export interface SimpleAccordionProps extends AccordionProps {
  data: AccordionData[]
  allowMultiple?: boolean
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const SimpleAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  SimpleAccordionProps
>(({ 
  data, 
  allowMultiple = false, 
  defaultValue,
  onValueChange,
  variant,
  size,
  className,
  ...props 
}, ref) => {
  if (allowMultiple) {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(accordionVariants({ variant, size }), className)}
        type="multiple"
        defaultValue={defaultValue as string[]}
        onValueChange={onValueChange as (value: string[]) => void}
        {...props}
      >
        {data.map((item) => (
          <AccordionItem key={item.id} value={item.id} variant={variant} disabled={item.disabled}>
            <AccordionTrigger variant={variant} size={size}>
              {item.title}
            </AccordionTrigger>
            <AccordionContent variant={variant} size={size}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(accordionVariants({ variant, size }), className)}
      type="single"
      defaultValue={defaultValue as string}
      onValueChange={onValueChange as (value: string) => void}
      collapsible
      {...props}
    >
      {data.map((item) => (
        <AccordionItem key={item.id} value={item.id} variant={variant} disabled={item.disabled}>
          <AccordionTrigger variant={variant} size={size}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent variant={variant} size={size}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  )
})
SimpleAccordion.displayName = 'SimpleAccordion'

// FAQ Accordion component
export interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
}

export interface FAQAccordionProps extends AccordionProps {
  faqs: FAQItem[]
  allowMultiple?: boolean
  searchable?: boolean
}

const FAQAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  FAQAccordionProps
>(({ faqs, allowMultiple = false, searchable = false, variant, size, className, ...props }, ref) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const filteredFAQs = React.useMemo(() => {
    if (!searchTerm) return faqs
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [faqs, searchTerm])

  const renderAccordionContent = () => (
    <>
      {filteredFAQs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} variant={variant}>
          <AccordionTrigger variant={variant} size={size}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent variant={variant} size={size}>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
      
      {filteredFAQs.length === 0 && searchTerm && (
        <div className="text-center py-8 text-muted-foreground">
          No FAQs found matching "{searchTerm}"
        </div>
      )}
    </>
  )

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      )}
      
      {allowMultiple ? (
        <AccordionPrimitive.Root
          ref={ref}
          className={cn(accordionVariants({ variant, size }), className)}
          type="multiple"
          {...props}
        >
          {renderAccordionContent()}
        </AccordionPrimitive.Root>
      ) : (
        <AccordionPrimitive.Root
          ref={ref}
          className={cn(accordionVariants({ variant, size }), className)}
          type="single"
          collapsible
          {...props}
        >
          {renderAccordionContent()}
        </AccordionPrimitive.Root>
      )}
    </div>
  )
})
FAQAccordion.displayName = 'FAQAccordion'

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  SimpleAccordion,
  FAQAccordion,
  accordionVariants,
}