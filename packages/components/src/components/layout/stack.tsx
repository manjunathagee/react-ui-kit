import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    spacing: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    spacing: 4,
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: keyof JSX.IntrinsicElements
  divider?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className,
    as = 'div',
    direction,
    spacing,
    align,
    justify,
    divider,
    children,
    ...props 
  }, ref) => {
    const Comp = as as React.ElementType
    
    // Convert children to array for divider insertion
    const childrenArray = React.Children.toArray(children)
    
    const childrenWithDividers = divider
      ? childrenArray.reduce((acc: React.ReactNode[], child, index) => {
          acc.push(child)
          if (index < childrenArray.length - 1) {
            acc.push(
              <div key={`divider-${index}`} className="flex-shrink-0">
                {divider}
              </div>
            )
          }
          return acc
        }, [])
      : children

    return (
      <Comp
        className={cn(
          stackVariants({
            direction,
            spacing: divider ? 0 : spacing, // Remove gap when using dividers
            align,
            justify,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {childrenWithDividers}
      </Comp>
    )
  }
)

Stack.displayName = 'Stack'

// Convenience components
const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />
)

const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />
)

VStack.displayName = 'VStack'
HStack.displayName = 'HStack'

export { Stack, VStack, HStack, stackVariants }