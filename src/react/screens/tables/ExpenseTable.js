import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';
import firebase from 'firebase';

var omit = require('lodash.omit');

export default function DebtorsTable() {

  const [expenseData, setExpenseData] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    message.warning('Loading data, please wait...', 1);
    firebase.database().ref("expenses").on('value', async function (snapshot) {
      if (snapshot.val()) {
        setExpenseTotal(snapshot.val().total.value)
        const removeTotal = await omit(snapshot.val(), ['total'])
        const fetchedData = await Object.values(removeTotal);
        setExpenseData(fetchedData);
      }
      await message.success("Data loaded.", 2)
    });
  },[])

  function deleteItem (key, cash) {

    const itemReference = firebase.database().ref("expenses/" + key);
    itemReference.remove();

    const totalReference = firebase.database().ref("expenses/total");
    totalReference.update({
      value: expenseTotal - cash
    })
  }

  const columns = [
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
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
    <Table columns={columns} dataSource={expenseData} scroll={{ x: 950 }} />
  )
}
