import uuid from 'uuid/v4';

export const create = ({categoryID,name,cost}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    id: uuid(),
    created: Date.now(),
    categoryID,
    name,
    cost,
  },
});

export const update = (expense) => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const destroy = (expense) => ({
  type: 'EXPENSE_DESTROY',
  payload: expense,
})

export const drag = (payload) => ({
  type: 'EXPENSE_DRAG',
  payload
})
