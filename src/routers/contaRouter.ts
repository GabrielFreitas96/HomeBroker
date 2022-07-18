import { Router } from 'express';
import contaController from '../controllers/contaController';
import depositoSaque from '../middlewares/depositoSaque';

const contaRouter = Router();
contaRouter.put('/deposito', contaController.contaDeposito);
contaRouter.put('/saque', depositoSaque, contaController.contaSaque);
contaRouter.get('/:id', depositoSaque, contaController.getByCodCliente);
export default contaRouter;
