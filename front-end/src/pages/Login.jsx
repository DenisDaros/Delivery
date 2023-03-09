import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from '../services/localStorage';
import Request from '../services/request';

function Login() {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PASSWORD_MIN_LENGTH = 5;

  const navigate = useNavigate();
  // const params = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const validateLoginInputs = () => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid;
    return !areAllInputsValid;
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await Request.requestLogin('/login', { email, password });
      Request.setToken(response.token);
      localStorage.saveData('userId', response.id);
      delete response.id;
      localStorage.saveData('user', response);
      localStorage.saveData('cart', 0);
      if (response.role === 'seller') {
        navigate('/seller/orders');
      }
      if (response.token && response.role === 'customer') {
        console.log(response);
        navigate('/customer/products');
      }
      if (response.role === 'admin') {
        navigate('');
      }
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  const isDisabled = validateLoginInputs();

  return (
    <form>
      <p>Login</p>
      <input
        data-testid="common_login__input-email"
        type="email"
        placeholder="email@trybeer.com.br"
        name="emailInput"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <p>Senha</p>
      <input
        data-testid="common_login__input-password"
        type="password"
        placeholder="*******"
        name="passwordInput"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <br />
      <button
        data-testid="common_login__button-login"
        type="submit"
        onClick={ (event) => login(event) }
        disabled={ isDisabled }
      >
        Login
      </button>
      <br />
      <button
        data-testid="common_login__button-register"
        type="submit"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho conta
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </form>
  );
}

export default Login;
