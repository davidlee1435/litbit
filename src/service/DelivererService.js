import BaseDatabaseService from './BaseDatabaseService.js';
const _ = require('lodash');


export default class DelivererService extends BaseDatabaseService {
  constructor() {
    super('/deliverers/');
    this.addAvailableDeliverer = this.addAvailableDeliverer.bind(this);
    this.removeAvailableDeliverer = this.removeAvailableDeliverer.bind(this);
    this.queryDeliverer = this.queryDeliverer.bind(this);
  }

  getAvailableDeliverers() {
    return this.ref.child('available/').once('value', (snapshot) => {
      return snapshot;
    });
  }

  toggleAvailableDeliverer(uid) {
    this.ref.child('available/' + uid).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        this.addAvailableDeliverer(uid)
      } else {
        this.removeAvailableDeliverer(uid)
      }
    })
  }

  addAvailableDeliverer(uid) {
    this.ref.child('available/' + uid).set({order: false});
  }

  removeAvailableDeliverer(uid) {
    this.ref.child('available/' + uid).once('value', (snapshot) => {
      snapshot.ref.set(null);
    })
  }

  queryDeliverer(order, uid) {
    // this.addOrderToDelivererPromise(order, uid).then((response) => {
    //   this.ref.child('available/' + uid + '/order').on('value', (snapshot) => {
    //     var data = snapshot.val();
    //     console.log(data)
    //   });
    // })
    this.addOrderToDeliverer(order, uid);

  }

  addOrderToDelivererPromise(newOrder, uid) {
    return this.ref.child('available/' + uid).set({order: newOrder})
  }

  addOrderToDeliverer(newOrder, uid) {
    this.ref.child('available/' + uid).set({order: newOrder})
  }

  removeOrderFromDeliverer(uid) {
    var removedOrder;
    this.ref.child('available/' + uid + '/order').once('value', (snapshot) => {
      if (snapshot.exists()) {
        removedOrder = snapshot.val();
        snapshot.ref.set(false);
      } else {
        console.log("Snapshot does not exist");
      }
    })
    return removedOrder;
  }

  getOrderFromDeliverer(uid) {
    var order;
    this.ref.child('available/' + uid + '/order').once('value', (snapshot) => {
      if (snapshot.exists()) {
        order = snapshot.val();
      } else {
        order = null;
      }
    })
    return order;
  }

  getOrderFromDelivererPromise(uid) {
    return this.ref.child('available/' + uid + '/order').once('value', (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
  }

  acceptOrder(uid) {
    var orderRef = this.ref.child('available/' + uid + '/order');

    return orderRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        if (!_.isUndefined(snapshot.val.delivererId)) {
          console.log("Deliverer ID already defined is not null")
        } else {
          snapshot.ref.child('delivererId').set(uid)
        }
      } else {
        console.log("Order doesn't exist")
      }
    })
  }

}
