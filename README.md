# React UI Kit - Developer Documentation

## Overview

This is a comprehensive React component library built with TypeScript, offering 30+ production-ready components with full accessibility support, extensive testing, and Storybook documentation.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build components
pnpm build

# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 📦 Project Structure

```
react-ui-kit/
├── packages/
│   ├── components/          # Main component library
│   │   ├── src/
│   │   │   ├── components/  # Component implementations
│   │   │   ├── styles/      # Global styles and CSS
│   │   │   └── lib/         # Utilities and helpers
│   │   ├── stories/         # Storybook stories
│   │   └── tests/           # Test configurations
│   ├── design-tokens/       # Design system tokens
│   ├── icons/              # Icon components
│   └── utils/              # Shared utilities
├── apps/                   # Example applications
└── docs/                   # Documentation
```

## 🎨 Component Library Architecture

### Core Technologies

- **React 18** - Component framework
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible primitives for complex components
- **Class Variance Authority (CVA)** - Variant-based component styling
- **Vitest** - Testing framework
- **Storybook** - Component documentation and development

### Component Categories

#### 1. Layout & Foundation (6 components)
- **Container** - Responsive layout container with max-width variants
- **Stack** - Flexible layout component for spacing and alignment
- **Grid** - CSS Grid wrapper with responsive breakpoints
- **Divider** - Visual separator with orientation and styling options
- **Spacer** - Flexible spacing component
- **AspectRatio** - Maintains aspect ratios for media content

#### 2. Form Components (8 components)
- **Input** - Text input with validation and styling variants
- **Textarea** - Multi-line text input with auto-resize
- **Select** - Dropdown selection with search and multi-select
- **Checkbox** - Checkbox input with indeterminate state
- **Radio** - Radio button groups with orientation options
- **Switch** - Toggle switch with size variants
- **Label** - Form labels with required indicators
- **Field** - Form field wrapper with validation display

#### 3. Feedback & Status (7 components)
- **Slider** - Range input with marks and multiple handles
- **Alert** - Notification alerts with variants and dismissible option
- **Toast** - Toast notifications with Radix UI integration
- **Progress** - Linear and circular progress indicators
- **Spinner** - Loading spinners with multiple variants
- **Badge** - Status badges with colors and icon support
- **Tooltip** - Hover tooltips with Radix UI integration

#### 4. Navigation & Structure (6 components)
- **Popover** - Floating content containers with Radix UI
- **Tabs** - Horizontal and vertical tab navigation
- **Breadcrumb** - Navigation breadcrumbs with separators
- **Pagination** - Numeric and cursor-based pagination
- **Menu** - Dropdown menus with Radix UI integration
- **Sidebar** - Collapsible navigation sidebar

#### 5. Data Display (5 components)
- **Card** - Content cards with compound pattern (Header, Body, Footer)
- **Table** - Advanced data tables with sorting and filtering
- **Avatar** - User avatars with groups and status indicators
- **Accordion** - Collapsible content sections with FAQ variant
- **List** - Various list types (simple, checklist, navigation)

#### 6. Overlay & Advanced (3 components - Planned)
- **Modal** - Accessible modal dialogs
- **Drawer** - Slide-out panels
- **CommandPalette** - Command interface with search

## 🛠 Development Guidelines

### Component Structure

Each component follows this structure:

```typescript
// Component with variants using CVA
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "variant-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        md: "medium-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// TypeScript interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Component-specific props
}

// Forward ref component
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### File Organization

For each component:

```
components/
└── component-name/
    ├── component-name.tsx      # Main component
    ├── component-name.test.tsx # Test file
    ├── component-name.stories.tsx # Storybook stories
    └── index.ts               # Exports
