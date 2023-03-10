const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const mocks = require('./mocks/product.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rotas', function () {

  it('Verifica a rota GET /products', async function () {

    const result = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'zebirita@email.com',
      password:'$#zebirita#$',
    });

    const tokenvalid = result.body.token;

    chaiHttpResponse = await chai
    .request(app)
    .get('/products')
    .set('authorization', tokenvalid);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mocks.allProducts);
  });
});
describe('Testa as rotas de login', function () {

it('Verifica a rota POST /login com usuario válido', async function () {

  const result = await chai
  .request(app)
  .post('/login')
  .send({
    email: 'zebirita@email.com',
    password:'$#zebirita#$',
  });

  expect(result.status).to.be.equal(200);
});

it('Verifica a rota POST /login com usuario inválido', async function () {

  const result = await chai
  .request(app)
  .post('/login')
  .send({
    email: 'zebirita@emai.com',
    password:'$#zebirita#$',
  });

  expect(result.status).to.equal(404);
  expect(result.body).to.deep.equal("Not found");
});

it('Verifica a rota POST /login em caso de senha inválida', async function () {

  const result = await chai
  .request(app)
  .post('/login')
  .send({
    email: 'zebirita@email.com',
    password:'$#zebirit',
  });

  expect(result.status).to.equal(401);
  expect(result.body).to.deep.equal("Incorrect password");
});

});
