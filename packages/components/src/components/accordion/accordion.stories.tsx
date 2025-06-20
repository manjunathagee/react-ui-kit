import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  SimpleAccordion,
  FAQAccordion,
  type AccordionData,
  type FAQItem,
} from './accordion'
import { Badge } from '../badge'
import { Button } from '../button'
import { Card, CardContent } from '../card'
import { Code, Book, Users, Settings, HelpCircle, Shield } from 'lucide-react'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and uses proper semantic HTML elements.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it maintain state?</AccordionTrigger>
        <AccordionContent>
          Yes, each accordion item maintains its own open/closed state independently.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Is this useful?</AccordionTrigger>
        <AccordionContent>
          Absolutely! Multiple accordion behavior is great for FAQs and settings panels.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <Accordion type="single" collapsible variant="default">
          <AccordionItem value="item-1" variant="default">
            <AccordionTrigger variant="default">Default Accordion</AccordionTrigger>
            <AccordionContent variant="default">
              This is the default accordion style with borders and standard styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="default">
            <AccordionTrigger variant="default">Another Item</AccordionTrigger>
            <AccordionContent variant="default">
              Content for the second accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ghost</h3>
        <Accordion type="single" collapsible variant="ghost">
          <AccordionItem value="item-1" variant="ghost">
            <AccordionTrigger variant="ghost">Ghost Accordion</AccordionTrigger>
            <AccordionContent variant="ghost">
              This is the ghost accordion style with minimal borders and clean appearance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="ghost">
            <AccordionTrigger variant="ghost">Another Item</AccordionTrigger>
            <AccordionContent variant="ghost">
              Content for the second accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Outline</h3>
        <Accordion type="single" collapsible variant="outline">
          <AccordionItem value="item-1" variant="outline">
            <AccordionTrigger variant="outline">Outline Accordion</AccordionTrigger>
            <AccordionContent variant="outline">
              This is the outline accordion style with emphasized borders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="outline">
            <AccordionTrigger variant="outline">Another Item</AccordionTrigger>
            <AccordionContent variant="outline">
              Content for the second accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Filled</h3>
        <Accordion type="single" collapsible variant="filled">
          <AccordionItem value="item-1" variant="filled">
            <AccordionTrigger variant="filled">Filled Accordion</AccordionTrigger>
            <AccordionContent variant="filled">
              This is the filled accordion style with background color.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="filled">
            <AccordionTrigger variant="filled">Another Item</AccordionTrigger>
            <AccordionContent variant="filled">
              Content for the second accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <Accordion type="single" collapsible size="sm">
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm">Small Accordion</AccordionTrigger>
            <AccordionContent size="sm">
              This is a small accordion with compact spacing and text.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <Accordion type="single" collapsible size="md">
          <AccordionItem value="item-1">
            <AccordionTrigger size="md">Medium Accordion</AccordionTrigger>
            <AccordionContent size="md">
              This is a medium accordion with standard spacing and text.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <Accordion type="single" collapsible size="lg">
          <AccordionItem value="item-1">
            <AccordionTrigger size="lg">Large Accordion</AccordionTrigger>
            <AccordionContent size="lg">
              This is a large accordion with generous spacing and text.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger hideIcon>Clean accordion without icon</AccordionTrigger>
        <AccordionContent>
          This accordion doesn't show the chevron icon for a cleaner appearance.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger hideIcon>Another clean item</AccordionTrigger>
        <AccordionContent>
          Perfect for minimalist designs where you want to reduce visual clutter.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// Simple Accordion Examples
export const SimpleAccordionBasic: Story = {
  render: () => {
    const data: AccordionData[] = [
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: (
          <div className="space-y-2">
            <p>Welcome to our platform! Here's how to get started:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Create your account</li>
              <li>Complete your profile</li>
              <li>Explore the dashboard</li>
              <li>Set up your first project</li>
            </ol>
          </div>
        ),
      },
      {
        id: 'features',
        title: 'Key Features',
        content: (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Advanced code editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Team collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise security</span>
            </div>
          </div>
        ),
      },
      {
        id: 'support',
        title: 'Support & Help',
        content: (
          <div className="space-y-3">
            <p>Need help? We're here for you!</p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Book className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button size="sm" variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        ),
      },
    ]

    return <SimpleAccordion data={data} />
  },
}

export const SimpleAccordionMultiple: Story = {
  render: () => {
    const data: AccordionData[] = [
      {
        id: 'account',
        title: 'Account Settings',
        content: (
          <div className="space-y-3">
            <p>Manage your account preferences and security settings.</p>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">Profile</Button>
              <Button size="sm" variant="outline">Security</Button>
              <Button size="sm" variant="outline">Billing</Button>
              <Button size="sm" variant="outline">Notifications</Button>
            </div>
          </div>
        ),
      },
      {
        id: 'preferences',
        title: 'User Preferences',
        content: (
          <div className="space-y-2">
            <p>Customize your experience:</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Dark mode</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Weekly digest</span>
              </label>
            </div>
          </div>
        ),
      },
      {
        id: 'integrations',
        title: 'Integrations',
        content: (
          <div className="space-y-3">
            <p>Connect with your favorite tools:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span>GitHub</span>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span>Slack</span>
                <Button size="sm" variant="outline">Connect</Button>
              </div>
            </div>
          </div>
        ),
      },
    ]

    return <SimpleAccordion data={data} allowMultiple defaultValue={['account', 'preferences']} />
  },
}

