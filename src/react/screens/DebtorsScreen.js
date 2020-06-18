import React from 'react';
import DebtorsForm from './forms/DebtorsForm';
import DebtorsTable from './tables/DebtorsTable';

export default function DebtorsScreen () {
  return (
    <div>
      <div style={{display: 'flex'}}>
          <p style={{fontFamily: 'MuseoModerno', fontSize: 30}}>Debtors</p>
      </div>
      <div style={{marginBottom: 50}}>
        <DebtorsForm/>
      </div>
      <DebtorsTable/>
    </div>
  )
}
