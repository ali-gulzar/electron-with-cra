import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from './assets/animations/login_books.json';
import WebFont from 'webfontloader';

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
};

WebFont.load({
  google: {
    families: ['Indie Flower', 'MuseoModerno:300,400,700', 'Kaushan Script']
  },
  typekit: {
    id: 'corner-store-jf'
  }
})

export default class App extends Component {

  renderLoadingAnimation = () => {
    return (
      <Lottie options={defaultOptions}
        height={400}
        width={400}
      />
    )
  }

  renderLoginForm = () => {
    return (
      <div style={{display: 'flex', marginLeft: 50}}>
        <h3>Login to your account</h3>
      </div>
    )
  }

  render(){

    return(
      <div>
        <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Kaushan Script'}}>
          <h1>Ultra Strength Shop</h1>
        </div>
        <div style={{display: 'flex'}}>
          {this.renderLoadingAnimation()}
        </div>
      </div>
    )
  }
}