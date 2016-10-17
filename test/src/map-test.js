import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Immutable from 'immutable';
import Map from '../../src/map';
import MapFacade from '../../src/facades/map';

const getMountedComponent = (props) => (mount(<Map {...props} />));
const simpleDefaultProps = {
  mapboxApiAccessToken: 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig',
  mapStyle: Immutable.fromJS({
    version: 8,
    center: [-73.9749, 40.7736],
    zoom: 12.5,
    sources: {},
    layers: [],
  }),
  center: [144.9633222, -37.8141234],
};

describe('Map component', () => {
  describe('while mounting', () => {
    const component = getMountedComponent(simpleDefaultProps);
    const map = component.node.getChildContext().map;

    it('will render', () => {
      expect(component.find('div.map')).to.have.length(1);
    });
    it('will provide children map facade context', () => {
      /* eslint no-unused-expressions: 0 */
      expect(map).to.exist;
      expect(map).to.be.instanceof(MapFacade);
    });
    it('will merge will default props', () => {
      expect(map.transform.minZoom).to.equal(Map.defaultProps.minZoom);
      expect(map.transform.maxZoom).to.equal(Map.defaultProps.maxZoom);
      expect(map.transform.bearing).to.equal(Map.defaultProps.bearing);
      expect(map.transform.zoom).to.equal(Map.defaultProps.zoom);
      expect(map.transform.pitch).to.equal(Map.defaultProps.pitch);
    });
    it('will set the initial viewport', () => {
      expect(map.transform.center.lng).to.equal(simpleDefaultProps.center[0]);
      expect(map.transform.center.lat).to.equal(simpleDefaultProps.center[1]);
    });
  });
  describe('while unmounting', () => {
    const component = getMountedComponent(simpleDefaultProps);
    sinon.spy(component.node._map, 'remove');
    component.node.componentWillUnmount();
    it('will call map remove on unmount', () => {
      expect(component.node._map.remove.calledOnce).to.equal(true);
    });
  });
  describe('while receiving props', () => {
    const component = getMountedComponent(simpleDefaultProps);
    sinon.spy(component.node, '_updateMapViewport');
    sinon.spy(component.node, '_updateMapOptions');
    sinon.spy(component.node, '_updateStyle');
    sinon.spy(component.node, '_updateConvenienceHandlers');
    component.setProps({
      ...simpleDefaultProps,
      center: null,
      longitude: 10,
      latitude: 20,
      mapStyle: Immutable.fromJS({
        version: 8,
        sources: {
          example: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [],
            },
          },
        },
        layers: [],
      }),
      maxZoom: 19,
      move: (target) => ({
        command: 'jumpTo',
        args: [target],
      }),
    });
    const map = component.node.getChildContext().map;
    it('will call update the options', () => {
      // TODO: Don't spy on the internal
      expect(component.node._updateMapOptions.calledOnce).to.equal(true);
      expect(map.transform.maxZoom).to.be.equal(19);
    });
    it('will call update styles', () => {
      // TODO: Don't spy on the internal
      expect(component.node._updateStyle.calledOnce).to.equal(true);
    });
    it('will call update the viewport', () => {
      // TODO: Don't spy on the internal
      expect(component.node._updateMapViewport.calledOnce).to.equal(true);
      const center = map.transform.center;
      expect(Math.round(center.lng)).to.equal(10);
      expect(Math.round(center.lat)).to.equal(20);
    });
    it('will call update convenience handlers', () => {
      // TODO: Don't spy on the internal
      expect(component.node._updateConvenienceHandlers.calledOnce).to.equal(true);
    });
  });
  describe('mounting without a center', () => {
    const component = getMountedComponent({
      ...simpleDefaultProps,
      center: null,
      longitude: 12,
      latitude: 13,
    });
    const map = component.node.getChildContext().map;
    it('will accept longitude/latitude', () => {
      expect(map.transform.center.lng).to.equal(12);
      expect(map.transform.center.lat).to.equal(13);
    });
  });
  describe('mounting with a center', () => {
    const component = getMountedComponent({
      ...simpleDefaultProps,
      longitude: 12,
      latitude: 13,
    });
    const map = component.node.getChildContext().map;
    it('will use the center', () => {
      expect(map.transform.center.lng).to.not.equal(12);
      expect(map.transform.center.lat).to.not.equal(13);
    });
  });
  describe('updating without a center', () => {
    const component = getMountedComponent(simpleDefaultProps);
    component.setProps({
      ...simpleDefaultProps,
      center: null,
      longitude: 12,
      latitude: 13,
      move: (target) => ({
        command: 'jumpTo',
        args: [target],
      }),
    });
    const map = component.node.getChildContext().map;
    it('will accept longitude/latitude', () => {
      expect(map.transform.center.lng).to.equal(12);
      expect(map.transform.center.lat).to.equal(13);
    });
  });
  it('will move from a lat/lng prop value to another lat/lng prop value');
  describe('updating with a center', () => {
    const component = getMountedComponent(simpleDefaultProps);
    component.setProps({
      ...simpleDefaultProps,
      longitude: 12,
      latitude: 13,
      move: (target) => ({
        command: 'jumpTo',
        args: [target],
      }),
    });
    const map = component.node.getChildContext().map;
    it('will ignore longitude/latitude', () => {
      expect(map.transform.center.lng).to.not.equal(12);
      expect(map.transform.center.lat).to.not.equal(13);
    });
  });
  describe('when updating viewport', () => {
    it('will use the provided move action', () => {
      const component = getMountedComponent(simpleDefaultProps);
      const nextProps = {
        ...simpleDefaultProps,
        center: null,
        longitude: 12,
        latitude: 13,
        move: (target) => ({
          command: 'jumpTo',
          args: [target],
        }),
      };
      sinon.spy(nextProps, 'move');
      component.setProps(nextProps);
      expect(nextProps.move.calledOnce).to.equal(true);
    });
    it('will not trigger an update if the viewport has not updated', () => {
      const component = getMountedComponent(simpleDefaultProps);
      const nextProps = {
        ...simpleDefaultProps,
        move: (target) => ({
          command: 'jumpTo',
          args: [target],
        }),
      };
      sinon.spy(nextProps, 'move');
      component.setProps(nextProps);
      expect(nextProps.move.calledOnce).to.equal(false);
    });
    it('will not update the viewport while the user is in control');
  });
  describe('when providing a move method', () => {
    ['flyTo', 'jumpTo', 'zoomTo', 'zoomIn', 'rotateTo', 'resetNorth', 'snapToNorth']
      .forEach((method) => {
        it(`can specify ${method}`, () => {
          const component = getMountedComponent(simpleDefaultProps);
          sinon.spy(component.node._map, method);
          component.setProps({
            ...simpleDefaultProps,
            center: null,
            longitude: 50,
            latitude: 50,
            move: (target) => ({
              command: method,
              args: [target],
            }),
          });
          expect(component.node._map[method].calledOnce).to.equal(true);
        });
      });
    it('can specify fitBounds', () => {
      const component = getMountedComponent(simpleDefaultProps);
      sinon.spy(component.node._map, 'fitBounds');
      component.setProps({
        ...simpleDefaultProps,
        center: null,
        longitude: 50,
        latitude: 50,
        move: () => ({
          command: 'fitBounds',
          args: [[[
            32.958984,
            -5.353521,
          ], [
            43.50585,
            5.615985,
          ]]],
        }),
      });
      expect(component.node._map.fitBounds.calledOnce).to.equal(true);
    });
    it('can specify panTo', () => {
      const component = getMountedComponent(simpleDefaultProps);
      sinon.spy(component.node._map, 'panTo');
      component.setProps({
        ...simpleDefaultProps,
        center: null,
        longitude: 50,
        latitude: 50,
        move: () => ({
          command: 'panTo',
          args: [[
            32.958984,
            -5.353521,
          ]],
        }),
      });
      expect(component.node._map.panTo.calledOnce).to.equal(true);
    });
    it('will ignore unsupported move commands');
  });
  describe('when working with convenience handlers', () => {
    const mountProps = {
      ...simpleDefaultProps,
      onChangeViewport: () => {},
      onClickFeatures: () => {},
      onHoverFeatures: () => {},
    };
    sinon.spy(mountProps, 'onChangeViewport');
    sinon.spy(mountProps, 'onClickFeatures');
    sinon.spy(mountProps, 'onHoverFeatures');
    const component = getMountedComponent(mountProps);
    const map = component.node._mapFacade;
    const mock = sinon.mock(component.node._mapFacade);
    mock.expects('queryRenderedFeatures').atLeast(4).returns([{}]);
    component.node._simpleClick({
      target: map,
      point: { x: 10, y: 10, lng: 10, lat: 20 },
    });
    component.node._simpleHover({
      target: map,
      point: { x: 10, y: 10, lng: 10, lat: 20 },
    });
    component.node._onChangeViewport({
      target: map,
    });
    const nextProps = {
      ...simpleDefaultProps,
      center: [10, 20],
      onChangeViewport: () => {},
      onClickFeatures: () => {},
      onHoverFeatures: () => {},
      move: (viewport) => ({ command: 'jumpTo', args: [viewport] }),
    };
    sinon.spy(nextProps, 'onChangeViewport');
    sinon.spy(nextProps, 'onClickFeatures');
    sinon.spy(nextProps, 'onHoverFeatures');
    component.setProps(nextProps);
    component.node._simpleClick({
      target: map,
      point: { x: 10, y: 10, lng: 10, lat: 20 },
    });
    component.node._simpleHover({
      target: map,
      point: { x: 10, y: 10, lng: 10, lat: 20 },
    });
    component.node._onChangeViewport({
      target: map,
    });
    mock.verify();
    describe('onClickFeatures', () => {
      it('will be called when features', () => {
        expect(mountProps.onClickFeatures.calledOnce).to.equal(true);
        expect(nextProps.onClickFeatures.calledOnce).to.equal(true);
      });
    });
    describe('onHoverFeatures', () => {
      it('will be called when features', () => {
        expect(mountProps.onHoverFeatures.calledOnce).to.equal(true);
        expect(nextProps.onHoverFeatures.calledOnce).to.equal(true);
      });
    });
    describe('onChangeViewport', () => {
      it('will be called when moved', () => {
        // expect(mountProps.onChangeViewport.calledOnce).to.equal(true);
        expect(nextProps.onChangeViewport.calledOnce).to.equal(true);
      });
    });
  });
});
