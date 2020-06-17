import React, { useEffect, useState } from 'react';
import SalesForm from './forms/SalesForm';
import SalesTable from './tables/SalesTable';
import firebase from 'firebase';

var filter = require('lodash.filter');

export default function SalesScreen () {

  const[productName, setProductName] = useState([]);

  useEffect(() => {
    getProductNames();
  },[])

  function getProductNames () {
    firebase.database().ref("purchases").on('value', async function (snapshot) {
      if (snapshot.val()) {
        let fetchedData = await Object.values(snapshot.val());
        fetchedData = fetchedData.map(value => value.productName)
        await setProductName(fetchedData)
      }
    });
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
          <p style={{fontFamily: 'MuseoModerno', fontSize: 30, marginRight: 30}}>Sales</p>
      </div>
      <div style={{marginBottom: 50}}>
        <SalesForm productNames={productName}/>
      </div>
      <SalesTable/>
    </div>
  )
}
