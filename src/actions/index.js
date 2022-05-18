// Coloque aqui suas actions

// REDUCER user.js
export const saveLoginData = (email) => ({
  type: 'SEND_LOGIN_DATA',
  email,
});

// REDUCER wallet.js
export const requestAPI = () => ({
  type: 'REQUEST_API',
});

export const getCurrencies = (data) => ({
  type: 'GET_CURRENCIES', data,
});

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(getCurrencies(json)));
  };
}
