import ICliente from '../interfaces/ICliente';
import connection from './connection';

const getClient = async (contaCliente:number): Promise<ICliente[]> => {
  const query = 'SELECT * FROM DadosXp.Clientes WHERE contaCliente= ?';
  const [result] = await connection.execute(query, [contaCliente]);
  console.log('result', result);
  return result as ICliente[];
};
const clienteModel = { getClient };
export default clienteModel;
