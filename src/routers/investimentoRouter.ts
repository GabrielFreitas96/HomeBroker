import { Router } from 'express';
import investimentoController from '../controllers/investimentoController';
import authenticationSaqueDeposito from '../middlewares/authenticationSaqueDeposito';
import investimentoComprarVender from '../middlewares/investimentoComprarVender';

const investimentoRouter = Router();

investimentoRouter.put('/vender', authenticationSaqueDeposito, investimentoComprarVender, investimentoController.sellAtivos);
investimentoRouter.post('/comprar', authenticationSaqueDeposito, investimentoComprarVender, investimentoController.buyAtivos);
export default investimentoRouter;
