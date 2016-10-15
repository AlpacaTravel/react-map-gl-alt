import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import MapAccessor from '../../../src/utils/map-accessor';

describe('MapAccessor', () => {
  const mapMock = {
    on: sinon.spy(),
    hasClass: sinon.spy(),
    getClasses: sinon.spy(),
    getBounds: sinon.spy(),
    project: sinon.spy(),
    unproject: sinon.spy(),
    queryRenderedFeatures: sinon.spy(),
    querySourceFeatures: sinon.spy(),
    getContainer: sinon.spy(),
    getCanvasContainer: sinon.spy(),
    getCanvas: sinon.spy(),
    loaded: sinon.spy(),
    getCenter: sinon.spy(),
    getZoom: sinon.spy(),
    getBearing: sinon.spy(),
    getPitch: sinon.spy(),
  };
  const wrapper = new MapAccessor(mapMock);
  it('will establish event listeners', () => {
    expect(mapMock.on.callCount).to.be.above(0);
  });
  it('can wrap hasClass', () => {
    wrapper.hasClass('param');
    mapMock.hasClass.withArgs('param');
    expect(mapMock.hasClass.calledOnce);
  });
  it('can wrap getClasses', () => {
    wrapper.getClasses();
    expect(mapMock.getClasses.calledOnce);
  });
  it('can wrap getBounds', () => {
    wrapper.getBounds();
    expect(mapMock.getBounds.calledOnce);
  });
  it('can wrap project', () => {
    wrapper.project('param');
    mapMock.project.withArgs('param');
    expect(mapMock.project.calledOnce);
  });
  it('can wrap unproject', () => {
    wrapper.project('param');
    mapMock.project.withArgs('param');
    expect(mapMock.project.calledOnce);
  });
  it('can wrap queryRenderedFeatures', () => {
    wrapper.queryRenderedFeatures('param', 'param');
    mapMock.queryRenderedFeatures.withArgs('param', 'param');
    expect(mapMock.queryRenderedFeatures.calledOnce);
  });
  it('can wrap querySourceFeatures', () => {
    wrapper.querySourceFeatures('param', 'param');
    mapMock.querySourceFeatures.withArgs('param', 'param');
    expect(mapMock.querySourceFeatures.calledOnce);
  });
  it('can wrap getContainer', () => {
    wrapper.getContainer();
    expect(mapMock.getContainer.calledOnce);
  });
  it('can wrap getCanvasContainer', () => {
    wrapper.getCanvasContainer();
    expect(mapMock.getCanvasContainer.calledOnce);
  });
  it('can wrap getCanvas', () => {
    wrapper.getCanvas();
    expect(mapMock.getCanvas.calledOnce);
  });
  it('can wrap loaded', () => {
    wrapper.loaded();
    expect(mapMock.loaded.calledOnce);
  });
  it('can wrap getCenter', () => {
    wrapper.getCenter();
    expect(mapMock.getCenter.calledOnce);
  });
  it('can wrap getZoom', () => {
    wrapper.getZoom();
    expect(mapMock.getZoom.calledOnce);
  });
  it('can wrap getBearing', () => {
    wrapper.getBearing();
    expect(mapMock.getBearing.calledOnce);
  });
  it('can wrap getPitch', () => {
    wrapper.getPitch();
    expect(mapMock.getPitch.calledOnce);
  });
});
