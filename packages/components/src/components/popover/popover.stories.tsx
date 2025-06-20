import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  SimplePopover, 
  RichPopover 
} from './popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content of the popover. You can put any content here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Default</Button>
        </PopoverTrigger>
        <PopoverContent variant="default">
          <p className="text-sm">Default variant popover</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="primary">Primary</Button>
        </PopoverTrigger>
        <PopoverContent variant="primary">
          <p className="text-sm">Primary variant popover</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Secondary</Button>
        </PopoverTrigger>
        <PopoverContent variant="secondary">
          <p className="text-sm">Secondary variant popover</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">Muted</Button>
        </PopoverTrigger>
        <PopoverContent variant="muted">
          <p className="text-sm">Muted variant popover</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const WithSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Small</Button>
        </PopoverTrigger>
        <PopoverContent size="sm">
          <p className="text-sm">Small size popover with less padding and smaller width.</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Medium</Button>
        </PopoverTrigger>
        <PopoverContent size="md">
          <p className="text-sm">Medium size popover (default) with standard padding and width.</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg">Large</Button>
        </PopoverTrigger>
        <PopoverContent size="lg">
          <p className="text-base">Large size popover with more padding and larger width for more content.</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="xl">Extra Large</Button>
        </PopoverTrigger>
        <PopoverContent size="xl">
          <p className="text-base">Extra large size popover with maximum padding and width for extensive content.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const WithPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">Popover positioned at the top</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">Popover positioned at the right</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">Popover positioned at the bottom</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">Popover positioned at the left</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const SimplePopoverStory: Story = {
  name: 'Simple Popover',
  render: () => (
    <div className="flex gap-4">
      <SimplePopover
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Quick Info</h4>
            <p className="text-sm text-muted-foreground">
              This is a simple popover with just content.
            </p>
          </div>
        }
      >
        <Button variant="outline">Simple Popover</Button>
      </SimplePopover>
      
      <SimplePopover
        content="This is just a text content"
        size="sm"
        variant="primary"
      >
        <Button variant="primary">Small Primary</Button>
      </SimplePopover>
    </div>
  ),
}

export const RichPopoverStory: Story = {
  name: 'Rich Popover',
  render: () => (
    <div className="flex gap-4">
      <RichPopover
        title="Settings"
        description={
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Theme</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Language</label>
              <select className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </div>
        }
      >
        <Button variant="outline">Rich Popover</Button>
      </RichPopover>
      
      <RichPopover
        title="Confirmation"
        description="Are you sure you want to delete this item? This action cannot be undone."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        }
        variant="default"
        size="sm"
      >
        <Button variant="destructive">Delete Item</Button>
      </RichPopover>
    </div>
  ),
}

export const ControlledPopover: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(true)}
            disabled={open}
          >
            Open Popover
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={!open}
          >
            Close Popover
          </Button>
        </div>
        
        <SimplePopover
          open={open}
          onOpenChange={setOpen}
          content={
            <div className="space-y-2">
              <h4 className="font-medium">Controlled Popover</h4>
              <p className="text-sm text-muted-foreground">
                This popover is controlled by external state.
              </p>
              <Button 
                size="sm" 
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Close from inside
              </Button>
            </div>
          }
        >
          <Button variant="primary">Controlled Trigger</Button>
        </SimplePopover>
      </div>
    )
  },
}

export const PopoverWithForm: Story = {
  name: 'Popover with Form',
  render: () => (
    <RichPopover
      title="Add New Item"
      description={
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded-md text-sm"
              rows={3}
              placeholder="Enter description"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" className="rounded" />
            <label htmlFor="active" className="text-sm">
              Active
            </label>
          </div>
        </form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Add Item</Button>
        </div>
      }
      size="lg"
    >
      <Button>Add New Item</Button>
    </RichPopover>
  ),
}