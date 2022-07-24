import { ResultSetHeader } from 'mysql2';
import IConta from '../interfaces/IConta';
import IContaSaldo from '../interfaces/ISaldoConta';
import connection from './connection';

const getByConta = async (conta: number): Promise<boolean> => {
  const query = 'SELECT * FROM DadosXp.Contas WHERE codConta = ?';
  const [result] = await connection.execute(query, [conta]);
  const newresult = result as IConta[];
  if (newresult.length === 0) {
    return false;
  }
  return true;
};

const addConta = async (conta: number):Promise<ResultSetHeader> => {
  const query = 'INSERT INTO DadosXp.Contas (codConta, saldo) VALUE (?, ?);';
  const [result] = await connection.execute<ResultSetHeader>(query, [conta, 0]);
  return result;
};

const getByCodCliente = async (codCliente: number): Promise<IContaSaldo[]> => {
  const query = `SELECT Clientes.codCliente, Contas.saldo FROM DadosXp.Clientes
  INNER JOIN DadosXp.Contas ON Clientes.contaCliente = Contas.codConta
  WHERE Clientes.codCliente = ?`;
  const [result] = await connection.execute(query, [codCliente]);
  return result as IContaSaldo[];
};
const getContaByCodCliente = async (codCliente: number): Promise<IConta[]> => {
  const query = `SELECT Contas.codConta, Contas.saldo FROM DadosXp.Clientes
  INNER JOIN DadosXp.Contas ON Clientes.contaCliente = Contas.codConta
  WHERE Clientes.codCliente = ?`;
  const [result] = await connection.execute(query, [codCliente]);
  return result as IConta[];
};
const updateSaldo = async (codConta: number, saldo: number): Promise<ResultSetHeader> => {
  const query = 'UPDATE DadosXp.Contas SET Contas.saldo = ? WHERE codConta = ?';
  const [result] = await connection.execute<ResultSetHeader>(query, [saldo, codConta]);
  return result;
};

const contaModel = {
  getByConta, addConta, getByCodCliente, getContaByCodCliente, updateSaldo,
};
export default contaModel;
