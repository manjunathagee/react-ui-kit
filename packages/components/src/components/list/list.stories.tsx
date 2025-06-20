import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
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
import { Badge } from '../badge'
import { Button } from '../button'
import { 
  User, 
  Settings, 
  Home, 
  FileText, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Star,
  Heart,
  Share,
  MoreHorizontal,
  ChevronRight,
  Folder,
  FolderOpen,
  File
} from 'lucide-react'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card', 'flush'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    ordered: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  render: () => (
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
      <ListItem>Fourth item</ListItem>
    </List>
  ),
}

export const Ordered: Story = {
  render: () => (
    <List ordered>
      <ListItem>First step: Setup your environment</ListItem>
      <ListItem>Second step: Install dependencies</ListItem>
      <ListItem>Third step: Configure your project</ListItem>
      <ListItem>Fourth step: Run the development server</ListItem>
    </List>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <List variant="default">
          <ListItem>Default list item</ListItem>
          <ListItem>Another item</ListItem>
          <ListItem>Third item</ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Bordered</h3>
        <List variant="bordered">
          <ListItem variant="bordered">Bordered list item</ListItem>
          <ListItem variant="bordered">Another item</ListItem>
          <ListItem variant="bordered">Third item</ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Card</h3>
        <List variant="card">
          <ListItem variant="card">Card-style list item</ListItem>
          <ListItem variant="card">Another item</ListItem>
          <ListItem variant="card">Third item</ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Flush</h3>
        <List variant="flush">
          <ListItem variant="flush">Flush list item</ListItem>
          <ListItem variant="flush">Another item</ListItem>
          <ListItem variant="flush">Third item</ListItem>
        </List>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <List variant="bordered" size="sm">
          <ListItem variant="bordered" size="sm">Small list item</ListItem>
          <ListItem variant="bordered" size="sm">Another small item</ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <List variant="bordered" size="md">
          <ListItem variant="bordered" size="md">Medium list item</ListItem>
          <ListItem variant="bordered" size="md">Another medium item</ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <List variant="bordered" size="lg">
          <ListItem variant="bordered" size="lg">Large list item</ListItem>
          <ListItem variant="bordered" size="lg">Another large item</ListItem>
        </List>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <List variant="bordered">
      <ListItem variant="bordered" icon={<Home className="w-4 h-4" />}>
        Home
      </ListItem>
      <ListItem variant="bordered" icon={<User className="w-4 h-4" />}>
        Profile
      </ListItem>
      <ListItem variant="bordered" icon={<Settings className="w-4 h-4" />}>
        Settings
      </ListItem>
      <ListItem variant="bordered" icon={<Mail className="w-4 h-4" />}>
        Messages
      </ListItem>
    </List>
  ),
}

export const WithActions: Story = {
  render: () => (
    <List variant="bordered">
      <ListItem 
        variant="bordered" 
        icon={<User className="w-4 h-4" />}
        action={<Button size="sm" variant="outline">Edit</Button>}
      >
        User Profile
      </ListItem>
      <ListItem 
        variant="bordered" 
        icon={<Settings className="w-4 h-4" />}
        action={<Badge variant="secondary">New</Badge>}
      >
        Account Settings
      </ListItem>
      <ListItem 
        variant="bordered" 
        icon={<Mail className="w-4 h-4" />}
        action={<ChevronRight className="w-4 h-4" />}
      >
        Notifications
      </ListItem>
    </List>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null)

    return (
      <List variant="bordered">
        <ListItem 
          variant="bordered" 
          interactive
          selected={selectedItem === 'home'}
          onClick={() => setSelectedItem('home')}
          icon={<Home className="w-4 h-4" />}
        >
          Home
        </ListItem>
        <ListItem 
          variant="bordered" 
          interactive
          selected={selectedItem === 'profile'}
          onClick={() => setSelectedItem('profile')}
          icon={<User className="w-4 h-4" />}
        >
          Profile
        </ListItem>
        <ListItem 
          variant="bordered" 
          interactive
          selected={selectedItem === 'settings'}
          onClick={() => setSelectedItem('settings')}
          icon={<Settings className="w-4 h-4" />}
        >
          Settings
        </ListItem>
      </List>
    )
  },
}

