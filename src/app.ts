import express, { Request, Response } from 'express';
import 'express-async-errors';
import middlewareEror from './middlewares/middlewareError';
import ativoRouter from './routers/ativoRouter';
import clienteRouter from './routers/clienteRouter';
import contaRouter from './routers/contaRouter';
import investimentoRouter from './routers/investimentoRouter';
import loginRouter from './routers/loginRouter';
import swaggerJSdoc from  'swagger-jsdoc';
import swaggerConfig from './docs/swaggerConfig';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
const swaggerDoc = swaggerJSdoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get('/', (req: Request, res: Response) => {
  console.log('lalalalaal');
  res.status(200).json('está funcionando');
});

app.use('/ativo', ativoRouter);
app.use('/login', loginRouter);
app.use('/cliente', clienteRouter);
app.use('/conta', contaRouter);
app.use('/investimento', investimentoRouter);
app.use(middlewareEror);

export default app;
