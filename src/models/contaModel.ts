import { ResultSetHeader } from 'mysql2';
import IConta from '../interfaces/IConta';
import connection from './connection';

const getByConta = async (conta: number): Promise<boolean> => {
  const query = 'SELECT * FROM DadosXp.Contas WHERE codConta = ?';
  const [result] = await connection.execute(query, [conta]);
  console.log(result);
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

const contaModel = { getByConta, addConta };
export default contaModel;
