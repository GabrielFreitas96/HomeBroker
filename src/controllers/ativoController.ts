import { Request, Response } from 'express';
import ativoService from '../services/ativoService';

const getAll = async (req: Request, res: Response) => {
  const response = await ativoService.getAll();
  res.status(200).json(response);
};

const ativoController = { getAll };
export default ativoController;
