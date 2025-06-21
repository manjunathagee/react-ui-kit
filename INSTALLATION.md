# Installation Guide

This guide explains how to install and use React UI Kit packages from GitHub Package Registry.

## 🚀 Quick Start

### Step 1: Configure npm for GitHub Package Registry

```bash
# Configure npm to use GitHub Package Registry for @react-ui-kit scope
npm config set @react-ui-kit:registry https://npm.pkg.github.com
```

### Step 2: Install Packages

```bash
# Install the main component library
npm install @react-ui-kit/components

# Install additional packages as needed
npm install @react-ui-kit/design-tokens
npm install @react-ui-kit/utils
npm install @react-ui-kit/icons
```

### Step 3: Basic Usage

```tsx
import React from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@react-ui-kit/components'
import '@react-ui-kit/components/styles.css'

function App() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Welcome to React UI Kit</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A comprehensive component library for React applications.</p>
        <Button variant="primary" className="mt-4">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}

export default App
```

## 📦 Available Packages

### @react-ui-kit/components

The main component library with 30+ production-ready components.

```bash
npm install @react-ui-kit/components
```

**Features:**
- 🎨 30+ components with Tailwind CSS styling
- ♿ Full accessibility support (WCAG 2.1 AA)
- 🌓 Dark mode support
- 📱 Responsive design
- 🔧 TypeScript support
- 📚 Comprehensive Storybook documentation

**Usage:**
```tsx
import { Button, Input, Card } from '@react-ui-kit/components'
import '@react-ui-kit/components/styles.css'
```

### @react-ui-kit/design-tokens

Design system tokens for consistent styling.

```bash
npm install @react-ui-kit/design-tokens
```

**Usage:**
```tsx
import { colors, spacing, typography } from '@react-ui-kit/design-tokens'

const theme = {
  colors: colors.primary,
  spacing: spacing.md,
  fonts: typography.fontFamily.sans
}
```

### @react-ui-kit/utils

Utility functions for common tasks.

```bash
npm install @react-ui-kit/utils
```

**Usage:**
```tsx
import { debounce, formatCurrency, validateEmail } from '@react-ui-kit/utils'

const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query)
}, 300)
```

### @react-ui-kit/icons

Icon components based on Lucide React.

```bash
npm install @react-ui-kit/icons
```

**Usage:**
```tsx
import { CheckIcon, ChevronDownIcon } from '@react-ui-kit/icons'

function MyComponent() {
  return (
    <button>
      <CheckIcon className="w-4 h-4 mr-2" />
      Complete
    </button>
  )
}
```

## 🔧 Framework Integration

### Next.js

```bash
# Install packages
npm config set @react-ui-kit:registry https://npm.pkg.github.com
npm install @react-ui-kit/components

# Configure next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@react-ui-kit/components'],
}

module.exports = nextConfig
```

```tsx
// pages/_app.tsx or app/layout.tsx
import '@react-ui-kit/components/styles.css'
import './globals.css' // Your custom styles

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### Vite + React

```bash
# Install packages
npm config set @react-ui-kit:registry https://npm.pkg.github.com
npm install @react-ui-kit/components
```

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@react-ui-kit/components/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Create React App

```bash
# Install packages
npm config set @react-ui-kit:registry https://npm.pkg.github.com
npm install @react-ui-kit/components
```

```tsx
// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@react-ui-kit/components/styles.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## 🎨 Styling and Theming

### CSS Import

Always import the CSS file to get the base styles:

```tsx
import '@react-ui-kit/components/styles.css'
```

### Tailwind CSS Integration

If you're using Tailwind CSS in your project:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@react-ui-kit/components/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Extend with design tokens
    },
  },
  plugins: [],
}
```

### Custom Theming

Override CSS variables for theming:

```css
/* Custom theme */
:root {
  --color-primary: 220 98% 61%;
  --color-primary-foreground: 210 20% 98%;
  --color-secondary: 210 40% 95%;
  --color-secondary-foreground: 222.2 84% 4.9%;
  --color-accent: 210 40% 95%;
  --color-accent-foreground: 222.2 84% 4.9%;
}

.dark {
  --color-primary: 217.2 91.2% 59.8%;
  --color-primary-foreground: 222.2 84% 4.9%;
  --color-secondary: 217.2 32.6% 17.5%;
  --color-secondary-foreground: 210 40% 98%;
}
```

## 🔍 TypeScript Support

All packages include full TypeScript definitions:

```tsx
import type { ButtonProps, CardProps } from '@react-ui-kit/components'

interface MyComponentProps {
  button: ButtonProps
  card: CardProps
}

function MyComponent({ button, card }: MyComponentProps) {
  return (
    <Card {...card}>
      <Button {...button}>Click me</Button>
    </Card>
  )
}
```

## 🚨 Troubleshooting

### Registry Configuration Issues

```bash
# Check current configuration
npm config list

# Reset and reconfigure
npm config delete @react-ui-kit:registry
npm config set @react-ui-kit:registry https://npm.pkg.github.com
```

### Authentication for Private Repositories

If the repository is private, you'll need to authenticate:

```bash
# Login to GitHub Package Registry
npm login --scope=@react-ui-kit --registry=https://npm.pkg.github.com

# Or use a .npmrc file with your token
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Import Errors

Ensure you're importing from the correct package:

```tsx
// ✅ Correct
import { Button } from '@react-ui-kit/components'

// ❌ Incorrect
import { Button } from '@react-ui-kit/components/dist/index'
```

## 📚 Documentation

- **[Storybook Documentation](https://685615b4675020c9c11b09a7-crlraeskec.chromatic.com/)** - Interactive component examples
- **[GitHub Repository](https://github.com/manjunathagee/react-ui-kit)** - Source code and issues
- **[Component API Reference](./API.md)** - Detailed API documentation

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/manjunathagee/react-ui-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/manjunathagee/react-ui-kit/discussions)
- **Documentation**: [README.md](./README.md)

---

**Note**: Replace `manjunathagee` with the actual GitHub username/organization.
