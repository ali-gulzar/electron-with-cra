import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Select, message } from 'antd';
import firebase from 'firebase';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Did some sales? Add with this form!"
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
          name="transaction"
          label="Transaction"
          rules={[
            {
              required: true,
              message: 'Please enter the name of the product!',
            },
          ]}
        >
          <Select
            placeholder="Reason to perform cash transaction!"
            allowClear
          >
          <Option value="sales (plus)">Sales</Option>
          <Option value="purchases (minus)">Purchases</Option>
          <Option value="sales-return (minus)">Sales Return</Option>
          <Option value="purchase-return (plus)">Purchase Return</Option>
          <Option value="expenses (minus)">Expenses</Option>
          <Option value="cash-input (plus)">Cash Input</Option>
          <Option value="cash-output (minus)">Cash Output</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please enter the description why you performed this transaction!',
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

const CashForm = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = async values => {
    const ref = firebase.database().ref('cash')
    const totalRef = ref.child('total')

    // Update total value
    totalRef.once('value', async function (snapshot) {
      if (snapshot.val()) {
        const previousTotal = snapshot.val().value
        if (values.transaction.includes('plus')) {
          await totalRef.update({
            value: (parseInt(previousTotal) + parseInt(values.cash))
          })
        } else {
          await totalRef.update({
            value: (parseInt(previousTotal) - parseInt(values.cash))
          })
        }
      } else {
        totalRef.set({
          value: values.cash
        })
      }
    })

    // Update cash database
    const key = ref.push().key;
    const dateAdded = await (values.date.date() + '-' + values.date.month() + '-' + values.date.year())
    await ref.child(key).set({
      transaction: values.transaction,
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
        Add Cash transaction
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

export default CashForm;
