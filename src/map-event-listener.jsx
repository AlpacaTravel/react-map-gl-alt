import React from 'react';

class MapEventListener extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // TODO: Wire the actions up to the props
  }

  componentDidUpdate() {
    // TODO: Update the evented
  }

  render() {
    return null;
  }
}

MapEventListener.propTypes = {
  // Map events
  onStyleLoad: React.PropTypes.func,
  onResize: React.PropTypes.func,
  onWebGLContextLost: React.PropTypes.func,
  onWebGLContextRestored: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  onDataLoading: React.PropTypes.func,
  onRender: React.PropTypes.func,
  onLoad: React.PropTypes.func,
  onData: React.PropTypes.func,
  onError: React.PropTypes.func,

  // Interactive events
  onMouseOut: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,

  onTouchStart: React.PropTypes.func,
  onTouchEnd: React.PropTypes.func,
  onTouchMove: React.PropTypes.func,
  onTouchCancel: React.PropTypes.func,

  onClick: React.PropTypes.func,
  onDblClick: React.PropTypes.func,
  onContextMenu: React.PropTypes.func,

  onMoveStart: React.PropTypes.func,
  onMove: React.PropTypes.func,
  onMoveEnd: React.PropTypes.func,

  onZoomStart: React.PropTypes.func,
  onZoomEnd: React.PropTypes.func,
  onZoom: React.PropTypes.func,

  onBoxZoomCancel: React.PropTypes.func,
  onBoxZoomEnd: React.PropTypes.func,
  onBoxZoomStart: React.PropTypes.func,

  onRotateStart: React.PropTypes.func,
  onRotateEnd: React.PropTypes.func,

  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDrag: React.PropTypes.func,

  onPitch: React.PropTypes.func,
};

export default MapEventListener;
