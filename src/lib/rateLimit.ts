export type RateLimiter = { isAllowed: () => boolean; reset: () => void }

/** Limits client-side submit attempts. Server-side rate limiting remains required in production. */
export function createRateLimiter(limit = 3, windowMs = 60_000, now = () => Date.now()): RateLimiter {
  let attempts: number[] = []
  return {
    isAllowed: () => {
      const timestamp = now()
      attempts = attempts.filter(attempt => timestamp - attempt < windowMs)
      if (attempts.length >= limit) return false
      attempts.push(timestamp)
      return true
    },
    reset: () => { attempts = [] },
  }
}
