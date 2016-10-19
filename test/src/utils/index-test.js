import { describe } from 'mocha';
import { expect } from 'chai';
import { diff, has, mod, lngLatBoundsArray, lngLatArray } from '../../../src/utils';
import mapboxgl from 'mapbox-gl';
import * as _ from 'lodash';

describe('Utils', () => {
  describe('diff() function', () => {
    it('will correctly diff booleans', () => {
      expect(diff('foo', { foo: true }, { foo: true })).to.equal(false);
      expect(diff('foo', { foo: false }, { foo: true })).to.equal(true);
    });
    it('will correctly diff zero values', () => {
      expect(diff('foo', { foo: 0 }, { foo: 0 })).to.equal(false);
    });
    it('will correctly diff empty values', () => {
      expect(diff('foo', {}, { foo: true })).to.equal(true);
      expect(diff('foo', null, { foo: true })).to.equal(true);
      expect(diff('foo', null, null)).to.equal(false);
      expect(diff('foo', {}, {})).to.equal(false);
      expect(diff('foo', { foo: true }, null)).to.equal(true);
      expect(diff('foo', { foo: true }, {})).to.equal(true);
    });
    it('will correctly diff array values', () => {
      expect(diff('foo', { foo: [1, 2, 3] }, { foo: [1, 2, 3] })).to.equal(false);
      expect(diff('foo', { foo: [2, 1, 3] }, { foo: [1, 2, 3] })).to.equal(true);
      expect(diff('foo', { foo: [2, 1, 3] }, { foo: [1, 2, 4] })).to.equal(true);
      expect(diff('foo', { foo: [2, 3] }, { foo: [1, 2, 4] })).to.equal(true);
    });
    it('will correctly diff deeper array collections', () => {
      expect(diff('foo', { foo: [[1, 2], [3, 4]] }, { foo: [[1, 2], [3, 4]] })).to.equal(false);
      expect(diff('foo', { foo: [[1, 2], [3, 5]] }, { foo: [[1, 2], [3, 4]] })).to.equal(true);
    });
    it('will correctly diff object values', () => {
      expect(diff('foo', { foo: { bar: true } }, { foo: { bar: false } })).to.equal(true);
      expect(diff('foo', { foo: { bar: true } }, { foo: { bar: true } })).to.equal(false);
      expect(diff('foo', { foo: { bar: 1 } }, { foo: { bar: 0 } })).to.equal(true);
    });
  });
  describe('has() function', () => {
    it('will respond true when an object has a property', () => {
      expect(has({ a: 'val' }, 'a'));
    });
    it('will response false when an object does not have a property', () => {
      expect(has({ a: 'val' }, 'b')).to.equal(false);
    });
  });
  describe('mod() function', () => {
    it('will correctly mod supplied coordinates', () => {
      expect(mod(190 + 180, 360) - 180).to.equal(-170);
      expect(mod(-190 + 180, 360) - 180).to.equal(170);
    });
  });
  describe('lngLatBoundsArray() function', () => {
    it('will return an array from a mapboxgl.LngLatBounds', () => {
      const sw = new mapboxgl.LngLat(-73.9876, 40.7661);
      const ne = new mapboxgl.LngLat(-73.9397, 40.8002);
      const llb = new mapboxgl.LngLatBounds(sw, ne);
      expect(_.isEqual(lngLatBoundsArray({ bounds: llb }), [[-73.9876, 40.7661], [-73.9397, 40.8002]])).to.equal(true);
    });
    it('will preference an center over lng/lat', () => {
      const bounds = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
      const result = lngLatBoundsArray({ bounds });
      expect(result).to.equal(bounds);
    });
    it('will return null if no bounds', () => {
      expect(lngLatBoundsArray({})).to.equal(null);
    });
  });
  describe('lngLatArray() function', () => {
    it('will return an array from a mapboxgl.LngLat', () => {
      const center = new mapboxgl.LngLat(-73.9876, 40.7661);
      /* eslint no-unused-expressions: 0 */
      const result = lngLatArray({ center });
      expect(result).to.exist;
      expect(result[0]).to.equal(-73.9876);
      expect(result[1]).to.equal(40.7661);
    });
    it('will preference an center over lng/lat', () => {
      const center = [-73.9876, 40.7661];
      const result = lngLatArray({ center, longitude: 10, latitude: 20 });
      expect(result[0]).to.equal(-73.9876);
      expect(result[1]).to.equal(40.7661);
    });
    it('will preference an center over lng/lat', () => {
      const result = lngLatArray({ center: null, longitude: 10, latitude: 20 });
      expect(result[0]).to.equal(10);
      expect(result[1]).to.equal(20);
    });
    it('will return null if no center or lng/lat', () => {
      expect(lngLatArray({})).to.equal(null);
    });
  });
});
