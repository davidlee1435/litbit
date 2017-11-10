// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import DeliveryScreen from '../src/DeliveryScreen.js';

test('DeliveryScreen test', () => {
  const tree = renderer.create(<DeliveryScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});