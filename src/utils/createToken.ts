import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ICliente from '../interfaces/ICliente';

dotenv.config();

const secret = 'mysecret' || process.env.JTW_SECRET;

const jwtConfig: jwt.SignOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = (payload: Omit<ICliente, 'passwordCliente'>) => {
  const token = jwt.sign({ payload }, secret, jwtConfig);
  return token;
};

export default generateToken;
