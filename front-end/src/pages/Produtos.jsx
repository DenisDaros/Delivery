import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';

function Products() {
  const params = useContext(AppContext);
  console.log(params);
  return (
    <div>
      <Header />
      <h1>OI</h1>
    </div>
  );
}

export default Products;
