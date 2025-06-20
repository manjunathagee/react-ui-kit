import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    gap: {
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
    grow: {
      0: 'flex-grow-0',
      1: 'flex-grow',
    },
    shrink: {
      0: 'flex-shrink-0',
      1: 'flex-shrink',
    },
    basis: {
      auto: 'basis-auto',
      full: 'basis-full',
      '1/2': 'basis-1/2',
      '1/3': 'basis-1/3',
      '2/3': 'basis-2/3',
      '1/4': 'basis-1/4',
      '3/4': 'basis-3/4',
    },
  },
})

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: keyof JSX.IntrinsicElements
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    className,
    as = 'div',
    direction,
    wrap,
    justify,
    align,
    gap,
    grow,
    shrink,
    basis,
    ...props 
  }, ref) => {
    const Comp = as as React.ElementType

    return (
      <Comp
        className={cn(
          flexVariants({
            direction,
            wrap,
            justify,
            align,
            gap,
            grow,
            shrink,
            basis,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Flex.displayName = 'Flex'

export { Flex, flexVariants }