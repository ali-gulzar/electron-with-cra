import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { LogoutOutlined, DashboardOutlined, ShoppingCartOutlined, ShopOutlined, ShoppingOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Card from './Card';

export default class DashboardScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  renderLogoutModal = () => {
    const {visible} = this.state;

    return (
      <Modal
      title="Logout"
      visible={visible}
      onOk={() => this.props.logout()}
      onCancel={() => this.setState({visible: false})}
      okText="Confirm"
      cancelText="Cancel"
      >
      <p>Are you sure you want to logout from this service?</p>
      </Modal>
    )
  }

  renderHeader = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{fontFamily: 'Kaushan Script'}}>Ultra Strength</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3 style={{marginRight: 20, fontFamily: 'MuseoModerno'}}>Umer Fiaz</h3>
          <LogoutOutlined style={{ fontSize: '40px'}} onClick={() => this.setState({visible: true})}/>
        </div>
      </div>
    )
  }

  renderMenu = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: 150, marginTop: 20, marginRight: 100}}>
        <Button type="primary" ghost={true} primary icon={<DashboardOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Dashboard
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShopOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Inventory
        </Button>
        <Button type="primary" ghost={true} primary icon={<PlusCircleOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Debtors
        </Button>
        <Button type="primary" ghost={true} primary icon={<MinusCircleOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Creditors
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShoppingCartOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Purchases
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShoppingOutlined/>} size="large" shape="round" style={{marginBottom: 10}}>
          Sales
        </Button>
      </div>
    )
  }

  renderStatistics = () => {
    return (
      <div style={{display: 'flex', marginTop: 20}}>
        <Card colorValue="card-profit"/>
        <Card colorValue="card-sales"/>
        <Card colorValue="card-expenses"/>
      </div>
    )
  }

  render(){

    return(
      <div style={{margin: 20}}>
          {this.renderHeader()}
          <div style={{display: 'flex'}}>
            {this.renderMenu()}
            {this.renderStatistics()}
          </div>

          {this.renderLogoutModal()}
      </div>
    )
  }
}
