import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const boxVariants = cva('', {
  variants: {
    p: {
      0: 'p-0',
      1: 'p-1',
      2: 'p-2',
      3: 'p-3',
      4: 'p-4',
      5: 'p-5',
      6: 'p-6',
      8: 'p-8',
      10: 'p-10',
      12: 'p-12',
      16: 'p-16',
      20: 'p-20',
    },
    px: {
      0: 'px-0',
      1: 'px-1',
      2: 'px-2',
      3: 'px-3',
      4: 'px-4',
      5: 'px-5',
      6: 'px-6',
      8: 'px-8',
      10: 'px-10',
      12: 'px-12',
      16: 'px-16',
      20: 'px-20',
    },
    py: {
      0: 'py-0',
      1: 'py-1',
      2: 'py-2',
      3: 'py-3',
      4: 'py-4',
      5: 'py-5',
      6: 'py-6',
      8: 'py-8',
      10: 'py-10',
      12: 'py-12',
      16: 'py-16',
      20: 'py-20',
    },
    m: {
      0: 'm-0',
      1: 'm-1',
      2: 'm-2',
      3: 'm-3',
      4: 'm-4',
      5: 'm-5',
      6: 'm-6',
      8: 'm-8',
      10: 'm-10',
      12: 'm-12',
      16: 'm-16',
      20: 'm-20',
      auto: 'm-auto',
    },
    mx: {
      0: 'mx-0',
      1: 'mx-1',
      2: 'mx-2',
      3: 'mx-3',
      4: 'mx-4',
      5: 'mx-5',
      6: 'mx-6',
      8: 'mx-8',
      10: 'mx-10',
      12: 'mx-12',
      16: 'mx-16',
      20: 'mx-20',
      auto: 'mx-auto',
    },
    my: {
      0: 'my-0',
      1: 'my-1',
      2: 'my-2',
      3: 'my-3',
      4: 'my-4',
      5: 'my-5',
      6: 'my-6',
      8: 'my-8',
      10: 'my-10',
      12: 'my-12',
      16: 'my-16',
      20: 'my-20',
      auto: 'my-auto',
    },
    w: {
      auto: 'w-auto',
      full: 'w-full',
      screen: 'w-screen',
      min: 'w-min',
      max: 'w-max',
      fit: 'w-fit',
    },
    h: {
      auto: 'h-auto',
      full: 'h-full',
      screen: 'h-screen',
      min: 'h-min',
      max: 'h-max',
      fit: 'h-fit',
    },
    maxW: {
      none: 'max-w-none',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      screen: 'max-w-screen-2xl',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
    border: {
      0: 'border-0',
      1: 'border',
      2: 'border-2',
      4: 'border-4',
      8: 'border-8',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    bg: {
      transparent: 'bg-transparent',
      white: 'bg-white',
      black: 'bg-black',
      background: 'bg-background',
      foreground: 'bg-foreground',
      card: 'bg-card',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
    },
    position: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
    display: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
      hidden: 'hidden',
    },
  },
})

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: keyof React.JSX.IntrinsicElements
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ 
    className, 
    as = 'div',
    p,
    px,
    py,
    m,
    mx,
    my,
    w,
    h,
    maxW,
    rounded,
    border,
    shadow,
    bg,
    position,
    display,
    ...props 
  }, ref) => {
    const Comp = as as React.ElementType

    return (
      <Comp
        className={cn(
          boxVariants({
            p,
            px,
            py,
            m,
            mx,
            my,
            w,
            h,
            maxW,
            rounded,
            border,
            shadow,
            bg,
            position,
            display,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Box.displayName = 'Box'

export { Box, boxVariants }