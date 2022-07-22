import { Router } from 'express';
import ativoController from '../controllers/ativoController';
import authenticationConta from '../middlewares/authenticationConta';

const ativoRouter = Router();

ativoRouter.get('/', ativoController.getAll);
/** 
 * @swagger
 *  tags:
 *    name: Ativo
 *    description: Endpoits de ativos
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Ativo:
 *       type : object
 *       required:
 *         - codAtivo
 *         - nameAtivo
 *         - qtdeAtivo
 *         - valor
 *       properties:
 *         codAtivo:
 *           type: number
 *         nameAtivo:
 *           type: string
 *         qtdeAtivo:
 *           type: number
 *         valor:
 *           type: number
 *       example:
 *         codAtivo: 1
 *         nomeAtivo: 'QUAT'
 *         qtdeAtivo: 900
 *         valor : 10.00
 */
/**
 * @swagger
 *  /ativo:
 *    get:
 *      tags: [Ativo]
 *      description: Retorna uma lista de  todos os ativos
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Ativo'  
 */
ativoRouter.get('/cliente/:id', authenticationConta, ativoController.getByClienteId);
/** 
 * @swagger
 *  tags:
 *    name: AtivoCliente
 *    description: Endpoits de ativos de cada cliente pelo id
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     AtivoCliente:
 *       type : object
 *       required:
 *         - codCliente
 *         - codAtivo
 *         - nameAtivo
 *         - qtdeClienteAtivo
 *         - valor
 *       properties:
 *         codCliente:
 *           type: number
 *         codAtivo:
 *           type: number
 *         nameAtivo:
 *           type: string
 *         qtdeClienteAtivo:
 *           type: number
 *         valor:
 *           type: number
 *       example:
 *         codCliente: 1
 *         codAtivo: 1
 *         nomeAtivo: 'QUAT'
 *         qtdeClienteAtivo: 10
 *         valor : 10.00
 */
/**
 * @swagger
 *  /ativo/cliente/{id}:
 *    get:
 *      tags: [AtivoCliente]
 *      description: Retorna os ativos  de um cliente por id do cliente
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
 *                  $ref: '#components/schemas/AtivoCliente'  
 */
ativoRouter.get('/:id', ativoController.getById);
/**
 * @swagger
 *  /ativo/{id}:
 *    get:
 *      tags: [Ativo]
 *      description: Retorna um ativo por id
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
 *                  $ref: '#components/schemas/Ativo'  
 */


export default ativoRouter;
