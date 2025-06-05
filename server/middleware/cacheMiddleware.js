const redisClient = require("../helpers/redisClient");

async function cache(req, res, next) {
  const key = req.originalUrl;

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function setCache(req, res, next) {
  const key = req.originalUrl;
  const ttl = 3600;

  try {
    const data = JSON.stringify(res.locals.data);
    await redisClient.setEx(key, ttl, data);
    res.json(res.locals.data);
  } catch (err) {
    next(err);
  }
}

module.exports = { cache, setCache };
