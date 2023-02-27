import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Provider from './context/DeliveryContext';
import './App.css';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route exact path="/register" element={ <Cadastro /> } />
    </Routes>
  );
}

export default App;
