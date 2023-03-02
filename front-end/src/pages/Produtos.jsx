import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Request from '../services/request';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import '../styles/components/Product.css';

function Products() {
  const params = useContext(AppContext);
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [cartValue, setcartValue] = useState(0);

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

  const addClick = (value) => {
    setcartValue(cartValue + value);
    return null;
  };

  const rmClick = (value) => {
    if (cartValue > 0) return setcartValue(cartValue - value);
    return null;
  };

  const cardProducts = products.map((product, index) => {
    const { name, price, urlImage, id } = product;
    return (
      <CardProduct
        add={ addClick }
        rm={ rmClick }
        key={ id }
        index={ index }
        img={ urlImage }
        name={ name }
        price={ price.replace('.', ',') }
      />
    );
  });

  // const teste = () => {
  //   console.log('chamou');
  //   const string = String(params.cart).replace('.', ',');
  //   const TRES = 3;
  //   if (string.length === TRES) return `${String(params.cart).replace('.', ',')}0`;
  //   if (string.length === 2) return `${String(params.cart).replace('.', ',')},00`;
  //   return string;
  // };

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
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho: R$
          {' '}
          {
            String(params.cart).replace('.', ',')
          }
        </button>
      </div>
    </div>
  );
}

export default Products;
