import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import firebase from 'firebase';

export default function DebtorsTable() {

  const [debtorsData, setDebtorsData] = useState([]);

  useEffect(() => {
    console.log("TODO")
  },[])

  function deleteItem () {
    console.log("TOD");
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
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem()}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  return (
    <Table columns={columns} dataSource={debtorsData} scroll={{ x: 950 }} />
  )
}
