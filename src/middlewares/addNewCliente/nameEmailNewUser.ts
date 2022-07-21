import { NextFunction, Request, Response } from 'express';
import ObjCode from '../../utils/ObjCodes';

const nameEmailNewUser = (req: Request, res: Response, next: NextFunction) => {
  const { nameCliente, emailCliente } = req.body;
  if (!nameCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"name" is undefined' });
  }
  if (typeof nameCliente !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"name" must be a string' });
  }
  if (nameCliente.length < 8) {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"name" must have minimum 8 character' });
  }
  if (!emailCliente) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"email is undefined' });
  }
  if (typeof emailCliente !== 'string') {
    return res.status(ObjCode.INCORRECT_TYPE).json({ message: '"email must be a string' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailCliente)) {
    return res.status(ObjCode.MISSING_FIELDS).json({ message: '"email" must be a valid email' });
  }
  return next();
};

export default nameEmailNewUser;
