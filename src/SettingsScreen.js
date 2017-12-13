import React from 'react';
import { Image, TouchableHighlight, Picker, TextInput, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator, NavigationActions} from 'react-navigation';

import AuthService from './service/AuthService.js';

const _ = require('lodash');

const homeAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Settings",
    headerLeft: <Button title='Home' onPress={() => navigation.dispatch(homeAction)}/>,
  });

  constructor() {
    super();
    this.authService = new AuthService();

    this.state = {
      user: null,
    }
  }

  componentWillMount() {
    var uid = this.props.screenProps.user.providerData[0].uid;
    this.authService.getUser(uid).then((userData) => {
      if(!_.isNull(userData)) {
        this.setState(() => {
          return {
            user: userData.val()
          }
        })
      }
    })
  }

  renderSettings() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingRight: 10, fontSize: 18}}>Dorm: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState(_.merge({}, this.state, {
              user: {
                dorm: {
                  building: text
                }
              }
            }))}
            value={this.state.user.dorm.building}
            placeholder="Dorm"
          />
        </View>


        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingRight: 10, fontSize: 18}}>Room: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState(_.merge({}, this.state, {
              user: {
                dorm: {
                  room: text
                }
              }
            }))}
            value={this.state.user.dorm.room}
            placeholder="Room Number"
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingRight: 10, fontSize: 18}}>Venmo Handle: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState(_.merge({}, this.state, {
              user: {
                venmoHandle: text
              }
            }))}
            value={this.state.user.venmoHandle}
            placeholder="Venmo Handle"
          />
        </View>


        <Button
          title="Update Settings"
          onPress={() => this.authService.updateUser(this.state.user.uid, this.state.user)}
        />

        <Button
          title="Logout"
          onPress={() => this.authService.signOut()}
        />
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  render() {
    return _.isNull(this.state.user) ? this.renderLoading() : this.renderSettings();
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
  textInput: {
    marginBottom: 20,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    paddingBottom: 40
  },
   header2: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 40
  },
  price: {
    fontSize: 30
  },
  itemListed: {
    fontSize: 25,
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
