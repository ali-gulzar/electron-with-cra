import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/review.json';
import WebFont from 'webfontloader';
import { Form, Input, Button, notification } from 'antd';
import '../App.css';

// Load custom fonts
WebFont.load({
  google: {
    families: ['Indie Flower', 'MuseoModerno:300,400,700', 'Kaushan Script']
  },
  typekit: {
    id: 'corner-store-jf'
  }
})

// Options for animations
const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
};

// Layout for login form
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight / 3.5,
      disable: false
    }
  }

  onFinish = values => {
    this.setState({disable: true})
    notification['success']({
      message: 'Successfull',
      description: `Welcome ${values.username} to Ultra Strength Shop.`
    });
    this.setState({disable: false})
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  renderLoadingAnimation = () => {
    return (
      <div style={{display: 'flex'}}>
        <Lottie options={defaultOptions}
          height={625}
          width={625}
        />
      </div>
    )
  }

  renderLoginForm = () => {

    var {windowHeight, disable} = this.state;

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginTop: windowHeight }}>
        <h3>Login to your account</h3>
        <Form
          {...layout}
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={disable}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  render(){

    return(
      <div className="App">
        <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Kaushan Script'}}>
          <h1 style={{marginTop: 20, fontSize: 40}}>Ultra Strength Shop</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {this.renderLoginForm()}
          {this.renderLoadingAnimation()}
        </div>
      </div>
    )
  }
}