import type { Meta, StoryObj } from '@storybook/react'
import { Box, Grid, Flex, Stack, VStack, HStack, Divider } from './index'

// Box Stories
const boxMeta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'aside'],
    },
    p: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20],
    },
    m: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 'auto'],
    },
    bg: {
      control: 'select',
      options: ['transparent', 'white', 'black', 'background', 'foreground', 'card', 'muted', 'accent', 'primary', 'secondary', 'destructive'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    border: {
      control: 'select',
      options: [0, 1, 2, 4, 8],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
}

export default boxMeta
type BoxStory = StoryObj<typeof boxMeta>

export const BoxDefault: BoxStory = {
  args: {
    children: 'This is a Box component',
    p: 4,
    bg: 'muted',
    rounded: 'md',
  },
}

export const BoxWithVariants: BoxStory = {
  render: () => (
    <div className="space-y-4">
      <Box p={4} bg="primary" rounded="lg" className="text-primary-foreground">
        Primary Box
      </Box>
      <Box p={4} bg="secondary" rounded="lg" className="text-secondary-foreground">
        Secondary Box
      </Box>
      <Box p={4} bg="muted" border={1} rounded="md">
        Muted Box with Border
      </Box>
      <Box p={6} bg="card" shadow="lg" rounded="xl">
        Card Box with Shadow
      </Box>
    </div>
  ),
}

export const BoxLayoutUtilities: BoxStory = {
  render: () => (
    <div className="space-y-4">
      <Box w="full" h="20" bg="accent" rounded="md" p={4}>
        Full Width Box
      </Box>
      <Box maxW="md" mx="auto" p={4} bg="muted" rounded="md">
        Centered Box with Max Width
      </Box>
      <Box display="flex" justify="center" align="center" h="20" bg="primary" rounded="md" className="text-primary-foreground">
        Centered Content
      </Box>
    </div>
  ),
}

// Grid Stories
const gridMeta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none', 'subgrid'],
    },
    rows: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'none', 'subgrid'],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20],
    },
  },
}

export { gridMeta as GridMeta }
type GridStory = StoryObj<typeof gridMeta>

export const GridDefault: GridStory = {
  args: {
    cols: 3,
    gap: 4,
    children: Array.from({ length: 6 }, (_, i) => (
      <Box key={i} p={4} bg="muted" rounded="md" className="text-center">
        Item {i + 1}
      </Box>
    )),
  },
}

export const GridResponsive: GridStory = {
  render: () => (
    <Grid cols={12} gap={4}>
      <Box className="col-span-12 md:col-span-6 lg:col-span-4 text-primary-foreground text-center" p={4} bg="primary" rounded="md">
        Responsive Item 1
      </Box>
      <Box className="col-span-12 md:col-span-6 lg:col-span-4 text-secondary-foreground text-center" p={4} bg="secondary" rounded="md">
        Responsive Item 2
      </Box>
      <Box className="col-span-12 md:col-span-12 lg:col-span-4 text-center" p={4} bg="accent" rounded="md">
        Responsive Item 3
      </Box>
    </Grid>
  ),
}

export const GridWithAlignment: GridStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Aligned</h3>
        <Grid cols={3} gap={4} placeItems="center" className="h-32 bg-muted/50 rounded-lg">
          <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">1</Box>
          <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">2</Box>
          <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">3</Box>
        </Grid>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Start Aligned</h3>
        <Grid cols={3} gap={4} placeItems="start" className="h-32 bg-muted/50 rounded-lg">
          <Box p={2} bg="secondary" rounded="md" className="text-secondary-foreground">1</Box>
          <Box p={2} bg="secondary" rounded="md" className="text-secondary-foreground">2</Box>
          <Box p={2} bg="secondary" rounded="md" className="text-secondary-foreground">3</Box>
        </Grid>
      </div>
    </div>
  ),
}

// Flex Stories
const flexMeta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'col', 'col-reverse'],
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20],
    },
  },
}

export { flexMeta as FlexMeta }
type FlexStory = StoryObj<typeof flexMeta>

export const FlexDefault: FlexStory = {
  args: {
    gap: 4,
    children: Array.from({ length: 3 }, (_, i) => (
      <Box key={i} p={4} bg="muted" rounded="md">
        Item {i + 1}
      </Box>
    )),
  },
}

export const FlexJustification: FlexStory = {
  render: () => (
    <div className="space-y-6">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
        <div key={justify}>
          <h4 className="text-sm font-medium mb-2 capitalize">Justify {justify}</h4>
          <Flex justify={justify} className="h-16 bg-muted/50 rounded-lg px-4">
            <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">1</Box>
            <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">2</Box>
            <Box p={2} bg="primary" rounded="md" className="text-primary-foreground">3</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
}

export const FlexAlignment: FlexStory = {
  render: () => (
    <div className="space-y-6">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <div key={align}>
          <h4 className="text-sm font-medium mb-2 capitalize">Align {align}</h4>
          <Flex align={align} gap={4} className="h-24 bg-muted/50 rounded-lg p-4">
            <Box p={2} bg="secondary" rounded="md" className="text-secondary-foreground">Short</Box>
            <Box p={4} bg="secondary" rounded="md" className="text-secondary-foreground">Taller Content</Box>
            <Box p={2} bg="secondary" rounded="md" className="text-secondary-foreground">Short</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
}

export const FlexDirection: FlexStory = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Row Direction</h4>
        <Flex direction="row" gap={2} className="p-4 bg-muted/50 rounded-lg">
          <Box p={2} bg="accent" rounded="md">1</Box>
          <Box p={2} bg="accent" rounded="md">2</Box>
          <Box p={2} bg="accent" rounded="md">3</Box>
        </Flex>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Column Direction</h4>
        <Flex direction="col" gap={2} className="p-4 bg-muted/50 rounded-lg">
          <Box p={2} bg="accent" rounded="md">1</Box>
          <Box p={2} bg="accent" rounded="md">2</Box>
          <Box p={2} bg="accent" rounded="md">3</Box>
        </Flex>
      </div>
    </div>
  ),
}

