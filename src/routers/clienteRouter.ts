import { Router } from 'express';
import clienteController from '../controllers/clienteController';
import verifyContaExist from '../middlewares/addNewCliente/verifyContaExist';
import contaPasswordLogin from '../middlewares/contaPasswordLogin';

const clienteRouter = Router();
clienteRouter.post('/', contaPasswordLogin, verifyContaExist, clienteController.addNew);

export default clienteRouter;
