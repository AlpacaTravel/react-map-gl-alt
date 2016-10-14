import React from 'react';
import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';
import { diffStyles } from 'mapbox-gl-style-spec'

import MapAccessor from './utils/map-accessor';
import { diff, updateMapOptions, updateStyle } from './utils';

const noop = () => {};
const move = (target) => {
  return { command: 'flyTo', args: [target] };
};

/**
 *
 */
class Map extends React.Component {
  static supported() {
    return mapboxgl.supported();
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSupported: Map.isSupported(),
      isDragging: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null,
      width: props.containerWidth,
      height: props.containerHeight,
    };

    // Disable updates
    if (!this.state.isSupported) {
      this.componentDidMount = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate = noop;
    }

    mapboxgl.accessToken = props.accessToken;
  }

  componentDidMount() {
    // Create the local map
    const mapStyle = Immutable.Map.isMap(this.props.mapStyle) ?
      this.props.mapStyle.toJs() :
      this.props.mapStyle;

    const options = {
      container: this.refs.container,
      style: mapStyle,
      hash: !this.props.hashDisabled,
      interactive: !this.props.interactiveDisabled,
      bearingSnap: this.props.bearingSnap,
      attributionControl: !this.props.attributionControlDisabled,
      failIfMajorPerformanceCaveat: !this.props.failIfMajorPerformanceCaveatDisabled,
      preserveDrawingBuffer: !this.props.preserveDrawingBufferDisabled,
      trackResize: !this.props.trackResize,
      center: this.props.center,
      zoom: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
    };

    // Create the map and configure the map options
    this._map = new mapboxgl.Map(options);
    this._mapAccessor = new MapAccessor(this._map);
    updateMapOptions(this._map, {}, this.props);
  }

  // Scrub map access to events
  getChildContext = () => ({
    map: this._mapAccesor,
  });

  componentDidUpdate() {
    // update the size?
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  updateMapViewport(map, nextProps) {
    const viewportChanged = (
      diff('center', this.props, nextProps) ||
      diff('zoom', this.props, nextProps) ||
      diff('altitude', this.props, nextProps) ||
      diff('bearing', this.props, nextProps) ||
      diff('pitch', this.props, nextProps)
    );

    if (viewportChanged) {
      const target = {
        center: nextProps.center,
        longitude: nextProps.center[0],
        latitude: nextProps.center[1],
        zoom: nextProps.zoom,
        altitude: nextProps.altitude,
        bearing: nextProps.bearing,
        pitch: nextProps.pitch,
        {...this.state}
      }

      // Use a move
      const command = nextProps.move(target);
      switch (result.command) {
        case 'flyTo':
          this._map.flyTo(...command.args);
          break;
        case 'fitBounds':
          this._map.fitBounds(...command.args);
          break;
        case 'jumpTo':
          this._map.jumpTo(...command.args);
          break;
        case 'panTo':
          this._map.panTo(...command.args);
          break;
        case 'zoomTo':
          this._map.zoomTo(...command.args);
          break;
        case 'zoomIn':
          this._map.zoomIn(...command.args);
          break;
        case 'rotateTo':
          this._map.rotateTo(...command.args);
          break;
        case 'resetNorth':
          this._map.rotateTo(...command.args);
          break;
        case 'snapToNorth':
          this._map.snapToNorth(...command.args);
          break;
        default: break;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateMapViewport(this._map, nextProps);
    updateStyle(this._map, this.props.mapStyle, nextProps.mapStyle)
    updateMapOptions(this._map, this.props, nextProps);
  }

  componentDidUpdate() {
    // Update map size?
  }

  render() {
    return (
      <div
        ref="container"
        className="map"
        styles={this.props.containerStyle}>

      </div>
    );
  }
}

Map.propTypes = {
  containerStyles: React.PropTypes.object,
  containerWidth: React.PropTypes.number,
  containerHeight: React.PropTypes.number,

  accessToken: React.PropTypes.string,

  // Main style
  mapStyle: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,

  // Move control actions
  move: React.PropTypes.func,

  // Control Interactions
  scrollZoomDisabled: React.PropTypes.bool,
  boxZoomDisabled: React.PropTypes.bool,
  dragPanDisabled: React.PropTypes.bool,
  dragRotateDisabled: React.PropTypes.bool,
  keyboardDisabled: React.PropTypes.bool,
  doubleClickZoomDisabled: React.PropTypes.bool,
  touchZoomRotateDisabled: React.PropTypes.bool,
  trackResizeDisabled: React.PropTypes.bool,

  // Target controls
  center: React.PropTypes.arrayOf(React.PropTypes.number),
  zoom: React.PropTypes.number,
  altitude: React.PropTypes.number,
  bearing: React.PropTypes.number,
  pitch: React.PropTypes.number,

  minZoom: React.PropTypes.number,
  maxZoom: React.PropTypes.number,
  maxBounds: React.PropTypes.object,

  hashDisabled: React.PropTypes.bool,
  interactiveDisabled: React.PropTypes.bool,

  bearingSnap: React.PropTypes.number,
  mapClasses: React.PropTypes.arrayOf(React.PropTypes.string),
  attributionControlDisabled: React.PropTypes.bool,

  failIfMajorPerformanceCaveatDisabled: React.PropTypes.bool,
  preserveDrawingBufferDisabled: React.PropTypes.bool,
};

Map.defaultProps = {
  containerStyles: {},
  containerWidth: 500,
  containerHeight: 400,

  minZoom: 0,
  maxZoom: 20,

  scrollZoomDisabled: false,
  dragRotateDisabled: false,
  dragPanDisabled: false,
  keyboardDisabled: false,
  doubleClickZoomDisabled: false,
  touchZoomRotateDisabled: false,
  trackResizeDisabled: false,
  hashDisabled: true,
  interactiveDisabled: false,
  attributionControlDisabled: false,
  failIfMajorPerformanceCaveatDisabled: false,
  preserveDrawingBufferDisabled: true,

  bearingSnap: 7,
  mapClasses: [],

  center: [
    144.9633200,
    -37.8140000,
  ],

  zoom: 1,
  bearing: 0,
  pitch: 0,
};

Map.childContextTypes = {
  map: React.PropTypes.object,
}

export default Map;
