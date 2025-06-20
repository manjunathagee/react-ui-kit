import { render, screen } from '@testing-library/react'
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider,
  SimpleTooltip,
  RichTooltip 
} from './tooltip'

describe('Tooltip Components', () => {
  describe('Tooltip Components Export', () => {
    it('exports all tooltip components', () => {
      expect(Tooltip).toBeDefined()
      expect(TooltipTrigger).toBeDefined()
      expect(TooltipContent).toBeDefined()
      expect(TooltipProvider).toBeDefined()
      expect(SimpleTooltip).toBeDefined()
      expect(RichTooltip).toBeDefined()
    })
  })

  describe('SimpleTooltip', () => {
    it('renders children when disabled', () => {
      render(
        <SimpleTooltip content="Should not show" disabled>
          <button>Disabled tooltip</button>
        </SimpleTooltip>
      )

      expect(screen.getByText('Disabled tooltip')).toBeInTheDocument()
    })

    it('renders children normally when not disabled', () => {
      render(
        <SimpleTooltip content="Tooltip message">
          <button>Hover me</button>
        </SimpleTooltip>
      )

      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })
  })

  describe('RichTooltip', () => {
    it('renders children when disabled', () => {
      render(
        <RichTooltip title="Disabled" description="Should not show" disabled>
          <button>Disabled rich tooltip</button>
        </RichTooltip>
      )

      expect(screen.getByText('Disabled rich tooltip')).toBeInTheDocument()
    })

    it('renders children normally when not disabled', () => {
      render(
        <RichTooltip title="Title" description="Description">
          <button>Rich tooltip</button>
        </RichTooltip>
      )

      expect(screen.getByText('Rich tooltip')).toBeInTheDocument()
    })
  })
})