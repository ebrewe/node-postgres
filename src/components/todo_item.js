import React, { Component } from 'react';

export default class TodoItem extends Component{
  constructor(props){
    super(props);
    this.state = {text: ''}
  }
  render(){
    return(
      <div  className="todo row">
        <div className="col-sm-8" style={{'cursor': 'pointer', 'padding':'5px'}}>
          <i className="fa fa-times" onClick={this.props.parent.checkOff.bind(this.props.parent, this.props.id)} style={{'cursor':'pointer'}} />
          <span style={{'width': '100%'}}>{this.props.text}</span>
          <input type="text" onBlur={this.props.parent.updateText.bind(this.props.parent, this.props.id)} className="" />
        </div>
        <div className="div-sm-4">
          <a href className={this.props.todoCompletedClass}>{this.props.todoCompletedIcon}</a>
        </div>
      </div>
    )
  }
}
