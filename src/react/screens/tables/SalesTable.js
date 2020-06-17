import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

export default function SalesTable() {

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    firebase.database().ref("sales").on('value', async function (snapshot) {
      if (snapshot.val()) {
        const fetchedData = await Object.values(snapshot.val());
        setSalesData(fetchedData);
      }
    });
  },[])

  function deleteItem (key) {
    const itemReference = firebase.database().ref("sales/" + key);
    itemReference.remove();
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
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={salesData} scroll={{ x: 950 }} />
  )
}
