import { Router } from 'express';
import loginController from '../controllers/loginController';
import contaPasswordLogin from '../middlewares/contaPasswordLogin';
import verifyContaLogin from '../middlewares/verifyContaLogin';

const loginRouter = Router();

loginRouter.post('/', contaPasswordLogin, verifyContaLogin, loginController.makeLogin);
/** 
 * @swagger
 *  tags:
 *    name: Login
 *    description: Realiza o login do Cliente, gerando o Token
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type : object
 *       required:
 *         - contaCliente
 *         - passwordCliente
 *       properties:
 *         contaCliente:
 *           type: number
 *         passwordCliente:
 *           type: string
 *       example:
 *         contaCliente: 12345
 *         passwordCliente: '123456'
 */
/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Login]
 *      description: Realiza a venda de ativos de um cliente 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Login'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 */
export default loginRouter;
