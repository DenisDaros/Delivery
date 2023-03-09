import React, { useState } from 'react';
import Request from '../services/request';
import localStorage from '../services/localStorage';

function CadastroManager() {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 5;
  const NAME_MIN_LENGTH = 12;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

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

    const user = localStorage.getData('user');

    try {
      const response = await Request
        .requestLoginManager(
          '/admin/manage/register',
          { email, name, password, role },
          user.token,
        );
      setName('');
      setEmail('');
      setPassword('');

      return response;
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
        type="name"
        placeholder="Seu nome aqui"
        name="nameInput"
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
        name="role"
        onChange={ ({ target: { value } }) => setRole(value) }
        defaultValue={ role }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
        <option value="administrator">Administrador</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        onClick={ (event) => register(event) }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="admin_manage__element-invalid-register">
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

export default CadastroManager;
