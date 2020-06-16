import React, { Component } from 'react';

export default class Card extends Component {

  constructor(props){
    super(props)
    this.state = {
      colorValue: this.props.colorValue
    }
  }

  render(){
    const {colorValue} = this.state;
    return(
      <div className={`card card-hover ${colorValue}`}>

      </div>
    )
  }
}
