//a snapshot test of the home page - check that it renders correctly
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Components/Home.js';

it('renders correctly', () => {
  const tree = renderer
    .create(<Home></Home>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
