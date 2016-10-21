import { describe, it } from 'mocha';
import { expect } from 'chai';
import { LngLat, Point } from 'mapbox-gl';
import { cloneTransform } from '../../../src/utils/transform';
import Transform from 'mapbox-gl/js/geo/transform';


describe('Transform Utils', () => {
  describe('cloneTransform() function', () => {
    const original = new Transform(0, 22);
    original.resize(100, 100);
    original.center = LngLat.convert([20, 10]);
    const clone = cloneTransform(original);
    it('will correctly clone a separate object', () => {
      /* eslint no-unused-expressions: 0 */
      expect(clone).to.exist;
      expect(clone).to.not.equal(original);
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
      expect(clone.bearing).to.equal(original.bearing);
      expect(clone.altitude).to.equal(original.altitude);
      expect(clone.pitch).to.equal(original.pitch);

      // Check some alignment of internal workings (if relevant)
      expect(clone._unmodified).to.equal(original._unmodified);
    });
    it('will correctly establish a new center', () => {
      expect(clone.center).to.not.equal(original.center);
      expect(clone.center.lng).to.equal(original.center.lng);
      expect(clone.center.lat).to.equal(original.center.lat);
    });
    it('will have a pixelMatrixInverse', () => {
      expect(clone.pixelMatrixInverse).to.exist;
    });
    it('will perform pointLocation calculations', () => {
      const result = clone.pointLocation(Point.convert({ x: 10, y: 20 }));
      expect(result).to.exist;
    });
    it('will perform scaleZoom caculations', () => {
      const zoom = clone.scaleZoom(clone.zoom * 1.1);
      expect(zoom).to.exist;
    });
  });
});
