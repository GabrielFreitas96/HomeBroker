import IAtivo from '../interfaces/IAtivo';
import connection from './connection';

const getAll = async (): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM DadosXp.Ativos';
  const [result] = await connection.execute(query);
  console.log('result', result);
  return result as IAtivo[];
};

const ativoModel = { getAll };
export default ativoModel;
