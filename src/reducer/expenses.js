

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type){
    case 'EXPENSE_CREATE':

      return [...state, {...payload}];

    case 'EXPENSE_DRAG':
      let newState = [...state];
    
      state.map((expense, i) => {
        if (state[i].id === payload.expenseID) newState[i].categoryID = payload.newCategoryID;
      });    

      return newState;
    case 'EXPENSE_DESTROY':

      return state.filter(expense => expense.id !== payload);

    default:
      return state;
  }
}