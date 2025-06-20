import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'

const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tbody_tr:nth-child(even)]:bg-muted/50',
        bordered: 'border border-border',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const tableHeaderVariants = cva(
  '[&_tr]:border-b',
  {
    variants: {
      variant: {
        default: '',
        sticky: 'sticky top-0 bg-background z-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const tableBodyVariants = cva(
  '[&_tr:last-child]:border-0',
  {
    variants: {
      variant: {
        default: '',
        hoverable: '[&_tr:hover]:bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const tableRowVariants = cva(
  'border-b transition-colors data-[state=selected]:bg-muted',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted/50',
        selected: 'bg-muted',
        clickable: 'cursor-pointer hover:bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const tableCellVariants = cva(
  'p-4 align-middle [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const tableHeadVariants = cva(
  'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'h-10 px-2 text-xs',
        md: 'h-12 px-4 text-sm',
        lg: 'h-14 px-6 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ variant }), className)}
      {...props}
    />
  )
)
TableHeader.displayName = 'TableHeader'

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants({ variant }), className)}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | null
  onSort?: () => void
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, sortable, sortDirection, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        tableHeadVariants({ size }),
        sortable && 'cursor-pointer select-none hover:bg-muted/50',
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        {sortable && (
          <span className="ml-2">
            {sortDirection === 'asc' && <ChevronUp className="h-4 w-4" />}
            {sortDirection === 'desc' && <ChevronDown className="h-4 w-4" />}
            {sortDirection === null && <ArrowUpDown className="h-4 w-4 opacity-50" />}
          </span>
        )}
      </div>
    </th>
  )
)
TableHead.displayName = 'TableHead'

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size }), className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
TableCaption.displayName = 'TableCaption'

// Simple table component for easier usage
export interface Column<TData = any> {
  key: string
  header: string
  accessor?: keyof TData | ((row: TData) => React.ReactNode)
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface SimpleTableProps<TData = any> extends Omit<TableProps, 'children'> {
  data: TData[]
  columns: Column<TData>[]
  caption?: string
  onRowClick?: (row: TData, index: number) => void
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string) => void
  emptyMessage?: string
  loading?: boolean
  hoverable?: boolean
  striped?: boolean
}

function SimpleTable<TData = any>({
  data,
  columns,
  caption,
  onRowClick,
  sortBy,
  sortDirection,
  onSort,
  emptyMessage = 'No data available',
  loading = false,
  hoverable = false,
  striped = false,
  variant,
  size,
  className,
  ...props
}: SimpleTableProps<TData>) {
  const getCellValue = (row: TData, column: Column<TData>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }
    if (typeof column.accessor === 'string') {
      return row[column.accessor] as React.ReactNode
    }
    return row[column.key as keyof TData] as React.ReactNode
  }

  const handleSort = (columnKey: string) => {
    if (onSort) {
      onSort(columnKey)
    }
  }

  const tableVariant = striped ? 'striped' : variant
  const bodyVariant = hoverable ? 'hoverable' : 'default'

  return (
    <Table variant={tableVariant} size={size} className={className} {...props}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              size={size}
              sortable={column.sortable}
              sortDirection={sortBy === column.key ? sortDirection || null : null}
              onSort={() => column.sortable && handleSort(column.key)}
              style={{ 
                width: column.width,
                textAlign: column.align || 'left'
              }}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody variant={bodyVariant}>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Loading...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow
              key={index}
              variant={onRowClick ? 'clickable' : 'default'}
              onClick={() => onRowClick?.(row, index)}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  size={size}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {getCellValue(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
      {caption && <TableCaption>{caption}</TableCaption>}
    </Table>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  SimpleTable,
  tableVariants,
}