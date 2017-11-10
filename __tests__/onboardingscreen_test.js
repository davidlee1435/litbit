// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import OnboardingScreen from '../src/OnboardingScreen.js';

test('OnboardingScreen test', () => {
  const tree = renderer.create(<OnboardingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});