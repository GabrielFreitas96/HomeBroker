import IObjResponse from '../interfaces/IObjResponse';
import ativoModel from '../models/ativoModel';
// import ativoModel from '../models/ativoModel';
import clienteAtivoModel from '../models/clienteAtivoModel';
import clienteModel from '../models/clienteModel';
import contaModel from '../models/contaModel';
import ObjCode from '../utils/ObjCodes';

const sellAtivos = async (codCliente: number, codAtivo: number, qtdeAtivo:number):
 Promise<IObjResponse> => {
  const findClienteAtivo = await clienteAtivoModel.getByClienteIdAtivoId(codCliente, codAtivo);
  if (findClienteAtivo.length === 0) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `O id of client ${codCliente} or id of asset was not found` };
    return response;
  }
  if (findClienteAtivo[0].qtdeAtivo < qtdeAtivo) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `"qtdeAtivo" ${qtdeAtivo} is invalid for sell` };
    return response;
  }
  const [{ codConta, saldo }] = await contaModel.getContaByCodCliente(codCliente);
  const [{ qtdeAtivo: qtdeAtivoCorretora }] = await ativoModel.getById(codAtivo);
  console.log('ativo disponivel na corretora', qtdeAtivoCorretora);
  console.log('conta Cliente', codConta, saldo);
  const saldoOperation = qtdeAtivo * findClienteAtivo[0].valor;
  const newSaldo = Math.round((+saldo + saldoOperation) * 100) / 100;
  const newqtdeCorretora = +qtdeAtivoCorretora + qtdeAtivo;
  console.log('novo saldo', newSaldo);
  console.log('saldo a ser adicionado na carteira', saldoOperation);
  console.log('nova quantidade na corretora', newqtdeCorretora);
  if (findClienteAtivo[0].qtdeAtivo === qtdeAtivo) {
    const { affectedRows } = await contaModel.updateSaldo(codConta, newSaldo);
    if (affectedRows !== 1) {
      const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
      return response;
    }
    const deleted = await clienteAtivoModel.deleteClienteAtivo(codCliente, codAtivo);
    if (deleted.affectedRows !== 1) {
      const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
      return response;
    }
    const updateAtivo = await ativoModel.updateAtivoQtde(codAtivo, newqtdeCorretora);
    if (updateAtivo.affectedRows !== 1) {
      const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
      return response;
    }
    const response:IObjResponse = { status: ObjCode.OK, payload: [{}] };
    return response;
  }
  const { affectedRows } = await contaModel.updateSaldo(codConta, newSaldo);
  if (affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const updated = await clienteAtivoModel.updateClienteAtivo(codCliente, codAtivo, qtdeAtivo);
  if (updated.affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const updateAtivo = await ativoModel.updateAtivoQtde(codAtivo, newqtdeCorretora);
  if (updateAtivo.affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const response:IObjResponse = { status: ObjCode.OK, payload: [{}] };
  return response;
};

const buyAtivos = async (codCliente: number, codAtivo: number, qtdeAtivo:number):
 Promise<IObjResponse> => {
  const findClienteAtivo = await clienteAtivoModel.getByClienteIdAtivoId(codCliente, codAtivo);
  // if (findClienteAtivo.length === 0) {
  // const response:IObjResponse = {  status: ObjCode.NOT_FOUND,
  // message: `O id of client ${codCliente} or id of asset was not found` };
  //   return response;
  // }
  const ativoTarget = await ativoModel.getById(+codAtivo);
  if (ativoTarget[0].qtdeAtivo <= qtdeAtivo) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `"qtdeAtivo" ${qtdeAtivo} is invalid to buy` };
    return response;
  }
  const [{ codConta, saldo }] = await contaModel.getContaByCodCliente(codCliente);
  const [{ qtdeAtivo: qtdeAtivoCorretora, valor }] = await ativoModel.getById(codAtivo);
  console.log('ativo disponivel na corretora', qtdeAtivoCorretora);
  console.log('conta Cliente', codConta, saldo);
  const saldoOperation = qtdeAtivo * valor;
  if (saldoOperation > saldo) {
    const response:IObjResponse = { status: ObjCode.INCORRECT_TYPE, message: 'Insufficient Funds' };
    return response;
  }
  const newSaldo = Math.round((+saldo - saldoOperation) * 100) / 100;
  const newQtdeCorretora = +qtdeAtivoCorretora - qtdeAtivo;
  const newQtdeCliente = findClienteAtivo[0].qtdeAtivo + qtdeAtivo;
  const { affectedRows } = await contaModel.updateSaldo(codConta, newSaldo);
  if (affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const updated = await clienteAtivoModel.updateClienteAtivo(codCliente, codAtivo, newQtdeCliente);
  if (updated.affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const updateAtivo = await ativoModel.updateAtivoQtde(codAtivo, newQtdeCorretora);
  if (updateAtivo.affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const response:IObjResponse = { status: ObjCode.OK, payload: [{ }] };
  return response;
};

const investimentoService = { sellAtivos, buyAtivos };
export default investimentoService;
