import { describe, it, expect } from 'vitest'
import { formatBytes, formatCurrency, truncate } from './format'

describe('formatBytes', () => {
  it('should format 0 bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes')
  })

  it('should format bytes correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1048576)).toBe('1 MB')
    expect(formatBytes(1073741824)).toBe('1 GB')
  })

  it('should format with custom decimals', () => {
    expect(formatBytes(1536, 1)).toBe('1.5 KB')
    expect(formatBytes(1536, 0)).toBe('2 KB')
  })

  it('should handle large numbers', () => {
    expect(formatBytes(1099511627776)).toBe('1 TB')
  })
})

describe('formatCurrency', () => {
  it('should format USD currency by default', () => {
    expect(formatCurrency(123.45)).toBe('$123.45')
    expect(formatCurrency(1000)).toBe('$1,000.00')
  })

  it('should format different currencies', () => {
    expect(formatCurrency(123.45, 'EUR')).toBe('€123.45')
    expect(formatCurrency(123.45, 'GBP')).toBe('£123.45')
  })

  it('should format with different locales', () => {
    const result = formatCurrency(1234.56, 'USD', 'de-DE')
    expect(result).toContain('1.234,56')
    expect(result).toContain('$')
  })

  it('should handle zero amount', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})

describe('truncate', () => {
  it('should not truncate text shorter than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
  })

  it('should truncate text longer than maxLength', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...')
  })

  it('should handle exact length match', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('')
  })

  it('should handle single character truncation', () => {
    expect(truncate('Hello', 1)).toBe('H...')
  })
})