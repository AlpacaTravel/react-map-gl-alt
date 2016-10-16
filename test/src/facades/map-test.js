import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import MapFacade from '../../../src/facades/map';

describe('Map Facade', () => {
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
  const exposeper = new MapFacade(mapMock);
  it('will establish event listeners', () => {
    expect(mapMock.on.callCount).to.be.above(0);
  });
  it('can expose transform facade object');
  it('can cloneTransform');
  it('can expose hasClass', () => {
    mapMock.hasClass.withArgs('param');
    exposeper.hasClass('param');
    expect(mapMock.hasClass.withArgs('param').calledOnce);
  });
  it('can expose getClasses', () => {
    exposeper.getClasses();
    expect(mapMock.getClasses.calledOnce);
  });
  it('can expose getBounds', () => {
    exposeper.getBounds();
    expect(mapMock.getBounds.calledOnce);
  });
  it('can expose project', () => {
    mapMock.project.withArgs('param');
    exposeper.project('param');
    expect(mapMock.project.withArgs('param').calledOnce);
  });
  it('can expose unproject', () => {
    mapMock.project.withArgs('param');
    exposeper.project('param');
    expect(mapMock.project.withArgs('param').calledOnce);
  });
  it('can expose queryRenderedFeatures', () => {
    mapMock.queryRenderedFeatures.withArgs('param', 'param');
    exposeper.queryRenderedFeatures('param', 'param');
    expect(mapMock.queryRenderedFeatures.withArgs('param', 'param').calledOnce);
  });
  it('can expose querySourceFeatures', () => {
    mapMock.querySourceFeatures.withArgs('param', 'param');
    exposeper.querySourceFeatures('param', 'param');

    expect(mapMock.querySourceFeatures.withArgs('param', 'param').calledOnce);
  });
  it('can expose getContainer', () => {
    exposeper.getContainer();
    expect(mapMock.getContainer.calledOnce);
  });
  it('can expose getCanvasContainer', () => {
    exposeper.getCanvasContainer();
    expect(mapMock.getCanvasContainer.calledOnce);
  });
  it('can expose getCanvas', () => {
    exposeper.getCanvas();
    expect(mapMock.getCanvas.calledOnce);
  });
  it('can expose loaded', () => {
    exposeper.loaded();
    expect(mapMock.loaded.calledOnce);
  });
  it('can expose getCenter', () => {
    exposeper.getCenter();
    expect(mapMock.getCenter.calledOnce);
  });
  it('can expose getZoom', () => {
    exposeper.getZoom();
    expect(mapMock.getZoom.calledOnce);
  });
  it('can expose getBearing', () => {
    exposeper.getBearing();
    expect(mapMock.getBearing.calledOnce);
  });
  it('can expose getPitch', () => {
    exposeper.getPitch();
    expect(mapMock.getPitch.calledOnce);
  });
});
