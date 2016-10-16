import { describe } from 'mocha';
import { expect } from 'chai';
import { cloneTransform } from '../../../src/utils/map';

class DummyTransform {
  constructor() {
    this.tileSize = '512';
    this.minZoom = 0;
    this.maxZoom = 22;
    this.latRange = [-85.05113, 85.05113];
    this.width = 300;
    this.width = 400;
    this.center = [10, 20];
    this.zoom = 1;
    this.angle = 87;
    this.altitude = 1.5;
    this.pitch = 15;
  }

  foo() {
    return 'bar';
  }
}

describe('Map Utils', () => {
  describe('updateOptions() function', () => {
    it('will not update existing properties');
    it('will update new properties');
  });
  describe('cloneTransform() function', () => {
    const original = new DummyTransform();
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
      expect(clone.lng).to.equal(original[0]);
      expect(clone.lat).to.equal(original[1]);
    });
  });
});
