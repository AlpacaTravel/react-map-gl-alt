import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import TransformFacade from '../../../src/facades/transform';

describe('Transform Facade', () => {
  const transformMock = {
    coveringZoomLevel: sinon.spy(),
    coveringTiles: sinon.spy(),
    zoomScale: sinon.spy(),
    scaleZoom: sinon.spy(),
    lngX: sinon.spy(),
    latY: sinon.spy(),
    xLng: sinon.spy(),
    yLng: sinon.spy(),
    locationPoint: sinon.spy(),
    pointLocation: sinon.spy(),
    locationCoordinate: sinon.spy(),
    coordinateLocation: sinon.spy(),
    pointCoordinate: sinon.spy(),
    coordinatePoint: sinon.spy(),
    calculatePosMatrix: sinon.spy(),
  };

  const wrapper = new TransformFacade(transformMock);
  it('can expose coveringZoomLevel', () => {
    transformMock.coveringZoomLevel.withArgs('param');
    wrapper.coveringZoomLevel('param');
    expect(transformMock.coveringZoomLevel.withArgs('param').calledOnce);
  });
  it('can expose coveringTiles', () => {
    transformMock.coveringTiles.withArgs('param');
    wrapper.coveringTiles('param');
    expect(transformMock.coveringTiles.withArgs('param').calledOnce);
  });
  it('can expose zoomScale', () => {
    transformMock.zoomScale.withArgs('param');
    wrapper.zoomScale('param');
    expect(transformMock.zoomScale.withArgs('param').calledOnce);
  });
  it('can expose scaleZoom', () => {
    transformMock.scaleZoom.withArgs('param');
    wrapper.scaleZoom('param');
    expect(transformMock.scaleZoom.withArgs('param').calledOnce);
  });
  it('can expose lngX', () => {
    transformMock.lngX.withArgs('param', 'param');
    wrapper.lngX('param', 'param');
    expect(transformMock.lngX.withArgs('param', 'param').calledOnce);
  });
  it('can expose latY', () => {
    transformMock.latY.withArgs('param', 'param');
    wrapper.latY('param', 'param');
    expect(transformMock.latY.withArgs('param', 'param').calledOnce);
  });
  it('can expose xLng', () => {
    transformMock.xLng.withArgs('param', 'param');
    wrapper.xLng('param', 'param');
    expect(transformMock.xLng.withArgs('param', 'param').calledOnce);
  });
  it('can expose yLng', () => {
    transformMock.yLng.withArgs('param', 'param');
    wrapper.yLng('param', 'param');
    expect(transformMock.yLng.withArgs('param', 'param').calledOnce);
  });
  it('can expose locationPoint', () => {
    transformMock.locationPoint.withArgs('param');
    wrapper.locationPoint('param');
    expect(transformMock.locationPoint.withArgs('param').calledOnce);
  });
  it('can expose pointLocation', () => {
    transformMock.pointLocation.withArgs('param');
    wrapper.pointLocation('param', 'param');
    expect(transformMock.pointLocation.withArgs('param').calledOnce);
  });
  it('can expose locationCoordinate', () => {
    transformMock.locationCoordinate.withArgs('param');
    wrapper.locationCoordinate('param');
    expect(transformMock.locationCoordinate.withArgs('param').calledOnce);
  });
  it('can expose coordinateLocation', () => {
    transformMock.coordinateLocation.withArgs('param');
    wrapper.coordinateLocation('param');
    expect(transformMock.coordinateLocation.withArgs('param').calledOnce);
  });
  it('can expose pointCoordinate', () => {
    transformMock.pointCoordinate.withArgs('param');
    wrapper.pointCoordinate('param');
    expect(transformMock.pointCoordinate.withArgs('param').calledOnce);
  });
  it('can expose coordinatePoint', () => {
    transformMock.coordinatePoint.withArgs('param');
    wrapper.coordinatePoint('param');
    expect(transformMock.coordinatePoint.withArgs('param').calledOnce);
  });
  it('can expose calculatePosMatrix', () => {
    transformMock.calculatePosMatrix.withArgs('param');
    wrapper.calculatePosMatrix('param');
    expect(transformMock.calculatePosMatrix.withArgs('param').calledOnce);
  });
});
