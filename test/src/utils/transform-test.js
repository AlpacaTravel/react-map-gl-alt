import { describe, it } from 'mocha';
import { expect } from 'chai';
import { LngLat } from 'mapbox-gl';
import { cloneTransform } from '../../../src/utils/transform';

export class TestTransform {
  constructor() {
    this.tileSize = '512';
    this.minZoom = 0;
    this.maxZoom = 22;
    this.latRange = [-85.05113, 85.05113];
    this.width = 300;
    this.width = 400;
    this.center = LngLat.convert([10, 20]);
    this.zoom = 1;
    this.angle = 87;
    this.altitude = 1.5;
    this.pitch = 15;
  }

  foo() {
    return 'bar';
  }
}

describe('Trasnform Utils', () => {
  describe('cloneTransform() function', () => {
    const original = new TestTransform();
    const clone = cloneTransform(original);
    it('will correctly clone a separate object', () => {
      /* eslint no-unused-expressions: 0 */
      expect(clone).to.exist;
      expect(clone).to.not.equal(original);
      expect(clone.foo).to.exist;
      expect(clone.foo()).to.equal('bar');
    });
    it('will correctly copy across values', () => {
      expect(clone.tileSize).to.equal(original.tileSize);
      expect(clone.minZoom).to.equal(original.minZoom);
      expect(clone.maxZoom).to.equal(original.maxZoom);
      expect(clone.latRange).to.equal(original.latRange);
      expect(clone.width).to.equal(original.width);
      expect(clone.height).to.equal(original.height);
      expect(clone.zoom).to.equal(original.zoom);
      expect(clone.angle).to.equal(original.angle);
      expect(clone.altitude).to.equal(original.altitude);
      expect(clone.pitch).to.equal(original.pitch);
    });
    it('will correctly establish a new center', () => {
      expect(clone.center).to.not.equal(original.center);
      console.log(original.center);
      expect(clone.center.lng).to.equal(original.center.lng);
      expect(clone.center.lat).to.equal(original.center.lat);
    });
  });
});
