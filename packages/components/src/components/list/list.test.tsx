import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  List,
  ListItem,
  DescriptionList,
  DescriptionItem,
  SimpleList,
  Checklist,
  NavigationList,
  type SimpleListData,
  type ChecklistItem,
  type NavigationItem,
} from './list'

describe('List', () => {
  it('renders as unordered list by default', () => {
    render(
      <List data-testid="list">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>
    )
    
    expect(screen.getByTestId('list').tagName).toBe('UL')
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders as ordered list when ordered prop is true', () => {
    render(
      <List ordered data-testid="list">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>
    )
    
    expect(screen.getByTestId('list').tagName).toBe('OL')
    expect(screen.getByTestId('list')).toHaveClass('list-decimal')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<List data-testid="list" variant="default" />)
    expect(screen.getByTestId('list')).not.toHaveClass('border')

    rerender(<List data-testid="list" variant="bordered" />)
    expect(screen.getByTestId('list')).toHaveClass('border', 'rounded-lg')

    rerender(<List data-testid="list" variant="card" />)
    expect(screen.getByTestId('list')).toHaveClass('space-y-2')

    rerender(<List data-testid="list" variant="flush" />)
    expect(screen.getByTestId('list')).toHaveClass('border-x-0')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<List data-testid="list" size="sm" />)
    expect(screen.getByTestId('list')).toHaveClass('text-sm')

    rerender(<List data-testid="list" size="lg" />)
    expect(screen.getByTestId('list')).toHaveClass('text-lg')
  })
})

