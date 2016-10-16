import React from 'react';
import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';

import MapFacade from './facades/map';
import { diff, has, mod } from './utils';
import { updateOptions as updateMapOptions } from './utils/map';
import { getInteractiveLayerIds, update as updateStyle } from './utils/styles';

// const noop = () => {};
const move = (target) => ({ command: 'flyTo', args: [target] });

class Map extends React.Component {
  static supported() {
    return mapboxgl.supported();
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      // isSupported: Map.supported(),
      isDragging: false,
      isTouching: false,
      isZooming: false,
      isMoving: false,
      isLoaded: false,
      startDragLngLat: null,
      startTouchLngLat: null,
      startZoomLngLat: null, // same as startZoom?
      startMoveLngLat: null,
      startRotatingLngLat: null, // same as startBearing?
      startBearing: null,
      startPitch: null,
      startZoom: null,
      userControlled: false,
      width: props.containerWidth,
      height: props.containerHeight,
    };

    const accessToken = props.mapboxApiAccessToken || context.mapboxApiAccessToken;
    if (accessToken) {
      mapboxgl.accessToken = accessToken;
    }

    this._simpleClick = this._simpleClick.bind(this);
    this._simpleHover = this._simpleHover.bind(this);
    this._onChangeViewport = this._onChangeViewport.bind(this);
  }

  // Scrub map access to events
  getChildContext() {
    return {
      map: this._mapFacade,
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
      zoom: this.props.zoom,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
    };

    // Create the map and configure the map options
    this._map = new mapboxgl.Map(options);
    this._mapFacade = new MapFacade(this._map);

    // Initial actions
    this._updateConvenienceHandlers(this.props);
    updateMapOptions(this._map, {}, this.props);

    // Listen to some of the dispatched events
    this._listenStateEvents();
  }

  componentWillReceiveProps(nextProps) {
    this._updateMapViewport(nextProps);
    this._updateConvenienceHandlers(nextProps);
    updateStyle(this._map, this.props.mapStyle, nextProps.mapStyle);
    updateMapOptions(this._map, this.props, nextProps);
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  _getQueryParams() {
    return {
      layerIds: getInteractiveLayerIds(this.props.mapStyle),
    };
  }

  _simpleQuery(geometry, callback) {
    if (!callback) {
      return;
    }
    const features = this._map.queryRenderedFeatures(
      geometry,
      this._getQueryParams()
    );
    if (!features.length && this.props.ignoreEmptyFeatures) {
      return;
    }
    callback(features);
  }

  _simpleClick(e) {
    // Query the map and call the this.prop.onClickFeatures
    if (!this.props.onClickFeatures) {
      return;
    }
    const boxSize = this.props.clickRadius;
    const bbox = [
      [e.point.x - boxSize, e.point.y - boxSize],
      [e.point.x + boxSize, e.point.y + boxSize],
    ];
    this._simpleQuery(bbox, this.props.onClickFeatures);
  }

  _simpleHover(e) {
    // Query the map and call the this.prop.onHoverFeatures
    if (!this.props.onHoverFeatures) {
      return;
    }
    this._simpleQuery(e.point, this.props.onClickFeatures);
  }

  _onChangeViewport(e) {
    // Obtain map viewport and call the this.prop.onChangeViewport
    if (!this.props.onChangeViewport) {
      return;
    }

    const [longitude, latitude] = e.target.getCenter();
    this.onChangeViewport({
      longitude: mod(longitude + 180, 360) - 180,
      latitude,
      center: e.target.getCenter(),
      zoom: e.target.getZoom(),
      pitch: e.target.getPitch(),
      bearing: mod(e.target.getBearing() + 180, 360) - 180,
      isDragging: this.state.isDragging,
      isTouching: this.state.isTouching,
      isZooming: this.state.isZooming,
      isMoving: this.state.isMoving,
      startDragLngLat: this.state.startDragLngLat,
      startTouchLngLat: this.state.startTouchLngLat,
      startZoomLngLat: this.state.startZoomLngLat,
      startMoveLngLat: this.state.startMoveLngLat,
      startRotatingLngLat: this.state.startRotatingLngLat,
      startPitch: this.state.startPitch,
      startBearing: this.state.startBearing,
      startZoom: this.state.startZoom,
      userControlled: this.state.userControlled,
    });
  }

  _listenStateEvents() {
    this._map.on('movestart', (event) => {
      this.setState({
        startMoveLngLat: event.target.getCenter(),
        startBearing: event.target.getBearing(),
        startPitch: event.target.getPitch(),
        startZoom: event.target.getZoom(),
        userControlled: (has(event, 'originalEvent')),
      });
    });
    this._map.on('moveend', () => {
      this.setState({
        startMoveLngLat: null,
        startBearing: null,
        startPitch: null,
        startZoom: null,
        userControlled: false,
      });
    });

    this._map.on('dragstart', (event) => {
      this.setState({ isDragging: true, startDragLngLat: event.lngLat });
    });
    this._map.on('dragend', () => {
      this.setState({ isDragging: false, startDragLngLat: null });
    });
    this._map.on('zoomstart', (event) => {
      this.setState({ isZooming: true, startZoomLngLat: event.lngLat });
    });
    this._map.on('zoomend', () => {
      this.setState({ isZooming: false, startZoomLngLat: null });
    });
    this._map.on('touchstart', (event) => {
      this.setState({ isTouching: true, startTouchLngLat: event.lngLat });
    });
    this._map.on('touchend', () => {
      this.setState({ isTouching: false, startTouchLngLat: null });
    });
    this._map.on('rotatestart', (event) => {
      this.setState({ isRotating: true, startRotatingLngLat: event.lngLat });
    });
    this._map.on('rotateend', () => {
      this.setState({ isRotating: false, startRotatingLngLat: null });
    });
    this._map.on('loaded', () => {
      this.setState({ isLoaded: true });
    });
  }

  _updateConvenienceHandlers(nextProps) {
    if (diff('onClickFeatures', this.props, nextProps)) {
      if (nextProps.onClickFeatures) {
        this._map.on('click', this._simpleClick);
      } else {
        this._map.off('click', this._simpleClick);
      }
    }
    if (diff('onHoverFeatures', this.props, nextProps)) {
      if (nextProps.onHoverFeatures) {
        this._map.on('move', this._simpleHover);
      } else {
        this._map.off('move', this._simpleHover);
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
    // Check if the user is controlling this currently
    if (this.state.userControlled === true) {
      return;
    }

    const viewportChanged = (
      diff('center', this.props, nextProps) ||
      diff('zoom', this.props, nextProps) ||
      // diff('altitude', this.props, nextProps) ||
      diff('bearing', this.props, nextProps) ||
      diff('pitch', this.props, nextProps)
    );

    if (viewportChanged) {
      const target = {
        center: nextProps.center,
        longitude: nextProps.center[0],
        latitude: nextProps.center[1],
        zoom: nextProps.zoom,
        // altitude: nextProps.altitude,
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
        style={this.props.containerStyles}
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

  // Mapbox access token
  mapboxApiAccessToken: React.PropTypes.string,

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
  // altitude: React.PropTypes.number,
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

  clickRadius: 15,

  move,
};

Map.childContextTypes = {
  map: React.PropTypes.object,
};

Map.contextTypes = {
  mapboxApiAccessToken: React.PropTypes.string,
};

export default Map;
