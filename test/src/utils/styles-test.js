import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { getInteractiveLayerIds, update } from '../../../src/utils/styles';

describe('Styles util', () => {
  describe('getInteractiveLayerIds() function', () => {
    describe('while working with string styles', () => {
      it('will not return layer IDs');
    });
    describe('while working with style spec objects', () => {
      it('will return interactive layersIDs');
      it('will not return non-interactive layer IDs');
    });
  });
  describe('update() function', () => {
    describe('while working with style differences', () => {
      it('will update the geoJSON data using setData');
      it('will update the map style with differences');
    });
  });
});
