import ICliente from '../interfaces/ICliente';
import IObjResponse from '../interfaces/IObjResponse';
import clienteModel from '../models/clienteModel';
import contaModel from '../models/contaModel';
import { generateCryptPassword } from '../utils/bcrypt';
import ObjCode from '../utils/ObjCodes';

const addCliente = async (newcliente: ICliente):Promise<IObjResponse> => {
  const { affectedRows } = await contaModel.addConta(+newcliente.contaCliente);
  if (affectedRows !== 1) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const passwordHash = generateCryptPassword(newcliente.passwordCliente);
  const { insertId } = await clienteModel.addUser(newcliente, passwordHash);
  if (!insertId) {
    const response:IObjResponse = { status: ObjCode.GENERAL, message: 'Unexpected Error' };
    return response;
  }
  const { nameCliente, emailCliente, contaCliente } = newcliente;
  const payload = [{
    codCliente: insertId, nameCliente, emailCliente, contaCliente,
  }];
  const response:IObjResponse = { status: ObjCode.CREATED, payload };
  return response;
};
const clienteService = { addCliente };
export default clienteService;
