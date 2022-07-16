import { Router } from 'express';
import ativoController from '../controllers/ativoController';

const ativoRouter = Router();

ativoRouter.get('/', ativoController.getAll);

export default ativoRouter;
