import { NextFunction, Request, Response } from 'express';
import contaModel from '../../models/contaModel';
import ObjCode from '../../utils/ObjCodes';

const verifyContaExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { contaCliente } = req.body;
  const isConta = await contaModel.getByConta(+contaCliente);
  console.log(isConta);
  if (isConta) {
    return res.status(ObjCode.ALREADY_EXISTS).json({ message: `A "contaCliente" ${contaCliente} already exists`});
  }
  return next();
};

export default verifyContaExist;
