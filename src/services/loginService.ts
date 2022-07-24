import IObjResponse from '../interfaces/IObjResponse';
import clienteModel from '../models/clienteModel';
import { comparePassword } from '../utils/bcrypt';
import generateToken from '../utils/createToken';
import ObjCode from '../utils/ObjCodes';

const makeLogin = async (contaCliente:number, passwordCliente:string): Promise<IObjResponse> => {
  const cliente = await clienteModel.getClient(contaCliente);
  const dbPAssword = cliente[0].passwordCliente;
  const isPasswordValid = comparePassword(passwordCliente, dbPAssword);
  if (isPasswordValid) {
    const token = generateToken(cliente[0]);
    const response = { status: ObjCode.OK, token };
    return response as IObjResponse;
  }
  const response = { status: ObjCode.UNAUTHORIZED, message: 'Invalid password' };
  return response as IObjResponse;
};
const loginService = { makeLogin };
export default loginService;
