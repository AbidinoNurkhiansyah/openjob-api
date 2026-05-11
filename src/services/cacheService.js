const redis = require('../config/redis');

const memoryCache = new Map();

const cacheService = {
  async set(key, value, expirationInSecond = 3600) {
    try {
      await redis.set(key, value, 'EX', expirationInSecond);
    } catch (error) {
      console.error(`Redis set error for key ${key}:`, error.message);
      // Fallback to memory
      memoryCache.set(key, value);
      setTimeout(() => memoryCache.delete(key), expirationInSecond * 1000);
    }
  },

  async get(key) {
    try {
      const result = await redis.get(key);
      if (result !== null) return result;
    } catch (error) {
      console.error(`Redis get error for key ${key}:`, error.message);
    }
    
    // Fallback to memory
    return memoryCache.get(key) || null;
  },

  async delete(key) {
    try {
      await redis.del(key);
    } catch (error) {
      console.error(`Redis delete error for key ${key}:`, error.message);
    }
    return memoryCache.delete(key);
  },
};

module.exports = cacheService;
