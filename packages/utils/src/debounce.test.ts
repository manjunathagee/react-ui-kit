import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should delay function execution', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn('test')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith('test')
  })

  it('should cancel previous execution if called again', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn('first')
    vi.advanceTimersByTime(50)
    debouncedFn('second')
    
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('should handle multiple arguments', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn('arg1', 'arg2', 'arg3')
    vi.advanceTimersByTime(100)
    
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should execute function immediately on first call', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn('test')
    expect(fn).toHaveBeenCalledWith('test')
  })

  it('should not execute function again until wait time passes', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn('first')
    throttledFn('second')
    
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')
  })

  it('should allow execution after wait time passes', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn('first')
    vi.advanceTimersByTime(100)
    throttledFn('second')
    
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenNthCalledWith(1, 'first')
    expect(fn).toHaveBeenNthCalledWith(2, 'second')
  })

  it('should handle multiple arguments', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn('arg1', 'arg2', 'arg3')
    
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })
})