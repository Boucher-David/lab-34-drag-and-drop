import './expense-item.scss';
import React from 'react';

class ExpenseItem extends React.Component{
  constructor(props){
    super(props);
  }

drag = (event) => {
  event.dataTransfer.setData("expenseID", event.target.id);
  event.dataTransfer.setData("oldCategoryID", this.props.categoryID);
}

  render(){
    return(
      <div className='expense-block'>
        {
          this.props.expenses.map((expense, i ) => {
            if (this.props.categoryID === expense.categoryID) {
              return <div key={expense.id} id={expense.id} draggable="true" className="expense-item" onDragStart={this.drag}>
                  <p> {expense.name} </p>
                  <button onClick={() => this.props.expenseDelete(expense.id)}> x </button>
                </div>;
            }
          })
        }
      </div>
    );
  }
};

export default ExpenseItem;
