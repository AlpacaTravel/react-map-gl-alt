import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Immutable from 'immutable';
import * as _ from 'lodash';
import Map from '../../src/map';
import MapFacade from '../../src/facades/map';

const factoryMountedComponent = (props) => (mount(<Map {...props} />));
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
    const component = factoryMountedComponent(simpleDefaultProps);
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
    const component = factoryMountedComponent(simpleDefaultProps);
    sinon.spy(component.node._map, 'remove');
    const remove = component.node._map.remove;
    component.node.componentWillUnmount();
    it('will call map remove on unmount', () => {
      expect(remove.calledOnce).to.equal(true);
    });
  });
  describe('while receiving props', () => {
    let map = null;
    const component = factoryMountedComponent(simpleDefaultProps);
    const result = new Promise((fulfill) => {
      sinon.spy(component.node, '_updateMapViewport');
      sinon.spy(component.node, '_updateMapOptions');
      sinon.spy(component.node, '_updateStyle');
      sinon.spy(component.node, '_updateConvenienceHandlers');
      map = component.node.getChildContext().map;

      map.on('load', () => {
        component.setProps({
          ...simpleDefaultProps,
          center: null,
          longitude: 10,
          latitude: 20,
          mapStyle: Immutable.fromJS({
            version: 8,
            center: [10, 20],
            zoom: 12.5,
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
        fulfill();
      });
    });
    it('will call update the options', (done) => {
      result.then(() => {
        // TODO: Don't spy on the internal
        expect(component.node._updateMapOptions.calledOnce).to.equal(true);
        expect(map.transform.maxZoom).to.be.equal(19);
        done();
      });
    });
    it('will call update styles', (done) => {
      result.then(() => {
        // TODO: Don't spy on the internal
        expect(component.node._updateStyle.calledOnce).to.equal(true);
        done();
      });
    });
    it('will call update the viewport', (done) => {
      result.then(() => {
        // TODO: Don't spy on the internal
        expect(component.node._updateMapViewport.calledOnce).to.equal(true);
        const center = map.transform.center;
        expect(Math.round(center.lng)).to.equal(10);
        expect(Math.round(center.lat)).to.equal(20);
        done();
      });
    });
    it('will call update convenience handlers', (done) => {
      result.then(() => {
        // TODO: Don't spy on the internal
        expect(component.node._updateConvenienceHandlers.calledOnce).to.equal(true);
      });
      done();
    });
  });
  describe('mounting without a center', () => {
    const component = factoryMountedComponent({
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
    const component = factoryMountedComponent({
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
    const component = factoryMountedComponent(simpleDefaultProps);
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
    const component = factoryMountedComponent(simpleDefaultProps);
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
  describe('mounting with a bounds and a custom move', () => {
    const bounds = [[32.958984, -5.353521], [43.50585, 5.615985]];
    const props = {
      ...simpleDefaultProps,
      center: [12, 13],
      bounds,
      move: (target) => ({
        command: 'fitBounds',
        args: [target.bounds, { animate: false }],
      }),
    };
    sinon.spy(props, 'move');
    const component = factoryMountedComponent(props);
    const map = component.node.getChildContext().map;
    it('will move to the bounds', () => {
      expect(props.move.calledOnce).to.equal(true);
      expect(map.transform.center.lng).to.be.within(bounds[0][0], bounds[1][0]);
      expect(map.transform.center.lat).to.be.within(bounds[0][1], bounds[1][1]);
    });
  });
  describe('mounting with a bounds and no supplied custom move', () => {
    const bounds = [[32.958984, -5.353521], [43.50585, 5.615985]];
    const props = {
      ...simpleDefaultProps,
      center: [12, 13],
      bounds,
    };
    const component = factoryMountedComponent(props);
    const map = component.node.getChildContext().map;
    it('will move to the bounds', () => {
      expect(map.transform.center.lng).to.be.within(bounds[0][0], bounds[1][0]);
      expect(map.transform.center.lat).to.be.within(bounds[0][1], bounds[1][1]);
    });
  });
  describe('updating with a new bounds', () => {
    const component = factoryMountedComponent(simpleDefaultProps);
    const bounds = [[32.958984, -5.353521], [43.50585, 5.615985]];
    const nextProps = {
      ...simpleDefaultProps,
      bounds,
      move: (target) => ({
        command: 'fitBounds',
        args: [target.bounds, { animate: false }],
      }),
    };
    sinon.spy(nextProps, 'move');
    component.setProps(nextProps);
    const map = component.node.getChildContext().map;
    it('will update the location', () => {
      expect(nextProps.move.calledOnce).to.equal(true);
      expect(map.transform.center.lng).to.be.within(bounds[0][0], bounds[1][0]);
      expect(map.transform.center.lat).to.be.within(bounds[0][1], bounds[1][1]);
    });
  });
  describe('when updating viewport', () => {
    it('will use the provided move action', () => {
      const component = factoryMountedComponent(simpleDefaultProps);
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
      const component = factoryMountedComponent(simpleDefaultProps);
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
    ['flyTo', 'jumpTo', 'zoomTo', 'zoomIn', 'zoomOut', 'rotateTo', 'resetNorth', 'snapToNorth', 'easeTo']
      .forEach((method) => {
        it(`can specify ${method}`, () => {
          const component = factoryMountedComponent(simpleDefaultProps);
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
      const component = factoryMountedComponent(simpleDefaultProps);
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
      const component = factoryMountedComponent(simpleDefaultProps);
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
    const component = factoryMountedComponent(mountProps);
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
        expect(nextProps.onChangeViewport.callCount).to.be.above(0);
      });
      it('will expose properties of the viewport', () => {
        const result = nextProps.onChangeViewport.firstCall.args[0];
        expect(result).to.exist;
        expect(_.has(result, 'longitude')).to.equal(true);
        expect(_.has(result, 'longitude')).to.equal(true);
        expect(result.longitude).to.equal(10);
        expect(result.latitude).to.equal(20);
        expect(_.has(result, 'center')).to.equal(true);
        expect(_.has(result, 'zoom')).to.equal(true);
        expect(_.has(result, 'pitch')).to.equal(true);
        expect(_.has(result, 'bearing')).to.equal(true);
        expect(_.has(result, 'isDragging')).to.equal(true);
        expect(_.has(result, 'isTouching')).to.equal(true);
        expect(_.has(result, 'isZooming')).to.equal(true);
        expect(_.has(result, 'isMoving')).to.equal(true);
        expect(_.has(result, 'startDragLngLat')).to.equal(true);
        expect(_.has(result, 'startTouchLngLat')).to.equal(true);
        expect(_.has(result, 'startZoomLngLat')).to.equal(true);
        expect(_.has(result, 'startMoveLngLat')).to.equal(true);
        expect(_.has(result, 'startRotatingLngLat')).to.equal(true);
        expect(_.has(result, 'startPitch')).to.equal(true);
        expect(_.has(result, 'startBearing')).to.equal(true);
        expect(_.has(result, 'startZoom')).to.equal(true);
        expect(_.has(result, 'isUserControlled')).to.equal(true);
      });
      it('will supply the map accessor', () => {
        const result = nextProps.onChangeViewport.firstCall.args[0];
        expect(_.has(result, 'map')).to.equal(true);
        expect(result.map).to.be.instanceof(MapFacade);
      });
    });
  });
  describe('when updating a map style', () => {
    it('will apply changes', (done) => {
      const component = factoryMountedComponent(simpleDefaultProps);
      component.node._map.on('load', () => {
        const nextProps = {
          ...simpleDefaultProps,
          center: null,
          longitude: 12,
          latitude: 13,
          mapStyle: Immutable.fromJS({
            ...simpleDefaultProps.mapStyle.toJS(),
            layers: [
              {
                id: 'background',
                type: 'background',
                interactive: true,
                paint: {
                  'background-color': '#dedede',
                },
              },
            ],
          }),
          move: (target) => ({
            command: 'jumpTo',
            args: [target],
          }),
        };
        sinon.spy(component.node._map, 'addLayer');
        sinon.spy(component.node, '_updateStyle');
        component.setProps(nextProps);
        expect(component.node._updateStyle.calledOnce).to.equal(true);
        expect(component.node._map.addLayer.calledOnce).to.equal(true);
        done();
      });
    });
  });
  describe('worldCopyJump behaviour', () => {
    it('will reset center', (done) => {
      const props = {
        ...simpleDefaultProps,
        worldCopyJumpDisabled: false,
      };
      const component = factoryMountedComponent(props);
      component.node._map.on('load', () => {
        const nextProps = {
          ...props,
          center: null,
          longitude: 220,
          latitude: 13,
          move: (target) => ({
            command: 'jumpTo',
            args: [target],
          }),
        };
        component.setProps(nextProps);
        const center = component.node._mapFacade.getCenter();
        expect(center.lng).to.equal(-140);
        done();
      });
    });
  });

  // TODO: Need to have a container resizing test.. something similar to below..
  // describe('container resizing', () => {
  //   describe('with default trackResizeContainerDisabled props', () => {
  //     it('will call map resize when container event fired', () => {
  //       const props = {
  //         ...simpleDefaultProps,
  //         style: {
  //           width: 100,
  //         },
  //       };
  //       const component = factoryMountedComponent(props);
  //       sinon.spy(component.node._map, 'resize');
  //       const event = document.createEvent('Event');
  //       event.initEvent('onresize', true, true);
  //       component.node.refs.container.__resizeTrigger__.dispatchEvent(event);
  //       expect(component.node._map.resize.calledOnce).to.equal(true);
  //     });
  //   });
  // });
});
