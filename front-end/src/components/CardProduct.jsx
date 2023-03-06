import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import '../styles/components/CardProduct.css';

function CardProduct({ price, name, img, key }) {
  const [numProduct, setnumProduct] = useState(0);
  const params = useContext(AppContext);

  useEffect(() => {
    params.setCart(0);
  }, []);

  // useEffect(() => {
  //   params.setCartItens([...params.cartItens, {
  //     name,
  //     qnt: numProduct,
  //     subTotal: (Number(price) * numProduct).toFixed(2) }]);
  // }, [numProduct]);

  const rmValue = (newValeu) => {
    const priceConvert = newValeu.replace(',', '.');
    const result = (params.cart - Number(priceConvert));
    if (numProduct > 0) {
      params.setCart(Number(result.toFixed(2)));
      setnumProduct(Number(numProduct) - 1);
      return null;
    }
    return null;
  };

  const addValue = (newValeu) => {
    const priceConvert = newValeu.replace(',', '.');
    const result = (Number(params.cart) + Number(priceConvert));
    params.setCart(result.toFixed(2));
    setnumProduct(Number(numProduct) + 1);
    // params.setCartItens([{ name, qnt: numProduct, subTotal: result.toFixed(2) }]);
    return null;
  };

  const handleChange = ({ target: { value } }) => {
    const itemValue = Number(value) * Number(price.replace(',', '.'));
    const cartValue = itemValue;
    params.setCart(cartValue.toFixed(2));
    // params.setCartItens([{ name, qnt: Number(value), subTotal: cartValue.toFixed(2) }]);
    setnumProduct(value);
  };

  return (
    <div className="card-container">
      <h3 data-testid={ `customer_products__element-card-price-${key}` }>{ price }</h3>
      <div className="img-container">
        <img
          className="card-img"
          src={ img }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${key}` }
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${key}` }>{ name }</p>
      <div className="container-buttons">
        <button
          onClick={ () => rmValue(price) }
          data-testid={ `customer_products__button-card-rm-item-${key}` }
          className="buttons"
          type="button"
        >
          -
        </button>
        <input
          className="test"
          type="number"
          value={ numProduct }
          onChange={ handleChange }
          data-testid={ `customer_products__input-card-quantity-${key}` }
        />
        <button
          onClick={ () => addValue(price) }
          data-testid={ `customer_products__button-card-add-item-${key}` }
          className="buttons"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default CardProduct;
