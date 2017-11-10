// Link.react-test.js
import React from 'react';
import HomeScreen from '../src/HomeScreen.js';
import renderer from 'react-test-renderer';

test('HomeScreen test', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();

  // tree.checkoutCart();
  // expect(tree).toMatchSnapshot();


  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});







// import React from 'react'
// import HomeScreen from '../src/HomeScreen.js';
//  // checkoutCart() {
//  //    var mergedCart = _.forEach(this.state.items, (item)=> {
//  //      item.quantityOrdered = this.state.cart[item.key]
//  //    })
//  //    this.props.navigation.navigate('Confirm', {'user': this.props.screenProps.user, 'cart': mergedCart})
//  //  }

// test('renders correct navigation', (t) => {
//   const HomeScreen = new HomeScreen();
//   HomeScreen.nav = 'Confirm';
//   t.is(HomeScreen.nav, 'Confirm')
// })

// it('renders correctly', () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// // test('user can be constructed with default parameters', t => {
// //   new HomeScreen({ platformType: 'cli', platformId: 1 });
// //   t.pass();
// // });