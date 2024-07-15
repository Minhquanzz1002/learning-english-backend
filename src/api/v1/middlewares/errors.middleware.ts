import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '../errors/AuthorizationError';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import mongoose from 'mongoose';

export const errorHandler: ErrorRequestHandler = (err: Error | mongoose.Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AuthorizationError || err instanceof BadRequestError || err instanceof NotFoundError) {
    return res.status(err.status).json({
      timestamp: err.timestamp,
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({ 'message': 'Lỗi không xác định. Thử lại sau', timestamp: new Date(), status: 500 });
};