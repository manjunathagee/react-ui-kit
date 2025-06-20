import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const codeVariants = cva(
  'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  {
    variants: {
      variant: {
        inline: '',
        block: 'block p-4 overflow-x-auto whitespace-pre',
      },
    },
    defaultVariants: {
      variant: 'inline',
    },
  }
)

const preVariants = cva(
  'relative rounded-lg bg-muted p-4 overflow-x-auto font-mono text-sm',
  {
    variants: {
      variant: {
        default: 'border',
        ghost: 'bg-transparent border-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

export interface PreProps
  extends React.HTMLAttributes<HTMLPreElement>,
    VariantProps<typeof preVariants> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant === 'block' ? 'pre' : 'code'

    return (
      <Comp
        className={cn(codeVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)

const Pre = React.forwardRef<HTMLPreElement, PreProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <pre
        className={cn(preVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Code.displayName = 'Code'
Pre.displayName = 'Pre'

export { Code, codeVariants, Pre, preVariants }