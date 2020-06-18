import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function DebtorsTable() {

  const [debtorsData, setDebtorsData] = useState([]);
  const [debtorTotal, setDebtorTotal] = useState(0);

  useEffect(() => {
    message.warning('Loading data, please wait...', 1);
    firebase.database().ref("debtors").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setDebtorTotal(snapshot.val().total.value)
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setDebtorsData(fetchedData);
      }
      await message.success("Data loaded.", 2);
    });
  },[])

  function deleteItem (key, cash) {

    const itemReference = firebase.database().ref("debtors/" + key);
    itemReference.remove();

    const totalReference = firebase.database().ref("debtors/total");
    totalReference.update({
      value: debtorTotal - cash
    })
  }

  const columns = [
    {
      title: 'Debtor Name',
      dataIndex: 'debtorName',
      key: 'debtorName',
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
    <Table columns={columns} dataSource={debtorsData} scroll={{ x: 950 }} />
  )
}
