import React from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function Provider({ children }) {
  return (
    <DeliveryContext.Provider>
      { children }
    </DeliveryContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
