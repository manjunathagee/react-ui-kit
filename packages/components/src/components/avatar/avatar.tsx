import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
      variant: {
        circle: 'rounded-full',
        square: 'rounded-lg',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
    },
  }
)

const avatarImageVariants = cva(
  'aspect-square h-full w-full object-cover',
  {
    variants: {
      variant: {
        circle: 'rounded-full',
        square: 'rounded-lg',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'circle',
    },
  }
)

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        '2xl': 'text-xl',
      },
      variant: {
        circle: 'rounded-full',
        square: 'rounded-lg',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, variant }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    VariantProps<typeof avatarImageVariants> {}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, variant, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(avatarImageVariants({ variant }), className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, variant, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ size, variant }), className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Simple avatar component for easier usage
export interface SimpleAvatarProps extends Omit<AvatarProps, 'children'> {
  src?: string
  alt?: string
  fallback?: string
  name?: string
}

const SimpleAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  SimpleAvatarProps
>(({ src, alt, fallback, name, size, variant, className, ...props }, ref) => {
  // Generate fallback from name if not provided
  const getFallback = () => {
    if (fallback) return fallback
    if (name) {
      return name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase()
    }
    return '?'
  }

  return (
    <Avatar ref={ref} size={size} variant={variant} className={className} {...props}>
      {src && <AvatarImage src={src} alt={alt || name || 'Avatar'} variant={variant} />}
      <AvatarFallback size={size} variant={variant}>
        {getFallback()}
      </AvatarFallback>
    </Avatar>
  )
})
SimpleAvatar.displayName = 'SimpleAvatar'

// Avatar group component for displaying multiple avatars
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
  spacing?: 'tight' | 'normal' | 'loose'
  showMore?: boolean
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 5, size = 'md', spacing = 'normal', showMore = true, className, ...props }, ref) => {
    const avatars = React.Children.toArray(children).filter(Boolean)
    const visibleAvatars = max ? avatars.slice(0, max) : avatars
    const remainingCount = avatars.length - visibleAvatars.length

    const spacingClasses = {
      tight: '-space-x-1',
      normal: '-space-x-2',
      loose: '-space-x-1',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center', spacingClasses[spacing], className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className="relative border-2 border-background rounded-full"
            style={{ zIndex: visibleAvatars.length - index }}
          >
            {React.isValidElement(avatar) && avatar.type === Avatar
              ? React.cloneElement(avatar as React.ReactElement<AvatarProps>, { size, variant: 'circle' })
              : React.isValidElement(avatar) && avatar.type === SimpleAvatar
              ? React.cloneElement(avatar as React.ReactElement<SimpleAvatarProps>, { size, variant: 'circle' })
              : avatar}
          </div>
        ))}
        
        {remainingCount > 0 && showMore && (
          <div
            className="relative border-2 border-background rounded-full"
            style={{ zIndex: 0 }}
          >
            <Avatar size={size} variant="circle">
              <AvatarFallback size={size} variant="circle">
                +{remainingCount}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

// Avatar with status indicator
export interface AvatarWithStatusProps extends SimpleAvatarProps {
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
}

const AvatarWithStatus = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithStatusProps
>(({ status = 'offline', showStatus = true, size, ...props }, ref) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  }

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5',
  }

  return (
    <div className="relative inline-block">
      <SimpleAvatar ref={ref} size={size} {...props} />
      {showStatus && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            statusColors[status],
            statusSizes[size || 'md']
          )}
        />
      )}
    </div>
  )
})
AvatarWithStatus.displayName = 'AvatarWithStatus'

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  SimpleAvatar,
  AvatarGroup,
  AvatarWithStatus,
  avatarVariants,
}