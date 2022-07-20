import { Router } from 'express';
import investimentoController from '../controllers/investimentoController';
import authenticationSaqueDeposito from '../middlewares/authenticationSaqueDeposito';
import investimentoComprarVender from '../middlewares/investimentoComprarVender';
import verifyCodClienteCodAtivo from '../middlewares/verifyCodClienteCodAtivo';

const investimentoRouter = Router();

investimentoRouter.put('/vender', authenticationSaqueDeposito, investimentoComprarVender, investimentoController.sellAtivos);
investimentoRouter.post('/comprar', authenticationSaqueDeposito, investimentoComprarVender, verifyCodClienteCodAtivo, investimentoController.buyAtivos);
export default investimentoRouter;
