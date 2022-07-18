import { Router } from 'express';
import contaController from '../controllers/contaController';

const contaRouter = Router();
contaRouter.put('/deposito', contaController.contaDeposito);
contaRouter.get('/:id', contaController.getByCodCliente);
export default contaRouter;
