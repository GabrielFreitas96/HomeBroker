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

const contaModel = { getByConta };
export default contaModel;
