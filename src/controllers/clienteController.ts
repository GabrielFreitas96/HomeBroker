import { Request, Response } from 'express';
import ICliente from '../interfaces/ICliente';
import clienteService from '../services/clienteService';

const addNew = async (req: Request, res: Response): Promise<Response> => {
  const newCliente: ICliente = req.body;
  console.log('newCliente', newCliente);
  const response = await clienteService.addCliente(newCliente);
  if (response.message) {
    const { message } = response;
    return res.status(response.status).json({ message });
  }
  return res.status(response.status).json(response.payload);
};

const clienteController = { addNew };
export default clienteController;
