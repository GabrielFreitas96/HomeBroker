import { Request, Response } from 'express';
import investimentoService from '../services/investimentoService';

const sellAtivos = async (req: Request, res: Response) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  console.log('body', codCliente, codAtivo, qtdeAtivo);
  const response = await investimentoService.sellAtivos(+codCliente, +codAtivo, +qtdeAtivo);
  if (response.payload) {
    return res.status(response.status).json(response.payload);
  }
  const { message } = response;
  return res.status(response.status).json({ message });
  // return res.status(200).json({ message: 'lalalalaal' });
};

const investimentoController = { sellAtivos };
export default investimentoController;
