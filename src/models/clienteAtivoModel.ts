import { ResultSetHeader } from 'mysql2';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import connection from './connection';

const getByClienteIdAtivoId = async (idCliente: number, idAtivo:number)
: Promise<IAtivoCliente[] | []> => {
  console.log('idCliente', idCliente, idAtivo);
  const query = `SELECT Clientes.codCliente, ClientesAtivos.codAtivo,  Ativos.nameAtivo, ClientesAtivos.qtdeClienteAtivo as qtdeAtivo, Ativos.valor FROM DadosXp.Clientes
  INNER JOIN DadosXp.ClientesAtivos ON Clientes.codCliente = ClientesAtivos.codCliente
  INNER JOIN DadosXp.Ativos ON  ClientesAtivos.codAtivo = Ativos.codAtivo
  WHERE Clientes.CodCliente = ? AND Ativos.codAtivo = ?`;
  const [result] = await connection.execute(query, [idCliente, idAtivo]);
  console.log('getByClienteIdAtivoId', result);
  return result as IAtivoCliente[];
};

const deleteClienteAtivo = async (idCliente: number, idAtivo:number): Promise<ResultSetHeader> => {
  const query = 'DELETE FROM DadosXp.ClientesAtivos WHERE codCliente = ? AND codAtivo = ?';
  const [result] = await connection.execute<ResultSetHeader>(query, [idCliente, idAtivo]);
  console.log('result', result);
  return result;
};
const updateClienteAtivo = async (idCliente: number, idAtivo:number, qtde:number)
: Promise<ResultSetHeader> => {
  const query = 'UPDATE DadosXp.ClientesAtivos SET ClientesAtivos.qtdeClienteAtivo = ? WHERE codCliente = ? AND codAtivo = ?;';
  const [result] = await connection.execute<ResultSetHeader>(query, [qtde, idCliente, idAtivo]);
  console.log('result', result);
  return result;
};

const clienteAtivoModel = { getByClienteIdAtivoId, deleteClienteAtivo, updateClienteAtivo };

export default clienteAtivoModel;
