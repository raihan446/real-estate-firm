import { describe, expect, it } from 'vitest'
import { createRateLimiter } from './rateLimit'

describe('createRateLimiter', () => {
  it('blocks attempts above the configured limit until the window expires', () => {
    let now = 0
    const limiter = createRateLimiter(2, 1_000, () => now)
    expect(limiter.isAllowed()).toBe(true)
    expect(limiter.isAllowed()).toBe(true)
    expect(limiter.isAllowed()).toBe(false)
    now = 1_001
    expect(limiter.isAllowed()).toBe(true)
  })
})
