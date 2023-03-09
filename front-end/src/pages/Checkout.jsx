import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import localStore from '../services/localStorage';
import Header from '../components/Header';
import Table from '../components/Table';
import Request from '../services/request';
import Address from '../components/ Address';

function Checkout() {
  const params = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  const getSellers = () => Request.requestData('/sellers')
    .then((response) => setSellers(response))
    .catch((error) => console.log(error));

  const postSellers = async (obj) => {
    try {
      const response = await Request.postData('/sales', obj);
      console.log(response);
      return navigate(`/customer/orders/${response}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    const productsOnCart = () => {
      const arr = [];
      params.cartItens.map((item) => {
        const newObj = {
          productId: item.id,
          quantity: item.qnt,
        };
        arr.push(newObj);
        return null;
      });
      setProducts(arr);
      console.log(arr);
      return null;
    };
    productsOnCart();
  }, [params.cartItens]);

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
      />
    );
  });

  const postSalle = async (sellerId, adress, number) => {
    const userId = localStore.getData('userId');
    const salle = {
      userId,
      sellerId,
      totalPrice: params.cart,
      products,
      deliveryAddress: adress,
      deliveryNumber: number,
    };
    console.log(salle);
    await postSellers(salle);
    return null;
  };

  const seller = sellers.map((item, index) => {
    const { name, id } = item;
    return (
      <Address
        key={ index }
        id={ id }
        name={ name }
        sale={ postSalle }
      />
    );
  });

  return (
    <div>
      <Header />
      <div>
        <h3>Finalizar Pedido</h3>
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
        <h1>Total: R$</h1>
        <h1
          data-testid="customer_checkout__element-order-total-price"
        >
          { params.cart.replace('.', ',') }
        </h1>
        <div />
        <div>
          { seller }
        </div>
      </div>
    </div>
  );
}

export default Checkout;
