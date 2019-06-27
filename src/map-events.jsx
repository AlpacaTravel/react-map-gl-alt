import React from 'react';
import PropTypes from 'prop-types';
import { diff } from './utils';

class MapEvents extends React.Component {
  componentDidMount() {
    this._updateListeners({}, this.props);
  }

  componentDidUpdate(prevProps) {
    this._updateListeners(prevProps, this.props);
  }

  componentWillUnmount() {
    this._updateListeners(this.props, {});
  }

  _updateListener(type, current, next) {
    if (diff(type, current, next)) {
      const mapType = type.substr(2).toLowerCase();
      if (current[type]) {
        this.context.map.off(mapType, current[type]);
      }
      if (next[type]) {
        this.context.map.on(mapType, next[type]);
      }
    }
  }

  _updateListeners(current, next) {
    this._updateListener('onStyleLoad', current, next);
    this._updateListener('onResize', current, next);
    this._updateListener('onWebGLContextLost', current, next);
    this._updateListener('onWebGLContextRestored', current, next);
    this._updateListener('onRemove', current, next);
    this._updateListener('onDataLoading', current, next);
    this._updateListener('onRender', current, next);
    this._updateListener('onLoad', current, next);
    this._updateListener('onData', current, next);
    this._updateListener('onError', current, next);
    this._updateListener('onMouseOut', current, next);
    this._updateListener('onMouseDown', current, next);
    this._updateListener('onMouseUp', current, next);
    this._updateListener('onMouseMove', current, next);
    this._updateListener('onTouchStart', current, next);
    this._updateListener('onTouchEnd', current, next);
    this._updateListener('onTouchMove', current, next);
    this._updateListener('onTouchCancel', current, next);
    this._updateListener('onClick', current, next);
    this._updateListener('onDblClick', current, next);
    this._updateListener('onContextMenu', current, next);
    this._updateListener('onMoveStart', current, next);
    this._updateListener('onMove', current, next);
    this._updateListener('onMoveEnd', current, next);
    this._updateListener('onZoomStart', current, next);
    this._updateListener('onZoomEnd', current, next);
    this._updateListener('onZoom', current, next);
    this._updateListener('onBoxZoomCancel', current, next);
    this._updateListener('onBoxZoomEnd', current, next);
    this._updateListener('onBoxZoomStart', current, next);
    this._updateListener('onRotateStart', current, next);
    this._updateListener('onRotateEnd', current, next);
    this._updateListener('onDragStart', current, next);
    this._updateListener('onDragEnd', current, next);
    this._updateListener('onDrag', current, next);
    this._updateListener('onPitch', current, next);
  }

  render() {
    return null;
  }
}

MapEvents.propTypes = {
  // Map events
  onStyleLoad: PropTypes.func,
  onResize: PropTypes.func,
  onWebGLContextLost: PropTypes.func,
  onWebGLContextRestored: PropTypes.func,
  onRemove: PropTypes.func,
  onDataLoading: PropTypes.func,
  onRender: PropTypes.func,
  onLoad: PropTypes.func,
  onData: PropTypes.func,
  onError: PropTypes.func,

  // Interactive events
  onMouseOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseMove: PropTypes.func,

  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchCancel: PropTypes.func,

  onClick: PropTypes.func,
  onDblClick: PropTypes.func,
  onContextMenu: PropTypes.func,

  onMoveStart: PropTypes.func,
  onMove: PropTypes.func,
  onMoveEnd: PropTypes.func,

  onZoomStart: PropTypes.func,
  onZoomEnd: PropTypes.func,
  onZoom: PropTypes.func,

  onBoxZoomCancel: PropTypes.func,
  onBoxZoomEnd: PropTypes.func,
  onBoxZoomStart: PropTypes.func,

  onRotateStart: PropTypes.func,
  onRotateEnd: PropTypes.func,

  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrag: PropTypes.func,

  onPitch: PropTypes.func,
};

MapEvents.contextTypes = {
  map: PropTypes.object.isRequired,
};

export default MapEvents;
