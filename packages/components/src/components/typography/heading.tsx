import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    level: {
      1: 'text-4xl font-extrabold lg:text-5xl',
      2: 'text-3xl font-semibold',
      3: 'text-2xl font-semibold',
      4: 'text-xl font-semibold',
      5: 'text-lg font-semibold',
      6: 'text-base font-semibold',
    },
  },
  defaultVariants: {
    level: 1,
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Comp = as || `h${level}`

    return (
      <Comp
        className={cn(headingVariants({ level, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)

Heading.displayName = 'Heading'

export { Heading, headingVariants }