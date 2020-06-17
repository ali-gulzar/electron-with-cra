import React, { Component } from 'react';
import InventoryTable from './tables/InventoryTable';

export default class InventoryScreen extends Component {

  render(){
    return(
      <div>
        <div style={{display: 'flex'}}>
            <p style={{fontFamily: 'MuseoModerno', fontSize: 30, marginRight: 30}}>Inventory</p>
        </div>
        <div style={{marginBottom: 50}}>
        </div>
        <InventoryTable/>
      </div>
    )
  }
}
