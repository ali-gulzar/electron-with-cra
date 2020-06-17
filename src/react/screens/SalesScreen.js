import React, { useEffect, useState } from 'react';
import SalesForm from './forms/SalesForm';
import SalesTable from './tables/SalesTable';
import firebase from 'firebase';

export default function SalesScreen () {

  const[productName, setProductName] = useState([]);

  useEffect(() => {
    getProductNames();
  },[])

  function getProductNames () {
    firebase.database().ref("inventory").on('value', async function (snapshot) {
      if (snapshot.val()) {
        const fetchedData = await Object.keys(snapshot.val());
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