export const WithLinks: Story = {
  render: () => (
    <List variant="bordered">
      <ListItem 
        variant="bordered" 
        href="#home"
        icon={<Home className="w-4 h-4" />}
        action={<ChevronRight className="w-4 h-4" />}
      >
        Home Page
      </ListItem>
      <ListItem 
        variant="bordered" 
        href="#about"
        icon={<FileText className="w-4 h-4" />}
        action={<ChevronRight className="w-4 h-4" />}
      >
        About Us
      </ListItem>
      <ListItem 
        variant="bordered" 
        href="#contact"
        icon={<Mail className="w-4 h-4" />}
        action={<ChevronRight className="w-4 h-4" />}
      >
        Contact
      </ListItem>
    </List>
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <List variant="bordered">
      <ListItem variant="bordered" icon={<Home className="w-4 h-4" />}>
        Active Item
      </ListItem>
      <ListItem 
        variant="bordered" 
        disabled
        icon={<User className="w-4 h-4" />}
      >
        Disabled Item
      </ListItem>
      <ListItem 
        variant="bordered" 
        interactive
        icon={<Settings className="w-4 h-4" />}
      >
        Interactive Item
      </ListItem>
      <ListItem 
        variant="bordered" 
        disabled
        interactive
        icon={<Mail className="w-4 h-4" />}
      >
        Disabled Interactive Item
      </ListItem>
    </List>
  ),
}

// Description List Examples
export const DescriptionListBasic: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionItem 
        term="Name" 
        description="John Doe" 
      />
      <DescriptionItem 
        term="Email" 
        description="john.doe@example.com" 
      />
      <DescriptionItem 
        term="Phone" 
        description="+1 (555) 123-4567" 
      />
      <DescriptionItem 
        term="Address" 
        description="123 Main St, Anytown, ST 12345" 
      />
    </DescriptionList>
  ),
}

export const DescriptionListHorizontal: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionItem 
        term="Name" 
        description="John Doe" 
        horizontal 
      />
      <DescriptionItem 
        term="Email" 
        description="john.doe@example.com" 
        horizontal 
      />
      <DescriptionItem 
        term="Phone" 
        description="+1 (555) 123-4567" 
        horizontal 
      />
      <DescriptionItem 
        term="Status" 
        description={<Badge variant="success">Active</Badge>} 
        horizontal 
      />
    </DescriptionList>
  ),
}

// Simple List Examples
export const SimpleListBasic: Story = {
  render: () => {
    const data: SimpleListData[] = [
      { id: 1, content: 'First item' },
      { id: 2, content: 'Second item' },
      { id: 3, content: 'Third item' },
      { id: 4, content: 'Fourth item' },
    ]

    return <SimpleList data={data} variant="bordered" />
  },
}

export const SimpleListWithIcons: Story = {
  render: () => {
    const data: SimpleListData[] = [
      { 
        id: 1, 
        content: 'Home', 
        icon: <Home className="w-4 h-4" /> 
      },
      { 
        id: 2, 
        content: 'Profile', 
        icon: <User className="w-4 h-4" /> 
      },
      { 
        id: 3, 
        content: 'Settings', 
        icon: <Settings className="w-4 h-4" /> 
      },
      { 
        id: 4, 
        content: 'Messages', 
        icon: <Mail className="w-4 h-4" />,
        action: <Badge variant="destructive">3</Badge>
      },
    ]

    return <SimpleList data={data} variant="bordered" />
  },
}

export const SimpleListSelectable: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<(string | number)[]>([])

    const data: SimpleListData[] = [
      { id: 1, content: 'Apple', icon: <span>🍎</span> },
      { id: 2, content: 'Banana', icon: <span>🍌</span> },
      { id: 3, content: 'Cherry', icon: <span>🍒</span> },
      { id: 4, content: 'Orange', icon: <span>🍊</span> },
      { id: 5, content: 'Grapes', icon: <span>🍇</span>, disabled: true },
    ]

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected: {selectedItems.join(', ') || 'None'}
        </div>
        <SimpleList 
          data={data} 
          variant="bordered"
          selectable
          multiSelect
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />
      </div>
    )
  },
}

// Checklist Examples
export const ChecklistBasic: Story = {
  render: () => {
    const [items, setItems] = React.useState<ChecklistItem[]>([
      { id: 1, label: 'Set up development environment', checked: true },
      { id: 2, label: 'Install dependencies', checked: true },
      { id: 3, label: 'Configure project settings', checked: false },
      { id: 4, label: 'Write unit tests', checked: false },
      { id: 5, label: 'Deploy to production', checked: false, disabled: true },
    ])

    const handleItemChange = (item: ChecklistItem, checked: boolean) => {
      setItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, checked } : i
      ))
    }

    return (
      <Checklist 
        items={items} 
        onItemChange={handleItemChange}
        showProgress
        variant="bordered"
      />
    )
  },
}

