// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AcceptOrderScreen from '../src/AcceptOrderScreen.js';

test('AcceptOrderScreen test', () => {
  const tree = renderer.create(<AcceptOrderScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});