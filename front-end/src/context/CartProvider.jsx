// import React, { useMemo, useState } from 'react';
// import PropTypes from 'prop-types';
// import AppContext from './AppContext';

// export default function CartProvider({ children }) {
//   const [cart, setCart] = useState(0);

//   const cartContext = useMemo(() => ({
//     cart,
//     setCart,
//   }), [cart]);

//   return (
//     <AppContext.Provider value={ cartContext }>
//       { children }
//     </AppContext.Provider>
//   );
// }

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
