import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import MapEvents from '../../src/map-events';

const getMountedComponent = (props, context) => (mount(<MapEvents {...props} />, { context }));

describe('Map Events component', () => {
  it('will mount', () => {
    const component = getMountedComponent({}, {
      map: {},
    });
  });
  describe('when mounting', () => {
    it('will set the listeners');
  });
  describe('when receiving props', () => {
    it('will update listeners');
  });

  describe('when unmounting', () => {
    it('will remove listeners');
  });

  it('will register event listeners');
  it('will remove event listeners');

  describe('while handling events', () => {
    it('will call the correct listeners');
  });
});
