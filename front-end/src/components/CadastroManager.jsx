import React, { useState } from 'react';
import Request from '../services/request';

function CadastroManager() {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 5;
  const NAME_MIN_LENGTH = 12;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const validateLoginInputs = () => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
    const isNameValid = name.length >= NAME_MIN_LENGTH;
    const areAllInputsValid = isEmailValid
     && isPasswordValid
     && isNameValid;
    return !areAllInputsValid;
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await Request
        .requestLogin('/register/admin/manage', { email, name, password, role });
      console.log(response);
      Request.setToken(response);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const isDisabled = validateLoginInputs();

  return (
    <form>
      <h1>Cadastrar novo usuário</h1>
      <p>Nome</p>
      <input
        data-testid="admin_manage__input-name"
        type="email"
        placeholder="email@trybeer.com.br"
        name="emailInput"
        value={ name }
        onChange={ ({ target: { value } }) => setName(value) }
      />
      <p>Email</p>
      <input
        data-testid="admin_manage__input-email"
        type="email"
        placeholder="email@trybeer.com.br"
        name="emailInput"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <p>Senha</p>
      <input
        data-testid="admin_manage__input-password"
        type="password"
        placeholder="*******"
        name="passwordInput"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <br />
      <p>Tipo</p>
      <select
        data-testid="admin_manage__select-role"
        name="type"
        onChange={ ({ target: { value } }) => setRole(value) }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
        <option value="administrator" selected="selected">Administrator</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        onClick={ (event) => register(event) }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default CadastroManager;
