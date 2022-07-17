import { ResultSetHeader } from 'mysql2';
import ICliente from '../interfaces/ICliente';
import connection from './connection';

const getClient = async (contaCliente:number): Promise<ICliente[]> => {
  const query = 'SELECT * FROM DadosXp.Clientes WHERE contaCliente= ?';
  const [result] = await connection.execute(query, [contaCliente]);
  console.log('result', result);
  return result as ICliente[];
};

const addUser = async (cliente: ICliente):Promise<ResultSetHeader> => {
  const query = 'INSERT INTO DadosXp.Clientes (nameCliente, emailCliente, passwordCliente, contaCliente) VALUE (?, ?, ?, ?)';
  const {
    nameCliente, emailCliente, passwordCliente, contaCliente,
  } = cliente;
  const [result] = await connection
    .execute<ResultSetHeader>(query, [nameCliente, emailCliente, passwordCliente, contaCliente]);
  return result;
};
const clienteModel = { getClient, addUser };
export default clienteModel;
