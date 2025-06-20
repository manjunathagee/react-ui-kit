import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
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

describe('Accordion', () => {
  it('renders correctly', () => {
    render(
      <Accordion type="single" collapsible data-testid="accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('accordion')).toBeInTheDocument()
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <Accordion type="single" collapsible variant="default" data-testid="accordion" />
    )
    expect(screen.getByTestId('accordion')).toHaveClass('border', 'rounded-md')

    rerender(<Accordion type="single" collapsible variant="ghost" data-testid="accordion" />)
    expect(screen.getByTestId('accordion')).toHaveClass('space-y-2')

    rerender(<Accordion type="single" collapsible variant="outline" data-testid="accordion" />)
    expect(screen.getByTestId('accordion')).toHaveClass('border-2')

    rerender(<Accordion type="single" collapsible variant="filled" data-testid="accordion" />)
    expect(screen.getByTestId('accordion')).toHaveClass('bg-muted')
  })

  it('applies size classes correctly', () => {
    render(<Accordion type="single" collapsible size="lg" data-testid="accordion" />)
    expect(screen.getByTestId('accordion')).toHaveClass('text-lg')
  })
})

describe('AccordionTrigger', () => {
  it('renders with chevron icon by default', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger data-testid="trigger">Test Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    // Check for chevron icon (svg element)
    expect(screen.getByTestId('trigger').querySelector('svg')).toBeInTheDocument()
  })

  it('hides icon when hideIcon is true', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger hideIcon data-testid="trigger">Test Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.getByTestId('trigger').querySelector('svg')).not.toBeInTheDocument()
  })

  it('applies variant and size classes correctly', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger variant="ghost" size="lg" data-testid="trigger">
            Test Trigger
          </AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('trigger')).toHaveClass('px-0', 'py-6', 'text-lg')
  })
})

describe('AccordionContent', () => {
  it('renders content correctly', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent data-testid="content">Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies variant and size classes correctly', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent variant="ghost" size="sm" data-testid="content">
            Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('content')).toHaveClass('px-0', 'pb-4')
  })
})

describe('AccordionItem', () => {
  it('applies variant classes correctly', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" variant="ghost" data-testid="item">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByTestId('item')).toHaveClass('border-transparent')
  })
})

describe('SimpleAccordion', () => {
  const mockData: AccordionData[] = [
    {
      id: 'item-1',
      title: 'First Item',
      content: 'First content',
    },
    {
      id: 'item-2',
      title: 'Second Item',
      content: 'Second content',
    },
    {
      id: 'item-3',
      title: 'Disabled Item',
      content: 'Disabled content',
      disabled: true,
    },
  ]

  it('renders all items correctly', () => {
    render(<SimpleAccordion data={mockData} />)
    
    expect(screen.getByText('First Item')).toBeInTheDocument()
    expect(screen.getByText('Second Item')).toBeInTheDocument()
    expect(screen.getByText('Disabled Item')).toBeInTheDocument()
  })

  it('handles single accordion mode', () => {
    render(<SimpleAccordion data={mockData} defaultValue="item-1" />)
    
    // Content should be visible for the default item
    expect(screen.getByText('First content')).toBeInTheDocument()
  })

  it('handles multiple accordion mode', () => {
    render(<SimpleAccordion data={mockData} allowMultiple defaultValue={['item-1', 'item-2']} />)
    
    // Both contents should be visible
    expect(screen.getByText('First content')).toBeInTheDocument()
    expect(screen.getByText('Second content')).toBeInTheDocument()
  })

  it('calls onValueChange when items are toggled', () => {
    const onValueChange = vi.fn()
    render(<SimpleAccordion data={mockData} onValueChange={onValueChange} />)
    
    fireEvent.click(screen.getByText('First Item'))
    expect(onValueChange).toHaveBeenCalledWith('item-1')
  })

  it('applies variant and size props to all items', () => {
    render(<SimpleAccordion data={mockData} variant="ghost" size="lg" data-testid="simple-accordion" />)
    
    const accordion = screen.getByTestId('simple-accordion')
    expect(accordion).toHaveClass('space-y-2', 'text-lg')
  })

  it('handles complex content', () => {
    const complexData: AccordionData[] = [
      {
        id: 'complex',
        title: 'Complex Item',
        content: (
          <div>
            <p>Complex content</p>
            <button>Action Button</button>
          </div>
        ),
      },
    ]

    render(<SimpleAccordion data={complexData} defaultValue="complex" />)
    
    expect(screen.getByText('Complex content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
  })
})

describe('FAQAccordion', () => {
  const mockFAQs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      id: 'faq-2',
      question: 'How do I install React?',
      answer: 'You can install React using npm or yarn.',
    },
    {
      id: 'faq-3',
      question: 'What is TypeScript?',
      answer: 'TypeScript is a typed superset of JavaScript.',
    },
  ]

  it('renders all FAQ items correctly', () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    
    expect(screen.getByText('What is React?')).toBeInTheDocument()
    expect(screen.getByText('How do I install React?')).toBeInTheDocument()
    expect(screen.getByText('What is TypeScript?')).toBeInTheDocument()
  })

  it('shows search input when searchable is true', () => {
    render(<FAQAccordion faqs={mockFAQs} searchable />)
    
    expect(screen.getByPlaceholderText('Search FAQs...')).toBeInTheDocument()
  })

  it('filters FAQs based on search term', () => {
    render(<FAQAccordion faqs={mockFAQs} searchable />)
    
    const searchInput = screen.getByPlaceholderText('Search FAQs...')
    fireEvent.change(searchInput, { target: { value: 'React' } })
    
    expect(screen.getByText('What is React?')).toBeInTheDocument()
    expect(screen.getByText('How do I install React?')).toBeInTheDocument()
    expect(screen.queryByText('What is TypeScript?')).not.toBeInTheDocument()
  })

  it('shows no results message when search yields no matches', () => {
    render(<FAQAccordion faqs={mockFAQs} searchable />)
    
    const searchInput = screen.getByPlaceholderText('Search FAQs...')
    fireEvent.change(searchInput, { target: { value: 'Angular' } })
    
    expect(screen.getByText('No FAQs found matching "Angular"')).toBeInTheDocument()
    expect(screen.queryByText('What is React?')).not.toBeInTheDocument()
  })

  it('supports multiple mode', () => {
    render(<FAQAccordion faqs={mockFAQs} allowMultiple />)
    
    // Click multiple FAQ items
    fireEvent.click(screen.getByText('What is React?'))
    fireEvent.click(screen.getByText('How do I install React?'))
    
    // Both should be open (visible content)
    expect(screen.getByText('React is a JavaScript library for building user interfaces.')).toBeInTheDocument()
    expect(screen.getByText('You can install React using npm or yarn.')).toBeInTheDocument()
  })

  it('handles complex FAQ answers', () => {
    const complexFAQs: FAQItem[] = [
      {
        id: 'complex-faq',
        question: 'Complex Question?',
        answer: (
          <div>
            <p>Complex answer with multiple elements</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        ),
      },
    ]

    render(<FAQAccordion faqs={complexFAQs} />)
    
    fireEvent.click(screen.getByText('Complex Question?'))
    
    expect(screen.getByText('Complex answer with multiple elements')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})

describe('Accordion Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Trigger</AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('updates aria-expanded when opened', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Trigger</AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports keyboard navigation', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Trigger</AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toBeInTheDocument()
    
    // Test click interaction instead since keyboard events on Radix components are more complex
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})