import { Request, Response } from 'express';
import loginService from '../services/loginService';

const makeLogin = async (req: Request, res: Response): Promise<Response> => {
  const { codConta, password } = req.body;
  const response = await loginService.makeLogin(codConta, password);
  if (response.token) {
    const { token } = response;
    return res.status(response.status).json({ token });
  }
  const { message } = response;
  return res.status(response.status).json({ message });
};
const loginController = { makeLogin };
export default loginController;
