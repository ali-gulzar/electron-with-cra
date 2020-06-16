import React, { Component } from 'react';

export default class Card extends Component {

  constructor(props){
    super(props)
    this.state = {
      colorValue: this.props.colorValue,
      title: this.props.title,
      value: this.props.value
    }
  }

  render(){
    const {colorValue, title, value} = this.state;
    return(
      <div className={`card card-hover ${colorValue}`}>
        <h3 style={{marginLeft: 20, marginTop: 10, color: 'white', fontFamily: 'Permanent Marker', fontSize: 20}}>{title}</h3>
        <p style={{display: 'flex', fontSize: 30, justifyContent: 'flex-end', marginRight: 30, marginTop: 70, fontFamily: 'MuseoModerno'}}>Rs {value}</p>
      </div>
    )
  }
}
