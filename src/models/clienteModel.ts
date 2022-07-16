import ICliente from '../interfaces/ICliente';
import connection from './connection';

const getClient = async (codConta:number): Promise<ICliente[]> => {
  const query = 'SELECT * FROM DadosXp.Clientes WHERE contaCliente= ?';
  const [result] = await connection.execute(query, [codConta]);
  console.log('result', result);
  return result as ICliente[];
};
const clienteModel = { getClient };
export default clienteModel;
