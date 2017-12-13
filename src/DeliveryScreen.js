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
    console.log(this.props.uid)
    return (
      <Button
        title="Toggle Availability"
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
      orderer: null,
      isAvailable: false,
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

  triggerOrder() {
    var order = {
      cart: {
        1: {
          defaultQuantity: 10,
          imageUrl: 1,
          key: 1,
          pricePerDefaultQuantity: 2.99,
          quantityOrdered: 5,
          title: "Cups",
        },
        2: {
          defaultQuantity: 2,
          imageUrl: 2,
          key: 2,
          pricePerDefaultQuantity: 2.99,
          quantityOrdered: 4,
          title: "Balls",
        },
      },
      delivererId: null,
      ordererId: "10210669950444906",
    }

    this.delivererService.addOrderToDeliverer(order, this.state.delivererUid);
  }


  renderConfirmation() {
    return (
      <View style={styles.container}>
          <Text>
            New Order
          </Text>
          <Image
            style={{width: 150, height: 150}}
            source={{uri: this.state.orderer.photoURL}}
          />
          <Text>
            Name: {this.state.orderer.displayName}
          </Text>
          <Text>
            Dorm Building: {this.state.orderer.dorm.building}
          </Text>
          <Text>
            Room: {this.state.orderer.dorm.room}
          </Text>
          <Button title="Reject" onPress={() => this.delivererService.removeOrderFromDeliverer(this.state.delivererUid)}/>
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
          <Button title="Trigger Order" onPress={() => this.triggerOrder()}/>
          <Button title="Remove Order" onPress={() => this.delivererService.removeOrderFromDeliverer(this.state.delivererUid)}/>
        <Text>
          No orders yet!
        </Text>
      </View>
    )
  }

  renderUnavailable() {
    return (
      <View style={styles.container}>
        <Text>
          Press Toggle Availability to start accepting orders
        </Text>
      </View>
    )
  }

  renderDelivery() {
    return (
      <View style={styles.container}>
        <Text>
          Delivery in progress
        </Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: this.state.orderer.photoURL}}
        />
        <Text>
          Name: {this.state.orderer.displayName}
        </Text>
        <Text>
          Dorm Building: {this.state.orderer.dorm.building}
        </Text>
        <Text>
          Room: {this.state.orderer.dorm.room}
        </Text>
        <Button title="Finish Order" onPress={() => this.orderService.finishOrder(this.state.delivererUid)}/>
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

    var currentDeliveryRef = this.delivererService.ref.child('available/' + uid);

    currentDeliveryRef.on('value', (snapshot) => {
      if (!snapshot.exists()) {
        console.log("deliverer not available")
        this.setState(() => {
          return {
            isAvailable: false
          }
        })
      } else {
        order = snapshot.child('order/').val()
        if (order) {
          var currentOrderer;
          this.authService.getUser(order.ordererId).then((currentOrderer) => {
            this.setState(() => {
              return {
                isAvailable: true,
                pendingDelivery: order,
                orderer: currentOrderer.val(),
              }
            });
          })
        }
        else {
          this.setState(() => {
            return {
              isAvailable: true,
              pendingDelivery: null,
              orderer: null,
            }
          })
        }
      }

    });
  }

  componentWillUnmount() {
    var currentDeliveryRef = this.delivererService.ref.child('available/' + this.state.delivererUid);
    currentDeliveryRef.off();
  }

  render() {
    if (!this.state.isAvailable) {
      return this.renderUnavailable();
    }
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
