// lib/aiCache.ts
import { lru } from 'tiny-lru'

// Create the LRU cache with max 100 entries
const cache = lru<string>(100)

export { cache }
