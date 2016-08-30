import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('./todo_item.scss');

export default class TodoItem extends Component{
  constructor(props){
    super(props);
    this.state = {text: this.props.text, editing:false, changed:false, complete:this.props.complete || false}
  }
  componentWillUnmount(){
    clearTimeout(this.timer);
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
  checkOff(e){
    this.refs.container.className += " delete";
    this.time = setTimeout( ()=> {
      this.props.checkOff(this.props.id)
    }, 1000);
  }
  render(){
    let editClass = this.state.editing ? "pencil" : "times";
    let textEditClass = this.state.editing ? "editing" : "";
    return(
      <div  className="todo clearfix">
        <div className="col-sm-12 text-field" style={{'cursor': 'pointer', 'padding':'5px'}} ref="container">
          <input type="text" onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)} className={textEditClass} ref="textField" value={this.state.text} />
          <i className={`fa fa-${editClass}`} onClick={this.checkOff.bind(this)} style={{'cursor':'pointer'}} />
        </div>
      </div>
    )
  }
}
