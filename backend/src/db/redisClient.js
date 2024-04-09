const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client instance
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379, // Default Redis port
});

// Promisify Redis client methods
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetexAsync = promisify(redisClient.set).bind(redisClient);

// Flag to track if the Redis client is connected
// let isRedisConnected = false;

// Connect to Redis if not already connected
// async function connectToRedis() {
//   if (!isRedisConnected) {
//     await redisClient.connect();
//     isRedisConnected = true;
//   }
// }

// Check for Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = { redisClient, redisGetAsync, redisSetexAsync };
