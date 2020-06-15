import React, { Component } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import firebase from 'firebase';
import firebaseConfig from '../firebase.config.js';
import WebFont from 'webfontloader';

// Load custom fonts
WebFont.load({
  google: {
    families: ['Indie Flower', 'MuseoModerno:300,400,700', 'Kaushan Script']
  },
  typekit: {
    id: 'corner-store-jf'
  }
})

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

  logOut = () => {
    this.setState({loggedIn: false})
  }

  render(){
    const {loggedIn} = this.state;
    return(
      <div>
        {loggedIn ? <DashboardScreen logout={this.logOut}/> : <LoginScreen login={this.logIn}/>}
      </div>
    )
  }
}
