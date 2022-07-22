import { Router } from 'express';
import investimentoController from '../controllers/investimentoController';
import authenticationSaqueDeposito from '../middlewares/authenticationSaqueDeposito';
import investimentoComprarVender from '../middlewares/investimentoComprarVender';
import verifyCodClienteCodAtivo from '../middlewares/verifyCodClienteCodAtivo';

const investimentoRouter = Router();

investimentoRouter.put('/vender', authenticationSaqueDeposito, investimentoComprarVender, investimentoController.sellAtivos);
/** 
 * @swagger
 *  tags:
 *    name: Investimento
 *    description: Realiza operações de imvestimento, compra e venda
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Investimento:
 *       type : object
 *       required:
 *         - codCliente
 *         - codAtivo
 *         - qtdeAtivo
 *       properties:
 *         codCliente:
 *           type: number
 *         codAtivo:
 *           type: number
 *         qtdeAtivo:
 *           type: number
 *       example:
 *         codCliente: 1
 *         codAtivo: 3
 *         saldo : 2
 */
/**
 * @swagger
 *  /investimento/vender:
 *    put:
 *      tags: [Investimento]
 *      description: Realiza a venda de ativos de um cliente
 *      security:
 *        - bearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Investimento'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array 
 */
investimentoRouter.post('/comprar', authenticationSaqueDeposito, investimentoComprarVender, verifyCodClienteCodAtivo, investimentoController.buyAtivos);
export default investimentoRouter;
/**
 * @swagger
 *  /investimento/comprar:
 *    put:
 *      tags: [Investimento]
 *      description: Realiza a compra de ativos de um cliente
 *      security:
 *        - bearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Investimento'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array 
 */