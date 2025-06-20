import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-base leading-7',
      small: 'text-sm font-medium leading-none',
      large: 'text-lg font-semibold',
      muted: 'text-sm text-muted-foreground',
      subtle: 'text-sm text-muted-foreground',
      lead: 'text-xl text-muted-foreground',
      caption: 'text-xs leading-4 text-muted-foreground',
      overline: 'text-xs font-medium uppercase tracking-wider',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'strong' | 'em' | 'small'
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, weight, align, as = 'p', ...props }, ref) => {
    const Comp = as

    return (
      <Comp
        className={cn(textVariants({ variant, weight, align, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)

Text.displayName = 'Text'

export { Text, textVariants }