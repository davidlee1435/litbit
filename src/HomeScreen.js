import React from 'react';
import { Image, TouchableHighlight, Picker, TextInput, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';

import AuthService from './service/AuthService.js';

const _ = require('lodash');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
  };

  constructor() {
    super();
    this.authService = new AuthService();
    this.state = {
      cart: {
        1: 0,
        2: 0,
      },
      items: [
        {
          key: 1,
          title: 'Cups',
          imageUrl: require('./img/cupstxt1.png'),
          defaultQuantity: 10,
          pricePerDefaultQuantity: 2.99,
        },
        {
          key: 2,
          title: 'Balls',
          imageUrl: require('./img/ballstxt1.png'),
          defaultQuantity: 2,
          pricePerDefaultQuantity: 2.99,
        },
      ]
    }
  }

  checkoutCart() {
    var mergedCart = _.forEach(this.state.items, (item)=> {
      item.quantityOrdered = this.state.cart[item.key]
    })
    this.props.navigation.navigate('Confirm', {'user': this.props.screenProps.user, 'cart': mergedCart})
  }

  delivery() {
    this.props.navigation.navigate('Delivery')
  }

  clearCart() {
    this.setState(_.merge({}, this.state, {
      cart: _.mapValues(this.state.cart, () => 0)
    }))
  }

  onPress(item) {
    var count = this.state.cart[item.key];
    this.setState(_.merge({}, this.state, {
      cart: {
        [item.key]: count+1,
      }
    }))
  }

  render() {
    // const {items} = this.state.items;
    return (
      <View style={styles.container}>
        <Button
          style={styles.checkoutButton}
          onPress={() => {this.delivery()}}
          title="Delivery"
          color="#841584"
          accessibilityLabel="Delivery"
        />
        <Button
          style={styles.checkoutButton}
          onPress={() => {this.authService.signOut()}}
          title="Log out"
          color="#841584"
        />
        <FlatList
          contentContainerStyle={styles.feed}
          horizontal = {true}
          data = {this.state.items}
          renderItem={({item}) => {
            return (
              <View style={styles.itemButtonContainer}>
                <TouchableHighlight onPress={() => this.onPress(item)}>
                  <Image
                    style={styles.itemButton}
                    source={item.imageUrl}
                  />
                </TouchableHighlight>
              </View>
            )
          }}
        />
        <View style={styles.checkoutWrapper}>
          <View>
            <FlatList
              data = {this.state.items}
              renderItem={({item}) => {
                return (
                  <Text>
                    {item.title}: {this.state.cart[item.key] * item.defaultQuantity}
                  </Text>
                )
              }}
            />
          </View>

          <Button
            style={styles.checkoutButton}
            onPress={() => this.clearCart()}
            title="Clear Cart"
            color="#841584"
            accessibilityLabel="Clear Cart"
          />
          <Button
            style={styles.checkoutButton}
            disabled={_.sum(_.values(this.state.cart)) === 0}
            onPress={() => {this.checkoutCart()}}
            title="Checkout"
            color="#841584"
            accessibilityLabel="Checkout"
          />
        </View>
      </View>
	  )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  feed: {
    alignItems: 'center',
  },
  itemButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#66b4f3',

  },
  itemButton: {
    height: 200,
    width:200,
  },
  checkoutButton: {
  },
  checkoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  submit:{
    // marginRight:70,
    // marginLeft:70,
    // marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10,
    paddingLeft:10,
    backgroundColor:'grey',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }
});
