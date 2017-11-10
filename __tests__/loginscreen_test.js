// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/LoginScreen.js';

test('LoginScreen test', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});