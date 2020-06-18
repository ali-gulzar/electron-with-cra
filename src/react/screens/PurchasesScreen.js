import React, { Component } from 'react';
import PurchasesForm from './forms/PurchasesForm';
import PurchasesTable from './tables/PurchasesTable';

export default class PurchasesScreen extends Component {

  render(){
    return(
      <div>
        <div style={{display: 'flex'}}>
            <p style={{fontFamily: 'MuseoModerno', fontSize: 30, marginRight: 30}}>Purchases</p>
        </div>
        <div style={{marginBottom: 50}}>
          <PurchasesForm/>
        </div>
        <PurchasesTable/>
      </div>
    )
  }
}
