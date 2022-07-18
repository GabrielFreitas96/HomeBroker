import IAtivo from '../interfaces/IAtivo';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import connection from './connection';

const getAll = async (): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM DadosXp.Ativos';
  const [result] = await connection.execute(query);
  console.log('result', result);
  return result as IAtivo[];
};

const getById = async (id: number): Promise<IAtivo[] | []> => {
  const query = 'SELECT * FROM DadosXp.Ativos WHERE codAtivo = ?';
  const [result] = await connection.execute(query, [id]);
  console.log('result', result);
  return result as IAtivo[];
};

const getByClienteId = async (id: number): Promise<IAtivoCliente[] | []> => {
  const query = `SELECT Clientes.codCliente, ClientesAtivos.codAtivo, ClientesAtivos.qtdeClienteAtivo FROM DadosXp.Clientes
  INNER JOIN DadosXp.ClientesAtivos ON Clientes.codCliente = ClientesAtivos.codCliente
  INNER JOIN DadosXp.Ativos ON  ClientesAtivos.codAtivo = Ativos.codAtivo
  WHERE Clientes.CodCliente = ?;`;
  const [result] = await connection.execute(query, [id]);
  console.log('result', result);
  return result as IAtivoCliente[];
};
const ativoModel = { getAll, getById, getByClienteId };
export default ativoModel;
