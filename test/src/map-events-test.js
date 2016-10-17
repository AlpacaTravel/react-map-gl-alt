import React from 'react';
import { describe } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import MapEvents from '../../src/map-events';

const defaultProps = {};
const defaultContext = {
  map: {},
};
const getMountedComponent = (props = defaultProps, context = defaultContext) => (mount(<MapEvents {...props} />, { context }));

describe('Map Events component', () => {
  it('will mount', () => {
    sinon.spy(MapEvents.prototype, 'componentDidMount');
    getMountedComponent();
    expect(MapEvents.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('will register and unregister through-out component lifecycle', () => {
    const props = {
      onStyleLoad: () => {},
      onResize: () => {},
      onWebGLContextLost: () => {},
      onWebGLContextRestored: () => {},
      onRemove: () => {},
      onDataLoading: () => {},
      onRender: () => {},
      onLoad: () => {},
      onData: () => {},
      onError: () => {},
      onMouseOut: () => {},
      onMouseDown: () => {},
      onMouseUp: () => {},
      onMouseMove: () => {},
      onTouchStart: () => {},
      onTouchEnd: () => {},
      onTouchMove: () => {},
      onTouchCancel: () => {},
      onClick: () => {},
      onDblClick: () => {},
      onContextMenu: () => {},
      onMoveStart: () => {},
      onMove: () => {},
      onMoveEnd: () => {},
      onZoomStart: () => {},
      onZoomEnd: () => {},
      onZoom: () => {},
      onBoxZoomCancel: () => {},
      onBoxZoomEnd: () => {},
      onBoxZoomStart: () => {},
      onRotateStart: () => {},
      onRotateEnd: () => {},
      onDragStart: () => {},
      onDragEnd: () => {},
      onDrag: () => {},
      onPitch: () => {},
    };
    const nextProps = {
      onStyleLoad: () => {},
      onResize: () => {},
      onWebGLContextLost: () => {},
      onWebGLContextRestored: () => {},
      onRemove: () => {},
      onDataLoading: () => {},
      onRender: () => {},
      onLoad: () => {},
      onData: () => {},
      onError: () => {},
      onMouseOut: () => {},
      onMouseDown: () => {},
      onMouseUp: () => {},
      onMouseMove: () => {},
      onTouchStart: () => {},
      onTouchEnd: () => {},
      onTouchMove: () => {},
      onTouchCancel: () => {},
      onClick: () => {},
      onDblClick: () => {},
      onContextMenu: () => {},
      onMoveStart: () => {},
      onMove: () => {},
      onMoveEnd: () => {},
      onZoomStart: () => {},
      onZoomEnd: () => {},
      onZoom: () => {},
      onBoxZoomCancel: () => {},
      onBoxZoomEnd: () => {},
      onBoxZoomStart: () => {},
      onRotateStart: () => {},
      onRotateEnd: () => {},
      onDragStart: () => {},
      onDragEnd: () => {},
      onDrag: () => {},
      onPitch: () => {},
    };
    const context = {
      map: {
        on: () => {},
        off: () => {},
      },
    };
    const mock = sinon.mock(context.map);
    mock.expects('on').withArgs('styleload').twice();
    mock.expects('on').withArgs('resize').twice();
    mock.expects('on').withArgs('webglcontextlost').twice();
    mock.expects('on').withArgs('webglcontextrestored').twice();
    mock.expects('on').withArgs('remove').twice();
    mock.expects('on').withArgs('dataloading').twice();
    mock.expects('on').withArgs('render').twice();
    mock.expects('on').withArgs('load').twice();
    mock.expects('on').withArgs('data').twice();
    mock.expects('on').withArgs('error').twice();
    mock.expects('on').withArgs('mouseout').twice();
    mock.expects('on').withArgs('mousedown').twice();
    mock.expects('on').withArgs('mouseup').twice();
    mock.expects('on').withArgs('mousemove').twice();
    mock.expects('on').withArgs('touchstart').twice();
    mock.expects('on').withArgs('touchend').twice();
    mock.expects('on').withArgs('touchmove').twice();
    mock.expects('on').withArgs('touchcancel').twice();
    mock.expects('on').withArgs('click').twice();
    mock.expects('on').withArgs('dblclick').twice();
    mock.expects('on').withArgs('contextmenu').twice();
    mock.expects('on').withArgs('movestart').twice();
    mock.expects('on').withArgs('move').twice();
    mock.expects('on').withArgs('moveend').twice();
    mock.expects('on').withArgs('zoomstart').twice();
    mock.expects('on').withArgs('zoomend').twice();
    mock.expects('on').withArgs('zoom').twice();
    mock.expects('on').withArgs('boxzoomcancel').twice();
    mock.expects('on').withArgs('boxzoomend').twice();
    mock.expects('on').withArgs('boxzoomstart').twice();
    mock.expects('on').withArgs('rotatestart').twice();
    mock.expects('on').withArgs('rotateend').twice();
    mock.expects('on').withArgs('dragstart').twice();
    mock.expects('on').withArgs('dragend').twice();
    mock.expects('on').withArgs('drag').twice();
    mock.expects('on').withArgs('pitch').twice();

    mock.expects('off').withArgs('styleload').twice();
    mock.expects('off').withArgs('resize').twice();
    mock.expects('off').withArgs('webglcontextlost').twice();
    mock.expects('off').withArgs('webglcontextrestored').twice();
    mock.expects('off').withArgs('remove').twice();
    mock.expects('off').withArgs('dataloading').twice();
    mock.expects('off').withArgs('render').twice();
    mock.expects('off').withArgs('load').twice();
    mock.expects('off').withArgs('data').twice();
    mock.expects('off').withArgs('error').twice();
    mock.expects('off').withArgs('mouseout').twice();
    mock.expects('off').withArgs('mousedown').twice();
    mock.expects('off').withArgs('mouseup').twice();
    mock.expects('off').withArgs('mousemove').twice();
    mock.expects('off').withArgs('touchstart').twice();
    mock.expects('off').withArgs('touchend').twice();
    mock.expects('off').withArgs('touchmove').twice();
    mock.expects('off').withArgs('touchcancel').twice();
    mock.expects('off').withArgs('click').twice();
    mock.expects('off').withArgs('dblclick').twice();
    mock.expects('off').withArgs('contextmenu').twice();
    mock.expects('off').withArgs('movestart').twice();
    mock.expects('off').withArgs('move').twice();
    mock.expects('off').withArgs('moveend').twice();
    mock.expects('off').withArgs('zoomstart').twice();
    mock.expects('off').withArgs('zoomend').twice();
    mock.expects('off').withArgs('zoom').twice();
    mock.expects('off').withArgs('boxzoomcancel').twice();
    mock.expects('off').withArgs('boxzoomend').twice();
    mock.expects('off').withArgs('boxzoomstart').twice();
    mock.expects('off').withArgs('rotatestart').twice();
    mock.expects('off').withArgs('rotateend').twice();
    mock.expects('off').withArgs('dragstart').twice();
    mock.expects('off').withArgs('dragend').twice();
    mock.expects('off').withArgs('drag').twice();
    mock.expects('off').withArgs('pitch').twice();
    const component = getMountedComponent(props, context);
    component.setProps(nextProps);
    component.node.componentWillUnmount();
    mock.verify();
  });
});