// Stack Stories
const stackMeta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
}

export { stackMeta as StackMeta }
type StackStory = StoryObj<typeof stackMeta>

export const StackDefault: StackStory = {
  args: {
    spacing: 4,
    children: Array.from({ length: 3 }, (_, i) => (
      <Box key={i} p={4} bg="muted" rounded="md">
        Stack Item {i + 1}
      </Box>
    )),
  },
}

export const StackDirections: StackStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Stack (VStack)</h3>
        <VStack spacing={4}>
          <Box p={4} bg="primary" rounded="md" className="text-primary-foreground">Item 1</Box>
          <Box p={4} bg="primary" rounded="md" className="text-primary-foreground">Item 2</Box>
          <Box p={4} bg="primary" rounded="md" className="text-primary-foreground">Item 3</Box>
        </VStack>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Stack (HStack)</h3>
        <HStack spacing={4}>
          <Box p={4} bg="secondary" rounded="md" className="text-secondary-foreground">Item 1</Box>
          <Box p={4} bg="secondary" rounded="md" className="text-secondary-foreground">Item 2</Box>
          <Box p={4} bg="secondary" rounded="md" className="text-secondary-foreground">Item 3</Box>
        </HStack>
      </div>
    </div>
  ),
}

export const StackWithDividers: StackStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Stack with Dividers</h3>
        <VStack divider={<Divider />} className="max-w-md">
          <Box p={4} w="full">First item with some content</Box>
          <Box p={4} w="full">Second item with different content</Box>
          <Box p={4} w="full">Third item with more content</Box>
        </VStack>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Stack with Dividers</h3>
        <HStack divider={<Divider orientation="vertical" className="h-8" />}>
          <Box p={4}>Item 1</Box>
          <Box p={4}>Item 2</Box>
          <Box p={4}>Item 3</Box>
        </HStack>
      </div>
    </div>
  ),
}

export const StackAlignment: StackStory = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Center Aligned</h4>
        <VStack spacing={4} align="center" className="h-48 bg-muted/50 rounded-lg p-4">
          <Box p={2} bg="accent" rounded="md">Short</Box>
          <Box p={2} bg="accent" rounded="md">Medium Content</Box>
          <Box p={2} bg="accent" rounded="md">Very Long Content Here</Box>
        </VStack>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Stretch Aligned</h4>
        <VStack spacing={4} align="stretch" className="h-48 bg-muted/50 rounded-lg p-4">
          <Box p={2} bg="accent" rounded="md">Short</Box>
          <Box p={2} bg="accent" rounded="md">Medium Content</Box>
          <Box p={2} bg="accent" rounded="md">Very Long Content Here</Box>
        </VStack>
      </div>
    </div>
  ),
}

// Divider Stories
const dividerMeta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    thickness: {
      control: 'select',
      options: [1, 2, 4, 8],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 4, 8],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
}

export { dividerMeta as DividerMeta }
type DividerStory = StoryObj<typeof dividerMeta>

export const DividerDefault: DividerStory = {
  render: () => (
    <div className="space-y-4">
      <Box p={4} bg="muted" rounded="md">Content above divider</Box>
      <Divider />
      <Box p={4} bg="muted" rounded="md">Content below divider</Box>
    </div>
  ),
}

export const DividerVariants: DividerStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Solid</h4>
        <Divider variant="solid" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Dashed</h4>
        <Divider variant="dashed" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Dotted</h4>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
}

export const DividerThickness: DividerStory = {
  render: () => (
    <div className="space-y-8">
      {[1, 2, 4, 8].map((thickness) => (
        <div key={thickness}>
          <h4 className="text-sm font-medium mb-4">Thickness {thickness}</h4>
          <Divider thickness={thickness as 1 | 2 | 4 | 8} />
        </div>
      ))}
    </div>
  ),
}

export const DividerWithLabels: DividerStory = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">Center Label</h4>
        <Divider label="OR" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Left Label</h4>
        <Divider label="Start" labelPosition="left" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Right Label</h4>
        <Divider label="End" labelPosition="right" />
      </div>
    </div>
  ),
}

export const DividerVertical: DividerStory = {
  render: () => (
    <div>
      <h4 className="text-sm font-medium mb-4">Vertical Dividers</h4>
      <Flex align="center" className="h-24">
        <Box p={4} bg="muted" rounded="md">Content 1</Box>
        <Divider orientation="vertical" className="mx-4 h-16" />
        <Box p={4} bg="muted" rounded="md">Content 2</Box>
        <Divider orientation="vertical" className="mx-4 h-16" />
        <Box p={4} bg="muted" rounded="md">Content 3</Box>
      </Flex>
    </div>
  ),
}