const emptyState = {};

export default (state=emptyState, {type, payload}) => {

  switch(type){
    case 'CATEGORY_CREATE':
      return {...state, [payload.id]:[]};
    case 'EXPENSE_CREATE':
      let categoryID = payload.categoryID;
      let category = state[categoryID];
      let result = [...category, payload];
      return {...state, [categoryID]: result};
    case 'EXPENSE_UPDATE':
      return state;

    case 'EXPENSE_DRAG':
      if (payload.categoryID === "") return state;

    let oldState = {...state};
    let expenseToDrag = {};

    oldState[payload.oldCategoryID].map(expense => {
      if (expense.id === payload.expenseID) expenseToDrag[expense.id] = expense;
      if (expense.id === payload.expenseID) expenseToDrag[expense.id].categoryID = payload.newCategoryID;
    });

    // add expense to other category
    
    oldState[payload.newCategoryID].push({...expenseToDrag[payload.expenseID]});

    // delete expense from old category
    oldState[payload.oldCategoryID].filter(expense => expense.categoryID !== payload.oldCategoryID);
  
    oldState[payload.oldCategoryID].forEach((i, key) => {

      if (i.categoryID !== payload.oldCategoryID) {
        oldState[payload.oldCategoryID][key] === null;
        delete oldState[payload.oldCategoryID][key];
      }
    });

      return oldState;

    case 'EXPENSE_DESTROY':
      categoryID = payload.categoryID;
      category = state[categoryID];
      let newState = category.filter(section => section.id != payload.id);
      return {...state, [categoryID]:newState};
    default:
      return state;
  }
}