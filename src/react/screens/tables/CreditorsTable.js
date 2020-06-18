import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function CreditorsTable() {

  const [creditorsData, setCreditorsData] = useState([]);
  const [cerditorTotal, setCreditorTotal] = useState(0);

  useEffect(() => {
    firebase.database().ref("creditors").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setCreditorTotal(snapshot.val().total.value)
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setCreditorsData(fetchedData);
      }
    });
  },[])

  function deleteItem (key, cash) {

    const itemReference = firebase.database().ref("creditors/" + key);
    itemReference.remove();

    const totalReference = firebase.database().ref("creditors/total");
    totalReference.update({
      value: cerditorTotal - cash
    })
  }

  const columns = [
    {
      title: 'Creditor Name',
      dataIndex: 'creditorName',
      key: 'creditorName',
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
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record.key, record.cash)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={creditorsData} scroll={{ x: 950 }} />
  )
}
