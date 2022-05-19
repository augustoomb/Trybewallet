// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  // wallet: {
  //   currencies: [],
  //   expenses: [],
  //   isLoading: false,
  // },
  currencies: [],
  expenses: [],
  isLoading: false,
};

function convertObjToArr(obj) { // recebo um 'grande obj' contendo objetos
  const arr = Object.values(obj); // pegando o contéudo do 'grande obj' e convertendo em arr

  // arr sem a opção 'USDT' (Moeda Tether).
  const filteredArr = arr.filter((curr) => curr.codein !== 'BRLT');

  const novoArr = [];

  filteredArr.forEach((curr) => novoArr.push(curr.code));
  // acima: percorro o arr. Em cada posição, pego dentro de cada obj somente a chave 'code'
  // depois coloco dentro do meu novoArr

  return novoArr;
}

// function addExpense(stateExpenses, objExpense) {
//   return stateExpenses.push(objExpense);
// }

function mountExpense(objExpense, apiData) {
  objExpense.exchangeRates = apiData;
  return objExpense;
}

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isLoading: true,
    };
  case 'GET_CURRENCIES':
    return {
      ...state,
      isLoading: false,
      currencies: convertObjToArr(action.data),
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      isLoading: false,
      // expenses: { expenses: action.objExpense },
      expenses: [...state.expenses, mountExpense(action.objExpense, action.apiData)],
    };
  default:
    return state;
  }
}

export default wallet;
