import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const paginationVariants = cva(
  'mx-auto flex w-full justify-center',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const paginationContentVariants = cva(
  'flex items-center gap-1',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const paginationItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-9 w-9 text-sm',
        lg: 'h-10 w-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface PaginationProps
  extends React.ComponentPropsWithoutRef<'nav'>,
    VariantProps<typeof paginationVariants> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, size, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn(paginationVariants({ size }), className)}
      {...props}
    />
  )
)
Pagination.displayName = 'Pagination'

export interface PaginationContentProps
  extends React.ComponentPropsWithoutRef<'ul'>,
    VariantProps<typeof paginationContentVariants> {}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, size, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(paginationContentVariants({ size }), className)}
      {...props}
    />
  )
)
PaginationContent.displayName = 'PaginationContent'

export interface PaginationItemProps
  extends React.ComponentPropsWithoutRef<'li'> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<PaginationItemProps, 'className'> &
  React.ComponentPropsWithoutRef<'a'> &
  VariantProps<typeof paginationItemVariants>

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size, variant, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        paginationItemVariants({
          variant: isActive ? 'selected' : variant,
          size,
        }),
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size={props.size || 'md'}
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    <span>Previous</span>
  </PaginationLink>
))
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size={props.size || 'md'}
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </PaginationLink>
))
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & VariantProps<typeof paginationItemVariants>
>(({ className, size, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn(paginationItemVariants({ size }), 'cursor-default', className)}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More pages</span>
  </span>
))
PaginationEllipsis.displayName = 'PaginationEllipsis'

// Simple pagination component for easier usage
export interface SimplePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPreviousNext?: boolean
  showFirstLast?: boolean
  siblingCount?: number
  boundaryCount?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
  disabled?: boolean
}

const SimplePagination = React.forwardRef<HTMLElement, SimplePaginationProps>(
  ({
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNext = true,
    showFirstLast = false,
    siblingCount = 1,
    boundaryCount = 1,
    size = 'md',
    variant = 'default',
    className,
    disabled = false,
    ...props
  }, ref) => {
    const range = React.useMemo(() => {
      const totalPageNumbers = siblingCount + 5 // 1 for current page + 2*siblingCount + 2 for boundaries
      
      if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }
      
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
      
      const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 1
      const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount
      
      const firstPageIndex = 1
      const lastPageIndex = totalPages
      
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
        return [...leftRange, '...', totalPages]
      }
      
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1
        )
        return [firstPageIndex, '...', ...rightRange]
      }
      
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        )
        return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
      }
      
      return []
    }, [currentPage, totalPages, siblingCount, boundaryCount])
    
    const handlePageChange = (page: number | string) => {
      if (typeof page === 'number' && !disabled) {
        onPageChange(page)
      }
    }
    
    const handlePrevious = () => {
      if (currentPage > 1 && !disabled) {
        onPageChange(currentPage - 1)
      }
    }
    
    const handleNext = () => {
      if (currentPage < totalPages && !disabled) {
        onPageChange(currentPage + 1)
      }
    }
    
    return (
      <Pagination ref={ref} size={size} className={className} {...props}>
        <PaginationContent size={size}>
          {showFirstLast && currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                size={size}
                variant={variant}
                onClick={() => handlePageChange(1)}
                className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}
          
          {showPreviousNext && (
            <PaginationItem>
              <PaginationPrevious
                size={size}
                onClick={handlePrevious}
                className={cn(
                  'cursor-pointer',
                  (currentPage <= 1 || disabled) && 'opacity-50 cursor-not-allowed'
                )}
              />
            </PaginationItem>
          )}
          
          {range.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === '...' ? (
                <PaginationEllipsis size={size} />
              ) : (
                <PaginationLink
                  size={size}
                  variant={variant}
                  isActive={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                  className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          {showPreviousNext && (
            <PaginationItem>
              <PaginationNext
                size={size}
                onClick={handleNext}
                className={cn(
                  'cursor-pointer',
                  (currentPage >= totalPages || disabled) && 'opacity-50 cursor-not-allowed'
                )}
              />
            </PaginationItem>
          )}
          
          {showFirstLast && currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                size={size}
                variant={variant}
                onClick={() => handlePageChange(totalPages)}
                className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }
)
SimplePagination.displayName = 'SimplePagination'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SimplePagination,
  paginationVariants,
  paginationContentVariants,
  paginationItemVariants,
}