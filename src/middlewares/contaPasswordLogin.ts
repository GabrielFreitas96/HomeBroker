import { NextFunction, Request, Response } from 'express';
import ObjCode from '../utils/ObjCodes';

const contaPasswordLogin = (req: Request, res: Response, next: NextFunction) => {
  const { contaCliente, passwordCliente } = req.body;
  if (!contaCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ mesage: '"contaCliente" is undefined' });
  }
  if (typeof contaCliente !== 'number') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"contaCliente" must be a number' });
  }
  if (!passwordCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"password" is undefined' });
  }
  if (typeof passwordCliente !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"password" must be a string' });
  }
  if (passwordCliente.length < 6) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"password" must have minimum 6 character' });
  }
  return next();
};

export default contaPasswordLogin;
