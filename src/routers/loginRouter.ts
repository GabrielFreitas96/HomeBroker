import { Router } from 'express';
import loginController from '../controllers/loginController';
import contaPasswordLogin from '../middlewares/contaPasswordLogin';
import verifyContaLogin from '../middlewares/verifyContaLogin';

const loginRouter = Router();

loginRouter.post('/', contaPasswordLogin, verifyContaLogin, loginController.makeLogin);

export default loginRouter;
