import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Request from '../services/request';
import localStorage from '../services/localStorage';

function Cadastro() {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 5;
  const NAME_MIN_LENGTH = 12;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const validateLoginInputs = () => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
    const isNameValid = name.length >= NAME_MIN_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid && isNameValid;
    return !areAllInputsValid;
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await Request.requestLogin('/register', { email, name, password });
      Request.setToken(response.token);
      localStorage.saveData('userId', response.id);
      delete response.id;
      localStorage.saveData('user', response);
      localStorage.saveData('cart', 0);
      navigate('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const isDisabled = validateLoginInputs();

  return (
    <form>
      <h1>Cadastro</h1>
      <p>Nome</p>
      <input
        data-testid="common_register__input-name"
        type="email"
        placeholder="email@trybeer.com.br"
        name="emailInput"
        value={ name }
        onChange={ ({ target: { value } }) => setName(value) }
      />
      <p>Email</p>
      <input
        data-testid="common_register__input-email"
        type="email"
        placeholder="email@trybeer.com.br"
        name="emailInput"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <p>Senha</p>
      <input
        data-testid="common_register__input-password"
        type="password"
        placeholder="*******"
        name="passwordInput"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <br />
      <button
        data-testid="common_register__button-register"
        type="submit"
        onClick={ (event) => register(event) }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_register__element-invalid_register">
              {
                `O endereço de e-mail ou nome já existem.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </form>
  );
}

export default Cadastro;
