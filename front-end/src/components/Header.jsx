import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Header.css';

function Header() {
  const navigate = useNavigate();
  const params = useContext(AppContext);

  const logoff = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="common-header">
      <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">MEUS PEDIDOS</h3>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        { params.user }
      </h3>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logoff() }
      >
        SAIR
      </button>
    </div>

  );
}

export default Header;