```

### Testing Standards

- **Unit Tests**: Every component must have comprehensive tests
- **Coverage**: Aim for >90% test coverage
- **Accessibility**: Test ARIA attributes and keyboard navigation
- **Visual Regression**: Storybook stories serve as visual tests

Example test structure:

```typescript
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Component variant="secondary" />)
    expect(screen.getByRole('...')).toHaveClass('secondary-classes')
  })

  it('handles interactions', () => {
    const handleClick = vi.fn()
    render(<Component onClick={handleClick} />)
    fireEvent.click(screen.getByRole('...'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Styling Guidelines

#### Tailwind CSS Usage

- Use utility classes for styling
- Create variants using CVA for reusable styles
- Follow mobile-first responsive design
- Use semantic color tokens from design system

#### Design Tokens

Access design tokens via CSS variables:

```css
:root {
  --color-primary: theme('colors.blue.600');
  --color-primary-foreground: theme('colors.white');
  --radius: 0.5rem;
}
```

#### Dark Mode Support

All components support dark mode via CSS variables:

```css
.dark {
  --color-background: theme('colors.slate.950');
  --color-foreground: theme('colors.slate.50');
}
```

### Accessibility Standards

- **WCAG 2.1 AA compliance**
- **Semantic HTML** - Use proper HTML elements
- **ARIA attributes** - Include necessary ARIA labels and roles
- **Keyboard navigation** - Full keyboard support
- **Focus management** - Visible focus indicators
- **Screen reader support** - Meaningful content for assistive technologies

Example accessibility implementation:

```typescript
<button
  ref={ref}
  className={buttonVariants({ variant, size })}
  disabled={disabled}
  aria-disabled={disabled}
  aria-describedby={description ? `${id}-description` : undefined}
  {...props}
>
  {children}
</button>
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test component-name.test.tsx
```

### Test Categories

1. **Unit Tests** - Individual component functionality
2. **Integration Tests** - Component interactions
3. **Accessibility Tests** - ARIA and keyboard navigation
4. **Visual Tests** - Storybook visual regression

### Mock Strategy

- **Radix UI components** - Use actual components in tests
- **External APIs** - Mock with MSW
- **Browser APIs** - Mock with Vitest mocks

## 📚 Storybook

### Story Structure

Each component has multiple stories:

```typescript
export default {
  title: 'Components/ComponentName',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: 'Component description and usage guidelines.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
  },
} satisfies Meta<typeof Component>

export const Default: Story = {
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
}
```

### Documentation

- **Component API** - Props, variants, and usage
- **Examples** - Common use cases and patterns
- **Accessibility** - ARIA attributes and keyboard support
- **Design Guidelines** - When and how to use components

## 🚀 Deployment

### Build Process

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @react-ui-kit/components build

# Build Storybook
pnpm build-storybook
```

### Release Process

1. **Version Bump** - Update package versions
2. **Changelog** - Document changes and breaking changes
3. **Build** - Create production builds
4. **Test** - Run full test suite
5. **Publish** - Publish to npm registry

### Package Publishing

```bash
# Publish all packages
pnpm publish -r

# Publish specific package
pnpm --filter @react-ui-kit/components publish
```

## 🔧 Configuration

### TypeScript Configuration

- **Strict mode enabled** - Maximum type safety
- **Path mapping** - Clean imports with `@/` alias
- **Declaration files** - Generated for all components

### Build Configuration

- **Turbo** - Monorepo build orchestration
- **tsup** - TypeScript bundling
- **PostCSS** - CSS processing with Tailwind

### Testing Configuration

- **Vitest** - Test runner with jsdom environment
- **Testing Library** - React component testing utilities
- **MSW** - API mocking for integration tests

## 📊 Performance

### Bundle Size Optimization

- **Tree shaking** - Dead code elimination
- **Code splitting** - Lazy loading for large components
- **Bundle analysis** - Regular bundle size monitoring

### Runtime Performance

- **React.memo** - Prevent unnecessary re-renders
- **useMemo/useCallback** - Optimize expensive operations
- **Virtualization** - For large data sets in tables/lists

## 🐛 Troubleshooting

### Common Issues

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
pnpm install

# Check TypeScript configuration
pnpm tsc --noEmit
```

#### Styling Issues

```bash
# Rebuild Tailwind CSS
pnpm build-css

# Check Tailwind configuration
npx tailwindcss --help
```

#### Test Failures

```bash
# Update test snapshots
pnpm test -- --updateSnapshot

# Debug specific test
pnpm test -- --reporter=verbose component-name.test.tsx
```

### Development Tips

1. **Use TypeScript strict mode** - Catch errors early
2. **Run tests frequently** - TDD approach
3. **Check accessibility** - Use screen readers
4. **Test keyboard navigation** - Tab through components
5. **Validate responsive design** - Test on multiple screen sizes

## 🤝 Contributing

### Code Standards

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks
- **Conventional Commits** - Standardized commit messages

### Pull Request Process

1. **Fork** the repository
2. **Create** feature branch
3. **Implement** changes with tests
4. **Update** documentation
5. **Submit** pull request

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Tests cover new functionality
- [ ] Accessibility standards met
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Performance impact considered

## 📈 Metrics and Monitoring

### Quality Metrics

- **Test Coverage**: >90%
- **Bundle Size**: <50KB gzipped
- **Accessibility Score**: WCAG 2.1 AA
- **Performance**: Lighthouse score >90

### Monitoring

- **Bundle size tracking** - Bundlephobia integration
- **Performance monitoring** - Core Web Vitals
- **Error tracking** - Sentry integration
- **Usage analytics** - Component usage metrics

## 🔮 Roadmap

### Planned Features

- **Sprint 6**: Overlay & Advanced Components (Modal, Drawer, CommandPalette)
- **Design System**: Enhanced design tokens and theming
- **Performance**: Bundle size optimization
- **Accessibility**: Enhanced screen reader support
- **Documentation**: Interactive examples and tutorials

### Future Enhancements

- **Figma Integration** - Design-to-code workflow
- **Custom Theming** - Advanced theme customization
- **Animation Library** - Motion components
- **Form Validation** - Schema-based form validation
- **Data Visualization** - Chart and graph components

---

## 📝 Additional Resources

- [Storybook Documentation](http://localhost:6006)
- [Component API Reference](./API.md)
- [Design Guidelines](./DESIGN.md)
- [Accessibility Guide](./ACCESSIBILITY.md)
- [Migration Guide](./MIGRATION.md)

## 🆘 Support

For questions and support:

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Community questions and feedback
- **Documentation** - Comprehensive guides and examples

---

*Last updated: $(date)*
*Version: 1.0.0*
