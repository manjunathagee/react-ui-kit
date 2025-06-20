# React UI Kit

A comprehensive, production-ready React TypeScript component library built with modern tools and best practices.

## Features

- 🎨 **Beautiful Design System** - Consistent, accessible, and customizable components
- 🔧 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 📱 **Responsive** - Mobile-first design with responsive utilities
- ♿ **Accessible** - WCAG 2.1 AA compliant with full keyboard navigation
- 🎭 **Themeable** - Built-in dark mode support with CSS custom properties
- 📚 **Well Documented** - Comprehensive Storybook documentation
- 🧪 **Thoroughly Tested** - Unit tests with high coverage
- 🚀 **Modern Tooling** - Built with Vite, Tailwind CSS, and Radix UI

## Tech Stack

- **React 18+** with TypeScript (strict mode)
- **Vite** for build tooling and development server
- **Tailwind CSS** for utility-first styling
- **Radix UI** primitives for accessibility
- **Storybook** for component documentation
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **ESLint** + **Prettier** for code quality

## Installation

```bash
npm install @react-ui-kit/components
```

## Usage

```tsx
import { Button, Input, Heading } from '@react-ui-kit/components'
import '@react-ui-kit/components/styles.css'

function App() {
  return (
    <div>
      <Heading level={1}>Welcome to React UI Kit</Heading>
      <Input placeholder="Enter your email" />
      <Button variant="primary">Get Started</Button>
    </div>
  )
}
```

## Development

This project uses a monorepo structure with the following packages:

- `packages/components` - Main component library
- `packages/design-tokens` - Design system tokens
- `packages/icons` - Icon components
- `packages/utils` - Utility functions

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Open Storybook: `npm run storybook`

### Scripts

- `npm run build` - Build all packages
- `npm run dev` - Start development mode
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run storybook` - Start Storybook

## Components

### Foundation Components
- ✅ **Button** - Primary, secondary, ghost, outline, destructive variants
- ✅ **Input** - Text inputs with validation states and icons
- ✅ **Typography** - Heading, Text, Code, and Link components

### Coming Soon
- **Layout** - Box, Grid, Flex, Stack, Divider
- **Forms** - Select, Checkbox, Radio, Switch, Textarea, Slider
- **Feedback** - Alert, Toast, Progress, Spinner, Badge, Tooltip
- **Navigation** - Tabs, Breadcrumb, Pagination, Menu, Sidebar
- **Data Display** - Card, Table, Avatar, Accordion, List
- **Overlays** - Modal, Drawer, Command

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.# react-ui-kit
# react-ui-kit
