import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import connection from '../models/connection';
import Ativos from './mockAtivos';
import clienteAtivoModel from '../models/clienteAtivoModel';

describe('Busca por pelos ativo de um cliente na Tabela ClientesAtivos', () => {
  describe('Retorna um array vazio quando o cliente(codCliente) não possui o ativo(codAtivo) procurado', () => {
    const result: any = [[]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await clienteAtivoModel.getByClienteIdAtivoId(10,10);
      expect(respose).to.be.empty;
    });
  });
  describe('Retorna um array quando o cliente possui o Ativo procurado', () => {
    const result = [Ativos[0]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com o ativo do cliente', async () => {
      const respose = await clienteAtivoModel.getByClienteIdAtivoId(1,1);
      expect(respose).to.be.not.empty;
      expect(respose).to.be.an('object');
      expect(respose).to.be.equal(Ativos[0]);
    });
  });
});

describe('Atualiza a quantidade de ativos  de um cliente na tabela ClientesAtivos', () => {
  describe('Retorna um array com  o objeto affectedRows quando bem sucedido ', () => {
    const result: any = [[{ affectedRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com objeto affectedRows', async () => {
      const respose = await clienteAtivoModel.updateClienteAtivo(1, 1, 10);
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
      const respose = await clienteAtivoModel.updateClienteAtivo(10,10, 10);
      expect(respose).to.be.empty;
    });
  });
});

describe('Deleta a quantidade de ativos  de um cliente na tabela ClientesAtivos', () => {
  describe('Retorna um array com  o objeto affectedRows quando bem sucedido ', () => {
    const result: any = [[{ affectedRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com objeto affectedRows', async () => {
      const respose = await clienteAtivoModel.deleteClienteAtivo(1, 1);
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
      const respose = await clienteAtivoModel.deleteClienteAtivo(10, 10);
      expect(respose).to.be.empty;
    });
  });
});

describe('Cria a quantidade de ativos de um cliente na tabela ClientesAtivos com o valor default 0', () => {
  describe('Retorna um array com  o objeto affectedRows quando bem sucedido ', () => {
    const result: any = [[{ affectedRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com objeto affectedRows', async () => {
      const respose = await clienteAtivoModel.createClienteAtivo(1, 1, 0);
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
      const respose = await clienteAtivoModel.createClienteAtivo(10, 10, 0);
      expect(respose).to.be.empty;
    });
  });
});