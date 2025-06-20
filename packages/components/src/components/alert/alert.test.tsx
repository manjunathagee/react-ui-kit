import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './alert'

describe('Alert', () => {
  it('renders with default props', () => {
    render(
      <Alert>
        <AlertTitle>Test Alert</AlertTitle>
        <AlertDescription>This is a test alert.</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(screen.getByText('Test Alert')).toBeInTheDocument()
    expect(screen.getByText('This is a test alert.')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-green-200', 'bg-green-50', 'text-green-800')
  })

  it('renders destructive variant correctly', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-destructive/50', 'text-destructive')
  })

  it('renders warning variant correctly', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-yellow-200', 'bg-yellow-50', 'text-yellow-800')
  })

  it('renders info variant correctly', () => {
    render(
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-blue-200', 'bg-blue-50', 'text-blue-800')
  })

  it('applies size classes correctly', () => {
    render(
      <Alert size="lg">
        <AlertTitle>Large Alert</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('p-6', 'text-base')
  })

  it('renders small size correctly', () => {
    render(
      <Alert size="sm">
        <AlertTitle>Small Alert</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('p-3', 'text-sm')
  })

  it('renders default icon for success variant', () => {
    render(
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('renders default icon for destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('renders default icon for warning variant', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('renders default icon for info variant', () => {
    render(
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('does not render icon when icon prop is false', () => {
    render(
      <Alert variant="success" icon={false}>
        <AlertTitle>No Icon</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>
    
    render(
      <Alert icon={<CustomIcon />}>
        <AlertTitle>Custom Icon</AlertTitle>
      </Alert>
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders dismiss button when dismissible is true', () => {
    render(
      <Alert dismissible>
        <AlertTitle>Dismissible Alert</AlertTitle>
      </Alert>
    )

    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    expect(dismissButton).toBeInTheDocument()
  })

  it('does not render dismiss button when dismissible is false', () => {
    render(
      <Alert dismissible={false}>
        <AlertTitle>Non-dismissible Alert</AlertTitle>
      </Alert>
    )

    const dismissButton = screen.queryByRole('button', { name: /dismiss alert/i })
    expect(dismissButton).not.toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn()
    
    render(
      <Alert dismissible onDismiss={onDismiss}>
        <AlertTitle>Dismissible Alert</AlertTitle>
      </Alert>
    )

    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    await userEvent.click(dismissButton)

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('removes alert from DOM when dismissed', async () => {
    render(
      <Alert dismissible>
        <AlertTitle>Dismissible Alert</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    
    expect(alert).toBeInTheDocument()
    
    await userEvent.click(dismissButton)

    expect(alert).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Alert className="custom-class">
        <AlertTitle>Custom Class</AlertTitle>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <Alert ref={ref}>
        <AlertTitle>Ref test</AlertTitle>
      </Alert>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('AlertTitle', () => {
  it('renders correctly', () => {
    render(<AlertTitle>Alert Title</AlertTitle>)
    
    const title = screen.getByText('Alert Title')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H5')
  })

  it('applies size classes correctly', () => {
    render(<AlertTitle size="lg">Large Title</AlertTitle>)
    
    const title = screen.getByText('Large Title')
    expect(title).toHaveClass('text-lg')
  })

  it('applies custom className', () => {
    render(<AlertTitle className="custom-title">Custom Title</AlertTitle>)
    
    const title = screen.getByText('Custom Title')
    expect(title).toHaveClass('custom-title')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<AlertTitle ref={ref}>Ref test</AlertTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe('AlertDescription', () => {
  it('renders correctly', () => {
    render(<AlertDescription>Alert description text</AlertDescription>)
    
    const description = screen.getByText('Alert description text')
    expect(description).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    render(<AlertDescription size="lg">Large description</AlertDescription>)
    
    const description = screen.getByText('Large description')
    expect(description).toHaveClass('text-base')
  })

  it('applies custom className', () => {
    render(<AlertDescription className="custom-description">Custom Description</AlertDescription>)
    
    const description = screen.getByText('Custom Description')
    expect(description).toHaveClass('custom-description')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<AlertDescription ref={ref}>Ref test</AlertDescription>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders with small size correctly', () => {
    render(<AlertDescription size="sm">Small description</AlertDescription>)
    
    const description = screen.getByText('Small description')
    expect(description).toHaveClass('text-xs')
  })
})