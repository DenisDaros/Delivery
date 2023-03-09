const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../api/app');
const mocks = require('./mock');
const { Products } = require('../database/models/Products');
// const { Sales } = require('../database/models/Sales');
// const { SalesProducts } = require('../database/models/SalesProducts');
// const { User } = require('../database/models/User');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa as rotas', function () {
  let chaiHttpResponse;
  // afterEach(function () {
  //   sinon.restore();
  // });
  it('Verifica a rota /products', async function () {
    sinon.stub(Products, 'findAll').resolves(mocks.allProducts);
    chaiHttpResponse = await chai.request(app).get('/products');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mocks.allProducts);
  });
});