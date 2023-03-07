import React from 'react';
import PropTypes from 'prop-types';

function Address({ name }) {
  return (
    <form>
      <h3>Detalhes e Endereço para Entrega</h3>
      <p>P. Vendedora Resposavel</p>
      <select
        name="vendador"
      >
        <option value="">{ name }</option>
      </select>
      <p>Endereço</p>
      <input type="text" />
      <p>Número</p>
      <input type="number" />
    </form>
  );
}

Address.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Address;
