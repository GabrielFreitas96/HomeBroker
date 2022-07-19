import { Router } from 'express';
import investimentoController from '../controllers/investimentoController';

const investimentoRouter = Router();

investimentoRouter.put('/vender', investimentoController.sellAtivos);
export default investimentoRouter;
