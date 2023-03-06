import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Request from '../services/request';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import localStorage from '../services/localStorage';
import '../styles/components/Product.css';

function Products() {
  const params = useContext(AppContext);
  const [products, setProducts] = useState([]);
  // const [logged, setLogin] = useState(false);

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   setLogin(!!user.token);
  // }, [logged, setLogin]);

  const navigate = useNavigate();

  const productsApi = async () => {
    try {
      // console.log('chamou');
      const response = await Request.requestData('/products');
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsApi();
  }, []);

  const cardProducts = products.map((product) => {
    const { name, price, urlImage, id } = product;
    return (
      <CardProduct
        key={ id }
        index={ id }
        img={ urlImage }
        name={ name }
        price={ price.replace('.', ',') }
      />
    );
  });

  return (
    <div className="container-page">
      <Header />
      <div className="container-cards-render">
        {
          (products.length !== 0)
            ? (
              cardProducts
            )
            : null
        }
      </div>
      <div className="car-constainer">
        <button
          className="car-button"
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
        >
          <span data-testid="customer_products__checkout-bottom-value">
            Ver Carrinho: R$
            {' '}
            {
              localStorage.saveData('cart', String(params.cart).replace('.', ','))
            }
            {
              String(params.cart).replace('.', ',')
            }
          </span>
        </button>
      </div>
    </div>
  );
}

export default Products;
