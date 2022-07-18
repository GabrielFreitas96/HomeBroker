import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import ObjCode from '../utils/ObjCodes';
import decodeToken from '../utils/decodeToken';

dotenv.config();

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  // console.log('id', typeof id);
  // console.log('token no middleware verify', token);
  if (!token) {
    return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    // const decoded = jwt.verify(token, secret);
    // console.log('decoded no middleware', decoded);
    const decoded = decodeToken(token);
    // const { codCliente } = decoded;
    // console.log('adsd', typeof codCliente);
    // console.log('decoded', decoded);
    // console.log(decoded.payload.codCliente);
    if (decoded.codCliente !== +id) {
      // console.log('entrou no if');
      return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Unauthorized client' });
    }
  } catch (error) {
    return res.status(ObjCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  return next();
};

export default authentication;
