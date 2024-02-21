import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request: ${req.path}. Status Code: ${res.statusCode}`);
  next();
}
