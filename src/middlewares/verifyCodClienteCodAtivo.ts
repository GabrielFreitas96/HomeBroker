import { NextFunction, Request, Response } from 'express';
import ativoModel from '../models/ativoModel';
import clienteAtivoModel from '../models/clienteAtivoModel';
import clienteModel from '../models/clienteModel';
import ObjCode from '../utils/ObjCodes';

const verifyCodClienteCodAtivo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { codCliente, codAtivo } = req.body;
  // console.log('contaCliente', contaCliente);
  const clienteExist = await clienteModel.getClientById(+codCliente);
  if (clienteExist.length === 0) {
    return res.status(ObjCode.NOT_FOUND).json({ message: `O id of client ${codCliente} was not found` });
  }
  const ativoExist = await ativoModel.getById(+codAtivo);
  if (ativoExist.length === 0) {
    return res.status(ObjCode.NOT_FOUND).json({ message: `O id of ativo ${codAtivo} was not found` });
  }
  const findClienteAtivo = await clienteAtivoModel.getByClienteIdAtivoId(codCliente, codAtivo);
  if (findClienteAtivo.length > 0) {
    console.log('passou pleo findClienteAtivo');
    return next();
  }
  const { affectedRows } = await clienteAtivoModel.createClienteAtivo(codCliente, codAtivo, 0);
  if (affectedRows !== 1) {
    return res.status(ObjCode.GENERAL).json( {message: 'Unexpected Error' });
  }
  return next();
};

export default verifyCodClienteCodAtivo;
