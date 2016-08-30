import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTodos, deleteTodo, updateTodo } from '../actions/index';
import TodoNew from './todo_new';
import TodoItem from './todo_item';
require('./todo_list.scss');

class TodosIndex extends Component {
  componentWillMount(){
    this.props.fetchTodos();
  }
  updateStore(){
    this.props.fetchTodos();
  }
  updateText(id, text, complete, e){
    if(text.length < 1) return false;
    this.props.updateTodo({id:id, text:text, complete:complete})
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
      let todoCompleteClass = "not-complete",
          todoCompleteIcon = <i className="fa fa-check" />
      if(todo.complete){
        todoCompleteClass = "complete";
        todoCompleteIcon = <i className="fa fa-check undo" />
      }
      return <TodoItem key={todo.id} parent={_this} complete={todo.complete} text={todo.text} id={todo.id} updateText={_this.updateText.bind(this)} todoCompleteIcon={todoCompleteIcon} todoCompleteClass={todoCompleteClass} />
    })
  }
  render(){
    if(!this.props.todos.length){
      return <div style={{'width': '320px', 'margin':'0 auto'}}>Loading</div>
    }
    return(
      <div style={{'width': '320px', 'margin':'30px auto'}}>
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
