import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Map from '../../src/map';

const getMountedComponent = (props) => (mount(<Map {...props} />));

describe('Map component', () => {
  it('will mount', () => {
    const component = getMountedComponent({
      accessToken: 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
    });
    expect(component.find('div.map')).to.have.length(1);
  });
  describe('while mounting', () => {
    it('will set the options correctly');
  });
  describe('while unmounting', () => {
    it('will call map remove on unmount');
  });
  describe('while receiving props', () => {
    it('will call update the options');
    it('will call update styles');
    it('will call update the viewport');
    it('will call update convenience handlers');
  });
  it('will pass the accessor map to children context');
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
    it('onChangeViewport will return features');
  });
});
