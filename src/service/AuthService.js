import Expo from 'expo';
import secrets from '../../config/secrets.js';
import * as firebase from 'firebase';

import BaseDatabaseService from './BaseDatabaseService.js';
const _ = require('lodash');

export default class AuthService extends BaseDatabaseService {
  constructor() {
    super('/users/');
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  getUser(uid) {
    return this.ref.child(uid).once('value', (snapshot) => {
      if(snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
  }

  updateUser(uid, user) {
    return this.ref.child(uid).once('value', (snapshot) => {
      console.log(snapshot.val())
      console.log(user)
      snapshot.ref.set(user);
    })
  }

  addUserToDatabase(user) {
    this.ref.child(user.uid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log("User exists");
        } else {
          snapshot.ref.set(user).then((response) => {
            return user;
          }).catch((e) => {
            throw e;
          });
        }
      }).catch((e) => {
        throw e;
      });
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      secrets.facebookSecrets.appId,
      { permissions: ['public_profile', 'email'] }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        .then((response) => {
          var user = _.merge({}, response.providerData[0], {
            dorm: {
              building: '',
              room: '',
            },
            isDeliverer: false,
          });
          this.addUserToDatabase(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      console.log("Signed out!")
    }, (error) => {
      console.log("Error occured")
    })
  }
}
