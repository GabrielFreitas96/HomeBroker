import { Router } from 'express';
import contaController from '../controllers/contaController';
import authenticationConta from '../middlewares/authenticationConta';
import authenticationSaqueDeposito from '../middlewares/authenticationSaqueDeposito';
import depositoSaque from '../middlewares/depositoSaque';

const contaRouter = Router();
contaRouter.put('/deposito', authenticationSaqueDeposito, depositoSaque, contaController.contaDeposito);
contaRouter.put('/saque', authenticationSaqueDeposito, depositoSaque, contaController.contaSaque);
contaRouter.get('/:id', authenticationConta, contaController.getByCodCliente);
export default contaRouter;
