import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState();

  const context = useMemo(() => ({
    cart,
    user,
    setUser,
    setCart,
  }), [user, cart]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
