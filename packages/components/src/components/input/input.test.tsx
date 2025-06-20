import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10', 'px-3')
  })

  it('handles user input', async () => {
    const handleChange = vi.fn()
    render(<Input placeholder="Enter text" onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await userEvent.type(input, 'Hello World')
    
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Hello World')
  })

  it('applies size variants correctly', () => {
    render(<Input size="sm" placeholder="Small input" />)
    const input = screen.getByPlaceholderText('Small input')
    expect(input).toHaveClass('h-8', 'px-2', 'text-xs')
  })

  it('applies large size correctly', () => {
    render(<Input size="lg" placeholder="Large input" />)
    const input = screen.getByPlaceholderText('Large input')
    expect(input).toHaveClass('h-12', 'px-4', 'text-base')
  })

  it('shows error state', () => {
    render(<Input error placeholder="Error input" />)
    const input = screen.getByPlaceholderText('Error input')
    expect(input).toHaveClass('border-destructive', 'focus-visible:ring-destructive')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} placeholder="Ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom input" />)
    const input = screen.getByPlaceholderText('Custom input')
    expect(input).toHaveClass('custom-class')
  })

  it('renders with left icon', () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>
    render(<Input leftIcon={leftIcon} placeholder="Search" />)
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Search')
    expect(input).toHaveClass('pl-10')
  })

  it('renders with right icon', () => {
    const rightIcon = <span data-testid="right-icon">✓</span>
    render(<Input rightIcon={rightIcon} placeholder="Valid input" />)
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Valid input')
    expect(input).toHaveClass('pr-10')
  })

  it('renders with both left and right icons', () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>
    const rightIcon = <span data-testid="right-icon">✓</span>
    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} placeholder="Both icons" />)
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Both icons')
    expect(input).toHaveClass('pl-10', 'pr-10')
  })

  it('supports different input types', () => {
    render(<Input type="email" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('supports readonly state', () => {
    render(<Input readOnly placeholder="Readonly input" value="Read only" />)
    const input = screen.getByPlaceholderText('Readonly input')
    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveValue('Read only')
  })
})