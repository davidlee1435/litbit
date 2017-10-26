import React from 'react';
import { Image, TouchableHighlight, Picker, TextInput, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';

const _ = require('lodash');

export default class OrderConfirmedScreen extends React.Component {
  static navigationOptions = {
    title: "Order Confirmed",
    headerLeft: null,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Your order is on its way!!
        </Text>

        <FlatList
        data={[{title: 'Title Text', key: 'item1'}, {title: 'title2', key: 'item2'}]}
        renderItem={({item}) => <Text key={item.key}> {item.title}</Text>}
        />

        <View style={styles.checkoutWrapper}>
          <Button
            style={styles.checkoutButton}
            title="Rando button"
            color="#841584"
            accessibilityLabel="Rando Button"
          />
        </View>
      </View>
	  )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  feed: {
    alignItems: 'center',
  },
  itemButtonContainer: {
    alignItems: 'center',
  },
  itemButton: {
    width: 200,
  },
  checkoutButton: {
  },
  checkoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
    baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
