import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App.js';
import AcceptOrderScreen from '../src/AcceptOrderScreen.js';


it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});