import { NextFunction, Request, Response } from 'express';
import ObjCode from '../utils/ObjCodes';

const depositoSaque = (req: Request, res: Response, next: NextFunction) => {
  const { codCliente, valor } = req.body;
  if (!codCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"codCliente" is undefined' });
  }
  if (typeof codCliente !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"codCliente" must be a number' });
  }
  if (typeof valor !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"valor" must be a number' });
  }
  if (valor <= 0) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"valor" must be bigger than 0' });
  }
  if (!valor) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"valor" is undefined' });
  }
  return next();
};

export default depositoSaque;
