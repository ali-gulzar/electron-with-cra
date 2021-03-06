import React, { Component } from 'react';
import CashForm from './forms/CashForm';
import CashTable from './tables/CashTable';

export default class CashScreen extends Component {

  render(){
    return(
      <div>
        <div style={{display: 'flex'}}>
            <p style={{fontFamily: 'MuseoModerno', fontSize: 30, marginRight: 30}}>Cash</p>
        </div>
        <div style={{marginBottom: 50}}>
          <CashForm/>
        </div>
        <CashTable/>
      </div>
    )
  }
}
