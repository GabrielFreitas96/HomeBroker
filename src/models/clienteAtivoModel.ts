import { ResultSetHeader } from 'mysql2';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import connection from './connection';

const getByClienteIdAtivoId = async (idCliente: number, idAtivo:number)
: Promise<IAtivoCliente[] | []> => {
  const query = `SELECT Clientes.codCliente, ClientesAtivos.codAtivo,  Ativos.nameAtivo, ClientesAtivos.qtdeClienteAtivo as qtdeAtivo, Ativos.valor FROM DadosXp.Clientes
  INNER JOIN DadosXp.ClientesAtivos ON Clientes.codCliente = ClientesAtivos.codCliente
  INNER JOIN DadosXp.Ativos ON  ClientesAtivos.codAtivo = Ativos.codAtivo
  WHERE Clientes.CodCliente = ? AND Ativos.codAtivo = ?`;
  const [result] = await connection.execute(query, [idCliente, idAtivo]);
  return result as IAtivoCliente[];
};

const deleteClienteAtivo = async (idCliente: number, idAtivo:number): Promise<ResultSetHeader> => {
  const query = 'DELETE FROM DadosXp.ClientesAtivos WHERE codCliente = ? AND codAtivo = ?';
  const [result] = await connection.execute<ResultSetHeader>(query, [idCliente, idAtivo]);
  return result;
};
const updateClienteAtivo = async (idCliente: number, idAtivo:number, qtde:number)
: Promise<ResultSetHeader> => {
  const query = 'UPDATE DadosXp.ClientesAtivos SET ClientesAtivos.qtdeClienteAtivo = ? WHERE codCliente = ? AND codAtivo = ?;';
  const [result] = await connection.execute<ResultSetHeader>(query, [qtde, idCliente, idAtivo]);
  return result;
};
const createClienteAtivo = async (idCliente: number, idAtivo:number, qtde:number)
: Promise<ResultSetHeader> => {
  const query = 'INSERT INTO DadosXp.ClientesAtivos (codCliente, codAtivo, qtdeClienteAtivo) VALUE (?, ?, ?)';
  const [result] = await connection.execute<ResultSetHeader>(query, [idCliente, idAtivo, qtde]);
  return result;
};

const clienteAtivoModel = {
  getByClienteIdAtivoId, deleteClienteAtivo, updateClienteAtivo, createClienteAtivo,
};

export default clienteAtivoModel;
