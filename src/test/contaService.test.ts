import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import contaModel from '../models/contaModel';
import contaService from '../services/contaService'
import IContaSaldo from '../interfaces/ISaldoConta';
import IObjResponse from '../interfaces/IObjResponse';
import ObjCode from '../utils/ObjCodes';

describe('Busa uma conta pelo id do Cliente', () => {
  describe('Quando o id é valido e a conta é encontrada', () => {
    let stubeResult : sinon.SinonStub;
    const result: IContaSaldo[] = [{ codCliente: 1, saldo:10000 }];
    const response: IObjResponse= { status: ObjCode.OK, payload: result };
    before(async () => {
      // spiedResult = sinon.spy(contaModel, 'getByCodCliente');
      stubeResult = sinon.stub(contaModel, 'getByCodCliente').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um response com as chaves status e payload ', async () => {
      const service = await contaService.getByCodCliente(1);
      console.log('service', service);
      console.log('response', response);
      expect(service).to.be.not.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','payload')
      expect(service).to.be.deep.equal(response);
    });
  });
  describe('Quando o não é valido e a conta  não é encontrada', () => {
    let stubeResult : sinon.SinonStub;
    const result: IContaSaldo[] = [];
    const response: IObjResponse= { status: ObjCode.NOT_FOUND,  message: `O id 10 was not found` };
    before(async () => {
      // spiedResult = sinon.spy(contaModel, 'getByCodCliente');
      stubeResult = sinon.stub(contaModel, 'getByCodCliente').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um response com as chaves status e message ', async () => {
      const service = await contaService.getByCodCliente(10);
      console.log('service', service);
      console.log('response', response);
      expect(service).to.not.be.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','message')
      expect(service).to.be.deep.equal(response);
    });
  });
});