// configuration for redis

const Redis = require("ioredis");

// basic setup
const redis = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: 6379
});
// connect to redis
// event -> connect
redis.on("connect", () => {
    console.log("Redis DB connected!")
})
//event -> error
redis.on("error", (err) => {
    console.log("err connecting to redis db", err)
})
module.exports = redis