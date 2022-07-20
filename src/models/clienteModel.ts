import { ResultSetHeader } from 'mysql2';
import ICliente from '../interfaces/ICliente';
import connection from './connection';

const getClient = async (contaCliente:number): Promise<ICliente[]> => {
  const query = 'SELECT * FROM DadosXp.Clientes WHERE contaCliente= ?';
  const [result] = await connection.execute(query, [contaCliente]);
  console.log('result', result);
  return result as ICliente[];
};

const getClientById = async (idCliente:number): Promise<ICliente[]> => {
  const query = 'SELECT * FROM DadosXp.Clientes WHERE codCliente= ?';
  const [result] = await connection.execute(query, [idCliente]);
  console.log('getClientById', result);
  return result as ICliente[];
};

const addUser = async (cliente: Omit<ICliente, 'passwordCliente'>, hash: string):Promise<ResultSetHeader> => {
  const query = 'INSERT INTO DadosXp.Clientes (nameCliente, emailCliente, passwordCliente, contaCliente) VALUE (?, ?, ?, ?)';
  const {
    nameCliente, emailCliente, contaCliente,
  } = cliente;
  console.log('password no model', hash);
  const [result] = await connection
    .execute<ResultSetHeader>(query, [nameCliente, emailCliente, hash, contaCliente]);
  return result;
};
const clienteModel = { getClient, addUser, getClientById };
export default clienteModel;
