import React from 'react';
import { Image, TouchableHighlight, Picker, TextInput, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import AuthService from './service/AuthService.js';
import OrderService from './service/OrderService.js';
import DelivererService from './service/DelivererService.js';

import {StackNavigator, NavigationActions} from 'react-navigation';

const _ = require('lodash');

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

class AvailabilityButton extends React.Component {
  constructor() {
    super();
    this.delivererService = new DelivererService();
  }

  render() {
    return (
      <Button
        title="I'm Available"
        onPress={() => this.delivererService.toggleAvailableDeliverer(this.props.uid)}
      />
    )
  }
}


export default class DeliveryScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Delivery Mode",
    headerRight: <Button title='Order Mode' onPress={() => navigation.dispatch(resetAction)}/>,
    // headerRight: <LogoutButton/>,
    headerLeft: <AvailabilityButton uid={screenProps.user.providerData[0].uid}/>
  });

  constructor() {
    super();
    this.authService = new AuthService();
    this.delivererService = new DelivererService();
    this.orderService = new OrderService();
    this.state = {
      pendingDelivery: null,
      delivererUid: null,
    }
  }


  acceptOrder(){
    this.delivererService.acceptOrder(this.state.delivererUid).then((response) => {
      this.setState(_.merge({}, this.state, {
        pendingDelivery: {
          delivererId: this.state.delivererId
        }
      }))
    });
  }

  renderConfirmation() {
    return (
      <View style={styles.container}>
          <Text>
            [orderer name] ordered [order detail] at [order address]
          </Text>
          <Button title="Remove Order" onPress={() => this.delivererService.removeOrderFromDeliverer(this.state.delivererUid)}/>
          <Button
            onPress={() => {this.acceptOrder()}}
            title="Accept"
            color="#841584"
            accessibilityLabel="Accept"
          />
      </View>
    )
  }

  renderDefault() {
    return (
      <View style={styles.container}>
        {
          /*
          <Button title="Trigger Order" onPress={() => this.triggerOrder()}/>
          <Button title="Remove Order" onPress={() => this.delivererService.removeOrderFromDeliverer(this.state.delivererUid)}/>
          */
        }
        <Text>
          No orders yet!
        </Text>
      </View>
    )
  }

  renderDelivery() {
    return (
      <View style={styles.container}>
        <Button title="Finish Order" onPress={() => this.orderService.finishOrder(this.state.delivererUid)}/>
        <Text>
          Delivery in progress
        </Text>
      </View>
    )
  }

  componentWillMount() {
    var uid = this.props.screenProps.user.providerData[0].uid;
    if(!_.isNull(uid)) {
      this.setState(_.merge({}, this.state, {
        delivererUid: uid
      }))
    }
    var currentDeliveryRef = this.delivererService.ref.child('available/' + uid + '/order');

    currentDeliveryRef.on('value', (data) => {
      this.setState(() => {
        return { pendingDelivery: data.val() }
      });
    });
  }

  componentWillUnmount() {
    var currentDeliveryRef = this.delivererService.ref.child('available/' + this.state.delivererUid);
    currentDeliveryRef.off();
  }

  render() {
    var hasDelivery = Boolean(this.state.pendingDelivery);
    var hasAccepted = Boolean(this.state.pendingDelivery && this.state.pendingDelivery.delivererId)
    if (hasDelivery) {
      if (hasAccepted) {
        return this.renderDelivery();
      }
      return this.renderConfirmation();
    }
    return this.renderDefault();
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
  header: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingBottom: 40
  },
  price: {
    fontWeight: 'bold',
    fontSize: 40
  },
  itemListed: {
    fontSize: 40,
    textAlign: 'left'
  },
  checkoutButton: {
  },
  checkoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
});
