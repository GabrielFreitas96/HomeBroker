import { NextFunction, Request, Response } from 'express';
import ObjCode from '../../utils/ObjCodes';

const namePasswordNewUser = (req: Request, res: Response, next: NextFunction) => {
  const { nameCliente, emailCliente } = req.body;
  if (!nameCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ mesage: '"name" is undefined' });
  }
  if (typeof nameCliente !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"name" must be a string' });
  }
  if (nameCliente.length < 8) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"name" must have minimum 8 character' });
  }
  if (!emailCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"email is undefined' });
  }
  if (typeof emailCliente !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"email must be a string' });
  }
  if (emailCliente.length < 6) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ mesage: '"email must have minimum 6 character' });
  }
  return next();
};

export default namePasswordNewUser;
