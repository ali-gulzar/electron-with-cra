import React from 'react';
import PurchasesForm from './forms/PurchasesForm';
import PurchasesTable from './tables/PurchasesTable';

export default function PurchasesScreen () {
  return(
    <div>
      <div style={{display: 'flex'}}>
          <p style={{fontFamily: 'MuseoModerno', fontSize: 30}}>Purchases</p>
      </div>
      <div style={{marginBottom: 50}}>
        <PurchasesForm/>
      </div>
      <PurchasesTable/>
    </div>
  )
}
