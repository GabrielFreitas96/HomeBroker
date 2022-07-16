import { NextFunction, Request, Response } from 'express';
import ObjCode from '../utils/ObjCodes';

const contaPasswordLogin = (req: Request, res: Response, next: NextFunction) => {
  const { codConta, password } = req.body;
  if (!codConta) {
    return res.status(ObjCode.MISSING_FIELDS).json({ mesage: '"codConta" is undefined' });
  }
  if (typeof codConta !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"codConta" must be a number' });
  }
  if (!password) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"password" is undefined' });
  }
  if (typeof password !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"password" must be a string' });
  }
  return next();
};

export default contaPasswordLogin;
