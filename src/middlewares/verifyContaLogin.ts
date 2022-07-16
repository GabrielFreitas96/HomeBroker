import { NextFunction, Request, Response } from 'express';
import contaModel from '../models/contaModel';
import ObjCode from '../utils/ObjCodes';

const verifyContaLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { contaCliente } = req.body;
  console.log('contaCliente', contaCliente);
  const isConta = await contaModel.getByConta(+contaCliente);
  console.log(isConta);
  if (!isConta) {
    return res.status(ObjCode.NOT_FOUND).json({ mesage: `A "contaCliente" ${contaCliente} was not found` });
  }
  return next();
};

export default verifyContaLogin;
