import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function CashTable() {

  const [cashData, setCashData] = useState([]);

  useEffect(() => {
    firebase.database().ref("cash").on('value', async function (snapshot) {
      if (snapshot.val()) {
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setCashData(fetchedData);
      }
    });
  },[])

  function deleteItem (key, cash, operation) {

    const operationPlus = operation.includes('plus')

    const itemReference = firebase.database().ref("cash/" + key);
    itemReference.remove();

    const totalReference = firebase.database().ref("cash/total");
    totalReference.once("value", function(snapshot) {
      const previousTotal = snapshot.val().value
      totalReference.update({
        value: operationPlus ? (previousTotal - cash) : (previousTotal + cash)
      })
    })
  }

  const columns = [
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
    },
    {
      title: 'Cash',
      dataIndex: 'cash',
      key: 'cash',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key, record.cash, record.transaction)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={cashData} scroll={{ x: 950 }} />
  )
}
