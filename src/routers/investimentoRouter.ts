import { Router } from 'express';
import investimentoController from '../controllers/investimentoController';
import investimentoComprarVender from '../middlewares/investimentoComprarVender';

const investimentoRouter = Router();

investimentoRouter.put('/vender', investimentoComprarVender, investimentoController.sellAtivos);
export default investimentoRouter;
