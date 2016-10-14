import React from 'react';
import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';

import MapAccessor from './utils/map-accessor';
import { diff, updateMapOptions, updateStyle } from './utils';

const noop = () => {};
const move = (target) => ({ command: 'flyTo', args: [target] });

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

    this._click = this._click.bind(this);
    this._hover = this._hover.bind(this);
    this._move = this._move.bind(this);
  }

  // Scrub map access to events
  getChildContext() {
    return {
      map: this._mapAccesor,
    };
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
      trackResize: !this.props.trackResizeDisabled,
      center: this.props.center,
      zoom: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
    };

    // Create the map and configure the map options
    this._map = new mapboxgl.Map(options);
    this._mapAccessor = new MapAccessor(this._map);
    updateMapOptions(this._map, {}, this.props);

    // Listen to some of the dispatched events
    this._map.on('dragstart', (event) => {
      this.state({ isDragging: true, startDragLngLat: event.lngLat, startBearing: event.target.getBearing(), startPitch: event.target.getPitch() });
    });
    this._map.on('dragend', () => {
      this.state({ isDragging: false, startDragLngLat: null, startBearing: null, startPitch: null });
    });
  }

  componentWillReceiveProps(nextProps) {
    this._updateMapViewport(nextProps);
    this._updateConvenienceHandlers(nextProps);

    // Update the map style and options
    updateStyle(this._map, this.props.mapStyle, nextProps.mapStyle);
    updateMapOptions(this._map, this.props, nextProps);
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  _click() {
    // TODO: Query the map and call the this.prop.onClickFeatures
  }

  _hover() {
    // TODO: Query the map and call the this.prop.onHoverFeatures
  }

  _onChangeViewport() {
    // TODO: Obtain map viewport and call the this.prop.onChangeViewport
  }

  _updateConvenienceHandlers(nextProps) {
    if (diff('onClickFeatures', this.props, nextProps)) {
      if (nextProps.onClickFeatures) {
        this._map.on('click', this._click);
      } else {
        this._map.off('click', this._click);
      }
    }
    if (diff('onHoverFeatures', this.props, nextProps)) {
      if (nextProps.onHoverFeatures) {
        this._map.on('move', this._hover);
      } else {
        this._map.off('move', this._hover);
      }
    }
    if (diff('onChangeViewport', this.props, nextProps)) {
      if (nextProps.onHoverFeatures) {
        this._map.on('move', this._hover);
      } else {
        this._map.off('move', this._hover);
      }
    }
  }

  _updateMapViewport(nextProps) {
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
        ...this.state,
      };

      // Use a move
      const result = nextProps.move(target);
      switch (result.command) {
        case 'flyTo':
          this._map.flyTo(...result.args);
          break;
        case 'fitBounds':
          this._map.fitBounds(...result.args);
          break;
        case 'jumpTo':
          this._map.jumpTo(...result.args);
          break;
        case 'panTo':
          this._map.panTo(...result.args);
          break;
        case 'zoomTo':
          this._map.zoomTo(...result.args);
          break;
        case 'zoomIn':
          this._map.zoomIn(...result.args);
          break;
        case 'rotateTo':
          this._map.rotateTo(...result.args);
          break;
        case 'resetNorth':
          this._map.rotateTo(...result.args);
          break;
        case 'snapToNorth':
          this._map.snapToNorth(...result.args);
          break;
        default: break;
      }
    }
  }

  render() {
    return (
      <div
        ref="container"
        className="map"
        styles={this.props.containerStyles}
      >
        {this.props.children}
      </div>
    );
  }
}

Map.propTypes = {
  containerStyles: React.PropTypes.object,

  // React dimensions
  containerWidth: React.PropTypes.number,
  containerHeight: React.PropTypes.number,

  accessToken: React.PropTypes.string,

  // Main style
  mapStyle: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Immutable.Map),
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

  // Convenience implementations
  onChangeViewport: React.PropTypes.func,
  onHoverFeatures: React.PropTypes.func,
  ignoreEmptyFeatures: React.PropTypes.bool,
  onClickFeatures: React.PropTypes.func,
  clickRadius: React.PropTypes.number,

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

  children: React.PropTypes.any,
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

  move,
};

Map.childContextTypes = {
  map: React.PropTypes.object,
};

export default Map;
