const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const userController = require('../database/controller/user.controller');
const userService = require('../database/services/user.service');
const productsController = require('../database/controller/products.controller');
const productsService = require('../database/services/products.service');

describe('Testa aplicação', function () {
  describe('Verifica a rota de login', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Verifica se é possível logar com usuário que não existe', async function () {
      const res = {};
      const req = {
        body: {
          email: 'xablau@trybe.com',
          password: '12345674',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
      .stub(userService, 'findUserByEmail')
      .resolves(null);

      await userController.loginUser(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('Verifica se é possível logar com usuário que existe', async function () {
      const res = {};
      const req = {
        body: {
          email: 'xablau@cordibeli.com',
          password: '123456789',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(userService, 'findUserByEmail')
        .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica product', function () {
    // afterEach(function () {
    //   sinon.restore();
    // });

    it('Verifica se a requisição retorna status 200', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findProducts')
        .resolves();

      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

  //   it('Verifica se é possível logar com usuário que existe', async function () {
  //     const res = {};
  //     const req = {
  //       body: {
  //         email: 'xablau@cordibeli.com',
  //         password: '123456789',
  //       },
  //     };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon
  //       .stub(userService, 'findUserByEmail')
  //       .resolves({ password: '25f9e794323b453885f5181f1b624d0b' });

  //     await userController.login(req, res);

  //     expect(res.status.calledWith(200)).to.be.equal(true);
  //   });
  // });
});
});