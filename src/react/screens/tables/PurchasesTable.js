import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function PurchasesTable() {

  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);

  useEffect(() => {
    firebase.database().ref("purchases").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setPurchaseTotal(snapshot.val().total.value)
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setPurchaseData(fetchedData);
      }
    });
  },[])

  function deleteItem (key, productName, quantity, price) {

    // Update purchase database
    const itemReference = firebase.database().ref("purchases/" + key);
    itemReference.remove();

    // Update total purchases
    firebase.database().ref("purchases/total").update({
      value: purchaseTotal - price
    })

    // Update inventory database
    const inventoryRef = firebase.database().ref("inventory/" + productName)
    inventoryRef.once("value", function (snapshot) {
      const previousQuantity = snapshot.val().quantity
      inventoryRef.update({
        quantity: previousQuantity - quantity
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
    <Table columns={columns} dataSource={purchaseData} scroll={{ x: 950 }} />
  )
}
