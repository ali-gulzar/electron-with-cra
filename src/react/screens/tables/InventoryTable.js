import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import firebase from 'firebase';

export default function InventoryTable() {

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    message.warning('Loading data, please wait...', 1);
    firebase.database().ref("inventory").on('value', async function (snapshot) {
      if (snapshot.val()) {
        await setInventoryData(Object.values(snapshot.val()))
      }
      await message.success("Data loaded.", 2)
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
