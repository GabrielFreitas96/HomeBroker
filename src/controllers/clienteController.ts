import { Request, Response } from 'express';

const addNew = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Clientes' });
};

const clienteController = { addNew };
export default clienteController;
