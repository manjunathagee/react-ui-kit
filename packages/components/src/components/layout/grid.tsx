import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      none: 'grid-cols-none',
      subgrid: 'grid-cols-subgrid',
    },
    rows: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      none: 'grid-rows-none',
      subgrid: 'grid-rows-subgrid',
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
    gapX: {
      0: 'gap-x-0',
      1: 'gap-x-1',
      2: 'gap-x-2',
      3: 'gap-x-3',
      4: 'gap-x-4',
      5: 'gap-x-5',
      6: 'gap-x-6',
      8: 'gap-x-8',
      10: 'gap-x-10',
      12: 'gap-x-12',
      16: 'gap-x-16',
      20: 'gap-x-20',
    },
    gapY: {
      0: 'gap-y-0',
      1: 'gap-y-1',
      2: 'gap-y-2',
      3: 'gap-y-3',
      4: 'gap-y-4',
      5: 'gap-y-5',
      6: 'gap-y-6',
      8: 'gap-y-8',
      10: 'gap-y-10',
      12: 'gap-y-12',
      16: 'gap-y-16',
      20: 'gap-y-20',
    },
    autoFlow: {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
    placeItems: {
      start: 'place-items-start',
      end: 'place-items-end',
      center: 'place-items-center',
      stretch: 'place-items-stretch',
    },
    placeContent: {
      center: 'place-content-center',
      start: 'place-content-start',
      end: 'place-content-end',
      between: 'place-content-between',
      around: 'place-content-around',
      evenly: 'place-content-evenly',
      stretch: 'place-content-stretch',
    },
    justifyItems: {
      start: 'justify-items-start',
      end: 'justify-items-end',
      center: 'justify-items-center',
      stretch: 'justify-items-stretch',
    },
    alignItems: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      stretch: 'items-stretch',
    },
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: keyof JSX.IntrinsicElements
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className,
    as = 'div',
    cols,
    rows,
    gap,
    gapX,
    gapY,
    autoFlow,
    placeItems,
    placeContent,
    justifyItems,
    alignItems,
    ...props 
  }, ref) => {
    const Comp = as as React.ElementType

    return (
      <Comp
        className={cn(
          gridVariants({
            cols,
            rows,
            gap,
            gapX,
            gapY,
            autoFlow,
            placeItems,
            placeContent,
            justifyItems,
            alignItems,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

export { Grid, gridVariants }