describe('ListItem', () => {
  it('renders correctly', () => {
    render(<ListItem data-testid="item">Test Item</ListItem>)
    expect(screen.getByTestId('item')).toBeInTheDocument()
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const icon = <span data-testid="icon">🏠</span>
    render(<ListItem icon={icon}>Home</ListItem>)
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders with action', () => {
    const action = <button data-testid="action">Edit</button>
    render(<ListItem action={action}>Item with action</ListItem>)
    
    expect(screen.getByTestId('action')).toBeInTheDocument()
    expect(screen.getByText('Item with action')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = vi.fn()
    render(<ListItem onClick={onClick} interactive>Clickable Item</ListItem>)
    
    fireEvent.click(screen.getByText('Clickable Item'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events', () => {
    const onClick = vi.fn()
    render(<ListItem onClick={onClick} interactive>Keyboard Item</ListItem>)
    
    const item = screen.getByText('Keyboard Item').closest('li')!
    fireEvent.keyDown(item, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(1)
    
    fireEvent.keyDown(item, { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('applies variant classes correctly', () => {
    render(<ListItem variant="card" data-testid="item">Card Item</ListItem>)
    expect(screen.getByTestId('item')).toHaveClass('p-4', 'border', 'rounded-lg')
  })

  it('applies selected state correctly', () => {
    render(<ListItem selected data-testid="item">Selected Item</ListItem>)
    expect(screen.getByTestId('item')).toHaveClass('bg-accent')
  })

  it('handles disabled state correctly', () => {
    const onClick = vi.fn()
    render(<ListItem disabled onClick={onClick} data-testid="item">Disabled Item</ListItem>)
    
    expect(screen.getByTestId('item')).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    fireEvent.click(screen.getByTestId('item'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders as link when href is provided', () => {
    render(<ListItem href="/test" data-testid="item">Link Item</ListItem>)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Link Item')
  })
})

describe('DescriptionList', () => {
  it('renders correctly', () => {
    render(
      <DescriptionList data-testid="dl">
        <DescriptionItem term="Name" description="John Doe" />
        <DescriptionItem term="Email" description="john@example.com" />
      </DescriptionList>
    )
    
    expect(screen.getByTestId('dl').tagName).toBe('DL')
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

describe('DescriptionItem', () => {
  it('renders term and description correctly', () => {
    render(<DescriptionItem term="Status" description="Active" />)
    
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('applies horizontal layout correctly', () => {
    render(<DescriptionItem term="Status" description="Active" horizontal data-testid="item" />)
    
    expect(screen.getByTestId('item')).toHaveClass('grid', 'grid-cols-3')
  })

  it('handles complex description content', () => {
    const description = <span data-testid="complex">Complex content</span>
    render(<DescriptionItem term="Details" description={description} />)
    
    expect(screen.getByTestId('complex')).toBeInTheDocument()
  })
})

describe('SimpleList', () => {
  const mockData: SimpleListData[] = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3', disabled: true },
  ]

  it('renders all items correctly', () => {
    render(<SimpleList data={mockData} />)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('handles item clicks', () => {
    const onItemClick = vi.fn()
    render(<SimpleList data={mockData} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Item 1'))
    expect(onItemClick).toHaveBeenCalledWith(mockData[0], 0)
  })

  it('handles selection in single select mode', () => {
    const onSelectionChange = vi.fn()
    render(
      <SimpleList 
        data={mockData} 
        selectable 
        selectedItems={[]}
        onSelectionChange={onSelectionChange}
      />
    )
    
    fireEvent.click(screen.getByText('Item 1'))
    expect(onSelectionChange).toHaveBeenCalledWith([1])
  })

  it('handles selection in multi select mode', () => {
    const onSelectionChange = vi.fn()
    render(
      <SimpleList 
        data={mockData} 
        selectable 
        multiSelect
        selectedItems={[1]}
        onSelectionChange={onSelectionChange}
      />
    )
    
    fireEvent.click(screen.getByText('Item 2'))
    expect(onSelectionChange).toHaveBeenCalledWith([1, 2])
  })

  it('does not handle clicks on disabled items', () => {
    const onItemClick = vi.fn()
    const onSelectionChange = vi.fn()
    render(
      <SimpleList 
        data={mockData} 
        onItemClick={onItemClick}
        selectable
        onSelectionChange={onSelectionChange}
      />
    )
    
    fireEvent.click(screen.getByText('Item 3'))
    expect(onItemClick).not.toHaveBeenCalled()
    expect(onSelectionChange).not.toHaveBeenCalled()
  })
})

describe('Checklist', () => {
  const mockItems: ChecklistItem[] = [
    { id: 1, label: 'Task 1', checked: false },
    { id: 2, label: 'Task 2', checked: true },
    { id: 3, label: 'Task 3', checked: false, disabled: true },
  ]

  it('renders all items correctly', () => {
    render(<Checklist items={mockItems} />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('shows progress when showProgress is true', () => {
    render(<Checklist items={mockItems} showProgress />)
    
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('1 of 3 completed')).toBeInTheDocument()
  })

  it('handles item toggle', () => {
    const onItemChange = vi.fn()
    render(<Checklist items={mockItems} onItemChange={onItemChange} />)
    
    fireEvent.click(screen.getByText('Task 1'))
    expect(onItemChange).toHaveBeenCalledWith(mockItems[0], true)
  })

  it('does not handle toggle on disabled items', () => {
    const onItemChange = vi.fn()
    render(<Checklist items={mockItems} onItemChange={onItemChange} />)
    
    fireEvent.click(screen.getByText('Task 3'))
    expect(onItemChange).not.toHaveBeenCalled()
  })

  it('applies strikethrough to checked items', () => {
    render(<Checklist items={mockItems} />)
    
    const task2 = screen.getByText('Task 2')
    expect(task2).toHaveClass('line-through')
  })

  it('renders item descriptions when provided', () => {
    const itemsWithDescriptions: ChecklistItem[] = [
      { 
        id: 1, 
        label: 'Task with description', 
        description: 'This is a description',
        checked: false 
      },
    ]
    
    render(<Checklist items={itemsWithDescriptions} />)
    
    expect(screen.getByText('Task with description')).toBeInTheDocument()
    expect(screen.getByText('This is a description')).toBeInTheDocument()
  })
})

describe('NavigationList', () => {
  const mockItems: NavigationItem[] = [
    { id: 'home', label: 'Home', active: true },
    { 
      id: 'projects', 
      label: 'Projects',
      children: [
        { id: 'project-1', label: 'Project 1' },
        { id: 'project-2', label: 'Project 2' },
      ],
    },
    { id: 'settings', label: 'Settings', disabled: true },
  ]

  it('renders all top-level items correctly', () => {
    render(<NavigationList items={mockItems} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('handles item clicks', () => {
    const onItemClick = vi.fn()
    render(<NavigationList items={mockItems} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Home'))
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0])
  })

  it('expands children when collapsible item is clicked', () => {
    render(<NavigationList items={mockItems} />)
    
    // Children should not be visible initially
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument()
    
    // Click to expand
    fireEvent.click(screen.getByText('Projects'))
    
    // Children should now be visible
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('shows children when defaultExpanded includes item id', () => {
    render(<NavigationList items={mockItems} defaultExpanded={['projects']} />)
    
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('shows all children when collapsible is false', () => {
    render(<NavigationList items={mockItems} collapsible={false} />)
    
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('applies active state correctly', () => {
    render(<NavigationList items={mockItems} />)
    
    const homeItem = screen.getByText('Home').closest('li')
    expect(homeItem).toHaveClass('bg-accent')
  })

  it('handles nested navigation', () => {
    const nestedItems: NavigationItem[] = [
      {
        id: 'docs',
        label: 'Documentation',
        children: [
          {
            id: 'api',
            label: 'API Reference',
            children: [
              { id: 'auth', label: 'Authentication' },
              { id: 'users', label: 'Users' },
            ],
          },
        ],
      },
    ]

    render(<NavigationList items={nestedItems} defaultExpanded={['docs', 'api']} />)
    
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('API Reference')).toBeInTheDocument()
    expect(screen.getByText('Authentication')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})

describe('List Accessibility', () => {
  it('has proper list structure', () => {
    render(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('supports keyboard navigation for interactive items', () => {
    const onClick = vi.fn()
    render(
      <List>
        <ListItem interactive onClick={onClick}>Interactive Item</ListItem>
      </List>
    )

    const item = screen.getByText('Interactive Item').closest('li')!
    expect(item).toHaveAttribute('role', 'button')
    expect(item).toHaveAttribute('tabIndex', '0')
  })

  it('has proper description list structure', () => {
    render(
      <DescriptionList>
        <DescriptionItem term="Name" description="John" />
      </DescriptionList>
    )

    // Note: description lists don't have a specific role in the testing library
    // but we can check for the proper dt/dd structure
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('provides proper checkbox semantics for checklist', () => {
    const items: ChecklistItem[] = [
      { id: 1, label: 'Task 1', checked: false },
    ]

    render(<Checklist items={items} />)

    // The checkbox icon should be clickable
    const item = screen.getByText('Task 1').closest('li')!
    expect(item).toHaveAttribute('role', 'button')
    expect(item).toHaveAttribute('tabIndex', '0')
  })
})