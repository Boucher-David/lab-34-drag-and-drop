import React from 'react';
import Enzyme, {simulate, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import expect from 'expect';

Enzyme.configure({ adapter: new Adapter() });
import { setState } from 'expect/build/jest_matchers_object';

import expenseReducer from '../reducer/expenses';
import categoryReducer from '../reducer/categories';

import * as categoryActions from '../action/category';
import * as expenseActions from '../action/expense';

let brandNewCategory = categoryActions.create({name: 'category1', budget: 100});

let brandNewExpense = expenseActions.create({categoryID: brandNewCategory.payload.id,name: 'expense1', cost: 100});

let categoryState;
let expenseState;

test('Test that CATEGORY_CREATE creates an array with a new category', () => {
    
    categoryState = categoryReducer([], brandNewCategory);

    expect(categoryState.length).toEqual(1);
    expect(categoryState[0].name).toEqual('category1');
});

test('Test that EXPENSE_CREATE creates an array with a new expense', () => {
    brandNewExpense['categoryID'] = brandNewCategory.id;
    expenseState = expenseReducer([], brandNewExpense);

    expect(expenseState.length).toEqual(1);
    expect(expenseState[0].name).toEqual('expense1');
});

test('create one more category so we can move expenses via drag', () => {
    let brandNewCategory2 = categoryActions.create({name: 'category2', budget: 100});

    categoryState = categoryReducer(categoryState, brandNewCategory2);
    expect(categoryState.length).toEqual(2);
    expect(categoryState[1].name).toEqual('category2');
});

test('test dragging an expense. should change categoryID if successfull', () => {


    // lets make sure the created expense has the categoryID of our first created category.
    let category1ID = categoryState[0];
    let category2ID = categoryState[1];

    expect(expenseState[0].categoryID).toEqual(category1ID['id']);

    let draggedExpense = expenseActions.drag({
        expenseID: expenseState[0].id,
        oldCategoryID: category1ID['id'],
        newCategoryID: category2ID['id']
    });

    expenseState = expenseReducer(expenseState, draggedExpense);

    // the single expense in state changed its categoryID value from the first category to the second. 
    expect(expenseState[0].categoryID).toEqual(category2ID['id']);
});