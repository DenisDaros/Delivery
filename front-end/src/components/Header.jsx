import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localStore from '../services/localStorage';
import '../styles/components/Header.css';

function Header() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const user = localStore.getData('user');

  const logoff = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  function conditionHeader() {
    if (user.role === 'customer') {
      setRole('customer');
    }
    if (user.role === 'seller') {
      setRole('seller');
    }
    if (user.role === 'admin') {
      setRole('admin');
    }
  }

  useEffect(() => {
    conditionHeader();
  }, []);

  return (
    <div className="common-header">
      { (role === 'customer') && (
        <>
          <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
          <h3 data-testid="customer_products__element-navbar-link-orders">
            MEUS PEDIDOS
          </h3>
        </>
      )}
      { (role === 'seller') && (
        <h3 data-testid="customer_products__element-navbar-link-orders">PEDIDOS</h3>
      )}
      {/* { (role === 'admin') && (
        <>
          <h3 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h3>
          <h3 data-testid="customer_products__element-navbar-link-orders">
            MEUS PEDIDOS
          </h3>
        </>
      )} */}
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        { user.name }
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
