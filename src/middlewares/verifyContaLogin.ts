import { NextFunction, Request, Response } from 'express';
import contaModel from '../models/contaModel';
import ObjCode from '../utils/ObjCodes';

const verifyContaLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { codConta } = req.body;
  console.log('codConta', codConta);
  const isConta = await contaModel.getByConta(+codConta);
  console.log(isConta);
  if (!isConta) {
    return res.status(ObjCode.NOT_FOUND).json(`A conta ${codConta} não foi encontrada`);
  }
  return next();
};

export default verifyContaLogin;
