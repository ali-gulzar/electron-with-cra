import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

export default function PurchasesTable() {

  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    firebase.database().ref("purchases").on('value', async function (snapshot) {
      if (snapshot.val()) {
        const fetchedData = await Object.values(snapshot.val());
        setPurchaseData(fetchedData);
      }
    });
  },[])

  function deleteItem (key, productName, quantity) {

    // Delete item from purchases
    const itemReference = firebase.database().ref("purchases/" + key);
    itemReference.remove();

    // Update inventory
    const inventoryRef = firebase.database().ref('inventory').child(productName)
    inventoryRef.once('value', function (snapshot) {
        const previousQuantity = snapshot.val().quantity
        inventoryRef.update({
              quantity: (parseInt(previousQuantity) - parseInt(quantity))
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
      title: 'Action',
      key: 'action',
      render: (text, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key, record.productName, record.quantity)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={purchaseData} scroll={{ x: 950 }} />
  )
}
