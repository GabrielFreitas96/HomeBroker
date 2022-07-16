import IAtivo from '../interfaces/IAtivo';
import ativoModel from '../models/ativoModel';

const getAll = async (): Promise<IAtivo[]> => {
  const ativos = await ativoModel.getAll();
  return ativos;
};
const ativoService = { getAll };
export default ativoService;
