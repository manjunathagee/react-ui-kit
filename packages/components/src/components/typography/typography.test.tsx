import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading, Text, Code, Pre, Link } from './index'

describe('Typography Components', () => {
  describe('Heading', () => {
    it('renders with correct heading level', () => {
      render(<Heading level={1}>Test Heading</Heading>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('renders with custom as prop', () => {
      render(<Heading level={1} as="h2">Test Heading</Heading>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('applies correct classes for different levels', () => {
      const { rerender } = render(<Heading level={1}>Heading 1</Heading>)
      expect(screen.getByRole('heading')).toHaveClass('text-4xl', 'font-extrabold')

      rerender(<Heading level={6}>Heading 6</Heading>)
      expect(screen.getByRole('heading')).toHaveClass('text-base', 'font-semibold')
    })

    it('applies custom className', () => {
      render(<Heading level={1} className="custom-class">Test</Heading>)
      expect(screen.getByRole('heading')).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Heading level={1} ref={ref}>Test</Heading>)
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    })

    it('passes through other props', () => {
      render(<Heading level={1} data-testid="heading">Test</Heading>)
      expect(screen.getByTestId('heading')).toBeInTheDocument()
    })
  })

  describe('Text', () => {
    it('renders as paragraph by default', () => {
      render(<Text>Test text</Text>)
      expect(screen.getByText('Test text').tagName).toBe('P')
    })

    it('renders with different variants', () => {
      const { rerender } = render(<Text variant="body">Body text</Text>)
      expect(screen.getByText('Body text')).toHaveClass('text-base', 'leading-7')

      rerender(<Text variant="small">Small text</Text>)
      expect(screen.getByText('Small text')).toHaveClass('text-sm', 'font-medium')

      rerender(<Text variant="caption">Caption text</Text>)
      expect(screen.getByText('Caption text')).toHaveClass('text-xs', 'leading-4')

      rerender(<Text variant="overline">Overline text</Text>)
      expect(screen.getByText('Overline text')).toHaveClass('text-xs', 'font-medium', 'uppercase')
    })

    it('renders with different elements using as prop', () => {
      const { rerender } = render(<Text as="span">Span text</Text>)
      expect(screen.getByText('Span text').tagName).toBe('SPAN')

      rerender(<Text as="div">Div text</Text>)
      expect(screen.getByText('Div text').tagName).toBe('DIV')

      rerender(<Text as="strong">Strong text</Text>)
      expect(screen.getByText('Strong text').tagName).toBe('STRONG')
    })

    it('applies weight variants correctly', () => {
      const { rerender } = render(<Text weight="light">Light text</Text>)
      expect(screen.getByText('Light text')).toHaveClass('font-light')

      rerender(<Text weight="bold">Bold text</Text>)
      expect(screen.getByText('Bold text')).toHaveClass('font-bold')
    })

    it('applies text alignment correctly', () => {
      const { rerender } = render(<Text align="center">Centered text</Text>)
      expect(screen.getByText('Centered text')).toHaveClass('text-center')

      rerender(<Text align="right">Right text</Text>)
      expect(screen.getByText('Right text')).toHaveClass('text-right')
    })

    it('applies custom className', () => {
      render(<Text className="custom-text">Test</Text>)
      expect(screen.getByText('Test')).toHaveClass('custom-text')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Text ref={ref}>Test</Text>)
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
    })
  })

  describe('Code', () => {
    it('renders as inline code by default', () => {
      render(<Code>const test = true</Code>)
      const codeElement = screen.getByText('const test = true')
      expect(codeElement.tagName).toBe('CODE')
      expect(codeElement).toHaveClass('font-mono', 'text-sm')
    })

    it('renders as block code when variant is block', () => {
      render(<Code variant="block">const test = true</Code>)
      const codeElement = screen.getByText('const test = true')
      expect(codeElement.tagName).toBe('PRE')
      expect(codeElement).toHaveClass('block', 'p-4', 'overflow-x-auto')
    })

    it('applies custom className', () => {
      render(<Code className="custom-code">test</Code>)
      expect(screen.getByText('test')).toHaveClass('custom-code')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Code ref={ref}>test</Code>)
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })

    it('passes through other props', () => {
      render(<Code data-testid="code-element">test</Code>)
      expect(screen.getByTestId('code-element')).toBeInTheDocument()
    })
  })

  describe('Pre', () => {
    it('renders as pre element', () => {
      render(<Pre data-testid="pre">const code = true</Pre>)
      const preElement = screen.getByTestId('pre')
      expect(preElement.tagName).toBe('PRE')
      expect(preElement).toHaveClass('font-mono', 'text-sm')
    })

    it('applies variant styles correctly', () => {
      const { rerender } = render(<Pre variant="default" data-testid="pre">code</Pre>)
      expect(screen.getByTestId('pre')).toHaveClass('border')

      rerender(<Pre variant="ghost" data-testid="pre">code</Pre>)
      expect(screen.getByTestId('pre')).toHaveClass('bg-transparent', 'border-0', 'p-0')
    })

    it('applies custom className', () => {
      render(<Pre className="custom-pre" data-testid="pre">code</Pre>)
      expect(screen.getByTestId('pre')).toHaveClass('custom-pre')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Pre ref={ref}>code</Pre>)
      expect(ref.current).toBeInstanceOf(HTMLPreElement)
    })
  })

  describe('Link', () => {
    it('renders as anchor element', () => {
      render(<Link href="/test">Test link</Link>)
      const linkElement = screen.getByRole('link')
      expect(linkElement).toBeInTheDocument()
      expect(linkElement).toHaveAttribute('href', '/test')
    })

    it('applies different variants correctly', () => {
      const { rerender } = render(<Link href="#" variant="default">Default link</Link>)
      expect(screen.getByRole('link')).toHaveClass('text-primary', 'underline-offset-4')

      rerender(<Link href="#" variant="subtle">Subtle link</Link>)
      expect(screen.getByRole('link')).toHaveClass('text-muted-foreground')

      rerender(<Link href="#" variant="destructive">Destructive link</Link>)
      expect(screen.getByRole('link')).toHaveClass('text-destructive')
    })

    it('applies different sizes correctly', () => {
      const { rerender } = render(<Link href="#" size="sm">Small link</Link>)
      expect(screen.getByRole('link')).toHaveClass('text-sm')

      rerender(<Link href="#" size="lg">Large link</Link>)
      expect(screen.getByRole('link')).toHaveClass('text-lg')
    })

    it('handles external links correctly', () => {
      render(<Link external href="https://example.com">External link</Link>)
      const linkElement = screen.getByRole('link')
      expect(linkElement).toHaveAttribute('target', '_blank')
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer')
      
      // Check for external icon
      const icon = linkElement.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('ml-1', 'h-3', 'w-3')
    })

    it('does not add external attributes for internal links', () => {
      render(<Link href="/internal">Internal link</Link>)
      const linkElement = screen.getByRole('link')
      expect(linkElement).not.toHaveAttribute('target')
      expect(linkElement).not.toHaveAttribute('rel')
      expect(linkElement.querySelector('svg')).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Link className="custom-link" href="/test">Test</Link>)
      expect(screen.getByRole('link')).toHaveClass('custom-link')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Link ref={ref} href="/test">Test</Link>)
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
    })

    it('supports focus and accessibility', () => {
      render(<Link href="/test">Accessible link</Link>)
      const linkElement = screen.getByRole('link')
      expect(linkElement).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
    })

    it('passes through other anchor props', () => {
      render(<Link href="/test" title="Test title" data-testid="link">Test</Link>)
      const linkElement = screen.getByTestId('link')
      expect(linkElement).toHaveAttribute('title', 'Test title')
    })
  })
})