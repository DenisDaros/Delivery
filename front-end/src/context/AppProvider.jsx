import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(0);
  const [cartItens, setCartItens] = useState([]);

  const context = useMemo(() => ({
    cartItens,
    cart,
    user,
    setUser,
    setCart,
    setCartItens,
  }), [user, cart, cartItens]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
