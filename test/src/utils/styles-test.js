import { describe } from 'mocha';
import { expect } from 'chai';
import { getInteractiveLayerIds, update } from '../../../src/utils/styles';
import Immutable from 'immutable';
import { styleSat as styleA, styleSatCountryLabels as styleB } from '../../example-styles';
import sinon from 'sinon';

const getMapStylesMock = () => ({
  setStyle: sinon.spy(),
  addLayer: sinon.spy(),
  removeLayer: sinon.spy(),
  addSource: sinon.spy(),
  removeSource: sinon.spy(),
  setFilter: sinon.spy(),
  setLayerZoomRange: sinon.spy(),
  setPaintProperty: sinon.spy(),
  setLayoutProperty: sinon.spy(),
});

describe('Styles util', () => {
  describe('getInteractiveLayerIds() function', () => {
    describe('while working with string styles', () => {
      it('will not return layer IDs', () => {
        expect(getInteractiveLayerIds('mapbox://styles/mapbox/streets-v9')).to.have.length(0);
      });
    });
    describe('while working with style spec objects for standard arrays', () => {
      const mapStyle = {
        layers: [
          { id: 'layer1', interactive: true },
          { id: 'layer2' },
          { id: 'layer3', interactive: false },
          { id: 'layer4', interactive: true },
        ],
      };

      it('will return interactive layer IDs for standard arrays', () => {
        const result = getInteractiveLayerIds(mapStyle);
        expect(result).to.have.length(2);
        expect(result[0]).to.equal('layer1');
        expect(result[1]).to.equal('layer4');
      });
      it('will return interactive layer IDs for immutable styles', () => {
        const result = getInteractiveLayerIds(Immutable.fromJS(mapStyle));
        expect(result).to.have.length(2);
        expect(result[0]).to.equal('layer1');
        expect(result[1]).to.equal('layer4');
      });
    });
  });
  describe('update() function', () => {
    describe('while working with style differences', () => {
      it('will replace the map style when they are simple style references', () => {
        const map = getMapStylesMock();
        update(map, 'abc', 'def');
        expect(map.setStyle.calledOnce);
      });

      it('will update the map style with differences', () => {
        const map = getMapStylesMock();
        update(map, styleA, styleB);
        expect(map.addSource.calledOnce);
        expect(map.addLayer.calledOnce);
      });

      it('will return on immutable object comparisons', () => {
        const map = getMapStylesMock();
        const style = Immutable.fromJS(styleA);
        update(map, style, style);
      });

      it('will update the geoJSON data using setData');
    });
  });
});
