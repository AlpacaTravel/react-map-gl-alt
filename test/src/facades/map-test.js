import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import MapFacade from '../../../src/facades/map';
import TransformFacade from '../../../src/facades/transform';
import Transform from 'mapbox-gl/js/geo/transform';

describe('Map Facade', () => {
  const mapMock = {
    on: sinon.spy(),
    off: sinon.spy(),
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
    transform: new Transform(),
  };
  const facade = new MapFacade(mapMock);
  sinon.spy(facade._evented, 'on');
  sinon.spy(facade._evented, 'off');
  it('will establish event listeners', () => {
    expect(mapMock.on.callCount).to.be.above(0);
  });
  it('will call the evented "on" implementation for events', () => {
    facade.on('param', () => {});
    expect(facade._evented.on.calledOnce).to.equal(true);
  });
  it('will call the evented "off" implementation for events', () => {
    facade.off('param', () => {});
    expect(facade._evented.off.calledOnce).to.equal(true);
  });
  it('can expose transform facade object', () => {
    expect(facade.transform).to.be.an.instanceof(TransformFacade);
  });
  it('can cloneTransform', () => {
    const clone = facade.cloneTransform();
    expect(clone).to.be.an.instanceof(Transform);
    expect(clone).to.not.equal(mapMock.transform);
  });
  it('can expose hasClass', () => {
    mapMock.hasClass.withArgs('param');
    facade.hasClass('param');
    expect(mapMock.hasClass.withArgs('param').calledOnce).to.equal(true);
  });
  it('can expose getClasses', () => {
    facade.getClasses();
    expect(mapMock.getClasses.calledOnce).to.equal(true);
  });
  it('can expose getBounds', () => {
    facade.getBounds();
    expect(mapMock.getBounds.calledOnce).to.equal(true);
  });
  it('can expose project', () => {
    mapMock.project.withArgs('param');
    facade.project('param');
    expect(mapMock.project.withArgs('param').calledOnce).to.equal(true);
  });
  it('can expose unproject', () => {
    mapMock.unproject.withArgs('param');
    facade.unproject('param');
    expect(mapMock.unproject.withArgs('param').calledOnce).to.equal(true);
  });
  it('can expose queryRenderedFeatures', () => {
    mapMock.queryRenderedFeatures.withArgs('param', 'param');
    facade.queryRenderedFeatures('param', 'param');
    expect(mapMock.queryRenderedFeatures.withArgs('param', 'param').calledOnce).to.equal(true);
  });
  it('can expose querySourceFeatures', () => {
    mapMock.querySourceFeatures.withArgs('param', 'param');
    facade.querySourceFeatures('param', 'param');

    expect(mapMock.querySourceFeatures.withArgs('param', 'param').calledOnce).to.equal(true);
  });
  it('can expose getContainer', () => {
    facade.getContainer();
    expect(mapMock.getContainer.calledOnce).to.equal(true);
  });
  it('can expose getCanvasContainer', () => {
    facade.getCanvasContainer();
    expect(mapMock.getCanvasContainer.calledOnce).to.equal(true);
  });
  it('can expose getCanvas', () => {
    facade.getCanvas();
    expect(mapMock.getCanvas.calledOnce).to.equal(true);
  });
  it('can expose loaded', () => {
    facade.loaded();
    expect(mapMock.loaded.calledOnce).to.equal(true);
  });
  it('can expose getCenter', () => {
    facade.getCenter();
    expect(mapMock.getCenter.calledOnce).to.equal(true);
  });
  it('can expose getZoom', () => {
    facade.getZoom();
    expect(mapMock.getZoom.calledOnce).to.equal(true);
  });
  it('can expose getBearing', () => {
    facade.getBearing();
    expect(mapMock.getBearing.calledOnce).to.equal(true);
  });
  it('can expose getPitch', () => {
    facade.getPitch();
    expect(mapMock.getPitch.calledOnce).to.equal(true);
  });
  it('functions are bound to the map facade', () => {
    expect(facade.on.prototype).to.equal(Function.bind.prototype);
    expect(facade.off.prototype).to.equal(Function.bind.prototype);
    expect(facade.hasClass.prototype).to.equal(Function.bind.prototype);
    expect(facade.getClasses.prototype).to.equal(Function.bind.prototype);
    expect(facade.getBounds.prototype).to.equal(Function.bind.prototype);
    expect(facade.project.prototype).to.equal(Function.bind.prototype);
    expect(facade.unproject.prototype).to.equal(Function.bind.prototype);
    expect(facade.queryRenderedFeatures.prototype).to.equal(Function.bind.prototype);
    expect(facade.querySourceFeatures.prototype).to.equal(Function.bind.prototype);
    expect(facade.getContainer.prototype).to.equal(Function.bind.prototype);
    expect(facade.getCanvasContainer.prototype).to.equal(Function.bind.prototype);
    expect(facade.loaded.prototype).to.equal(Function.bind.prototype);
    expect(facade.getCenter.prototype).to.equal(Function.bind.prototype);
    expect(facade.getZoom.prototype).to.equal(Function.bind.prototype);
    expect(facade.getBearing.prototype).to.equal(Function.bind.prototype);
    expect(facade.getPitch.prototype).to.equal(Function.bind.prototype);
    expect(facade.cloneTransform.prototype).to.equal(Function.bind.prototype);
  });
});