export const SimpleAccordionVariants: Story = {
  render: () => {
    const data: AccordionData[] = [
      {
        id: 'item-1',
        title: 'Styled Accordion Item',
        content: 'This content is displayed in different accordion styles.',
      },
      {
        id: 'item-2',
        title: 'Another Item',
        content: 'Each variant has its own visual treatment.',
      },
    ]

    return (
      <div className="space-y-6">
        <SimpleAccordion data={data} variant="ghost" />
        <SimpleAccordion data={data} variant="outline" />
        <SimpleAccordion data={data} variant="filled" />
      </div>
    )
  },
}

// FAQ Accordion Examples
export const FAQAccordionBasic: Story = {
  render: () => {
    const faqs: FAQItem[] = [
      {
        id: 'what-is',
        question: 'What is this component library?',
        answer: (
          <div className="space-y-2">
            <p>This is a comprehensive React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.</p>
            <p>It provides a complete set of accessible, customizable, and production-ready components for modern web applications.</p>
          </div>
        ),
      },
      {
        id: 'how-to-install',
        question: 'How do I install and use it?',
        answer: (
          <div className="space-y-3">
            <p>Installation is simple:</p>
            <Card>
              <CardContent className="p-3">
                <code className="text-sm">npm install @your-org/ui-components</code>
              </CardContent>
            </Card>
            <p>Then import the components you need in your React application.</p>
          </div>
        ),
      },
      {
        id: 'customization',
        question: 'Can I customize the components?',
        answer: 'Yes! All components support custom className props and follow a consistent design system that can be themed globally.',
      },
      {
        id: 'typescript',
        question: 'Does it support TypeScript?',
        answer: 'Absolutely! The entire library is built with TypeScript and provides full type safety and IntelliSense support.',
      },
      {
        id: 'accessibility',
        question: 'Are the components accessible?',
        answer: 'Yes, accessibility is a core principle. All components follow WCAG guidelines and use proper ARIA attributes.',
      },
    ]

    return <FAQAccordion faqs={faqs} />
  },
}

export const FAQAccordionSearchable: Story = {
  render: () => {
    const faqs: FAQItem[] = [
      {
        id: 'pricing',
        question: 'What are your pricing plans?',
        answer: 'We offer flexible pricing plans including a free tier for small projects and paid plans for larger teams.',
      },
      {
        id: 'support',
        question: 'How can I get support?',
        answer: 'You can reach our support team through email, chat, or by creating a ticket in our help center.',
      },
      {
        id: 'data-security',
        question: 'How do you handle data security?',
        answer: 'We use industry-standard encryption and security practices to protect your data at all times.',
      },
      {
        id: 'api-access',
        question: 'Do you provide API access?',
        answer: 'Yes, we offer a comprehensive REST API and GraphQL endpoint for advanced integrations.',
      },
      {
        id: 'mobile-app',
        question: 'Is there a mobile app?',
        answer: 'We currently offer responsive web access and are working on dedicated mobile applications.',
      },
      {
        id: 'data-export',
        question: 'Can I export my data?',
        answer: 'Yes, you can export your data in various formats including CSV, JSON, and PDF.',
      },
      {
        id: 'team-collaboration',
        question: 'How does team collaboration work?',
        answer: 'Our platform supports real-time collaboration with role-based permissions and activity tracking.',
      },
      {
        id: 'integrations',
        question: 'What integrations do you support?',
        answer: 'We integrate with popular tools like Slack, GitHub, Jira, and many others through our API.',
      },
    ]

    return <FAQAccordion faqs={faqs} searchable allowMultiple />
  },
}

// Complex Examples
export const SettingsAccordion: Story = {
  render: () => {
    const [emailNotifications, setEmailNotifications] = React.useState(true)
    const [pushNotifications, setPushNotifications] = React.useState(false)
    const [weeklyDigest, setWeeklyDigest] = React.useState(true)

    const settingsData: AccordionData[] = [
      {
        id: 'account',
        title: (
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Account Settings</span>
          </div>
        ) as React.ReactNode,
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe" 
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  defaultValue="john@example.com" 
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
            <Button size="sm">Save Changes</Button>
          </div>
        ),
      },
      {
        id: 'notifications',
        title: (
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>Notification Preferences</span>
          </div>
        ) as React.ReactNode,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Email notifications</span>
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Push notifications</span>
                <input 
                  type="checkbox" 
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Weekly digest</span>
                <input 
                  type="checkbox" 
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="rounded"
                />
              </label>
            </div>
          </div>
        ),
      },
      {
        id: 'privacy',
        title: (
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Privacy & Security</span>
          </div>
        ) as React.ReactNode,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Two-factor authentication</span>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Login alerts</span>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">Change Password</Button>
              <Button size="sm" variant="outline">Download Data</Button>
            </div>
          </div>
        ),
      },
    ]

    return <SimpleAccordion data={settingsData} variant="outline" allowMultiple />
  },
}