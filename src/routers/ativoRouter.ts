import { Router } from 'express';
import ativoController from '../controllers/ativoController';
import authenticationConta from '../middlewares/authenticationConta';

const ativoRouter = Router();

ativoRouter.get('/', ativoController.getAll);
ativoRouter.get('/cliente/:id', authenticationConta, ativoController.getByClienteId);
ativoRouter.get('/:id', ativoController.getById);

export default ativoRouter;
