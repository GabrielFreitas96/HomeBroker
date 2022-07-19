import express, { Request, Response } from 'express';
import ativoRouter from './routers/ativoRouter';
import clienteRouter from './routers/clienteRouter';
import contaRouter from './routers/contaRouter';
import investimentoRouter from './routers/investimentoRouter';
import loginRouter from './routers/loginRouter';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log('lalalalaal');
  res.status(200).json('está funcionando');
});

app.use('/ativo', ativoRouter);
app.use('/login', loginRouter);
app.use('/cliente', clienteRouter);
app.use('/conta', contaRouter);
app.use('/investimento', investimentoRouter);

export default app;
