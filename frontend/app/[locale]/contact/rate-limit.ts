const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

type ContactRateLimitState = Map<string, number[]>

declare global {
  var __dotdeepContactRateLimit: ContactRateLimitState | undefined
}

function getStore() {
  if (!globalThis.__dotdeepContactRateLimit) {
    globalThis.__dotdeepContactRateLimit = new Map()
  }

  return globalThis.__dotdeepContactRateLimit
}

export function enforceContactRateLimit(identifier: string, now = Date.now()) {
  const store = getStore()
  const windowStart = now - WINDOW_MS
  const recentRequests = (store.get(identifier) || []).filter((timestamp) => timestamp > windowStart)

  if (recentRequests.length >= MAX_REQUESTS) {
    const retryAfterMs = recentRequests[0] + WINDOW_MS - now

    return {
      allowed: false,
      retryAfterMs: Math.max(retryAfterMs, 0),
    }
  }

  recentRequests.push(now)
  store.set(identifier, recentRequests)

  return {
    allowed: true,
    retryAfterMs: 0,
  }
}
