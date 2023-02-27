import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';

function Cadastro() {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 6;
  const NAME_MAX_LENGTH = 12;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const validateLoginInputs = () => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
    const isNameValid = name.length < NAME_MAX_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid && isNameValid;
    return !areAllInputsValid;
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
        onClick={ (event) => login(event) }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default Cadastro;
