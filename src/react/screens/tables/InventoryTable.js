import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import firebase from 'firebase';

export default function InventoryTable() {

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    firebase.database().ref("inventory").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setInventoryData(Object.values(snapshot.val()))
      }
    });
  },[])

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
    }
  ];

  return (
    <Table columns={columns} dataSource={inventoryData} scroll={{ x: 950 }} />
  )
}
