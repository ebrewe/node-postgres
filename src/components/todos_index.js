import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTodos, deleteTodo } from '../actions/index';
import TodoNew from './todo_new';

class TodosIndex extends Component {
  componentWillMount(){
    this.props.fetchTodos();
  }
  updateStore(){
    this.props.fetchTodos();
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
      return <div
              className="todo row"
              key={todo.id}>
                <div className="col-sm-8" onClick={_this.checkOff.bind(this, todo.id)} style={{'cursor': 'pointer', 'padding':'5px'}}>
                  <span style={{'width': '100%'}}>{todo.text}</span>
                </div>
                <div className="div-sm-4">
                  <a href className={todoCompletedClass}>{todoCompletedIcon}</a>
                </div>
              </div>
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

export default connect(mapStateToProps, {fetchTodos, deleteTodo})(TodosIndex);
