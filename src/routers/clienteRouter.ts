import { Router } from 'express';
import clienteController from '../controllers/clienteController';
import nameEmailNewUser from '../middlewares/addNewCliente/nameEmailNewUser';
import verifyContaExist from '../middlewares/addNewCliente/verifyContaExist';
import contaPasswordLogin from '../middlewares/contaPasswordLogin';

const clienteRouter = Router();
clienteRouter.post('/', nameEmailNewUser, contaPasswordLogin, verifyContaExist, clienteController.addNew);
/** 
 * @swagger
 *  tags:
 *    name: Cliente
 *    description: Endpoits para cadastro de Cliente
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type : object
 *       required:
 *         - nameCliente
 *         - emailCliente
 *         - passwordCliente
 *         - contaCliente 
 *       properties:
 *         nameCliente:
 *           type: string
 *         emailCliente:
 *           type: string
 *         passwordCliente:
 *           type: string
 *         contaCliente:
 *           type: number 
 *       example:
 *         nameCliente: "Fernando Ribeiro"
 *         emailCliente: "fernando@outlook.com"
 *         passwordCliente : '123456'
 *         contaCliente: 78910
 */
/**
 * @swagger
 *  /cliente:
 *    post:
 *      tags: [Cliente]
 *      description: Cadastra um novo Cliente
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Cliente'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/Ativo'  
 */
export default clienteRouter;
