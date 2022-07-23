import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import connection from '../models/connection';
import clienteModel from '../models/clienteModel';
import ICliente from '../interfaces/ICliente';

describe('Busca por um cliente a partir da conta', () => {
  describe('Retorna um array vazio quando a conta não existe', () => {
    const result: any = [[]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await clienteModel.getClient(505050);
      expect(respose).to.be.empty;
    });
  });
  describe('Retorna um array quando a conta existir', () => {
    const result = [[{codCliente: 1,
      nameCliente: 'Gabriel Freitas',
      emailCliente:'gabriel@getMaxListeners.com',
      passwordCliente: '123456',
      contaCliente: '12345',
    }]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com o Cliente', async () => {
      const respose = await clienteModel.getClient(12345);
      expect(respose).to.be.not.empty;
      expect(respose).to.be.an('array');
      expect(respose).to.be.equal(result[0]);
    });
  });
});

describe('Busca por um cliente por id(codCliente)', () => {
  describe('Retorna um array vazio quando o codCliente não for válido', () => {
    const result: any = [[]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await clienteModel.getClientById(50);
      expect(respose).to.be.empty;
    });
  });
  describe('Retorna um array quando o codCliente for válido', () => {
    const result: any = [[{codCliente: 1,
      nameCliente: 'Gabriel Freitas',
      emailCliente:'gabriel@getMaxListeners.com',
      passwordCliente: '123456',
      contaCliente: '12345',
    }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com o Cliente', async () => {
      const respose = await clienteModel.getClient(12345);
      expect(respose).to.be.not.empty;
      expect(respose).to.be.an('array');
      expect(respose).to.be.equal(result[0]);
    });
  });
});

describe('Cria um novo Cliente na tabela Clientes', () => {
  describe('Retorna um array com  o objeto affectRows, quando inserido com sucesso ', () => {
    const cliente: ICliente = {codCliente: 1,
      nameCliente: 'Gabriel Freitas',
      emailCliente:'gabriel@getMaxListeners.com',
      passwordCliente: '123456',
      contaCliente: '12345',
    };
    const result: any = [[{ affectRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com affectRows', async () => {
      const respose = await clienteModel.addUser(cliente, 'adsdsdsdsdsd');
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna um array vazio quando não for inserido com sucesso', () => {
    const result = [[]] as any;
    const cliente: ICliente = {codCliente: 1,
      nameCliente: 'Gabriel Freitas',
      emailCliente:'gabriel@getMaxListeners.com',
      passwordCliente: '123456',
      contaCliente: '12345',
    };
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await clienteModel.addUser(cliente, 'aasfdfdfdddfdf');
      expect(respose).to.be.empty;
    });
  });
});