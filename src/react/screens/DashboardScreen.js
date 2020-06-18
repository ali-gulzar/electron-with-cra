import React, { useEffect, useState, Component } from 'react';
import firebase from 'firebase';
import Card from './Card';
import Graph from './Graph';


export default function DashboardScreen () {

  const [cash, setCash] = useState(0);

  useEffect(() => {
    firebase.database().ref('cash').child('total').once('value', async function(snapshot) {
      if(snapshot.val()) {
        setCash(snapshot.val().value)
      }
    })
  },[])

  return (
    <div>
      <div style={{display: 'flex', marginTop: 20, marginBottom: 50}}>
        <Card colorValue="card-profit" title="Profit" value="1,300,000"/>
        <Card colorValue="card-sales" title="Sales" value="5,500,000"/>
        <Card colorValue="card-expenses" title="Cash" value={cash}/>
      </div>
      <Graph/>
    </div>
  )

}
