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
      <div className='expense-item'>
        {this.props.expenses[this.props.categoryID].map((expense,i) => 
          <div key={expense.id} id={expense.id} draggable="true" onDragStart={this.drag}>
            <p> {(expense.name)} </p>
            <button onClick={() => this.props.expenseDelete(expense)}> x </button>
          </div>
        )
        }
      </div>
    );
  }
};

export default ExpenseItem;
