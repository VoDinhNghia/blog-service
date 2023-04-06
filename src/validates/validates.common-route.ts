import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const ResponseValidBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  } catch {}
};
