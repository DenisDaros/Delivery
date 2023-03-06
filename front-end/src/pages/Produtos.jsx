import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Request from '../services/request';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import localStorage from '../services/localStorage';
import '../styles/components/Product.css';

function Products() {
  const params = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const productsApi = async () => {
    try {
      const response = await Request.requestData('/products');
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsApi();
  }, []);

  const cardProducts = products.map((product, index) => {
    const { name, price, urlImage, id } = product;
    return (
      <CardProduct
        key={ id }
        index={ index }
        img={ urlImage }
        name={ name }
        price={ price.replace('.', ',') }
      />
    );
  });

  return (
    <div className="container-page">
      <Header />
      {/* { console.log(params.cartItens) } */}
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
