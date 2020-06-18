import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../firebase.config.js';
import WebFont from 'webfontloader';

import LoginScreen from './screens/LoginScreen';
import Main from './screens/Main';
import './App.css';

// Load custom fonts
WebFont.load({
  google: {
    families: ['Indie Flower', 'MuseoModerno:700', 'Kaushan Script', 'Permanent Marker','Roboto:300,400,500,700']
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
        {loggedIn ? <Main logout={this.logOut}/> : <LoginScreen login={this.logIn}/>}
      </div>
    )
  }
}
