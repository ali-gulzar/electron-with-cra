import React, { Component } from 'react';
import { Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

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
        <h1 style={{fontFamily: 'Kaushan Script', marginLeft: 20}}>Ultra Strength</h1>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
          <h3 style={{marginRight: 20, marginTop: 5, fontFamily: 'MuseoModerno'}}>Umer Fiaz</h3>
          <LogoutOutlined style={{ fontSize: '40px', marginRight: 20 }} onClick={() => this.setState({visible: true})}/>
        </div>
      </div>
    )
  }

  render(){

    return(
      <div>
          {this.renderHeader()}
          {this.renderLogoutModal()}
      </div>
    )
  }
}
