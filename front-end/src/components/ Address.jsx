import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Address({ name, sale, id }) {
  const [adress, setAdress] = useState();
  const [number, setNumber] = useState();
  const [seller, setSeller] = useState(id);

  return (
    <form>
      <h3>Detalhes e Endereço para Entrega</h3>
      <p>P. Vendedora Resposavel</p>
      <select
        data-testid="customer_checkout__select-seller"
        name="vendador"
        // onChange={ ({ target: { value } }) => setSeller(value) }
      >
        <option
          onChange={ ({ target: { value } }) => setSeller(value) }
          value={ id }
        >
          { name }

        </option>
      </select>
      <p>Endereço</p>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        onChange={ ({ target: { value } }) => setAdress(value) }
        value={ adress }
      />
      <p>Número</p>
      <input
        type="number"
        data-testid="customer_checkout__input-address-number"
        onChange={ ({ target: { value } }) => setNumber(value) }
        value={ number }
      />
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => sale(seller, adress, number) }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

Address.propTypes = {
  name: PropTypes.string.isRequired,
  sale: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Address;