export const ChecklistWithDescriptions: Story = {
  render: () => {
    const [items, setItems] = React.useState<ChecklistItem[]>([
      { 
        id: 1, 
        label: 'Review pull request', 
        description: 'Check code quality and test coverage',
        checked: false 
      },
      { 
        id: 2, 
        label: 'Update documentation', 
        description: 'Ensure all new features are documented',
        checked: true 
      },
      { 
        id: 3, 
        label: 'Run integration tests', 
        description: 'Verify all systems work together correctly',
        checked: false 
      },
    ])

    const handleItemChange = (item: ChecklistItem, checked: boolean) => {
      setItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, checked } : i
      ))
    }

    return (
      <Checklist 
        items={items} 
        onItemChange={handleItemChange}
        showProgress
        variant="card"
      />
    )
  },
}

// Navigation List Examples
export const NavigationListBasic: Story = {
  render: () => {
    const items: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Home className="w-4 h-4" />,
        active: true,
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: <Folder className="w-4 h-4" />,
        children: [
          { id: 'project-1', label: 'Website Redesign' },
          { id: 'project-2', label: 'Mobile App' },
          { id: 'project-3', label: 'API Development' },
        ],
      },
      {
        id: 'team',
        label: 'Team',
        icon: <User className="w-4 h-4" />,
        badge: <Badge variant="secondary" className="text-xs">5</Badge>,
        children: [
          { id: 'members', label: 'Members' },
          { id: 'roles', label: 'Roles & Permissions' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
      },
    ]

    return <NavigationList items={items} variant="bordered" />
  },
}

export const NavigationListExpanded: Story = {
  render: () => {
    const items: NavigationItem[] = [
      {
        id: 'files',
        label: 'File Manager',
        icon: <FolderOpen className="w-4 h-4" />,
        children: [
          {
            id: 'documents',
            label: 'Documents',
            icon: <Folder className="w-4 h-4" />,
            children: [
              { id: 'doc-1', label: 'Report.pdf', icon: <File className="w-4 h-4" /> },
              { id: 'doc-2', label: 'Presentation.pptx', icon: <File className="w-4 h-4" /> },
            ],
          },
          {
            id: 'images',
            label: 'Images',
            icon: <Folder className="w-4 h-4" />,
            children: [
              { id: 'img-1', label: 'Logo.png', icon: <File className="w-4 h-4" /> },
              { id: 'img-2', label: 'Banner.jpg', icon: <File className="w-4 h-4" /> },
            ],
          },
        ],
      },
      {
        id: 'recent',
        label: 'Recent Files',
        icon: <Calendar className="w-4 h-4" />,
        badge: <Badge variant="destructive" className="text-xs">New</Badge>,
      },
    ]

    return (
      <NavigationList 
        items={items} 
        variant="flush"
        defaultExpanded={['files', 'documents']}
      />
    )
  },
}

// Complex Examples
export const ContactList: Story = {
  render: () => {
    const contacts: SimpleListData[] = [
      {
        id: 1,
        content: (
          <div className="flex items-center space-x-3 w-full">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="flex-1">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">john@example.com</div>
            </div>
          </div>
        ),
        action: (
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
      {
        id: 2,
        content: (
          <div className="flex items-center space-x-3 w-full">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium">
              JS
            </div>
            <div className="flex-1">
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-muted-foreground">jane@example.com</div>
            </div>
          </div>
        ),
        action: (
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ]

    return <SimpleList data={contacts} variant="bordered" />
  },
}

export const SocialFeed: Story = {
  render: () => {
    const posts: SimpleListData[] = [
      {
        id: 1,
        content: (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
              <div>
                <div className="font-medium">Sarah Wilson</div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
            </div>
            <p className="text-sm">
              Just finished an amazing hike in the mountains! The view was absolutely breathtaking. 
              Can't wait to go back next weekend.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="flex items-center space-x-1 hover:text-red-500">
                <Heart className="w-4 h-4" />
                <span>24</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ),
      },
      {
        id: 2,
        content: (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
              <div>
                <div className="font-medium">Mike Johnson</div>
                <div className="text-xs text-muted-foreground">4 hours ago</div>
              </div>
            </div>
            <p className="text-sm">
              Working on a new React component library. The developer experience is so much better 
              with TypeScript and proper tooling!
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="flex items-center space-x-1 hover:text-red-500">
                <Heart className="w-4 h-4" />
                <span>18</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ),
      },
    ]

    return <SimpleList data={posts} variant="card" />
  },
}