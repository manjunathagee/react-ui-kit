import { render, screen } from '@testing-library/react'
import { Badge, DotBadge, BadgeWrapper } from './badge'

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>)
    
    const badge = screen.getByText('Default Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('applies variant classes correctly', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>)
    
    const badge = screen.getByText('Secondary Badge')
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
  })

  it('renders destructive variant correctly', () => {
    render(<Badge variant="destructive">Error Badge</Badge>)
    
    const badge = screen.getByText('Error Badge')
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
  })

  it('renders success variant correctly', () => {
    render(<Badge variant="success">Success Badge</Badge>)
    
    const badge = screen.getByText('Success Badge')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders warning variant correctly', () => {
    render(<Badge variant="warning">Warning Badge</Badge>)
    
    const badge = screen.getByText('Warning Badge')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders info variant correctly', () => {
    render(<Badge variant="info">Info Badge</Badge>)
    
    const badge = screen.getByText('Info Badge')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('renders outline variant correctly', () => {
    render(<Badge variant="outline">Outline Badge</Badge>)
    
    const badge = screen.getByText('Outline Badge')
    expect(badge).toHaveClass('border-input', 'text-foreground')
  })

  it('renders ghost variant correctly', () => {
    render(<Badge variant="ghost">Ghost Badge</Badge>)
    
    const badge = screen.getByText('Ghost Badge')
    expect(badge).toHaveClass('border-transparent')
  })

  it('applies size classes correctly', () => {
    render(<Badge size="lg">Large Badge</Badge>)
    
    const badge = screen.getByText('Large Badge')
    expect(badge).toHaveClass('px-3', 'py-1', 'text-sm')
  })

  it('applies small size correctly', () => {
    render(<Badge size="sm">Small Badge</Badge>)
    
    const badge = screen.getByText('Small Badge')
    expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs')
  })

  it('applies shape classes correctly', () => {
    render(<Badge shape="rounded">Rounded Badge</Badge>)
    
    const badge = screen.getByText('Rounded Badge')
    expect(badge).toHaveClass('rounded-md')
  })

  it('applies square shape correctly', () => {
    render(<Badge shape="square">Square Badge</Badge>)
    
    const badge = screen.getByText('Square Badge')
    expect(badge).toHaveClass('rounded-none')
  })

  it('renders left icon correctly', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>
    
    render(
      <Badge leftIcon={<LeftIcon />}>
        Badge with Left Icon
      </Badge>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByText('Badge with Left Icon')).toBeInTheDocument()
  })

  it('renders right icon correctly', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>
    
    render(
      <Badge rightIcon={<RightIcon />}>
        Badge with Right Icon
      </Badge>
    )
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByText('Badge with Right Icon')).toBeInTheDocument()
  })

  it('displays count correctly', () => {
    render(<Badge count={5} />)
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('displays count with max limit', () => {
    render(<Badge count={150} max={99} />)
    
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('hides badge when count is 0 and showZero is false', () => {
    const { container } = render(<Badge count={0} showZero={false} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('shows badge when count is 0 and showZero is true', () => {
    render(<Badge count={0} showZero={true} />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>)
    
    const badge = screen.getByText('Custom Badge')
    expect(badge).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Badge ref={ref}>Ref Badge</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('DotBadge', () => {
  it('renders with default props', () => {
    const { container } = render(<DotBadge />)
    
    const dotBadge = container.firstChild
    expect(dotBadge).toBeInTheDocument()
    expect(dotBadge).toHaveClass('bg-destructive', 'h-3', 'w-3', '-top-1', '-right-1')
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<DotBadge variant="success" />)
    
    const dotBadge = container.firstChild
    expect(dotBadge).toHaveClass('bg-green-500')
  })

  it('applies size classes correctly', () => {
    const { container } = render(<DotBadge size="lg" />)
    
    const dotBadge = container.firstChild
    expect(dotBadge).toHaveClass('h-4', 'w-4')
  })

  it('applies position classes correctly', () => {
    const { container } = render(<DotBadge position="bottom-left" />)
    
    const dotBadge = container.firstChild
    expect(dotBadge).toHaveClass('-bottom-1', '-left-1')
  })

  it('does not render when show is false', () => {
    const { container } = render(<DotBadge show={false} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<DotBadge className="custom-dot" />)
    
    const dotBadge = container.firstChild
    expect(dotBadge).toHaveClass('custom-dot')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<DotBadge ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('BadgeWrapper', () => {
  it('renders children with badge', () => {
    render(
      <BadgeWrapper badge="5">
        <button>Notifications</button>
      </BadgeWrapper>
    )
    
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders children with dot badge', () => {
    const { container } = render(
      <BadgeWrapper dotBadge>
        <button>Status</button>
      </BadgeWrapper>
    )
    
    expect(screen.getByText('Status')).toBeInTheDocument()
    const dotBadge = container.querySelector('.bg-destructive')
    expect(dotBadge).toBeInTheDocument()
  })

  it('applies badge props correctly', () => {
    render(
      <BadgeWrapper 
        badge="NEW" 
        badgeProps={{ variant: 'success', size: 'lg' }}
      >
        <span>Item</span>
      </BadgeWrapper>
    )
    
    const badge = screen.getByText('NEW')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800', 'px-3', 'py-1')
  })

  it('applies dot badge props correctly', () => {
    const { container } = render(
      <BadgeWrapper 
        dotBadge 
        dotBadgeProps={{ variant: 'info', size: 'lg', position: 'bottom-right' }}
      >
        <span>Item</span>
      </BadgeWrapper>
    )
    
    const dotBadge = container.querySelector('.bg-blue-500')
    expect(dotBadge).toBeInTheDocument()
    expect(dotBadge).toHaveClass('h-4', 'w-4', '-bottom-1', '-right-1')
  })

  it('renders only children when no badge or dot badge', () => {
    const { container } = render(
      <BadgeWrapper>
        <button>Plain Button</button>
      </BadgeWrapper>
    )
    
    expect(screen.getByText('Plain Button')).toBeInTheDocument()
    const badges = container.querySelectorAll('.bg-primary, .bg-destructive')
    expect(badges).toHaveLength(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <BadgeWrapper className="custom-wrapper">
        <span>Content</span>
      </BadgeWrapper>
    )
    
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-wrapper', 'relative', 'inline-flex')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <BadgeWrapper ref={ref}>
        <span>Content</span>
      </BadgeWrapper>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders both badge and dot badge together', () => {
    const { container } = render(
      <BadgeWrapper badge="3" dotBadge>
        <button>Multi Badge</button>
      </BadgeWrapper>
    )
    
    expect(screen.getByText('Multi Badge')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    const dotBadge = container.querySelector('.bg-destructive')
    expect(dotBadge).toBeInTheDocument()
  })
})