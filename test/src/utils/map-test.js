import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { cloneTransform, updateOptions } from '../../../src/utils/map';

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

const getMapWrapper = () => ({
  setMinZoom: sinon.spy(),
  setMaxZoom: sinon.spy(),
  setClasses: sinon.spy(),
  setMaxBounds: sinon.spy(),
  scrollZoom: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  boxZoom: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  dragRotate: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  dragPan: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  keyboard: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  doubleClickZoom: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
  touchZoomRotate: {
    disable: sinon.spy(),
    enable: sinon.spy(),
  },
});

describe('Map Utils', () => {
  describe('updateOptions() function', () => {
    describe('will set minZoom on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setMinZoom.withArgs(4);
      updateOptions(mapWrapper, {}, { minZoom: 4 });
      it('will update value', () => {
        expect(mapWrapper.setMinZoom.withArgs(4).calledOnce);
      });
    });
    describe('will set maxZoom on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setMaxZoom.withArgs(4);
      updateOptions(mapWrapper, {}, { maxZoom: 17 });
      it('will update value', () => {
        expect(mapWrapper.setMaxZoom.withArgs(17).calledOnce);
      });
    });
    describe('will set classes on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setClasses.withArgs(['a', 'b']);
      updateOptions(mapWrapper, {}, { mapClasses: ['a', 'b'] });
      it('will update value', () => {
        expect(mapWrapper.setClasses.withArgs(['a', 'b']).calledOnce);
      });
    });
    describe('will set maxBounds on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setMaxBounds.withArgs([-82.123, 82.123]);
      updateOptions(mapWrapper, {}, { maxBounds: [-82.123, 82.123] });
      it('will update value', () => {
        expect(mapWrapper.setMaxBounds.withArgs([-82.123, 82.123]).calledOnce);
      });
    });
    describe('will set scrollZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { scrollZoomDisabled: false });
        expect(mapWrapper.scrollZoom.enable.calledOnce);
        expect(mapWrapper.scrollZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { scrollZoomDisabled: true });
        expect(mapWrapper.scrollZoom.disable.calledOnce);
        expect(mapWrapper.scrollZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set boxZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { boxZoomDisabled: false });
        expect(mapWrapper.boxZoom.enable.calledOnce);
        expect(mapWrapper.boxZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { boxZoomDisabled: true });
        expect(mapWrapper.boxZoom.disable.calledOnce);
        expect(mapWrapper.boxZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set dragRotate on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragRotateDisabled: false });
        expect(mapWrapper.dragRotate.enable.calledOnce);
        expect(mapWrapper.dragRotate.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragRotateDisabled: true });
        expect(mapWrapper.dragRotate.disable.calledOnce);
        expect(mapWrapper.dragRotate.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set dragPan on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragPanDisabled: false });
        expect(mapWrapper.dragPan.enable.calledOnce);
        expect(mapWrapper.dragPan.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragPanDisabled: true });
        expect(mapWrapper.dragPan.disable.calledOnce);
        expect(mapWrapper.dragPan.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set keyboard on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { keyboardDisabled: false });
        expect(mapWrapper.keyboard.enable.calledOnce);
        expect(mapWrapper.keyboard.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { keyboardDisabled: true });
        expect(mapWrapper.keyboard.disable.calledOnce);
        expect(mapWrapper.keyboard.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set doubleClickZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { doubleClickZoomDisabled: false });
        expect(mapWrapper.doubleClickZoom.enable.calledOnce);
        expect(mapWrapper.doubleClickZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { doubleClickZoomDisabled: true });
        expect(mapWrapper.doubleClickZoom.disable.calledOnce);
        expect(mapWrapper.doubleClickZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set touchZoomRotate on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { touchZoomRotateDisabled: false });
        expect(mapWrapper.touchZoomRotate.enable.calledOnce);
        expect(mapWrapper.touchZoomRotate.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { touchZoomRotateDisabled: true });
        expect(mapWrapper.touchZoomRotate.disable.calledOnce);
        expect(mapWrapper.touchZoomRotate.enable.calledOnce).to.equal(false);
      });
    });
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
