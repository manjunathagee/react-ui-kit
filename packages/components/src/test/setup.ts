import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { configure } from '@testing-library/react'

// Configure React Testing Library to automatically use act() and reduce warnings
configure({
  asyncUtilTimeout: 2000,
  // Disable act warnings for async utilities
  reactStrictMode: false,
})

// Suppress React act warnings globally in test environment
const originalConsoleError = console.error
console.error = (...args: any[]) => {
  const message = args[0]
  if (
    typeof message === 'string' &&
    (message.includes('Warning: An update to') && message.includes('was not wrapped in act')) ||
    message.includes('act(...)')
  ) {
    // Suppress React act warnings in tests
    return
  }
  originalConsoleError.apply(console, args)
}

// Set React act environment flag
;(global as any).IS_REACT_ACT_ENVIRONMENT = true

// Mock ResizeObserver which is required by Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = ''
  thresholds = []
  
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Mock hasPointerCapture for Radix UI components
Element.prototype.hasPointerCapture = vi.fn(() => false)
Element.prototype.setPointerCapture = vi.fn()
Element.prototype.releasePointerCapture = vi.fn()

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: vi.fn(),
}))