import {
  Errback, NextFunction, Request, Response,
} from 'express';

const middlewareEror = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ message: 'unexpected Error' });
  }
  return next();
};

export default middlewareEror;
