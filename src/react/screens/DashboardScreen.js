import React, { useEffect, useState, Component } from 'react';
import firebase from 'firebase';
import Card from './Card';
import Graph from './Graph';


export default function DashboardScreen () {

  const [cash, setCash] = useState(null);
  const [sales, setSales] = useState(null);

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
  },[])

  return (
    <div>
      <div style={{display: 'flex', marginBottom: 50}}>
        <Card colorValue="card-profit" title="Profit" value="0"/>
        <Card colorValue="card-sales" title="Sales" value={sales}/>
        <Card colorValue="card-expenses" title="Cash" value={cash}/>
      </div>
      <Graph/>
    </div>
  )

}
