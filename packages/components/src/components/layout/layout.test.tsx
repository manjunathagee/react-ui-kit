import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Box, Grid, Flex, Stack, VStack, HStack, Divider } from './index'

describe('Layout Components', () => {
  describe('Box', () => {
    it('renders as div by default', () => {
      render(<Box data-testid="box">Content</Box>)
      expect(screen.getByTestId('box').tagName).toBe('DIV')
    })

    it('renders with different elements using as prop', () => {
      const { rerender } = render(<Box as="section" data-testid="box">Content</Box>)
      expect(screen.getByTestId('box').tagName).toBe('SECTION')

      rerender(<Box as="article" data-testid="box">Content</Box>)
      expect(screen.getByTestId('box').tagName).toBe('ARTICLE')
    })

    it('applies padding variants correctly', () => {
      const { rerender } = render(<Box p={4} data-testid="box">Content</Box>)
      expect(screen.getByTestId('box')).toHaveClass('p-4')

      rerender(<Box px={2} py={8} data-testid="box">Content</Box>)
      const box = screen.getByTestId('box')
      expect(box).toHaveClass('px-2')
      expect(box).toHaveClass('py-8')
    })

    it('applies margin variants correctly', () => {
      const { rerender } = render(<Box m={4} data-testid="box">Content</Box>)
      expect(screen.getByTestId('box')).toHaveClass('m-4')

      rerender(<Box mx="auto" my={2} data-testid="box">Content</Box>)
      const box = screen.getByTestId('box')
      expect(box).toHaveClass('mx-auto')
      expect(box).toHaveClass('my-2')
    })

    it('applies size variants correctly', () => {
      const { rerender } = render(<Box w="full" h="screen" data-testid="box">Content</Box>)
      const box = screen.getByTestId('box')
      expect(box).toHaveClass('w-full')
      expect(box).toHaveClass('h-screen')

      rerender(<Box maxW="md" data-testid="box">Content</Box>)
      expect(screen.getByTestId('box')).toHaveClass('max-w-md')
    })

    it('applies visual variants correctly', () => {
      render(
        <Box 
          rounded="lg" 
          border={2} 
          shadow="md" 
          bg="primary" 
          data-testid="box"
        >
          Content
        </Box>
      )
      const box = screen.getByTestId('box')
      expect(box).toHaveClass('rounded-lg')
      expect(box).toHaveClass('border-2')
      expect(box).toHaveClass('shadow-md')
      expect(box).toHaveClass('bg-primary')
    })

    it('applies position and display variants correctly', () => {
      const { rerender } = render(<Box position="relative" display="flex" data-testid="box">Content</Box>)
      const box = screen.getByTestId('box')
      expect(box).toHaveClass('relative')
      expect(box).toHaveClass('flex')

      rerender(<Box position="absolute" display="grid" data-testid="box">Content</Box>)
      const updatedBox = screen.getByTestId('box')
      expect(updatedBox).toHaveClass('absolute')
      expect(updatedBox).toHaveClass('grid')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Box ref={ref}>Content</Box>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('applies custom className', () => {
      render(<Box className="custom-class" data-testid="box">Content</Box>)
      expect(screen.getByTestId('box')).toHaveClass('custom-class')
    })
  })

  describe('Grid', () => {
    it('renders with grid display by default', () => {
      render(<Grid data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('grid')
    })

    it('applies column variants correctly', () => {
      const { rerender } = render(<Grid cols={3} data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-3')

      rerender(<Grid cols={12} data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-12')
    })

    it('applies row variants correctly', () => {
      render(<Grid rows={4} data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('grid-rows-4')
    })

    it('applies gap variants correctly', () => {
      const { rerender } = render(<Grid gap={4} data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('gap-4')

      rerender(<Grid gapX={2} gapY={8} data-testid="grid">Content</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('gap-x-2')
      expect(grid).toHaveClass('gap-y-8')
    })

    it('applies auto flow variants correctly', () => {
      render(<Grid autoFlow="col" data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-col')
    })

    it('applies alignment variants correctly', () => {
      const { rerender } = render(<Grid placeItems="center" data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid')).toHaveClass('place-items-center')

      rerender(<Grid justifyItems="start" alignItems="end" data-testid="grid">Content</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveClass('justify-items-start')
      expect(grid).toHaveClass('items-end')
    })

    it('renders with different elements using as prop', () => {
      render(<Grid as="section" data-testid="grid">Content</Grid>)
      expect(screen.getByTestId('grid').tagName).toBe('SECTION')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Grid ref={ref}>Content</Grid>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Flex', () => {
    it('renders with flex display by default', () => {
      render(<Flex data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('flex')
    })

    it('applies direction variants correctly', () => {
      const { rerender } = render(<Flex direction="col" data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('flex-col')

      rerender(<Flex direction="row-reverse" data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('flex-row-reverse')
    })

    it('applies wrap variants correctly', () => {
      render(<Flex wrap="wrap" data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('flex-wrap')
    })

    it('applies alignment variants correctly', () => {
      const { rerender } = render(<Flex justify="center" align="start" data-testid="flex">Content</Flex>)
      const flex = screen.getByTestId('flex')
      expect(flex).toHaveClass('justify-center')
      expect(flex).toHaveClass('items-start')

      rerender(<Flex justify="between" align="stretch" data-testid="flex">Content</Flex>)
      const updatedFlex = screen.getByTestId('flex')
      expect(updatedFlex).toHaveClass('justify-between')
      expect(updatedFlex).toHaveClass('items-stretch')
    })

    it('applies gap variants correctly', () => {
      render(<Flex gap={6} data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('gap-6')
    })

    it('applies flex variants correctly', () => {
      const { rerender } = render(<Flex grow={1} shrink={0} data-testid="flex">Content</Flex>)
      const flex = screen.getByTestId('flex')
      expect(flex).toHaveClass('flex-grow')
      expect(flex).toHaveClass('flex-shrink-0')

      rerender(<Flex basis="1/2" data-testid="flex">Content</Flex>)
      expect(screen.getByTestId('flex')).toHaveClass('basis-1/2')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Flex ref={ref}>Content</Flex>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Stack', () => {
    it('renders with flex column by default', () => {
      render(<Stack data-testid="stack">Content</Stack>)
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('flex')
      expect(stack).toHaveClass('flex-col')
      expect(stack).toHaveClass('gap-4') // default spacing
    })

    it('applies direction variants correctly', () => {
      const { rerender } = render(<Stack direction="horizontal" data-testid="stack">Content</Stack>)
      expect(screen.getByTestId('stack')).toHaveClass('flex-row')

      rerender(<Stack direction="vertical" data-testid="stack">Content</Stack>)
      expect(screen.getByTestId('stack')).toHaveClass('flex-col')
    })

    it('applies spacing variants correctly', () => {
      render(<Stack spacing={8} data-testid="stack">Content</Stack>)
      expect(screen.getByTestId('stack')).toHaveClass('gap-8')
    })

    it('applies alignment variants correctly', () => {
      const { rerender } = render(<Stack align="center" justify="start" data-testid="stack">Content</Stack>)
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('items-center')
      expect(stack).toHaveClass('justify-start')

      rerender(<Stack align="stretch" justify="between" data-testid="stack">Content</Stack>)
      const updatedStack = screen.getByTestId('stack')
      expect(updatedStack).toHaveClass('items-stretch')
      expect(updatedStack).toHaveClass('justify-between')
    })

    it('handles dividers correctly', () => {
      render(
        <Stack divider={<div data-testid="divider">|</div>} data-testid="stack">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Stack>
      )
      
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('gap-0') // No gap when using dividers
      
      const dividers = screen.getAllByTestId('divider')
      expect(dividers).toHaveLength(2) // n-1 dividers for n items
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Stack ref={ref}>Content</Stack>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('VStack', () => {
    it('renders as vertical stack', () => {
      render(<VStack data-testid="vstack">Content</VStack>)
      const vstack = screen.getByTestId('vstack')
      expect(vstack).toHaveClass('flex')
      expect(vstack).toHaveClass('flex-col')
    })

    it('applies spacing correctly', () => {
      render(<VStack spacing={6} data-testid="vstack">Content</VStack>)
      expect(screen.getByTestId('vstack')).toHaveClass('gap-6')
    })
  })

  describe('HStack', () => {
    it('renders as horizontal stack', () => {
      render(<HStack data-testid="hstack">Content</HStack>)
      const hstack = screen.getByTestId('hstack')
      expect(hstack).toHaveClass('flex')
      expect(hstack).toHaveClass('flex-row')
    })

    it('applies spacing correctly', () => {
      render(<HStack spacing={3} data-testid="hstack">Content</HStack>)
      expect(screen.getByTestId('hstack')).toHaveClass('gap-3')
    })
  })

  describe('Divider', () => {
    it('renders as horizontal divider by default', () => {
      render(<Divider data-testid="divider" />)
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('w-full')
      expect(divider).toHaveClass('border-t')
      expect(divider).toHaveAttribute('role', 'separator')
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders as vertical divider', () => {
      render(<Divider orientation="vertical" data-testid="divider" />)
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveClass('h-full')
      expect(divider).toHaveClass('border-l')
      expect(divider).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('applies variant styles correctly', () => {
      const { rerender } = render(<Divider variant="dashed" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('border-dashed')

      rerender(<Divider variant="dotted" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('border-dotted')
    })

    it('applies thickness variants correctly', () => {
      const { rerender } = render(<Divider thickness={2} data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('border-t-2')

      rerender(<Divider orientation="vertical" thickness={4} data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('border-l-4')
    })

    it('applies spacing variants correctly', () => {
      const { rerender } = render(<Divider spacing={4} data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('my-4')

      rerender(<Divider orientation="vertical" spacing={2} data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('mx-2')
    })

    it('renders with label for horizontal divider', () => {
      render(<Divider label="OR" data-testid="divider-container" />)
      const container = screen.getByTestId('divider-container')
      expect(container).toHaveClass('relative', 'flex', 'items-center')
      expect(screen.getByText('OR')).toBeInTheDocument()
      expect(screen.getByText('OR')).toHaveClass('text-muted-foreground')
    })

    it('renders with label for vertical divider', () => {
      render(<Divider orientation="vertical" label="OR" data-testid="divider-container" />)
      const container = screen.getByTestId('divider-container')
      expect(container).toHaveClass('relative', 'flex', 'flex-col', 'items-center')
      expect(screen.getByText('OR')).toBeInTheDocument()
    })

    it('applies label position correctly', () => {
      const { rerender } = render(<Divider label="LEFT" labelPosition="left" data-testid="divider-container" />)
      expect(screen.getByText('LEFT')).toHaveClass('text-left')

      rerender(<Divider label="RIGHT" labelPosition="right" data-testid="divider-container" />)
      expect(screen.getByText('RIGHT')).toHaveClass('text-right')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Divider ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('applies custom className', () => {
      render(<Divider className="custom-divider" data-testid="divider" />)
      expect(screen.getByTestId('divider')).toHaveClass('custom-divider')
    })
  })
})