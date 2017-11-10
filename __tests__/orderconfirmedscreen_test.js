// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import OrderConfirmedScreen from '../src/OrderConfirmedScreen.js';

test('OrderConfirmedScreen test', () => {
  const tree = renderer.create(<OrderConfirmedScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});