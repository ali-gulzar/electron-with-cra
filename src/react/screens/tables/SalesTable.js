import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function SalesTable() {

  const [salesData, setSalesData] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);

  useEffect(() => {
    firebase.database().ref("sales").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setSalesTotal(snapshot.val().total.value)
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setSalesData(fetchedData);
      }
    });
  },[])

  function deleteItem (key, productName, quantity, price) {

    // Update sales database
    const itemReference = firebase.database().ref("sales/" + key);
    itemReference.remove();

    // Update total
    firebase.database().ref("sales/total").update({
      value: salesTotal - price
    })

    // Update inventory database
    const inventoryRef = firebase.database().ref('inventory').child(productName)
    inventoryRef.once('value', async function (snapshot) {
      const previousQuantity = snapshot.val().quantity
      inventoryRef.update({
        quantity: (parseInt(previousQuantity) + parseInt(quantity))
      })
    })

  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key, record.productName, record.quantity, record.price)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={salesData} scroll={{ x: 950 }} />
  )
}
