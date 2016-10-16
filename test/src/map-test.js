import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Map from '../../src/map';

const getMountedComponent = (props) => (mount(<Map {...props} />));
const simpleDefaultProps = {
  mapboxApiAccessToken: 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig',
  mapStyle: 'mapbox://styles/mapbox/streets-v9',
};

describe('Map component', () => {
  it('will mount', (done) => {
    sinon.spy(Map.prototype, 'componentDidMount');
    let component;
    try {
      component = getMountedComponent(simpleDefaultProps);
    } catch (err) { done(err); }

    expect(component.find('div.map')).to.have.length(1);
    expect(Map.prototype.componentDidMount.calledOnce).to.equal(true);
    done();
  });
  describe('while mounting', () => {
    it('will set the options correctly');
    it('will set the initial viewport');
    it('registers to the state handlers');
  });
  describe('while unmounting', () => {
    const component = getMountedComponent(simpleDefaultProps);
    component.node.componentWillUnmount();
    it('will call map remove on unmount');
  });
  describe('while receiving props', () => {
    it('will call update the options');
    it('will call update styles', () => {
      const component = getMountedComponent(simpleDefaultProps);
      component.setProps({
        ...simpleDefaultProps,
        center: [10, 10],
      });
    });
    it('will call update the viewport');
    it('will call update convenience handlers');
    it('will set center based on supplied latitude/longitude');
    it('will preference center over supplied latitude/longitude');
  });
  it('will pass the map facade to children context');
  describe('when updating viewport', () => {
    it('will detect viewport changes');
    it('will use the provided move action');
  });
  describe('when updating convenience handlers', () => {
    it('will update event listeners');
  });
  describe('conenience methods', () => {
    it('onClickFeatures will return features');
    it('onHoverFeatures will return features');
    it('onChangeViewport will supply a viewport');
  });
});
