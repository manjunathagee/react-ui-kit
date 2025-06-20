import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dividerVariants = cva('border-border', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    },
    variant: {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
    thickness: {
      1: 'border-t border-l',
      2: 'border-t-2 border-l-2',
      4: 'border-t-4 border-l-4',
      8: 'border-t-8 border-l-8',
    },
    spacing: {
      0: '',
      1: '',
      2: '',
      4: '',
      8: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      spacing: 1,
      class: 'my-1',
    },
    {
      orientation: 'horizontal',
      spacing: 2,
      class: 'my-2',
    },
    {
      orientation: 'horizontal',
      spacing: 4,
      class: 'my-4',
    },
    {
      orientation: 'horizontal',
      spacing: 8,
      class: 'my-8',
    },
    {
      orientation: 'vertical',
      spacing: 1,
      class: 'mx-1',
    },
    {
      orientation: 'vertical',
      spacing: 2,
      class: 'mx-2',
    },
    {
      orientation: 'vertical',
      spacing: 4,
      class: 'mx-4',
    },
    {
      orientation: 'vertical',
      spacing: 8,
      class: 'mx-8',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 1,
    spacing: 0,
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className,
    orientation = 'horizontal',
    variant,
    thickness,
    spacing,
    label,
    labelPosition = 'center',
    ...props 
  }, ref) => {
    if (label && orientation === 'horizontal') {
      const labelAlignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      }[labelPosition]

      return (
        <div
          className={cn('relative flex items-center', spacing && `my-${spacing}`)}
          ref={ref}
          {...props}
        >
          <div
            className={cn(
              dividerVariants({ orientation, variant, thickness, spacing: 0 }),
              'flex-1'
            )}
          />
          <div className={cn('px-3 text-sm text-muted-foreground', labelAlignmentClass)}>
            {label}
          </div>
          <div
            className={cn(
              dividerVariants({ orientation, variant, thickness, spacing: 0 }),
              'flex-1'
            )}
          />
        </div>
      )
    }

    if (label && orientation === 'vertical') {
      return (
        <div
          className={cn('relative flex flex-col items-center', spacing && `mx-${spacing}`)}
          ref={ref}
          {...props}
        >
          <div
            className={cn(
              dividerVariants({ orientation, variant, thickness, spacing: 0 }),
              'flex-1'
            )}
          />
          <div className="py-2 text-sm text-muted-foreground writing-mode-vertical">
            {label}
          </div>
          <div
            className={cn(
              dividerVariants({ orientation, variant, thickness, spacing: 0 }),
              'flex-1'
            )}
          />
        </div>
      )
    }

    return (
      <div
        className={cn(
          dividerVariants({ orientation, variant, thickness, spacing, className })
        )}
        role="separator"
        aria-orientation={orientation || 'horizontal'}
        ref={ref}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export { Divider, dividerVariants }