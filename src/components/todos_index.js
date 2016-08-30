import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTodos } from '../actions/index';
import TodoNew from './todo_new';

class TodosIndex extends Component {
  componentWillMount(){
    this.props.fetchTodos();
  }
  updateStore(){
    this.props.fetchTodos();
  }
  renderTodos(){
    console.log(this.props.todos)
    return this.props.todos.map( (todo)=>{
      let todoCompletedClass = "not-completed",
          todoCompletedIcon = <i className="fa fa-times" />
      if(todo.complete){
        todoCompletedClass = "completed";
        todoCompletedIcon = <i className="fa fa-check" />
      }
      return <div className="todo" key={todo.id}>{todo.text}<a href className={todoCompletedClass}>{todoCompletedIcon}</a></div>
    })
  }
  render(){
    if(!this.props.todos.length){
      return <div>Loading</div>
    }
    return(
      <div>
        {this.renderTodos()}
        <TodoNew onUpdate={this.updateStore.bind(this)} />
      </div>
    );
  }
}


function mapStateToProps(state){
  console.log(state);
  return {todos: state.todos.all}
}

export default connect(mapStateToProps, {fetchTodos})(TodosIndex);
