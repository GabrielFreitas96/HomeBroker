import { Request, Response } from 'express';
import contaService from '../services/contaService';

const getByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  console.log('id', id);
  const response = await contaService.getByCodCliente(+id);
  if (response.payload) {
    return res.status(response.status).json(response.payload);
  }
  const { message } = response;
  return res.status(response.status).json({ message });
};

const contaDeposito = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente, valor } = req.body;
  const response = await contaService.contaDeposito(+codCliente, +valor);
  const { message } = response;
  if (response.payload) {
    return res.status(response.status).json(response.payload);
  }
  return res.status(response.status).json({ message });
};
const contaController = { getByCodCliente, contaDeposito };
export default contaController;
