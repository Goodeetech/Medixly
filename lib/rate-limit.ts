// lib/rateLimit.ts
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create Redis instance from environment
const redis = Redis.fromEnv();

// Set up rate limiter
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 20 requests per minute
  analytics: true,
});
