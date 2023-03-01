import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [user, setUser] = useState({});

  const context = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
