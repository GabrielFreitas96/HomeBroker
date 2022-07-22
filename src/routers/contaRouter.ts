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
 *              $ref: '#components/schemas/Conta'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Conta'  
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
 *              $ref: '#components/schemas/Conta'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Conta'  
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
 *     Conta:
 *       type : object
 *       required:
 *         - codCliente
 *         - saldo
 *       properties:
 *         codCliente:
 *           type: number
 *         saldo:
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
 *                  $ref: '#components/schemas/Conta'  
 */
export default contaRouter;
