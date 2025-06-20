import type { Meta, StoryObj } from '@storybook/react'
import { 
  Form, 
  FormSubmit, 
  Field, 
  Label, 
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectWithSearch,
  Checkbox,
  CheckboxWithLabel,
  CheckboxGroup,
  RadioGroup,
  RadioGroupWithOptions,
  Switch,
  SwitchWithLabel,
  Textarea,
  TextareaWithLabel,
  Button,
} from '../../index'
import * as React from 'react'

// Form Stories
const formMeta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
}

export default formMeta
type FormStory = StoryObj<typeof formMeta>

export const FormDefault: FormStory = {
  args: {
    children: (
      <>
        <Field name="email">
          <Label required>Email Address</Label>
          <Input type="email" placeholder="Enter your email" />
        </Field>
        <Field name="password">
          <Label required>Password</Label>
          <Input type="password" placeholder="Enter your password" />
        </Field>
        <FormSubmit>Submit</FormSubmit>
      </>
    ),
  },
}

export const FormWithValidation: FormStory = {
  render: () => {
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSubmit = (event: React.FormEvent) => {
      setIsLoading(true)
      // Simulate validation
      setTimeout(() => {
        setErrors({
          email: 'This email is already registered',
          password: 'Password must be at least 8 characters',
        })
        setIsLoading(false)
      }, 1000)
    }

    return (
      <Form errors={errors} isLoading={isLoading} onSubmit={handleSubmit}>
        <Field name="email" description="We'll never share your email">
          <Label required>Email Address</Label>
          <Input type="email" placeholder="Enter your email" />
        </Field>
        <Field name="password" description="Use a strong password">
          <Label required>Password</Label>
          <Input type="password" placeholder="Enter your password" />
        </Field>
        <FormSubmit loadingText="Signing in...">Sign In</FormSubmit>
      </Form>
    )
  },
}

export const FormLayouts: FormStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Layout (Default)</h3>
        <Form layout="vertical" className="max-w-md">
          <Field name="name">
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
          </Field>
          <Field name="email">
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </Field>
          <FormSubmit>Submit</FormSubmit>
        </Form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
        <Form layout="horizontal" className="max-w-2xl">
          <Field name="name" layout="horizontal">
            <Label className="w-24">Name</Label>
            <Input placeholder="John Doe" />
          </Field>
          <Field name="email" layout="horizontal">
            <Label className="w-24">Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </Field>
          <FormSubmit>Submit</FormSubmit>
        </Form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Layout</h3>
        <Form layout="inline">
          <Field name="search">
            <Label>Search</Label>
            <Input placeholder="Search..." />
          </Field>
          <Field name="category">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="posts">Posts</SelectItem>
                <SelectItem value="users">Users</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <FormSubmit>Search</FormSubmit>
        </Form>
      </div>
    </div>
  ),
}

export const CompleteFormExample: FormStory = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      role: '',
      newsletter: false,
      notifications: ['email'],
      bio: '',
    })

    return (
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">User Registration</h2>
        <Form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field name="firstName">
              <Label required>First Name</Label>
              <Input placeholder="John" />
            </Field>
            <Field name="lastName">
              <Label required>Last Name</Label>
              <Input placeholder="Doe" />
            </Field>
          </div>
          
          <Field name="email">
            <Label required>Email Address</Label>
            <Input type="email" placeholder="john@example.com" />
          </Field>
          
          <Field name="role">
            <Label>Role</Label>
            <SelectWithSearch
              options={[
                { value: 'developer', label: 'Developer' },
                { value: 'designer', label: 'Designer' },
                { value: 'manager', label: 'Manager' },
                { value: 'qa', label: 'QA Engineer' },
                { value: 'devops', label: 'DevOps Engineer' },
              ]}
              placeholder="Select your role..."
              searchable
              searchPlaceholder="Search roles..."
            />
          </Field>
          
          <Field name="notifications">
            <Label>Notification Preferences</Label>
            <CheckboxGroup orientation="vertical">
              <CheckboxWithLabel
                value="email"
                label="Email notifications"
                description="Receive updates via email"
              />
              <CheckboxWithLabel
                value="sms"
                label="SMS notifications"
                description="Receive updates via SMS"
              />
              <CheckboxWithLabel
                value="push"
                label="Push notifications"
                description="Receive push notifications in browser"
              />
            </CheckboxGroup>
          </Field>
          
          <Field name="marketing">
            <SwitchWithLabel
              label="Marketing Communications"
              description="Receive promotional emails and updates"
            />
          </Field>
          
          <Field name="bio">
            <Label>Bio</Label>
            <TextareaWithLabel
              placeholder="Tell us about yourself..."
              maxLength={500}
              showCount
              autoResize
            />
          </Field>
          
          <div className="flex gap-4">
            <FormSubmit>Create Account</FormSubmit>
            <Button variant="outline">Cancel</Button>
          </div>
        </Form>
      </div>
    )
  },
}

