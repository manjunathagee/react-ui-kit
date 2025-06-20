import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  SimpleTable,
  type Column,
} from './table'
import { Badge } from '../badge'
import { Button } from '../button'
import { MoreHorizontal, Mail, Phone } from 'lucide-react'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const invoiceData = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250.00 },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: 150.00 },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350.00 },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: 450.00 },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: 550.00 },
]

const userData = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin', 
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'User', 
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    role: 'User', 
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  { 
    id: 4, 
    name: 'Alice Brown', 
    email: 'alice@example.com', 
    role: 'Moderator', 
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
]

// Basic Examples
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoiceData.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            ${invoiceData.reduce((sum, invoice) => sum + invoice.amount, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Striped</h3>
        <Table variant="striped">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Bordered</h3>
        <Table variant="bordered">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead size="sm">Name</TableHead>
              <TableHead size="sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 2).map((user) => (
              <TableRow key={user.id}>
                <TableCell size="sm">{user.name}</TableCell>
                <TableCell size="sm">{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <Table size="md">
          <TableHeader>
            <TableRow>
              <TableHead size="md">Name</TableHead>
              <TableHead size="md">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 2).map((user) => (
              <TableRow key={user.id}>
                <TableCell size="md">{user.name}</TableCell>
                <TableCell size="md">{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <Table size="lg">
          <TableHeader>
            <TableRow>
              <TableHead size="lg">Name</TableHead>
              <TableHead size="lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.slice(0, 2).map((user) => (
              <TableRow key={user.id}>
                <TableCell size="lg">{user.name}</TableCell>
                <TableCell size="lg">{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}

export const WithSorting: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState<string>('')
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

    const handleSort = (column: string) => {
      if (sortBy === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortBy(column)
        setSortDirection('asc')
      }
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              sortable 
              sortDirection={sortBy === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortBy === 'status' ? sortDirection : null}
              onSort={() => handleSort('status')}
            >
              Status
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortBy === 'role' ? sortDirection : null}
              onSort={() => handleSort('role')}
            >
              Role
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

export const ComplexTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody variant="hoverable">
        {userData.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-3 w-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant={
                  user.role === 'Admin' ? 'destructive' : 
                  user.role === 'Moderator' ? 'warning' : 'default'
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Simple Table Examples
export const SimpleTableBasic: Story = {
  render: () => {
    const columns: Column<typeof invoiceData[0]>[] = [
      { key: 'id', header: 'Invoice', accessor: 'id' },
      { key: 'status', header: 'Status', accessor: 'status' },
      { key: 'method', header: 'Method', accessor: 'method' },
      { 
        key: 'amount', 
        header: 'Amount', 
        accessor: (row) => `$${row.amount.toFixed(2)}`,
        align: 'right'
      },
    ]

    return (
      <SimpleTable
        data={invoiceData}
        columns={columns}
        caption="A list of your recent invoices."
      />
    )
  },
}

export const SimpleTableWithSorting: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState<string>('')
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

    const columns: Column<typeof userData[0]>[] = [
      { 
        key: 'name', 
        header: 'User', 
        sortable: true,
        accessor: (row) => (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {row.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium">{row.name}</div>
              <div className="text-sm text-muted-foreground">{row.email}</div>
            </div>
          </div>
        )
      },
      { 
        key: 'role', 
        header: 'Role', 
        sortable: true,
        accessor: (row) => (
          <Badge variant={row.role === 'Admin' ? 'destructive' : row.role === 'Moderator' ? 'warning' : 'default'}>
            {row.role}
          </Badge>
        )
      },
      { 
        key: 'status', 
        header: 'Status', 
        sortable: true,
        accessor: (row) => (
          <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
            {row.status}
          </Badge>
        )
      },
      {
        key: 'actions',
        header: 'Actions',
        accessor: () => (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    ]

    const handleSort = (column: string) => {
      if (sortBy === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortBy(column)
        setSortDirection('asc')
      }
    }

    return (
      <SimpleTable
        data={userData}
        columns={columns}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
        hoverable
        onRowClick={(row) => console.log('Clicked row:', row)}
      />
    )
  },
}

export const SimpleTableStates: Story = {
  render: () => {
    const columns: Column[] = [
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Status' },
      { key: 'role', header: 'Role' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Loading State</h3>
          <SimpleTable
            data={[]}
            columns={columns}
            loading={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Empty State</h3>
          <SimpleTable
            data={[]}
            columns={columns}
            emptyMessage="No users found. Add some users to get started."
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Striped & Hoverable</h3>
          <SimpleTable
            data={userData}
            columns={columns}
            striped
            hoverable
          />
        </div>
      </div>
    )
  },
}