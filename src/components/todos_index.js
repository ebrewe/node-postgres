import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTodos, deleteTodo, updateTodo } from '../actions/index';
import TodoNew from './todo_new';
import TodoItem from './todo_item';

class TodosIndex extends Component {
  componentWillMount(){
    this.props.fetchTodos();
  }
  updateStore(){
    this.props.fetchTodos();
  }
  updateText(id, e){
    var newText = e.target.value;
    if(newText.length < 1) return false;

    this.props.updateTodo({id:id, text:newText, completed:false})
    .then( ()=>{
      this.updateStore();
    });
  }
  checkOff(id){
    this.props.deleteTodo({id:id})
    .then( ()=> {this.updateStore() });
  }
  renderTodos(){
    console.log(this.props.todos)
    let _this = this;
    return this.props.todos.map( (todo)=>{
      let todoCompletedClass = "not-completed",
          todoCompletedIcon = <i className="fa fa-times" />
      if(todo.complete){
        todoCompletedClass = "completed";
        todoCompletedIcon = <i className="fa fa-check" />
      }
      return <TodoItem key={todo.id} parent={_this} text={todo.text} id={todo.id} todoCompletedIcon={todoCompletedIcon} todoCompletedClass={todoCompletedClass} />
    })
  }
  render(){
    if(!this.props.todos.length){
      return <div>Loading</div>
    }
    return(
      <div style={{'width': '320px'}}>
        <div>
          {this.renderTodos()}
          <TodoNew onUpdate={this.updateStore.bind(this)} />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  console.log(state);
  return {todos: state.todos.all}
}

export default connect(mapStateToProps, {fetchTodos, deleteTodo, updateTodo})(TodosIndex);
