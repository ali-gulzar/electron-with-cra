import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import firebase from 'firebase';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Did some expenses? Add with this form!"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="purchases-form"
      >
        <Form.Item
          name="expense"
          label="Expense"
          rules={[
            {
              required: true,
              message: 'Please enter the name of the expense!',
            },
          ]}
        >
        <Input/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter the description why you performed this expenditure!',
            },
          ]}
        >
          <Input.TextArea/>
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: 'Please enter the date you performed this transaction!',
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
        <Form.Item
          name="cash"
          label="Cash"
          rules={[
            {
              required: true,
              message: 'Please enter the amount of cash!',
            },
          ]}
        >
          <InputNumber/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ExpenseForm = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = async values => {
    const ref = firebase.database().ref('expenses')
    const totalRef = ref.child('total')

    // Update total value
    totalRef.once('value', async function (snapshot) {
      if (snapshot.val()) {
        const previousTotal = snapshot.val().value
        totalRef.update({
          value: previousTotal + values.cash
        })
      } else {
        totalRef.set({
          value: values.cash
        })
      }
    })

    // Update debtor database
    const key = ref.push().key;
    const dateAdded = await (values.date.date() + '-' + values.date.month() + '-' + values.date.year())
    await ref.child(key).set({
      expense: values.expense,
      description: values.description,
      date: dateAdded,
      cash: values.cash,
      key: key
    })
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Expenses
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ExpenseForm;
