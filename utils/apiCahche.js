// Create a new file: /src/utils/apiCache.js

// Simple in-memory cache implementation
let cacheStore = {};
let cacheDuration = 5 * 60 * 1000; // 5 minutes default cache duration

export const apiCache = {
  // Get data from cache or fetch it if not available
  async getOrFetch(key, fetchFn) {
    const cachedData = this.get(key);
    if (cachedData !== null) {
      return cachedData;
    }
    
    // If not in cache, fetch the data
    const data = await fetchFn();
    this.set(key, data);
    return data;
  },
  
  // Get data from cache
  get(key) {
    const item = cacheStore[key];
    if (!item) return null;
    
    // Check if cache has expired
    if (Date.now() > item.expiry) {
      this.remove(key);
      return null;
    }
    
    return item.data;
  },
  
  // Set data in cache
  set(key, data, customDuration) {
    const expiry = Date.now() + (customDuration || cacheDuration);
    cacheStore[key] = { data, expiry };
  },
  
  // Remove item from cache
  remove(key) {
    delete cacheStore[key];
  },
  
  // Clear all cache
  clear() {
    cacheStore = {};
  },
  
  // Set global cache duration
  setCacheDuration(durationMs) {
    cacheDuration = durationMs;
  }
};

// Utility to create cache keys from function calls and params
export const createCacheKey = (prefix, ...args) => {
  return `${prefix}:${JSON.stringify(args)}`;
};