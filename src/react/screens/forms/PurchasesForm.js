import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import firebase from 'firebase';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Purchased new items? Add with this form!"
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
          name="productName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please enter the name of the product!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: 'Please enter the price of this product purchased!',
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: 'Please enter the quantity of the product purchased!',
            },
          ]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please enter the price of this product purchased!',
            },
          ]}
        >
          <InputNumber/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const PurchasesForm = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = async values => {

    // Make purchases
    const ref = firebase.database().ref('purchases')
    const key = ref.push().key;
    const dateAdded = await (values.date.date() + '-' + values.date.month() + '-' + values.date.year())
    await ref.child(key).set({
          productName: values.productName,
          quantity: values.quantity,
          price: values.price,
          date: dateAdded,
          key: key
    })

    // Make or update inventory
    const inventoryRef = firebase.database().ref('inventory/' + values.productName)
    inventoryRef.once('value', function (snapshot) {
      if (snapshot.val() != null) {
        const previousQuantity = snapshot.val().quantity
        inventoryRef.update({
              quantity: (parseInt(values.quantity) + parseInt(previousQuantity))
        })
      } else {
        inventoryRef.set({
              quantity: values.quantity,
              productName: values.productName
        })
      }
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
        Add Purchases
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

export default PurchasesForm;
