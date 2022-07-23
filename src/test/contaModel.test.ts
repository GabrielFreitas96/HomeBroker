// eslint-disable-next-line consistent-return
import * as sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import connection from '../models/connection';
import contaModel from '../models/contaModel';


describe('Busca por determinada conta e verifica se existe', () => {
  describe('Retorna false quando a conta não existe', () => {
    const result: any = [[]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser false', async () => {
      const respose = await contaModel.getByConta(1);
      expect(respose).to.be.false;
    });
  });
  describe('Retorna true quando a conta existir', () => {
    const result = [[{codconta: 1, saldo: 1000}]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser true', async () => {
      const respose = await contaModel.getByConta(1);
      expect(respose).to.be.true;
    });
  });
});

describe('Cria uma nova conta na tabela Contas', () => {
  describe('Retorna um array com  o objeto affectRows ', () => {
    const result: any = [[{ affectRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser false', async () => {
      const respose = await contaModel.addConta(78910);
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna true quando a conta existir', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser true', async () => {
      const respose = await contaModel.addConta(1);
      expect(respose).to.be.empty;
    });
  });
});



describe('Retorna um codCliente com base na conta de um cliente', () => {
  describe('Retorna um array com objeto codCliente e saldo', () => {
    const result: any = [[{ codCliente: 1, saldo:10000 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array que contém objeto com codCliente e saldo', async () => {
      const respose = await contaModel.getByCodCliente(78910);
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna um array vazio quando não encontrar a conta', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array', async () => {
      const respose = await contaModel.getByCodCliente(202020);
      expect(respose).to.be.empty;
    });
  });
});

describe('Retorna uma conta com base no id de um cliente', () => {
  describe('Retorna um array com objeto codConta e saldo do tipo', () => {
    const result: any = [[{ codConta: 12345, saldo:10000 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array que contém objeto com conta e saldo', async () => {
      const respose = await contaModel.getContaByCodCliente(1);
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna um array vazio', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array vazio', async () => {
      const respose = await contaModel.getContaByCodCliente(10);
      expect(respose).to.be.empty;
    });
  });
});

describe('Atualiza o saldo de um cliente na tabela contas', () => {
  describe('Retorna um array com  o objeto affectRows quando bem sucedido ', () => {
    const result: any = [[{ affectRows: 1 }]];
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno ser um array com objeto affectRows', async () => {
      const respose = await contaModel.updateSaldo(78910, 1000);
      expect(respose).to.be.equal(result[0]);
    });
  });
  describe('Retorna true quando a conta existir', () => {
    const result = [[]] as any;
    let stubeResult : sinon.SinonStub;
    before(async () => {
      stubeResult = sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => { stubeResult.restore(); })
    it('Espera o retorno um array vazio', async () => {
      const respose = await contaModel.updateSaldo(78910, 1000);
      expect(respose).to.be.empty;
    });
  });
});