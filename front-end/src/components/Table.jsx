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
    <div>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        <th
          data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
        >
          { index }

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
          { String(parcialValue).replace('.', ',') }
        </th>
        <th>
          <button
            type="button"
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            onClick={ () => removeItem(name, parcialValue) }
          >
            Remover
          </button>
        </th>
      </tbody>
    </div>
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
