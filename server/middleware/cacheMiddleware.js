const redisClient = require("../helpers/redisClient");

// Middleware to check cache
async function cache(req, res, next) {
  const key = req.originalUrl; // Use the request URL as the cache key

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next(); // Continue to route handler if no cache
  } catch (err) {
    next(err);
  }
}

// Middleware to set cache
async function setCache(req, res, next) {
  const key = req.originalUrl;
  const ttl = 3600; // Time to live in seconds

  try {
    const data = JSON.stringify(res.locals.data);
    await redisClient.setEx(key, ttl, data);
    res.json(res.locals.data);
  } catch (err) {
    next(err);
  }
}

module.exports = { cache, setCache };
