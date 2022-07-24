import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import contaModel from '../models/contaModel';
import contaService from '../services/contaService'
import IContaSaldo from '../interfaces/ISaldoConta';
import IObjResponse from '../interfaces/IObjResponse';
import ObjCode from '../utils/ObjCodes';
import IConta from '../interfaces/IConta';

describe('Busa uma conta pelo id do Cliente', () => {
  describe('Quando o id(codConta) é valido e a conta é encontrada', () => {
    let stubeResult : sinon.SinonStub;
    const result: IContaSaldo[] = [{ codCliente: 1, saldo:10000 }];
    const response: IObjResponse= { status: ObjCode.OK, payload: result };
    before(async () => {
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
  describe('Quando o codConta não é valido e a conta  não é encontrada', () => {
    let stubeResult : sinon.SinonStub;
    const result: IContaSaldo[] = [];
    const response: IObjResponse= { status: ObjCode.NOT_FOUND,  message: `O id 10 was not found` };
    before(async () => {
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

describe('Realiza o deposito em uma conta ', () => {
  describe('Quando o deposito é realizado com sucesso', () => {
    let stubeGetByCodCliente : sinon.SinonStub;
    let stubeGetContaByCodCliente: sinon.SinonStub;
    let stubeUpdateSaldo : sinon.SinonStub;
    const resultstubeGetContaByCodCliente : IConta[] = [{ codConta: 12345, saldo : 10000 }];
    const resultGetByCodCliente : IContaSaldo[] = [{ codCliente: 1, saldo:10000 }];
    const resultstubeUpdateSaldo: any = { affectedRows: 1 };
    const result = [{ codCliente: 1, saldo:10100 }]
    const response: IObjResponse= { status: ObjCode.OK, payload: result };
    before(async () => {
      stubeGetByCodCliente = sinon.stub(contaModel, 'getByCodCliente').resolves(resultGetByCodCliente);
      stubeGetContaByCodCliente = sinon.stub(contaModel, 'getContaByCodCliente').resolves(resultstubeGetContaByCodCliente);
      stubeUpdateSaldo = sinon.stub(contaModel, 'updateSaldo').resolves(resultstubeUpdateSaldo);
    });
    after(() => { stubeGetByCodCliente.restore(); stubeGetContaByCodCliente.restore(); stubeUpdateSaldo.restore(); })
    it('Espera o retorno ser um response com as chaves status e payload ', async () => {
      const service = await contaService.contaDeposito(1, 100);
      console.log('service', service);
      console.log('response', response);
      expect(service).to.be.not.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','payload')
      expect(service).to.be.deep.equal(response);
    });
  });

  describe('Quando o deposito não  é realizado com sucesso, codCliente inválido', () => {
    let stubeGetByCodCliente : sinon.SinonStub;
    const resultGetByCodCliente : any = [];
    const response: IObjResponse= { status: ObjCode.NOT_FOUND,  message: `O id 10 was not found` };
    before(async () => {
      stubeGetByCodCliente = sinon.stub(contaModel, 'getByCodCliente').resolves(resultGetByCodCliente);
    });
    after(() => { stubeGetByCodCliente.restore(); })
    it('Espera o retorno ser um response com as chaves status e message ', async () => {
      const service = await contaService.contaDeposito(10, 100);
      console.log('service', service);
      console.log('response', response);
      expect(service).to.not.be.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','message')
      expect(service).to.be.deep.equal(response);
    });
  });
});

describe('Realiza o saque em uma conta ', () => {
  describe('Quando o saque é realizado com sucesso', () => {
    let stubeGetByCodCliente : sinon.SinonStub;
    let stubeGetContaByCodCliente: sinon.SinonStub;
    let stubeUpdateSaldo : sinon.SinonStub;
    const resultstubeGetContaByCodCliente : IConta[] = [{ codConta: 12345, saldo : 10000 }];
    const resultGetByCodCliente : IContaSaldo[] = [{ codCliente: 1, saldo:10000 }];
    const resultstubeUpdateSaldo: any = { affectedRows: 1 };
    const result = [{ codCliente: 1, saldo:9900 }]
    const response: IObjResponse= { status: ObjCode.OK, payload: result };
    before(async () => {
      stubeGetByCodCliente = sinon.stub(contaModel, 'getByCodCliente').resolves(resultGetByCodCliente);
      stubeGetContaByCodCliente = sinon.stub(contaModel, 'getContaByCodCliente').resolves(resultstubeGetContaByCodCliente);
      stubeUpdateSaldo = sinon.stub(contaModel, 'updateSaldo').resolves(resultstubeUpdateSaldo);
    });
    after(() => { stubeGetByCodCliente.restore(); stubeGetContaByCodCliente.restore(); stubeUpdateSaldo.restore(); })
    it('Espera o retorno ser um response com as chaves status e payload ', async () => {
      const service = await contaService.contaSaque(1, 100);
      expect(service).to.be.not.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','payload')
      expect(service).to.be.deep.equal(response);
    });
  });

  describe('Quando o saque não  é realizado com sucesso, saldo insuficiente', () => {
    let stubeGetByCodCliente : sinon.SinonStub;
    let stubeGetContaByCodCliente: sinon.SinonStub;
    const resultstubeGetContaByCodCliente : IConta[] = [{ codConta: 12345, saldo : 10000 }];
    const resultGetByCodCliente : IContaSaldo[] = [{ codCliente: 1, saldo:10000 }];
    const response: IObjResponse= { status: ObjCode.INCORRECT_TYPE, message: 'Insufficient Funds' };
    before(async () => {
      stubeGetByCodCliente = sinon.stub(contaModel, 'getByCodCliente').resolves(resultGetByCodCliente);
      stubeGetContaByCodCliente = sinon.stub(contaModel, 'getContaByCodCliente').resolves(resultstubeGetContaByCodCliente);
    });
    after(() => { stubeGetByCodCliente.restore(); stubeGetContaByCodCliente.restore(); })
    it('Espera o retorno ser um response com as chaves status e message ', async () => {
      const service = await contaService.contaSaque(1, 11000);
      expect(service).to.not.be.empty;
      expect(service).to.be.an('object');
      expect(service).to.have.keys('status','message')
      expect(service).to.be.deep.equal(response);
    });
  });
});