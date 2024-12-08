/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';

const errorHandler =
  () => (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (isHttpError(err)) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
    } else if (err instanceof Error) {
      // Handle other errors that are not instances of HttpError
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(500);
    } else {
      // If the error is something unexpected (not an Error or HttpError)
      res.locals.message = 'An unknown error occurred';
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(500);
    }

    // render the error page
    res.render('error');
  };

export default errorHandler;
