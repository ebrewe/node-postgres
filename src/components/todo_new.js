import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {createTodo} from '../actions/index';

class TodoNew extends Component {
  constructor(props){
    super(props);
    this.state = {text:''};
  }
  handleSubmit(e){
    e.preventDefault();
    let text = this.state.text;
    let completed = false;

    this.props.createTodo({text:text, completed:completed});
    this.setState({text:""});
    this.props.onUpdate();
  }
  handleChange(e){
    this.setState({text: e.target.value});
  }
  render (){
    return (
      <form onSubmit={this.handleSubmit.bind(this)} ref="newTodoForm">
        <textarea ref="todoText" value={this.state.text} onChange={this.handleChange.bind(this)} placeholder="enter a new todo..." />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

TodoNew.propTypes = {
  onUpdate: PropTypes.func.isRequired
}

export default connect(null, {createTodo})(TodoNew);
