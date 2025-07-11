import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500 bg-green-50 text-green-900 dark:border-green-400 dark:bg-green-950 dark:text-green-50',
        warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-400 dark:bg-yellow-950 dark:text-yellow-50',
        info: 'border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

// Toast Hook for easier usage
export interface ToastOptions {
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  duration?: number
  open?: boolean
}

interface ToastState {
  toasts: (ToastOptions & { id: string; open: boolean })[]
}

const toastState: ToastState = {
  toasts: [],
}

const listeners: Array<(state: ToastState) => void> = []
const toastTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map()

function dispatch(action: { type: 'ADD_TOAST' | 'DISMISS_TOAST' | 'REMOVE_TOAST'; payload: any }) {
  switch (action.type) {
    case 'ADD_TOAST':
      toastState.toasts = [...toastState.toasts, action.payload]
      break
    case 'DISMISS_TOAST':
      toastState.toasts = toastState.toasts.map((toast) =>
        toast.id === action.payload.id ? { ...toast, open: false } : toast
      )
      // Remove toast after animation duration
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: action.payload })
      }, 150) // Animation duration
      break
    case 'REMOVE_TOAST':
      toastState.toasts = toastState.toasts.filter((toast) => toast.id !== action.payload.id)
      // Clear timeout if exists
      const timeout = toastTimeouts.get(action.payload.id)
      if (timeout) {
        clearTimeout(timeout)
        toastTimeouts.delete(action.payload.id)
      }
      break
  }
  
  listeners.forEach((listener) => listener(toastState))
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(toastState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 11)
    
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        ...options,
        id,
        open: true,
      },
    })

    // Auto dismiss after duration
    const duration = options.duration ?? 5000
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dispatch({
          type: 'DISMISS_TOAST',
          payload: { id },
        })
      }, duration)
      toastTimeouts.set(id, timeout)
    }

    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    dispatch({
      type: 'DISMISS_TOAST',
      payload: { id },
    })
  }, [])

  const remove = React.useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: { id },
    })
  }, [])

  return {
    toasts: state.toasts,
    toast,
    dismiss,
    remove,
  }
}

// Convenience functions
const toast = {
  success: (options: Omit<ToastOptions, 'variant'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    const payload = { ...options, variant: 'success' as const, id, open: true }
    dispatch({ type: 'ADD_TOAST', payload })
    
    const duration = options.duration ?? 5000
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: { id } })
      }, duration)
      toastTimeouts.set(id, timeout)
    }
    
    return id
  },
  error: (options: Omit<ToastOptions, 'variant'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    const payload = { ...options, variant: 'destructive' as const, id, open: true }
    dispatch({ type: 'ADD_TOAST', payload })
    
    const duration = options.duration ?? 5000
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: { id } })
      }, duration)
      toastTimeouts.set(id, timeout)
    }
    
    return id
  },
  warning: (options: Omit<ToastOptions, 'variant'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    const payload = { ...options, variant: 'warning' as const, id, open: true }
    dispatch({ type: 'ADD_TOAST', payload })
    
    const duration = options.duration ?? 5000
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: { id } })
      }, duration)
      toastTimeouts.set(id, timeout)
    }
    
    return id
  },
  info: (options: Omit<ToastOptions, 'variant'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    const payload = { ...options, variant: 'info' as const, id, open: true }
    dispatch({ type: 'ADD_TOAST', payload })
    
    const duration = options.duration ?? 5000
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: { id } })
      }, duration)
      toastTimeouts.set(id, timeout)
    }
    
    return id
  },
}

const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  useToast,
  toast,
  toastVariants,
  Toaster,
}