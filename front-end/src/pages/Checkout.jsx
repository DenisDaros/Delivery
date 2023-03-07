import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Table from '../components/Table';
import Request from '../services/request';
import Address from '../components/ Address';

function Checkout() {
  const params = useContext(AppContext);
  const [sellers, setSellers] = useState([]);

  const getSellers = () => Request.requestData('/sellers')
    .then((response) => setSellers(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    getSellers();
  }, []);

  const cart = params.cartItens.map((item, index) => {
    if (item.qnt === 0) return null;
    const { name, qnt, subTotal } = item;
    const qntNumber = (Number(qnt));
    const value = Number(subTotal.replace(',', '.'));
    return (
      <Table
        key={ index }
        index={ index + 1 }
        name={ name }
        qnt={ qntNumber }
        unitValue={ subTotal }
        value={ value }
      />
    );
  });

  const seller = sellers.map((item, index) => {
    const { name } = item;
    console.log(name);
    return (
      <Address
        key={ index }
        name={ name }
      />
    );
  });

  return (
    <div>
      <Header />
      <div>
        <h3>Finalizar Pedido</h3>
        {
          cart
        }
        <h1>{ `Total: R$ ${params.cart}` }</h1>
        <div />
        <div>
          { seller}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
