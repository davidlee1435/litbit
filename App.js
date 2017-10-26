import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginScreen.js';
import HomeScreen from './src/HomeScreen.js';
import ConfirmationScreen from './src/ConfirmationScreen.js';
import OrderConfirmedScreen from './src/OrderConfirmedScreen.js';
import DeliveryScreen from './src/DeliveryScreen.js';
import AcceptOrderScreen from './src/AcceptOrderScreen.js';

import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';

import secrets from './config/secrets.js';
var firebaseApp = firebase.initializeApp(secrets.firebaseConfig)

const AuthNavigator = StackNavigator({
  Login: { screen: LoginScreen },
});

const MainNavigator = StackNavigator({

  Home: { screen: HomeScreen },
  Confirm: { screen: ConfirmationScreen },
  Delivery: { screen: DeliveryScreen },
  OrderConfirmed: { screen: OrderConfirmedScreen },
  AcceptOrder: { screen: AcceptOrderScreen }
  // Home: { screen: HomeScreen },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthed: null,
      currUser: null,
    }
  }

  async componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          isAuthed: true,
          currUser: user
        })
      } else {
        this.setState({
          isAuthed: false
        })
      }
    });
  }

  render() {
    if(this.state.isAuthed==null) {
      return null
    } else if (this.state.isAuthed) {
      return (<MainNavigator screenProps={{'user': this.state.currUser}}/>)
    } else {
      return (<AuthNavigator/>)
    }
  }
}
