import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './src/LoginScreen.js';
import HomeScreen from './src/HomeScreen.js';
import ConfirmationScreen from './src/ConfirmationScreen.js';
import OrderConfirmedScreen from './src/OrderConfirmedScreen.js';
import DeliveryScreen from './src/DeliveryScreen.js';
import AcceptOrderScreen from './src/AcceptOrderScreen.js';

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
  AcceptOrder: { screen: AcceptOrderScreen },
  // Home: { screen: HomeScreen },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthed: null,
    }
  }

  async componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isAuthed: (user != null)
      })
    });
  }

  render() {
    if(this.state.isAuthed==null) {
      return null
    } else if (this.state.isAuthed) {
      return (<MainNavigator screenProps={{'user': firebase.auth().currentUser}}/>)
    } else {
      return (<AuthNavigator/>)
    }
  }
}
