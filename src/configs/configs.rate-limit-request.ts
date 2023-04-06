import rateLimit from 'express-rate-limit';

export const limitRequestConfig = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
