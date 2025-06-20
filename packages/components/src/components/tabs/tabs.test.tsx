import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  SimpleTabs,
  IconTabs 
} from './tabs'

describe('Tabs', () => {
  describe('Basic Tabs', () => {
    it('renders tabs with content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    })

    it('switches content when tab is clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
        expect(screen.getByText('Content 2')).toBeInTheDocument()
      })
    })

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
        </Tabs>
      )

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      
      // Focus first tab
      tab1.focus()
      expect(tab1).toHaveFocus()

      // Arrow right to next tab
      await user.keyboard('{ArrowRight}')
      expect(tab2).toHaveFocus()

      // Enter to activate
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeInTheDocument()
      })
    })
  })

  describe('TabsList variants', () => {
    it('applies variant classes correctly', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )

      const tabsList = screen.getByTestId('tabs-list')
      expect(tabsList).toHaveClass('border-b', 'border-border')
    })

    it('applies size classes correctly', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList size="lg" data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      )

      const tabsList = screen.getByTestId('tabs-list')
      expect(tabsList).toHaveClass('h-12', 'text-base')
    })

    it('applies orientation classes correctly', () => {
      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <TabsList orientation="vertical" data-testid="tabs-list">
            <TabsTrigger value="tab1" orientation="vertical">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" orientation="vertical">Content</TabsContent>
        </Tabs>
      )

      const tabsList = screen.getByTestId('tabs-list')
      expect(tabsList).toHaveClass('flex-col', 'w-48')
    })
  })

  describe('TabsTrigger variants', () => {
    it('applies active state classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="active-tab">Active Tab</TabsTrigger>
            <TabsTrigger value="tab2" data-testid="inactive-tab">Inactive Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      const activeTab = screen.getByTestId('active-tab')
      const inactiveTab = screen.getByTestId('inactive-tab')
      
      expect(activeTab).toHaveAttribute('data-state', 'active')
      expect(inactiveTab).toHaveAttribute('data-state', 'inactive')
    })

    it('handles disabled state', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Disabled Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      const disabledTab = screen.getByRole('tab', { name: 'Disabled Tab' })
      expect(disabledTab).toBeDisabled()
    })
  })

  describe('SimpleTabs', () => {
    const mockTabs = [
      {
        value: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
      },
      {
        value: 'tab2',
        label: 'Tab 2',
        content: <div>Content 2</div>,
      },
      {
        value: 'tab3',
        label: 'Tab 3',
        content: <div>Content 3</div>,
        disabled: true,
      },
    ]

    it('renders simple tabs from array', () => {
      render(<SimpleTabs defaultValue="tab1" tabs={mockTabs} />)

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })

    it('handles disabled tabs', () => {
      render(<SimpleTabs defaultValue="tab1" tabs={mockTabs} />)

      const disabledTab = screen.getByRole('tab', { name: 'Tab 3' })
      expect(disabledTab).toBeDisabled()
    })

    it('switches content correctly', async () => {
      const user = userEvent.setup()
      
      render(<SimpleTabs defaultValue="tab1" tabs={mockTabs} />)

      expect(screen.getByText('Content 1')).toBeInTheDocument()
      
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      
      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeInTheDocument()
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
      })
    })

    it('applies variant and size props', () => {
      render(
        <SimpleTabs 
          defaultValue="tab1" 
          tabs={mockTabs}
          variant="pills"
          size="lg"
          listClassName="custom-list-class"
        />
      )

      const tabsList = screen.getByRole('tablist')
      expect(tabsList).toHaveClass('custom-list-class')
    })

    it('handles vertical orientation', () => {
      render(
        <SimpleTabs 
          defaultValue="tab1" 
          tabs={mockTabs}
          orientation="vertical"
        />
      )

      const tabsList = screen.getByRole('tablist')
      expect(tabsList).toHaveClass('flex-col')
    })
  })

  describe('IconTabs', () => {
    const mockIconTabs = [
      {
        value: 'home',
        label: 'Home',
        icon: <span data-testid="home-icon">🏠</span>,
        content: <div>Home Content</div>,
      },
      {
        value: 'settings',
        label: 'Settings',
        icon: <span data-testid="settings-icon">⚙️</span>,
        content: <div>Settings Content</div>,
      },
    ]

    it('renders tabs with icons', () => {
      render(<IconTabs defaultValue="home" tabs={mockIconTabs} />)

      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /Home/ })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /Settings/ })).toBeInTheDocument()
    })

    it('displays content correctly', () => {
      render(<IconTabs defaultValue="home" tabs={mockIconTabs} />)

      expect(screen.getByText('Home Content')).toBeInTheDocument()
      expect(screen.queryByText('Settings Content')).not.toBeInTheDocument()
    })

    it('switches between icon tabs', async () => {
      const user = userEvent.setup()
      
      render(<IconTabs defaultValue="home" tabs={mockIconTabs} />)

      await user.click(screen.getByRole('tab', { name: /Settings/ }))
      
      await waitFor(() => {
        expect(screen.getByText('Settings Content')).toBeInTheDocument()
        expect(screen.queryByText('Home Content')).not.toBeInTheDocument()
      })
    })
  })

  describe('Controlled Tabs', () => {
    it('handles controlled value changes', async () => {
      const onValueChange = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Tabs value="tab1" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      
      expect(onValueChange).toHaveBeenCalledWith('tab2')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      const tabList = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')
      const tabPanels = screen.getAllByRole('tabpanel')

      expect(tabList).toBeInTheDocument()
      expect(tabs).toHaveLength(2)
      expect(tabPanels).toHaveLength(1) // Only active panel is rendered

      // Check ARIA attributes
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('role', 'tab')
        expect(tab).toHaveAttribute('aria-controls')
        expect(tab).toHaveAttribute('aria-selected')
      })

      tabPanels.forEach(panel => {
        expect(panel).toHaveAttribute('role', 'tabpanel')
        expect(panel).toHaveAttribute('aria-labelledby')
      })
    })

    it('manages focus correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <button>Content button 1</button>
          </TabsContent>
          <TabsContent value="tab2">
            <button>Content button 2</button>
          </TabsContent>
        </Tabs>
      )

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })

      // Tab to first tab
      await user.tab()
      expect(tab1).toHaveFocus()

      // Arrow key navigation
      await user.keyboard('{ArrowRight}')
      expect(tab2).toHaveFocus()

      // Activate tab
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText('Content button 2')).toBeInTheDocument()
      })
    })
  })
})