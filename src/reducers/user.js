// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  if (action.type === 'SEND_LOGIN_DATA') {
    return {
      ...state,
      email: action.email,
    };
  }
  return state;
}

export default user;
