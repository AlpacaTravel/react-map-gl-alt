import React from 'react';
import { diff } from './utils';

class MapEvents extends React.Component {
  componentDidMount() {
    this._updateListeners({}, this.props);
  }

  componentDidUpdate(nextProps) {
    this._updateListeners(this.props, nextProps);
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

MapEvents.contextTypes = {
  map: React.PropTypes.object.isRequired,
};

export default MapEvents;
