import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './heading'
import { Text } from './text'
import { Code, Pre } from './code'
import { Link } from './link'

const meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const AllTypography: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </div>

      <div className="space-y-4">
        <Text variant="body">
          This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text variant="large">This is large text with semibold weight.</Text>
        <Text variant="small">This is small text with medium weight.</Text>
        <Text variant="muted">This is muted text for less important information.</Text>
        <Text variant="lead">
          This is lead text that typically appears at the beginning of an article.
        </Text>
        <Text variant="caption">This is caption text for additional context.</Text>
        <Text variant="overline">OVERLINE TEXT FOR LABELS</Text>
      </div>

      <div className="space-y-2">
        <Text>
          Inline code example: <Code>npm install @react-ui-kit/components</Code>
        </Text>
        <Code variant="block">
{`// Block code example
import { Button } from '@react-ui-kit/components'

function App() {
  return <Button>Click me</Button>
}`}
        </Code>
        <Pre variant="default">
{`// Pre component example
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
}`}
        </Pre>
      </div>

      <div className="space-y-2">
        <Text>
          <Link href="#" variant="default">Default Link</Link> |{' '}
          <Link href="#" variant="subtle">Subtle Link</Link> |{' '}
          <Link href="#" variant="destructive">Destructive Link</Link>
        </Text>
        <Text>
          <Link href="https://example.com" external>External Link</Link>
        </Text>
      </div>
    </div>
  ),
}

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={2}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={3}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={4}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={5}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={6}>The quick brown fox jumps over the lazy dog</Heading>
    </div>
  ),
}

export const TextVariants: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body">
        Body text: The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </Text>
      <Text variant="large">
        Large text: This text is larger and more prominent.
      </Text>
      <Text variant="small">
        Small text: This text is smaller and more compact.
      </Text>
      <Text variant="muted">
        Muted text: This text has reduced contrast for secondary information.
      </Text>
      <Text variant="lead">
        Lead text: This text is typically used for introductory paragraphs or article leads.
      </Text>
      <Text variant="caption">
        Caption text: This text is smaller and used for captions or additional context.
      </Text>
      <Text variant="overline">
        OVERLINE TEXT: THIS TEXT IS USED FOR LABELS AND OVERLINES.
      </Text>
    </div>
  ),
}

export const CodeExamples: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Text>
        Use the <Code>console.log()</Code> function to output values to the console.
      </Text>
      <Code variant="block">
{`function greet(name: string) {
  return \`Hello, \${name}!\`
}

const message = greet('World')
console.log(message)`}
      </Code>
    </div>
  ),
}

export const PreExamples: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text className="mb-2 font-medium">Default Pre Component</Text>
        <Pre variant="default">
{`// Configuration example
const apiConfig = {
  baseUrl: 'https://api.example.com/v1',
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
}`}
        </Pre>
      </div>
      <div>
        <Text className="mb-2 font-medium">Ghost Pre Component</Text>
        <Pre variant="ghost">
{`// Minimal styling example
function processData(input) {
  return input
    .filter(item => item.active)
    .map(item => ({
      id: item.id,
      name: item.name.trim(),
      timestamp: Date.now()
    }))
}`}
        </Pre>
      </div>
    </div>
  ),
}

export const LinkVariants: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-4">
        <Link href="#" variant="default">Default Link</Link>
        <Link href="#" variant="subtle">Subtle Link</Link>
        <Link href="#" variant="destructive">Destructive Link</Link>
      </div>
      <div className="space-x-4">
        <Link href="#" size="sm">Small Link</Link>
        <Link href="#" size="md">Medium Link</Link>
        <Link href="#" size="lg">Large Link</Link>
      </div>
      <div>
        <Link href="https://example.com" external>
          External Link with Icon
        </Link>
      </div>
    </div>
  ),
}