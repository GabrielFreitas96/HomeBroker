import { Request, Response } from 'express';

const makeLogin = async (req: Request, res: Response) => {
  res.status(200).json('rotaLogin');
};
const loginController = { makeLogin };
export default loginController;
