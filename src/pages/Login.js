import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.emailIsNotValid = this.emailIsNotValid.bind(this);
    this.passIsNotValid = this.passIsNotValid.bind(this);
    this.formIsNotValid = this.formIsNotValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    this.setState((prevState) => ({
      disabledButton: this.formIsNotValid(prevState.email, prevState.password),
    }));
  }

  // // https://www.w3resource.com/javascript/form/email-validation.php
  emailIsNotValid(email) { // retorno: true (email inválido) e false(email valido)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }
    return true;
  }

  passIsNotValid(pass) { // retorno: true (email inválido) e false(email valido)
    const minLength = 6;
    if (pass.length < minLength) {
      return true;
    }
    return false;
  }

  formIsNotValid(email, pass) {
    return this.emailIsNotValid(email) || this.passIsNotValid(pass); // quero true(botão desabilitado) sempre que um dos 2 for false
  }

  handleSubmit() {
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch({ type: 'SEND_LOGIN_DATA', email });

    history.push('/carteira');
  }

  render() {
    const { email, password, disabledButton } = this.state;

    return (
      <div className="page-login">
        <div className="login-content">
          {/* <h1>Login</h1> */}
          <img src={ logo } alt="logo" />
          <input
            data-testid="email-input"
            type="email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
          <input
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
            value={ password }
            name="password"
          />
          <button disabled={ disabledButton } onClick={ this.handleSubmit } type="button">
            Entrar
          </button>
        </div>
      </div>);
  }
}

// export default Login;

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null)(Login);