// Label Stories
const labelMeta: Meta<typeof Label> = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'muted'],
    },
    required: {
      control: 'boolean',
    },
  },
}

export { labelMeta as LabelMeta }
type LabelStory = StoryObj<typeof labelMeta>

export const LabelDefault: LabelStory = {
  args: {
    children: 'Email Address',
  },
}

export const LabelVariants: LabelStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label>Default Label</Label>
        <Input placeholder="Default input" className="mt-1" />
      </div>
      <div>
        <Label required>Required Label</Label>
        <Input placeholder="Required input" className="mt-1" />
      </div>
      <div>
        <Label variant="muted">Muted Label</Label>
        <Input placeholder="Muted input" className="mt-1" />
      </div>
      <div>
        <Label variant="destructive">Error Label</Label>
        <Input placeholder="Error input" className="mt-1" />
      </div>
    </div>
  ),
}

export const LabelSizes: LabelStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label size="sm">Small Label</Label>
        <Input size="sm" placeholder="Small input" className="mt-1" />
      </div>
      <div>
        <Label size="md">Medium Label</Label>
        <Input size="md" placeholder="Medium input" className="mt-1" />
      </div>
      <div>
        <Label size="lg">Large Label</Label>
        <Input size="lg" placeholder="Large input" className="mt-1" />
      </div>
    </div>
  ),
}

// Select Stories
const selectMeta: Meta<typeof SelectWithSearch> = {
  title: 'Form/Select',
  component: SelectWithSearch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    searchable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export { selectMeta as SelectMeta }
type SelectStory = StoryObj<typeof selectMeta>

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
]

export const SelectDefault: SelectStory = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a fruit...',
  },
}

export const SelectWithSearchFeature: SelectStory = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a fruit...',
    searchable: true,
    searchPlaceholder: 'Search fruits...',
    emptyMessage: 'No fruits found.',
  },
}

export const SelectSizes: SelectStory = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label>Small Select</Label>
        <SelectWithSearch
          size="sm"
          options={sampleOptions}
          placeholder="Small select..."
        />
      </div>
      <div>
        <Label>Medium Select</Label>
        <SelectWithSearch
          size="md"
          options={sampleOptions}
          placeholder="Medium select..."
        />
      </div>
      <div>
        <Label>Large Select</Label>
        <SelectWithSearch
          size="lg"
          options={sampleOptions}
          placeholder="Large select..."
        />
      </div>
    </div>
  ),
}

// Checkbox Stories
const checkboxMeta: Meta<typeof CheckboxWithLabel> = {
  title: 'Form/Checkbox',
  component: CheckboxWithLabel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline'],
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export { checkboxMeta as CheckboxMeta }
type CheckboxStory = StoryObj<typeof checkboxMeta>

export const CheckboxDefault: CheckboxStory = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const CheckboxStates: CheckboxStory = {
  render: () => (
    <div className="space-y-4">
      <CheckboxWithLabel label="Unchecked" />
      <CheckboxWithLabel label="Checked" checked />
      <CheckboxWithLabel label="Indeterminate" indeterminate />
      <CheckboxWithLabel label="Disabled" disabled />
      <CheckboxWithLabel label="Disabled Checked" disabled checked />
    </div>
  ),
}

export const CheckboxGroupExample: CheckboxStory = {
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(['react'])

    return (
      <div className="space-y-4">
        <Label>Select your favorite technologies:</Label>
        <CheckboxGroup value={selectedValues} onValueChange={setSelectedValues}>
          <CheckboxWithLabel
            value="react"
            label="React"
            description="JavaScript library for building user interfaces"
          />
          <CheckboxWithLabel
            value="vue"
            label="Vue.js"
            description="Progressive JavaScript framework"
          />
          <CheckboxWithLabel
            value="angular"
            label="Angular"
            description="Platform for building web applications"
          />
          <CheckboxWithLabel
            value="svelte"
            label="Svelte"
            description="Cybernetically enhanced web apps"
          />
        </CheckboxGroup>
        <p className="text-sm text-muted-foreground">
          Selected: {selectedValues.join(', ') || 'None'}
        </p>
      </div>
    )
  },
}

