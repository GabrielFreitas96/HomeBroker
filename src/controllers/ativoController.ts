import { Request, Response } from 'express';
import ativoService from '../services/ativoService';

const getAll = async (req: Request, res: Response) => {
  const response = await ativoService.getAll();
  res.status(response.status).json(response.payload);
};
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id', id);
  const response = await ativoService.getById(+id);
  res.status(response.status).json(response.payload || response.message);
};

const ativoController = { getAll, getById };
export default ativoController;
