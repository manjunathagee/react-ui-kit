import type { Meta, StoryObj } from '@storybook/react'
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  SimpleTabs,
  IconTabs 
} from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
          <p className="text-muted-foreground">
            This is the content for the first tab. You can put any content here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
          <p className="text-muted-foreground">
            This is the content for the second tab. Different content goes here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
          <p className="text-muted-foreground">
            This is the content for the third tab. More content examples.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Default variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="default">
            <TabsTrigger value="tab1" variant="default">Account</TabsTrigger>
            <TabsTrigger value="tab2" variant="default">Settings</TabsTrigger>
            <TabsTrigger value="tab3" variant="default">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="default">
            <div className="p-4 rounded-lg border">Account information</div>
          </TabsContent>
          <TabsContent value="tab2" variant="default">
            <div className="p-4 rounded-lg border">Settings panel</div>
          </TabsContent>
          <TabsContent value="tab3" variant="default">
            <div className="p-4 rounded-lg border">Profile details</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Underline variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Underline</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" variant="underline">Account</TabsTrigger>
            <TabsTrigger value="tab2" variant="underline">Settings</TabsTrigger>
            <TabsTrigger value="tab3" variant="underline">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="underline">
            <div className="p-4 rounded-lg border">Account information</div>
          </TabsContent>
          <TabsContent value="tab2" variant="underline">
            <div className="p-4 rounded-lg border">Settings panel</div>
          </TabsContent>
          <TabsContent value="tab3" variant="underline">
            <div className="p-4 rounded-lg border">Profile details</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pills variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pills</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="pills">
            <TabsTrigger value="tab1" variant="pills">Account</TabsTrigger>
            <TabsTrigger value="tab2" variant="pills">Settings</TabsTrigger>
            <TabsTrigger value="tab3" variant="pills">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="pills">
            <div className="p-4 rounded-lg border">Account information</div>
          </TabsContent>
          <TabsContent value="tab2" variant="pills">
            <div className="p-4 rounded-lg border">Settings panel</div>
          </TabsContent>
          <TabsContent value="tab3" variant="pills">
            <div className="p-4 rounded-lg border">Profile details</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Outline variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Outline</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="outline">
            <TabsTrigger value="tab1" variant="outline">Account</TabsTrigger>
            <TabsTrigger value="tab2" variant="outline">Settings</TabsTrigger>
            <TabsTrigger value="tab3" variant="outline">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="outline">
            <div className="p-4 rounded-lg border">Account information</div>
          </TabsContent>
          <TabsContent value="tab2" variant="outline">
            <div className="p-4 rounded-lg border">Settings panel</div>
          </TabsContent>
          <TabsContent value="tab3" variant="outline">
            <div className="p-4 rounded-lg border">Profile details</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Small size */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="sm">
            <TabsTrigger value="tab1" size="sm">Small</TabsTrigger>
            <TabsTrigger value="tab2" size="sm">Tabs</TabsTrigger>
            <TabsTrigger value="tab3" size="sm">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 rounded-lg border">Small tab content</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 rounded-lg border">Small tab content</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 rounded-lg border">Small tab content</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Medium size */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="md">
            <TabsTrigger value="tab1" size="md">Medium</TabsTrigger>
            <TabsTrigger value="tab2" size="md">Tabs</TabsTrigger>
            <TabsTrigger value="tab3" size="md">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 rounded-lg border">Medium tab content</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 rounded-lg border">Medium tab content</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 rounded-lg border">Medium tab content</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Large size */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="lg">
            <TabsTrigger value="tab1" size="lg">Large</TabsTrigger>
            <TabsTrigger value="tab2" size="lg">Tabs</TabsTrigger>
            <TabsTrigger value="tab3" size="lg">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 rounded-lg border">Large tab content</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 rounded-lg border">Large tab content</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 rounded-lg border">Large tab content</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const VerticalTabs: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Vertical Default */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Default</h3>
        <Tabs defaultValue="tab1" orientation="vertical" className="w-[600px]">
          <TabsList variant="default" orientation="vertical">
            <TabsTrigger value="tab1" variant="default" orientation="vertical">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="default" orientation="vertical">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="default" orientation="vertical">
              Settings
            </TabsTrigger>
            <TabsTrigger value="tab4" variant="default" orientation="vertical">
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="default" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Dashboard</h3>
              <p className="text-muted-foreground">
                Welcome to your dashboard. Here you can see an overview of your data.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2" variant="default" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Analytics</h3>
              <p className="text-muted-foreground">
                View detailed analytics and insights about your performance.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3" variant="default" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Settings</h3>
              <p className="text-muted-foreground">
                Configure your preferences and account settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab4" variant="default" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Profile</h3>
              <p className="text-muted-foreground">
                Manage your personal information and profile settings.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Vertical Underline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Underline</h3>
        <Tabs defaultValue="tab1" orientation="vertical" className="w-[600px]">
          <TabsList variant="underline" orientation="vertical">
            <TabsTrigger value="tab1" variant="underline" orientation="vertical">
              Home
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="underline" orientation="vertical">
              Products
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="underline" orientation="vertical">
              Services
            </TabsTrigger>
            <TabsTrigger value="tab4" variant="underline" orientation="vertical">
              Contact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" variant="underline" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Home</h3>
              <p className="text-muted-foreground">
                Welcome to our homepage with all the latest updates.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2" variant="underline" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Products</h3>
              <p className="text-muted-foreground">
                Explore our extensive range of products and solutions.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3" variant="underline" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <p className="text-muted-foreground">
                Discover the professional services we offer to our clients.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab4" variant="underline" orientation="vertical">
            <div className="p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <p className="text-muted-foreground">
                Get in touch with our team for any inquiries.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const SimpleTabsStory: Story = {
  name: 'Simple Tabs',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Simple Tabs Component</h3>
        <SimpleTabs
          defaultValue="overview"
          className="w-[500px]"
          tabs={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">
                    This is the overview content. Here you can see a summary of all information.
                  </p>
                </div>
              ),
            },
            {
              value: 'details',
              label: 'Details',
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <p className="text-muted-foreground">
                    Detailed information and specifications are displayed here.
                  </p>
                </div>
              ),
            },
            {
              value: 'history',
              label: 'History',
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">History</h3>
                  <p className="text-muted-foreground">
                    Historical data and timeline information.
                  </p>
                </div>
              ),
            },
            {
              value: 'disabled',
              label: 'Disabled',
              disabled: true,
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Disabled</h3>
                  <p className="text-muted-foreground">
                    This tab is disabled and cannot be selected.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Simple Tabs</h3>
        <SimpleTabs
          defaultValue="general"
          orientation="vertical"
          variant="underline"
          className="w-[600px]"
          tabs={[
            {
              value: 'general',
              label: 'General',
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">General Settings</h3>
                  <p className="text-muted-foreground">
                    Configure general application settings and preferences.
                  </p>
                </div>
              ),
            },
            {
              value: 'security',
              label: 'Security',
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Security Settings</h3>
                  <p className="text-muted-foreground">
                    Manage your security preferences and authentication methods.
                  </p>
                </div>
              ),
            },
            {
              value: 'notifications',
              label: 'Notifications',
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Notification Settings</h3>
                  <p className="text-muted-foreground">
                    Control how and when you receive notifications.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
}

export const IconTabsStory: Story = {
  name: 'Icon Tabs',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tabs with Icons</h3>
        <IconTabs
          defaultValue="home"
          variant="pills"
          className="w-[500px]"
          tabs={[
            {
              value: 'home',
              label: 'Home',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Home</h3>
                  <p className="text-muted-foreground">
                    Welcome to the home page with dashboard overview.
                  </p>
                </div>
              ),
            },
            {
              value: 'search',
              label: 'Search',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Search</h3>
                  <p className="text-muted-foreground">
                    Find what you're looking for with our advanced search.
                  </p>
                </div>
              ),
            },
            {
              value: 'settings',
              label: 'Settings',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Settings</h3>
                  <p className="text-muted-foreground">
                    Configure your application settings and preferences.
                  </p>
                </div>
              ),
            },
            {
              value: 'profile',
              label: 'Profile',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              content: (
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Profile</h3>
                  <p className="text-muted-foreground">
                    Manage your personal information and account details.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Icon Tabs</h3>
        <IconTabs
          defaultValue="dashboard"
          orientation="vertical"
          variant="default"
          size="sm"
          className="w-[600px]"
          tabs={[
            {
              value: 'dashboard',
              label: 'Dashboard',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Dashboard</h3>
                  <p className="text-muted-foreground">
                    View your dashboard with charts, metrics, and key insights.
                  </p>
                </div>
              ),
            },
            {
              value: 'analytics',
              label: 'Analytics',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Analytics</h3>
                  <p className="text-muted-foreground">
                    Deep dive into your data with advanced analytics and reports.
                  </p>
                </div>
              ),
            },
            {
              value: 'users',
              label: 'Users',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              ),
              content: (
                <div className="p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Users</h3>
                  <p className="text-muted-foreground">
                    Manage user accounts, permissions, and access controls.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
}