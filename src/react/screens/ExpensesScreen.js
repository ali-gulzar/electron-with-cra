import React from 'react';
import ExpenseForm from './forms/ExpenseForm';
import ExpenseTable from './tables/ExpenseTable';

export default function ExpensesScreen () {
  return (
    <div>
      <div style={{display: 'flex'}}>
          <p style={{fontFamily: 'MuseoModerno', fontSize: 30}}>Expenses</p>
      </div>
      <div style={{marginBottom: 50}}>
        <ExpenseForm/>
      </div>
      <ExpenseTable/>
    </div>
  )
}
