import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      size: {
        sm: 'h-4',
        md: 'h-5',
        lg: 'h-6',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-full w-5',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
)

const sliderTrackVariants = cva(
  'relative grow rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
      orientation: {
        horizontal: 'h-2 w-full',
        vertical: 'w-2 h-full',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
)

const sliderRangeVariants = cva(
  'absolute rounded-full bg-primary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
      orientation: {
        horizontal: 'h-full',
        vertical: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
)

const sliderThumbVariants = cva(
  'block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'orientation'>,
    VariantProps<typeof sliderVariants> {
  showValue?: boolean
  showMarks?: boolean
  marks?: Array<{ value: number; label?: string }>
  formatValue?: (value: number) => string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ 
  className, 
  size, 
  orientation = 'horizontal',
  showValue = false,
  showMarks = false,
  marks,
  formatValue,
  ...props 
}, ref) => {
  const [values, setValues] = React.useState<number[]>(props.defaultValue || props.value || [0])
  
  React.useEffect(() => {
    if (props.value) {
      setValues(props.value)
    }
  }, [props.value])

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues)
    props.onValueChange?.(newValues)
  }

  const defaultFormatValue = React.useCallback((value: number) => value.toString(), [])
  const valueFormatter = formatValue || defaultFormatValue

  return (
    <div className="w-full space-y-2">
      {showValue && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {valueFormatter(values[0])}
          </span>
          {values.length > 1 && (
            <span className="text-muted-foreground">
              {valueFormatter(values[values.length - 1])}
            </span>
          )}
        </div>
      )}
      
      <SliderPrimitive.Root
        ref={ref}
        className={cn(sliderVariants({ size, orientation }), className)}
        orientation={orientation || undefined}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(sliderTrackVariants({ size, orientation }))}
        >
          <SliderPrimitive.Range
            className={cn(sliderRangeVariants({ size, orientation }))}
          />
        </SliderPrimitive.Track>
        
        {/* Render marks if provided */}
        {showMarks && marks && (
          <div className={cn(
            'absolute flex',
            orientation === 'horizontal' 
              ? 'inset-x-0 top-full mt-2 justify-between' 
              : 'inset-y-0 left-full ml-2 flex-col items-start justify-between'
          )}>
            {marks.map((mark, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center',
                  orientation === 'horizontal' ? 'flex-col' : 'flex-row'
                )}
                style={{
                  [orientation === 'horizontal' ? 'left' : 'top']: 
                    `${((mark.value - (props.min || 0)) / ((props.max || 100) - (props.min || 0))) * 100}%`
                }}
              >
                <div 
                  className={cn(
                    'bg-border',
                    orientation === 'horizontal' ? 'h-2 w-0.5' : 'h-0.5 w-2'
                  )}
                />
                {mark.label && (
                  <span className={cn(
                    'text-xs text-muted-foreground',
                    orientation === 'horizontal' ? 'mt-1' : 'ml-1'
                  )}>
                    {mark.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(sliderThumbVariants({ size }))}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, sliderVariants }