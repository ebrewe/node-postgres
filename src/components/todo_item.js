import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('./todo_item.scss');

export default class TodoItem extends Component{
  constructor(props){
    super(props);
    this.state = {text: this.props.text, editing:false, changed:false, complete:this.props.complete || false}
  }
  updateComplete(e){
    e.preventDefault();
    this.setState({complete: !this.state.complete});
    this.props.updateText(this.props.id, this.state.text, this.state.complete);
  }
  handleClick(e){
    e.preventDefault();
    this.setState({editing:true});
    ReactDOM.findDOMNode(this.refs.textField).focus();
  }
  handleChange(e){
    this.setState({changed:true})
    this.setState({text:e.target.value});
  }
  handleFocus(){
    this.setState({editing:true})
  }
  handleBlur(){
    this.setState({editing: false});
    if(!this.state.changed) return false;
    this.props.updateText(this.props.id, this.state.text, this.state.complete);
    this.setState({changed:false})
  }
  render(){
    let editClass = this.state.editing ? "editing" : "";
    return(
      <div  className="todo row">
        <div className="col-sm-8 text-field" style={{'cursor': 'pointer', 'padding':'5px'}}>
          <i className="fa fa-times" onClick={this.props.parent.checkOff.bind(this.props.parent, this.props.id)} style={{'cursor':'pointer'}} />
          <input type="text" onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)} className={editClass} ref="textField" value={this.state.text} />
        </div>
        <div className="div-sm-4">
          <a href className={this.props.todoCompleteClass} onClick={this.updateComplete.bind(this)}>{/*this.props.todoCompleteIcon*/}</a>
        </div>
      </div>
    )
  }
}
