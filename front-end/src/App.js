import React from 'react';
import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Products from './pages/Produtos';
import Vendedor from './pages/Vendedor';
import AppProvider from './context/AppProvider';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/customer/checkout" element={ <Checkout /> } />
            <Route exact path="/customer/products" element={ <Products /> } />
            <Route exact path="/register" element={ <Cadastro /> } />
            <Route exact path="/" element={ <Navigate to="/login" /> } />
            <Route exact path="/seller/orders" element={ <Vendedor /> } />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
