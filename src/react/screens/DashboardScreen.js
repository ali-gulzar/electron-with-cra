import React, { Component } from 'react';
import Card from './Card';
import Graph from './Graph';

export default class DashboardScreen extends Component {

  render(){
    return(
      <div>
        <div style={{display: 'flex', marginTop: 20, marginBottom: 50}}>
          <Card colorValue="card-profit" title="Profit" value="1,300,000"/>
          <Card colorValue="card-sales" title="Sales" value="5,500,000"/>
          <Card colorValue="card-expenses" title="Expenses" value="100,000"/>
        </div>
        <Graph/>
      </div>
    )
  }
}
