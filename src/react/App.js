import React, { Component } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import firebase from 'firebase';
import firebaseConfig from '../firebase.config.js';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount () {
    firebase.initializeApp(firebaseConfig);
  }

  logIn = () => {
    this.setState({loggedIn: true})
  }

  render(){
    const {loggedIn} = this.state;
    return(
      <div>
        {loggedIn ? <DashboardScreen/> : <LoginScreen login={this.logIn}/>}
      </div>
    )
  }
}