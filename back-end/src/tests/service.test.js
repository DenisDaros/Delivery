const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../database/models/User');
const userService = require('../database/services/user.service');

describe('Testa user', function () {
  describe('Verifica findUserById', function () {
    // afterEach(function () {
    //   sinon.restore();
    // });

    it('Verifica se é possível logar com usuário que não existe', async function () {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await userService.findUserById({
        email: 'xablu@trybe.com',
      });

      expect(response).to.deep.equal(null);
    });
  });

  describe('Verifica create', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Verifica se o usuário já existe', async function () {
      sinon.stub(User, 'findOne').resolves({
        name: 'Mirian Teste Xablau',
        email: 'xablau@tybe.com',
        password: '123456789',
      });

      const response = await userService.create({
        name: 'Mirian Test Xablau',
        email: 'xablau@trybe.com',
        password: '123456789',
      });

      expect(response).to.deep.equal(null);
    });

    it('Verifica se o usuário não existe', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves({});

      const response = await userService.create({
        name: 'Mirian Teste Xablau',
        email: 'xablau@trybe.com',
        password: '123456789',
      });

      expect(response).to.deep.equal({});
    });
  });
});