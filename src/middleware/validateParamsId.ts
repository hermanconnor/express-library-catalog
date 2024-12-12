import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

export const validateParamsId: RequestHandler = (req, res, next) => {
  const paramsId = Number(req.params.id);

  if (isNaN(paramsId)) {
    return next(createHttpError(400, 'Invalid parameter ID'));
  }

  req.id = paramsId;

  next();
};
