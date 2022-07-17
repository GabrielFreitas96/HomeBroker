import { Router } from 'express';
import clienteController from '../controllers/clienteController';
import nameEmailNewUser from '../middlewares/addNewCliente/nameEmailNewUser';
import verifyContaExist from '../middlewares/addNewCliente/verifyContaExist';
import contaPasswordLogin from '../middlewares/contaPasswordLogin';

const clienteRouter = Router();
clienteRouter.post('/', nameEmailNewUser, contaPasswordLogin, verifyContaExist, clienteController.addNew);

export default clienteRouter;
