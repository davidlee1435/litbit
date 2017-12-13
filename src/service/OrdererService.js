import BaseDatabaseService from './BaseDatabaseService.js';
const _ = require('lodash');

export default class OrdererService extends BaseDatabaseService {
  constructor() {
    super('/orderers/');
  }

  addOrderToOrdererPromise(newOrder, uid) {
    return this.ref.child(uid).set({order: newOrder})
  }

  addOrderToOrderer(newOrder, uid, duid) {
    newOrder.delivererUid = duid;
    this.ref.child(uid).set({order: newOrder})
  }

  removeOrderFromOrderer(uid) {
    var removedOrder;
    this.ref.child(uid + '/order').once('value', (snapshot) => {
      if (snapshot.exists()) {
        removedOrder = snapshot.val();
        snapshot.ref.remove()
      } else {
        console.log("Snapshot does not exist");
      }
    })
    return removedOrder;
  }

  getOrderFromOrderer(uid) {
    var order;
    this.ref.child(uid + '/order').once('value', (snapshot) => {
      if (snapshot.exists()) {
        order = snapshot.val();
      } else {
        order = null;
      }
    })
    return order;
  }

}
