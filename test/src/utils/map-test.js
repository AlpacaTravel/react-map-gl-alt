import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { updateOptions } from '../../../src/utils/map';

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
        expect(mapWrapper.setMinZoom.withArgs(4).calledOnce).to.equal(true);
      });
    });
    describe('will set maxZoom on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setMaxZoom.withArgs(4);
      updateOptions(mapWrapper, {}, { maxZoom: 17 });
      it('will update value', () => {
        expect(mapWrapper.setMaxZoom.withArgs(17).calledOnce).to.equal(true);
      });
    });
    describe('will set classes on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setClasses.withArgs(['a', 'b']);
      updateOptions(mapWrapper, {}, { mapClasses: ['a', 'b'] });
      it('will update value', () => {
        expect(mapWrapper.setClasses.withArgs(['a', 'b']).calledOnce).to.equal(true);
      });
    });
    describe('will set maxBounds on map', () => {
      const mapWrapper = getMapWrapper();
      mapWrapper.setMaxBounds.withArgs([-82.123, 82.123]);
      updateOptions(mapWrapper, {}, { maxBounds: [-82.123, 82.123] });
      it('will update value', () => {
        expect(mapWrapper.setMaxBounds.withArgs([-82.123, 82.123]).calledOnce).to.equal(true);
      });
    });
    describe('will set scrollZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { scrollZoomDisabled: false });
        expect(mapWrapper.scrollZoom.enable.calledOnce).to.equal(true);
        expect(mapWrapper.scrollZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { scrollZoomDisabled: true });
        expect(mapWrapper.scrollZoom.disable.calledOnce).to.equal(true);
        expect(mapWrapper.scrollZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set boxZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { boxZoomDisabled: false });
        expect(mapWrapper.boxZoom.enable.calledOnce).to.equal(true);
        expect(mapWrapper.boxZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { boxZoomDisabled: true });
        expect(mapWrapper.boxZoom.disable.calledOnce).to.equal(true);
        expect(mapWrapper.boxZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set dragRotate on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragRotateDisabled: false });
        expect(mapWrapper.dragRotate.enable.calledOnce).to.equal(true);
        expect(mapWrapper.dragRotate.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragRotateDisabled: true });
        expect(mapWrapper.dragRotate.disable.calledOnce).to.equal(true);
        expect(mapWrapper.dragRotate.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set dragPan on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragPanDisabled: false });
        expect(mapWrapper.dragPan.enable.calledOnce).to.equal(true);
        expect(mapWrapper.dragPan.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { dragPanDisabled: true });
        expect(mapWrapper.dragPan.disable.calledOnce).to.equal(true);
        expect(mapWrapper.dragPan.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set keyboard on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { keyboardDisabled: false });
        expect(mapWrapper.keyboard.enable.calledOnce).to.equal(true);
        expect(mapWrapper.keyboard.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { keyboardDisabled: true });
        expect(mapWrapper.keyboard.disable.calledOnce).to.equal(true);
        expect(mapWrapper.keyboard.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set doubleClickZoom on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { doubleClickZoomDisabled: false });
        expect(mapWrapper.doubleClickZoom.enable.calledOnce).to.equal(true);
        expect(mapWrapper.doubleClickZoom.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { doubleClickZoomDisabled: true });
        expect(mapWrapper.doubleClickZoom.disable.calledOnce).to.equal(true);
        expect(mapWrapper.doubleClickZoom.enable.calledOnce).to.equal(false);
      });
    });
    describe('will set touchZoomRotate on map', () => {
      it('will enable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { touchZoomRotateDisabled: false });
        expect(mapWrapper.touchZoomRotate.enable.calledOnce).to.equal(true);
        expect(mapWrapper.touchZoomRotate.disable.calledOnce).to.equal(false);
      });
      it('will disable', () => {
        const mapWrapper = getMapWrapper();
        updateOptions(mapWrapper, {}, { touchZoomRotateDisabled: true });
        expect(mapWrapper.touchZoomRotate.disable.calledOnce).to.equal(true);
        expect(mapWrapper.touchZoomRotate.enable.calledOnce).to.equal(false);
      });
    });
  });
  describe('performMoveAction() function', () => {
    // Currently tested in map tests, this util needs to be checked here
    it('will apply move actions to the map correctly');
  });
});
