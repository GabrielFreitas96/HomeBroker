import IAtivo from '../interfaces/IAtivo';
import IObjResponse from '../interfaces/IObjResponse';
import ativoModel from '../models/ativoModel';
import ObjCode from '../utils/ObjCodes';

const getAll = async (): Promise<IObjResponse> => {
  const ativos = await ativoModel.getAll();
  const response = { status: ObjCode.OK, payload: ativos };
  return response as IObjResponse;
};

const getById = async (id: number): Promise<IObjResponse > => {
  const ativos = await ativoModel.getById(id);
  if (ativos.length === 0) {
    const response:IObjResponse = { status: ObjCode.NOT_FOUND, message: `O id ${id} não foi encontrado` };
    return response;
  }
  const response = { status: ObjCode.OK, payload: ativos };
  return response as IObjResponse;
};

const ativoService = { getAll, getById };
export default ativoService;
