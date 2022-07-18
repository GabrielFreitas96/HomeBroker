import IObjResponse from '../interfaces/IObjResponse';
import contaModel from '../models/contaModel';
import ObjCode from '../utils/ObjCodes';

const getByCodCliente = async (id: number):Promise<IObjResponse> => {
  const conta = await contaModel.getByCodCliente(id);
  // console.log(conta);
  if (conta.length === 0) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `O id ${id} was not found` };
    return response;
  }
  const response = { status: ObjCode.OK, payload: conta };
  return response as IObjResponse;
};

const contaDeposito = async (codCliente: number, valor:number):Promise<IObjResponse> => {
  const cliente = await contaModel.getByCodCliente(codCliente);
  // console.log(cliente);
  if (cliente.length === 0) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `O id ${codCliente} was not found` };
    return response;
  }
  const conta = await contaModel.getContaByCodCliente(codCliente);
  // console.log('conta saldo', conta[0].saldo);
  const newSaldo = Math.round((+conta[0].saldo + +valor) * 100) / 100;
  // console.log(newSaldo);
  const { affectedRows } = await contaModel.updateSaldo(conta[0].codConta, newSaldo);
  // console.log('afect', affectedRows);
  if (affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const response = { status: ObjCode.OK, payload: [{ codCliente, saldo: newSaldo }] };
  return response as IObjResponse;
};

const contaSaque = async (codCliente: number, valor:number):Promise<IObjResponse> => {
  const cliente = await contaModel.getByCodCliente(codCliente);
  // console.log(cliente);
  if (cliente.length === 0) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `O id ${codCliente} was not found` };
    return response;
  }
  const conta = await contaModel.getContaByCodCliente(codCliente);
  console.log('conta saldo', conta[0].saldo);
  console.log('valor', valor);
  if (valor > (+conta[0].saldo)) {
    const response:IObjResponse = { status: ObjCode.INCORRECT_TYPE, message: 'Insufficient Funds' };
    return response;
  }
  const newSaldo = Math.round((+conta[0].saldo - +valor) * 100) / 100;
  // console.log(newSaldo);
  const { affectedRows } = await contaModel.updateSaldo(conta[0].codConta, newSaldo);
  // console.log('afect', affectedRows);
  if (affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const response = { status: ObjCode.OK, payload: [{ codCliente, saldo: newSaldo }] };
  return response as IObjResponse;
};

const contaService = { getByCodCliente, contaDeposito, contaSaque };
export default contaService;
