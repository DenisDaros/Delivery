import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import localStore from '../services/localStorage';
import Header from '../components/Header';
import Table from '../components/Table';
import Order from '../components/Order';
import Request from '../services/request';

function Details() {
  const params = useContext(AppContext);
  const [order, setOrder] = useState([]);
  const [sellers, setSellers] = useState([]);
  const paramId = useParams('/customer/orders/:id');
  // const navigate = useNavigate();

  const getSellers = () => Request.requestData('/sellers')
    .then((response) => setSellers([response]))
    .catch((error) => console.log(error));

  const getOrder = () => Request.requestData(`/sales/${paramId.id}`)
    .then((response) => setOrder(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    getSellers();
  }, [paramId]);

  useEffect(() => {
    getOrder();
  }, [paramId]);

  const OITO = 8;
  const CINCO = 5;
  const QUATRO = 4;

  const orderRender = () => {
    if (order.length !== 0 && sellers.length !== 0) {
      const orderSeller = sellers[0].filter((item) => item.id === order.sellerId);
      const year = order.saleDate.substr(0, QUATRO);
      const mounth = order.saleDate.substr(CINCO, 2);
      const day = order.saleDate.substr(OITO, 2);
      const formatDate = `${day}/${mounth}/${year}`;
      return (
        <Order
          id={ paramId.id }
          seller={ orderSeller[0].name }
          date={ formatDate }
          status={ order.status }
        />
      );
    }
    return null;
  };

  const teste = orderRender();

  const MENOSUM = -1;
  let contador = MENOSUM;

  const cart = params.cartItens.map((item, index) => {
    if (item.qnt === 0) return null;
    contador += 1;
    const { name, qnt, subTotal, id } = item;
    const qntNumber = (Number(qnt));
    const value = Number(subTotal.replace(',', '.'));
    return (
      <Table
        id={ id }
        key={ index }
        index={ contador }
        name={ name }
        qnt={ qntNumber }
        unitValue={ subTotal }
        value={ value }
        label="order_details"
      />
    );
  });

  return (
    <div>
      <Header />
      {
        teste
      }
      <div>
        <h3>Detalhes do Pedido</h3>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          {
            cart
          }
        </table>
        <div>
          <h1>Total: R$</h1>
          <h1
            data-testid="customer_order_details__element-order-total-price"
          >
            { params.cart.replace('.', ',') }
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Details;
