import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log('lalalalaal');
  res.status(200).json('está funcionando');
});

export default app;
