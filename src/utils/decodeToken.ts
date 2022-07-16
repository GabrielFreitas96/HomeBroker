import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import ICliente from '../interfaces/ICliente';

dotenv.config();

const secret = 'mysecret' || process.env.JTW_SECRET;

const decodeToken = (token:string): jwt.JwtPayload => {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
  return decoded as jwt.JwtPayload;
};

export default decodeToken;
