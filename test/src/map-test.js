import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Map from '../../src/map';

const getMountedComponent = (props) => (mount(<Map {...props} />));

describe('Map component', () => {
  describe('while mounting', () => {
    const component = getMountedComponent({
      accessToken: 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
    });
    expect(component.find('div.map')).to.have.length(1);

    it('will set the options correctly');
  });
  it('will call map delete on unmount');
});
