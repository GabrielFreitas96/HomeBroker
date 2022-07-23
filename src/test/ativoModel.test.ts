import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import connection from '../models/connection';
import ativoModel from '../models/ativoModel';
import Ativos from './mockAtivos';
import ClienteAtivos from './mockClienteAtivo';

describe('Busca por pelos ativos na tabela Ativos', () => {
  describe('Retorna um array vazio quando não existem ativos', () => {
    const result: any = [[]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await ativoModel.getAll();
      expect(respose).to.be.empty;
    });
  });
  describe('Retorna um array quando os Ativos existirem', () => {
    const result = [Ativos] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com todos os Ativos', async () => {
      const respose = await ativoModel.getAll();
      expect(respose).to.be.not.empty;
      expect(respose).to.be.an('array');
      expect(respose).to.be.equal(Ativos);
    });
  });
});

describe('Retorna um ativo pelo id(codAtivo) de um ativo', () => {
  describe('Retorna um array que contém o ativo procurado', () => {
    const result: any = [Ativos[0]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array que contém o Ativo de codAtivo 1', async () => {
      const respose = await ativoModel.getById(1);
      expect(respose).to.be.equal(Ativos[0]);
    });
  });
  describe('Quando o ativo do id não existe retorna um array vazio', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await ativoModel.getById(500);
      expect(respose).to.be.empty;
    });
  });
});

describe('Retorna os ativos de um cliente pelo id(codCliente) de um cliente', () => {
  describe('Quando o cliente possui ativos retorna um array que contém todos os ativos desse cliente', () => {
    const result: any = [ClienteAtivos];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array que contém todos os ativos', async () => {
      const respose = await ativoModel.getByClienteId(1);
      expect(respose).to.be.equal(ClienteAtivos);
    });
  });
  describe('Quando o cliente não possui ativo, retorna um array vazio', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await ativoModel.getByClienteId(500);
      expect(respose).to.be.empty;
    });
  });
});

describe('Atualiza a quantidade de ativos na tabela Ativos', () => {
  describe('Retorna um array com  o objeto affectRows quando bem sucedido ', () => {
    const result: any = [[{ affectRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com objeto affectRows', async () => {
      const respose = await ativoModel.updateAtivoQtde(1, 10);
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna um array vazio quando não conseguir atualizar', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno um array vazio', async () => {
      const respose = await ativoModel.updateAtivoQtde(10, 10);
      expect(respose).to.be.empty;
    });
  });
});