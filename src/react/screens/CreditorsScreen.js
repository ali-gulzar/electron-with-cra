import React, { Component } from 'react';
import CreditorsForm from './forms/CreditorsForm';
import CreditorsTable from './tables/CreditorsTable';

export default function CreditorsScreen () {
  return (
    <div>
      <div style={{display: 'flex'}}>
          <p style={{fontFamily: 'MuseoModerno', fontSize: 30}}>Creditors</p>
      </div>
      <div style={{marginBottom: 50}}>
        <CreditorsForm/>
      </div>
      <CreditorsTable/>
    </div>
  )
}
