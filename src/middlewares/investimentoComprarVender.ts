import { NextFunction, Request, Response } from 'express';
import ObjCode from '../utils/ObjCodes';

const contaPasswordLogin = (req: Request, res: Response, next: NextFunction) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  if (!codCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"codCliente" is undefined' });
  }
  if (typeof codCliente !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"codCliente" must be a number' });
  }
  if (codCliente < 0) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"codCliente" must be greater than 0' });
  }
  if (!codAtivo) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"codAtivo" is undefined' });
  }
  if (typeof codAtivo !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"codAtivo" must be a number' });
  }
  if (codAtivo < 0) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"codAtivo" must be greater than 0' });
  }
  if (!qtdeAtivo) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"qtdeAtivo" is undefined' });
  }
  if (typeof qtdeAtivo !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"qtdeAtivo" must be a number' });
  }
  if (qtdeAtivo < 0) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"qtdeAtivo" must be greater than 0' });
  }
  return next();
};

export default contaPasswordLogin;
