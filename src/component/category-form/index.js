import './_category-form.scss';
import React from 'react';

let emptyState = {
  name: '',
  budget: 0,
}

class CategoryForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.category || emptyState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit(e){
    e.preventDefault();
    console.log('props', this.props);
    (e.target.id === 'createCategory') ? this.props.categoryCreate(this.state) : this.props.categoryUpdate(this.state);

    this.setState(emptyState);
  };

  componentWillReceiveProps(newProps){
    if(newProps.category)
      this.setState(newProps.category);
  };
  
  render(){
    let button = this.props.category ? 'update category' : 'create category';
    let buttonID = (button === 'update category') ? 'updateCategory' : 'createCategory';

    return(
      <div className='category-form'>
        <form
          onSubmit={this.handleSubmit}>
  
          <input
            className='type-input'
            type='text'
            name='name'
            placeholder='budget category'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            className='amount-input'
            type='number'
            name='budget'
            placeholder='budgeted amount'
            value={this.state.budget}
            onChange={this.handleChange}
          />
  
          <button onClick={this.handleSubmit} id={buttonID}> {button} </button>
        
        </form>
      </div>
    )
  }
}

export default CategoryForm;