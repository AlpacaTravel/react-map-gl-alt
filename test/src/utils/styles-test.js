import { describe } from 'mocha';
import { expect } from 'chai';
import { getInteractiveLayerIds, update } from '../../../src/utils/styles';
import Immutable from 'immutable';

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
      it('will update the geoJSON data using setData');
      it('will update the map style with differences');
    });
  });
});
