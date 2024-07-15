import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '../errors/AuthorizationError';
import { BadRequestError } from '../errors/BadRequestError';

export const errorHandler: ErrorRequestHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AuthorizationError || err instanceof BadRequestError) {
    return res.status(err.status).json({
      timestamp: err.timestamp,
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({ 'message': 'Lỗi không xác định. Thử lại sau', timestamp: new Date(), status: 500 });
};