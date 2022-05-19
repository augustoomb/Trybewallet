import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { email, currencies, isLoading } = this.props;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    // if (!isLoading && currencies) {
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        {
          !isLoading && currencies
            ? (
              <form>
                <input type="number" name="valor" data-testid="value-input" />
                <input type="text" name="descricao" data-testid="description-input" />
                <label htmlFor="moeda">
                  Moeda
                  <select name="moeda" id="moeda">
                    {
                      currencies.map((currency, index) => (
                        <option key={ index }>{ currency }</option>
                      ))
                    }
                  </select>
                </label>
                <label htmlFor="metPag">
                  Método de pagamento
                  <select name="metPag" data-testid="method-input">
                    {
                      pagamento.map((pag, index) => (
                        <option key={ index }>{ pag }</option>
                      ))
                    }
                  </select>
                </label>
                <label htmlFor="tag">
                  Tag
                  <select name="tag" data-testid="tag-input">
                    {
                      tag.map((pag, index) => (
                        <option key={ index }>{ pag }</option>
                      ))
                    }
                  </select>
                </label>
              </form>)
            : <div>Loading...</div>
        }
      </div>
    );
    // }
    // if (isLoading) { return <div>Loading...</div>; }
    // return <div>Não foi possível</div>;
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
