import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Card from './Card';
import Graph from './Graph';


export default function DashboardScreen () {

  const [cash, setCash] = useState(null);
  const [sales, setSales] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    firebase.database().ref('cash/total').once('value', async function(snapshot) {
      if(snapshot.val()) {
        setCash(snapshot.val().value)
      } else setCash(0)
    })
    firebase.database().ref('sales/total').once('value', async function(snapshot) {
      if(snapshot.val()) {
        setSales(snapshot.val().value)
      } else setSales(0)
    })
    firebase.database().ref('expenses/total').once('value', async function(snapshot) {
      if(snapshot.val()) {
        setExpenses(snapshot.val().value)
      } else setExpenses(0)
    })
  },[])

  return (
    <div>
      <div style={{display: 'flex', marginBottom: 50}}>
        <Card colorValue="card-profit" title="Cash" value={cash}/>
        <Card colorValue="card-sales" title="Sales" value={sales}/>
        <Card colorValue="card-expenses" title="Expenses" value={expenses}/>
      </div>
      <Graph/>
    </div>
  )

}
