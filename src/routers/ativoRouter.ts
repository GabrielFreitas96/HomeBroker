import { Router } from 'express';
import ativoController from '../controllers/ativoController';

const ativoRouter = Router();

ativoRouter.get('/', ativoController.getAll);
ativoRouter.get('/:id', ativoController.getById);

export default ativoRouter;