// Radio Group Stories
const radioMeta: Meta<typeof RadioGroupWithOptions> = {
  title: 'Form/RadioGroup',
  component: RadioGroupWithOptions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export { radioMeta as RadioGroupMeta }
type RadioStory = StoryObj<typeof radioMeta>

const paymentOptions = [
  { value: 'card', label: 'Credit Card', description: 'Pay with credit or debit card' },
  { value: 'paypal', label: 'PayPal', description: 'Pay with your PayPal account' },
  { value: 'apple', label: 'Apple Pay', description: 'Pay with Touch ID or Face ID' },
  { value: 'google', label: 'Google Pay', description: 'Pay with Google Pay' },
]

export const RadioGroupDefault: RadioStory = {
  args: {
    options: paymentOptions,
  },
}

export const RadioGroupControlled: RadioStory = {
  render: () => {
    const [value, setValue] = React.useState('card')

    return (
      <div className="space-y-4">
        <Label>Select payment method:</Label>
        <RadioGroupWithOptions
          options={paymentOptions}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {value}
        </p>
      </div>
    )
  },
}

export const RadioGroupOrientations: RadioStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Label className="text-base font-semibold">Vertical (Default)</Label>
        <RadioGroupWithOptions
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          orientation="vertical"
        />
      </div>
      <div>
        <Label className="text-base font-semibold">Horizontal</Label>
        <RadioGroupWithOptions
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          orientation="horizontal"
        />
      </div>
    </div>
  ),
}

// Switch Stories
const switchMeta: Meta<typeof SwitchWithLabel> = {
  title: 'Form/Switch',
  component: SwitchWithLabel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export { switchMeta as SwitchMeta }
type SwitchStory = StoryObj<typeof switchMeta>

export const SwitchDefault: SwitchStory = {
  args: {
    label: 'Enable notifications',
  },
}

export const SwitchWithDescription: SwitchStory = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and more.',
  },
}

export const SwitchSettings: SwitchStory = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <h3 className="text-lg font-semibold">Settings</h3>
      <div className="space-y-4">
        <SwitchWithLabel
          label="Push Notifications"
          description="Receive push notifications on your device"
        />
        <SwitchWithLabel
          label="Email Notifications"
          description="Receive notifications via email"
        />
        <SwitchWithLabel
          label="Marketing Communications"
          description="Receive promotional emails and updates"
        />
        <SwitchWithLabel
          label="Analytics"
          description="Help us improve by sharing usage data"
        />
      </div>
    </div>
  ),
}

// Textarea Stories
const textareaMeta: Meta<typeof TextareaWithLabel> = {
  title: 'Form/Textarea',
  component: TextareaWithLabel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    autoResize: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export { textareaMeta as TextareaMeta }
type TextareaStory = StoryObj<typeof textareaMeta>

export const TextareaDefault: TextareaStory = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
}

export const TextareaWithCounter: TextareaStory = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 500,
    showCount: true,
    description: 'Write a brief description about yourself.',
  },
}

export const TextareaAutoResize: TextareaStory = {
  args: {
    label: 'Auto-resizing Textarea',
    placeholder: 'This textarea will grow as you type...',
    autoResize: true,
    description: 'The textarea automatically adjusts its height based on content.',
  },
}

export const TextareaSizes: TextareaStory = {
  render: () => (
    <div className="space-y-4">
      <TextareaWithLabel
        size="sm"
        label="Small Textarea"
        placeholder="Small size..."
      />
      <TextareaWithLabel
        size="md"
        label="Medium Textarea"
        placeholder="Medium size..."
      />
      <TextareaWithLabel
        size="lg"
        label="Large Textarea"
        placeholder="Large size..."
      />
    </div>
  ),
}