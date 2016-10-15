import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Map from '../../src/map';

const getShallowComponent = (props) => (shallow(<Map {...props} />));

describe('Map component', () => {
  it('will shallow render', () => {
    const component = getShallowComponent({
      accessToken: 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
    });
    expect(component.find('div.map')).to.have.length(1);
  });
});
