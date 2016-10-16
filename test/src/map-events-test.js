import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import MapEvents from '../../src/map-events';

const defaultProps = {};
const defaultContext = {
  map: {},
};
const getMountedComponent = (props = defaultProps, context = defaultContext) => (mount(<MapEvents {...props} />, { context }));

describe('Map Events component', () => {
  it('will mount', () => {
    sinon.spy(MapEvents.prototype, 'componentDidMount');
    getMountedComponent();
    expect(MapEvents.prototype.componentDidMount.calledOnce).to.equal(true);
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
