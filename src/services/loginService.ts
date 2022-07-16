import IObjResponse from '../interfaces/IObjResponse';
import clienteModel from '../models/clienteModel';
import { comparePassword } from '../utils/bcrypt';
import generateToken from '../utils/createToken';
import ObjCode from '../utils/ObjCodes';

const makeLogin = async (codConta:number, password:string): Promise<IObjResponse> => {
  const cliente = await clienteModel.getClient(codConta);
  console.log('Cliente', cliente, password);
  // const hash = generateCryptPassword(password);
  // const teste = '$2b$05$/m2wUGoaMKtVanarYXPN3ewV2.DQNPT1hoZaoc/2YvuCd3U70387O';
  const dbPAssword = cliente[0].passwordCliente;
  const isPasswordValid = comparePassword(password, dbPAssword);
  if (isPasswordValid) {
    const token = generateToken(cliente[0]);
    const response = { status: ObjCode.OK, token };
    return response as IObjResponse;
  }
  // console.log('resultado da comparação', compareResult);
  // console.log('password', hash);
  const response = { status: ObjCode.UNAUTHORIZED, message: 'Invalid password' };
  return response as IObjResponse;
};
const loginService = { makeLogin };
export default loginService;
