import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { DollarOutlined, LogoutOutlined, DashboardOutlined, ShoppingCartOutlined, ShopOutlined, ShoppingOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import DashboardScreen from './DashboardScreen';
import InventoryScreen from './InventoryScreen';
import DebtorsScreen from './DebtorsScreen';
import CreditorsScreen from './CreditorsScreen';
import PurchasesScreen from './PurchasesScreen';
import SalesScreen from './SalesScreen';
import CashScreen from './CashScreen';

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      view: 'debtors'
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

  renderScreen = () => {
    const {view} = this.state;
    switch (view) {
      case 'dashboard':
        return <DashboardScreen/>
      case 'inventory':
        return <InventoryScreen/>
      case 'debtors':
        return <DebtorsScreen/>
      case 'creditors':
        return <CreditorsScreen/>
      case 'purchases':
        return <PurchasesScreen/>
      case 'sales':
        return <SalesScreen/>
      default:
        return <CashScreen/>
    }
  }

  renderHeader = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{fontFamily: 'Kaushan Script'}}>Ultra Strength</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3 style={{marginRight: 20, fontFamily: 'MuseoModerno', marginTop: 6}}>Umer Fiaz</h3>
          <LogoutOutlined style={{ fontSize: '40px'}} onClick={() => this.setState({visible: true})}/>
        </div>
      </div>
    )
  }

  renderMenu = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: 150, marginTop: 20, marginRight: 100}}>
        <Button type="primary" ghost={true} primary icon={<DashboardOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'dashboard'})}>
          Dashboard
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShopOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'inventory'})}>
          Inventory
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShoppingCartOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'purchases'})}>
          Purchases
        </Button>
        <Button type="primary" ghost={true} primary icon={<ShoppingOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'sales'})}>
          Sales
        </Button>
        <Button type="primary" ghost={true} primary icon={<DollarOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'cash'})}>
          Cash
        </Button>
        <Button type="primary" ghost={true} primary icon={<PlusCircleOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'debtors'})}>
          Debtors
        </Button>
        <Button type="primary" ghost={true} primary icon={<MinusCircleOutlined/>} size="large" shape="round" style={{marginBottom: 10}} onClick={() => this.setState({view: 'creditors'})}>
          Creditors
        </Button>
      </div>
    )
  }

  render(){

    return(
      <div style={{margin: 20}}>
        {this.renderHeader()}
        <div style={{display: 'flex'}}>
          {this.renderMenu()}
          {this.renderScreen()}
        </div>
        {this.renderLogoutModal()}
      </div>
    )
  }
}
