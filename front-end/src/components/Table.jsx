import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Table({ name, qnt, unitValue, value, index }) {
  const parcialValue = qnt * value;
  const params = useContext(AppContext);

  const removeItem = (product, valueItem) => {
    const list = params.cartItens.filter((item) => item.name !== product);
    const resultValue = params.cart - valueItem;
    params.setCart(resultValue.toFixed(2));
    params.setCartItens(list);
    return null;
  };

  return (
    <tbody>
      <th
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }

      </th>
      <th
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }

      </th>
      <th
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { qnt }

      </th>
      <th
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { unitValue }

      </th>
      <th
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { String(parcialValue.toFixed(2)).replace('.', ',') }
      </th>
      <th data-testid={ `customer_checkout__element-order-table-remove-${index}` }>
        <button
          type="button"
          onClick={ () => removeItem(name, parcialValue) }
        >
          Remover
        </button>
      </th>
    </tbody>
  );
}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  qnt: PropTypes.number.isRequired,
  unitValue: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Table;
