import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidUrl, isValidPhone, getPasswordStrength } from './validation'

describe('isValidEmail', () => {
  it('should validate correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    expect(isValidEmail('test+tag@example.org')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid-email')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('test@.com')).toBe(false)
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidUrl', () => {
  it('should validate correct URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('https://sub.example.com/path?query=1')).toBe(true)
    expect(isValidUrl('ftp://files.example.com')).toBe(true)
  })

  it('should reject invalid URLs', () => {
    expect(isValidUrl('invalid-url')).toBe(false)
    expect(isValidUrl('example.com')).toBe(false)
    expect(isValidUrl('http://')).toBe(false)
    expect(isValidUrl('')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('should validate correct phone numbers', () => {
    expect(isValidPhone('+1234567890')).toBe(true)
    expect(isValidPhone('1234567890')).toBe(true)
    expect(isValidPhone('+1 (234) 567-8900')).toBe(true)
    expect(isValidPhone('+44 20 7946 0958')).toBe(true)
  })

  it('should reject invalid phone numbers', () => {
    expect(isValidPhone('123')).toBe(false)
    expect(isValidPhone('abc')).toBe(false)
    expect(isValidPhone('')).toBe(false)
    expect(isValidPhone('12345')).toBe(false)
  })
})

describe('getPasswordStrength', () => {
  it('should return low score for weak passwords', () => {
    const result = getPasswordStrength('123')
    expect(result.score).toBe(1)
    expect(result.feedback).toContain('Password should be at least 8 characters long')
  })

  it('should return medium score for moderate passwords', () => {
    const result = getPasswordStrength('password123')
    expect(result.score).toBe(3)
    expect(result.feedback).toContain('Password should contain uppercase letters')
    expect(result.feedback).toContain('Password should contain special characters')
  })

  it('should return high score for strong passwords', () => {
    const result = getPasswordStrength('MyStr0ng!Password')
    expect(result.score).toBe(5)
    expect(result.feedback).toHaveLength(0)
  })

  it('should provide specific feedback for missing requirements', () => {
    const result = getPasswordStrength('password')
    expect(result.feedback).toContain('Password should contain uppercase letters')
    expect(result.feedback).toContain('Password should contain numbers')
    expect(result.feedback).toContain('Password should contain special characters')
  })

  it('should handle empty password', () => {
    const result = getPasswordStrength('')
    expect(result.score).toBe(0)
    expect(result.feedback).toContain('Password should be at least 8 characters long')
  })
})