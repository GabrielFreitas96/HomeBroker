import express, { Request, Response } from 'express';
import ativoRouter from './routers/ativoRouter';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log('lalalalaal');
  res.status(200).json('está funcionando');
});

app.use('/ativo', ativoRouter);

export default app;
