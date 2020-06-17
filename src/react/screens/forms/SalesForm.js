import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import firebase from 'firebase';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel, productNames }) => {
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
          name="productName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please enter the name of the product!',
            },
          ]}
        >
          <Select
            placeholder="Select the product to sale."
            allowClear
          >
          {productNames.map((item, index) =>
            <Option value={item}>{item}</Option>
          )}
          </Select>
        </Form.Item>
        <Form.Item
          name="buyer"
          label="Buyer"
          rules={[
            {
              required: true,
              message: 'Please enter the name/company of the buyer!',
            },
          ]}
        >
          <Input/>
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

const SalesForm = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = async values => {

    const ref = firebase.database().ref('sales')
    const key = ref.push().key;
    const dateAdded = await (values.date.date() + '-' + values.date.month() + '-' + values.date.year())
    await ref.child(key).set({
          productName: values.productName,
          quantity: values.quantity,
          price: values.price,
          date: dateAdded,
          buyer: values.buyer,
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
        Add Sales
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        productNames={props.productNames}
      />
    </div>
  );
};

export default SalesForm;
