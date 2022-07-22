import { Router } from 'express';
import contaController from '../controllers/contaController';
import authenticationConta from '../middlewares/authenticationConta';
import authenticationSaqueDeposito from '../middlewares/authenticationSaqueDeposito';
import depositoSaque from '../middlewares/depositoSaque';

const contaRouter = Router();
contaRouter.put('/deposito', authenticationSaqueDeposito, depositoSaque, contaController.contaDeposito);
/**
 * @swagger
 *  /conta/deposito:
 *    put:
 *      tags: [Conta]
 *      description: Realiza um deposito na conta do cliente
 *      security:
 *        - bearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Valor'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Saldo'  
 */
contaRouter.put('/saque', authenticationSaqueDeposito, depositoSaque, contaController.contaSaque);
/**
 * @swagger
 *  /conta/saque:
 *    put:
 *      tags: [Conta]
 *      description: Realiza um saque na conta do cliente
 *      security:
 *        - bearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Valor'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Saldo'  
 */
contaRouter.get('/:id', authenticationConta, contaController.getByCodCliente);
/** 
 * @swagger
 *  tags:
 *    name: Conta
 *    description: Realiza operações em uma conta
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Valor:
 *       type : object
 *       required:
 *         - codCliente
 *         - valor
 *       properties:
 *         codCliente:
 *           type: number
 *         valor:
 *           type: number
 *       example:
 *         codCliente: 1
 *         valor : 10000.00
 */
/**
 * @swagger
 * components:
 *   schemas:
 *    Saldo:
 *       type : object
 *       required:
 *         - codCliente
 *         - saldo
 *       properties:
 *         codCliente:
 *           type: number
 *         saldo:
 *           type: number
 *       example:
 *         codCliente: 1
 *         saldo : 10000.00
 */
/**
 * @swagger
 *  /conta/{id}:
 *    get:
 *      tags: [Conta]
 *      description: Retorna o saldo de um cliente por id
 *      security:
 *        - bearerAuth: []  
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Saldo'  
 */
export default contaRouter;
