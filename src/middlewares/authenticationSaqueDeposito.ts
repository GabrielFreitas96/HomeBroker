import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import ObjCode from '../utils/ObjCodes';
import decodeToken from '../utils/decodeToken';
import splitString from '../utils/split';

dotenv.config();

const authenticationSaqueDeposito = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  const { codCliente } = req.body;
   if (!auth) {
    return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  const token = splitString(auth);
  try {
       const decoded = decodeToken(token);
    if (decoded.codCliente !== +codCliente) {
      return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Unauthorized client' });
    }
  } catch (error) {
    return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  return next();
};

export default authenticationSaqueDeposito;
