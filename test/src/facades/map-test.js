import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import MapFacade from '../../../src/facades/map';
import TransformFacade from '../../../src/facades/transform';
import { TestTransform } from '../utils/map-test';

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
    transform: new TestTransform(),
  };
  const facade = new MapFacade(mapMock);
  it('will establish event listeners', () => {
    expect(mapMock.on.callCount).to.be.above(0);
  });
  it('can expose transform facade object', () => {
    expect(facade.transform).to.be.an.instanceof(TransformFacade);
  });
  it('can cloneTransform', () => {
    const clone = facade.cloneTransform();
    expect(clone).to.be.an.instanceof(TestTransform);
    expect(clone).to.not.equal(mapMock.transform);
  });
  it('can expose hasClass', () => {
    mapMock.hasClass.withArgs('param');
    facade.hasClass('param');
    expect(mapMock.hasClass.withArgs('param').calledOnce);
  });
  it('can expose getClasses', () => {
    facade.getClasses();
    expect(mapMock.getClasses.calledOnce);
  });
  it('can expose getBounds', () => {
    facade.getBounds();
    expect(mapMock.getBounds.calledOnce);
  });
  it('can expose project', () => {
    mapMock.project.withArgs('param');
    facade.project('param');
    expect(mapMock.project.withArgs('param').calledOnce);
  });
  it('can expose unproject', () => {
    mapMock.unproject.withArgs('param');
    facade.unproject('param');
    expect(mapMock.unproject.withArgs('param').calledOnce);
  });
  it('can expose queryRenderedFeatures', () => {
    mapMock.queryRenderedFeatures.withArgs('param', 'param');
    facade.queryRenderedFeatures('param', 'param');
    expect(mapMock.queryRenderedFeatures.withArgs('param', 'param').calledOnce);
  });
  it('can expose querySourceFeatures', () => {
    mapMock.querySourceFeatures.withArgs('param', 'param');
    facade.querySourceFeatures('param', 'param');

    expect(mapMock.querySourceFeatures.withArgs('param', 'param').calledOnce);
  });
  it('can expose getContainer', () => {
    facade.getContainer();
    expect(mapMock.getContainer.calledOnce);
  });
  it('can expose getCanvasContainer', () => {
    facade.getCanvasContainer();
    expect(mapMock.getCanvasContainer.calledOnce);
  });
  it('can expose getCanvas', () => {
    facade.getCanvas();
    expect(mapMock.getCanvas.calledOnce);
  });
  it('can expose loaded', () => {
    facade.loaded();
    expect(mapMock.loaded.calledOnce);
  });
  it('can expose getCenter', () => {
    facade.getCenter();
    expect(mapMock.getCenter.calledOnce);
  });
  it('can expose getZoom', () => {
    facade.getZoom();
    expect(mapMock.getZoom.calledOnce);
  });
  it('can expose getBearing', () => {
    facade.getBearing();
    expect(mapMock.getBearing.calledOnce);
  });
  it('can expose getPitch', () => {
    facade.getPitch();
    expect(mapMock.getPitch.calledOnce);
  });
});
