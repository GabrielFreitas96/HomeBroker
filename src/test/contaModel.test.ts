// eslint-disable-next-line consistent-return
import * as sinon from 'sinon';
import { expect } from 'chai';
import connection from '../models/connection';
import contaModel from '../models/contaModel';

describe('Busca por determinada conta e verifica se existe', () => {
  describe('Retorna false quando a conta não existe', () => {
    const result = [[]];
    before(async () => {
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { connection.execute.restore(); })
    it('Espera o retorno ser false', async () => {
      const respose = await contaModel.getByConta(1);
      expect(respose).to.be.false;
    });
  });
  describe('Retorna true quando a conta existir', () => {
    const result = [[{codconta: 1, saldo: 1000}]];
    before(async () => {
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { connection.execute.restore(); })
    it('Espera o retorno ser false', async () => {
      const respose = await contaModel.getByConta(1);
      expect(respose).to.be.true;
    });
  });
});
