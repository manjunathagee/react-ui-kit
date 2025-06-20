import { render, screen } from '@testing-library/react'
import { Label } from './label'

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label>Email Address</Label>)
    
    const label = screen.getByText('Email Address')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('applies custom HTML attributes', () => {
    render(
      <Label data-testid="custom-label" title="Custom title">
        Custom Label
      </Label>
    )
    
    const label = screen.getByTestId('custom-label')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('title', 'Custom title')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('shows required indicator when required is true', () => {
    render(<Label required>Email Address</Label>)
    
    const label = screen.getByText('Email Address')
    expect(label).toHaveClass("after:content-['*']", 'after:ml-1', 'after:text-destructive')
  })

  it('applies size variants correctly', () => {
    const { rerender } = render(<Label size="sm">Label</Label>)
    
    expect(screen.getByText('Label')).toHaveClass('text-xs')
    
    rerender(<Label size="md">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('text-sm')
    
    rerender(<Label size="lg">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('text-base')
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Label variant="default">Label</Label>)
    
    // Default variant doesn't add additional color classes
    const label = screen.getByText('Label')
    expect(label).toHaveClass('text-sm', 'font-medium')
    
    rerender(<Label variant="destructive">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('text-destructive')
    
    rerender(<Label variant="muted">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('text-muted-foreground')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Label</Label>)
    
    expect(screen.getByText('Label')).toHaveClass('custom-label')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    
    render(<Label ref={ref}>Label</Label>)
    
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('passes through HTML attributes', () => {
    render(
      <Label htmlFor="email-input" data-testid="email-label">
        Email
      </Label>
    )
    
    const label = screen.getByTestId('email-label')
    expect(label).toHaveAttribute('for', 'email-input')
  })

  it('combines all props correctly', () => {
    render(
      <Label
        size="lg"
        variant="destructive"
        required
        className="custom-class"
        htmlFor="test"
      >
        Test Label
      </Label>
    )
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass(
      'text-base', // size lg
      'text-destructive', // variant destructive
      "after:content-['*']", // required
      'custom-class' // custom className
    )
    expect(label).toHaveAttribute('for', 'test')
  })

  it('handles disabled state styling', () => {
    render(
      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Disabled Label
      </Label>
    )
    
    const label = screen.getByText('Disabled Label')
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70')
  })

  it('works with form controls', () => {
    render(
      <div>
        <Label htmlFor="email">Email Address</Label>
        <input id="email" type="email" />
      </div>
    )
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email Address')
    
    expect(label).toHaveAttribute('for', 'email')
    expect(input).toHaveAttribute('id', 'email')
  })

  it('supports complex content', () => {
    render(
      <Label>
        <span>Email</span>
        <span className="text-xs">(optional)</span>
      </Label>
    )
    
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('(optional)')).toBeInTheDocument()
  })
})