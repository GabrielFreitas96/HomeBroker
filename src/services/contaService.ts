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

const contaService = { getByCodCliente };
export default contaService;
