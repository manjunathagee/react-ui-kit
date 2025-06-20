# React TypeScript Component Library Development Prompt

You are an expert React developer tasked with building a comprehensive, production-ready component library. Create a modern, scalable, and well-architected component library following industry best practices.

## Project Requirements

### Tech Stack to Implement
- **React 18+** with TypeScript (strict mode)
- **Vite** for build tooling and development server
- **Tailwind CSS** for utility-first styling
- **Radix UI** primitives for accessibility
- **Storybook** for component documentation
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **ESLint** + **Prettier** for code quality
- **Husky** + **lint-staged** for git hooks
- **Rollup/tsup** for library bundling
- **Changesets** for versioning

### Project Structure
Create a monorepo structure with:
```
packages/
├── components/          # Main component library
├── design-tokens/      # Design system tokens
├── icons/             # Icon components
├── utils/             # Utility functions
└── playground/        # Development playground
```

### Component Implementation Requirements

#### Foundation Components (Build First)
1. **Button Component**
   - Variants: primary, secondary, ghost, outline, destructive
   - Sizes: xs, sm, md, lg, xl
   - States: default, hover, focus, disabled, loading
   - Polymorphic (as prop support)
   - Forward ref implementation
   - Full accessibility support

2. **Input Component**
   - Types: text, email, password, number, search, url, tel
   - States: default, error, disabled, readonly
   - Sizes: sm, md, lg
   - Left/right icons support
   - Validation integration
   - Auto-complete support

3. **Typography System**
   - Heading components (h1-h6)
   - Text component with variants
   - Code/Pre components
   - Link component
   - Responsive typography

#### Layout Components
4. **Box/Container** - Flexible layout primitive
5. **Grid** - CSS Grid wrapper with responsive props
6. **Flex** - Flexbox wrapper with alignment props
7. **Stack** - Vertical/horizontal spacing utility
8. **Divider** - Visual separator component

#### Form Components
9. **Form** - Form wrapper with validation
10. **Field** - Form field wrapper
11. **Label** - Accessible form labels
12. **Select** - Custom dropdown with search
13. **Checkbox** - With indeterminate state
14. **Radio Group** - Accessible radio buttons
15. **Switch** - Toggle component
16. **Textarea** - Multi-line text input
17. **Slider** - Range input component

#### Feedback Components
18. **Alert** - Status messages (success, warning, error, info)
19. **Toast** - Notification system
20. **Progress** - Progress bar and circular progress
21. **Spinner** - Loading indicators
22. **Badge** - Status badges and counts
23. **Tooltip** - Contextual help
24. **Popover** - Floating content

#### Navigation Components
25. **Tabs** - Tabbed navigation
26. **Breadcrumb** - Navigation breadcrumbs
27. **Pagination** - Page navigation
28. **Menu** - Dropdown and context menus
29. **Sidebar** - Navigation sidebar

#### Data Display
30. **Card** - Content containers
31. **Table** - Data tables with sorting/filtering
32. **Avatar** - User profile images
33. **Accordion** - Collapsible content
34. **List** - Various list types

#### Overlay Components
35. **Modal** - Dialog overlays
36. **Drawer** - Slide-out panels
37. **Command** - Command palette

## Implementation Guidelines

### Code Quality Standards
- Use TypeScript strict mode
- Implement comprehensive prop types
- Use discriminated unions for variants
- Forward refs for all interactive components
- Compound component patterns where appropriate
- Polymorphic component support with `as` prop

### Styling Architecture
- Implement CSS custom properties for theming
- Create design tokens (colors, spacing, typography, shadows)
- Use Tailwind CSS with custom design system
- Support dark/light mode
- Responsive design patterns
- CSS-in-JS minimal usage (prefer CSS variables)

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- ARIA attributes
- Color contrast compliance
- Semantic HTML usage

### Testing Strategy
- Unit tests for all components (>90% coverage)
- Integration tests for complex interactions
- Visual regression tests with Storybook
- Accessibility testing automation
- Cross-browser compatibility testing

### Documentation Requirements
- Comprehensive Storybook stories
- Interactive examples for each component
- Props documentation with TypeScript
- Usage guidelines and best practices
- Design system documentation
- Migration guides

### Performance Optimization
- Tree-shaking support
- Minimal bundle size
- Lazy loading for large components
- React.memo usage where beneficial
- Optimized re-renders
- SSR compatibility

## Development Workflow

### Setup Phase
1. Initialize project with Vite + TypeScript
2. Configure Tailwind CSS with custom design system
3. Set up Storybook with essential addons
4. Configure testing environment (Vitest + RTL)
5. Set up ESLint, Prettier, Husky configuration
6. Create design tokens and theme system

### Component Development Process
1. Start with TypeScript interfaces and prop definitions
2. Implement base component with accessibility
3. Add styling with Tailwind CSS
4. Write comprehensive tests
5. Create Storybook stories with all variants
6. Document usage patterns and examples

### Build and Distribution
1. Configure library bundling with Rollup/tsup
2. Generate TypeScript declarations
3. Set up automated versioning with Changesets
4. Create GitHub Actions for CI/CD
5. Publish to npm with proper semver

## Specific Implementation Requests

For each component, provide:
- Complete TypeScript component implementation
- Comprehensive prop interface definitions
- Storybook stories showing all variants
- Unit tests with React Testing Library
- Usage examples and documentation
- Accessibility implementation details

Focus on creating a cohesive design system that developers will love to use, with consistent APIs, excellent TypeScript support, and comprehensive documentation.

## Additional Considerations

### Advanced Features to Implement
- Theme customization system
- Component composition patterns
- Animation and transition support
- Form validation integration
- Internationalization support
- Right-to-left (RTL) language support

### Developer Experience
- Excellent TypeScript IntelliSense
- Helpful error messages
- Consistent naming conventions
- Predictable component behavior
- Easy customization options
- Clear upgrade paths

Start with the foundation components (Button, Input, Typography) and build up the system systematically. Ensure each component is production-ready before moving to the next one.
