import React from 'react';
import { useNavigate } from 'react-router-dom';
import localStore from '../services/localStorage';
import '../styles/components/Header.css';

function Header() {
  const navigate = useNavigate();
  const name = localStore.getData('user');

  const logoff = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="common-header">
      <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">MEUS PEDIDOS</h3>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        { name.name }
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
