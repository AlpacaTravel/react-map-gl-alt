import React from 'react';
import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';
import { default as addResizeListener, unbind as removeResizeListener } from 'element-resize-event';

import MapFacade from './facades/map';
import { diff, has, mod, lngLatArray } from './utils';
import { updateOptions as updateMapOptions, performMoveAction } from './utils/map';
import { getInteractiveLayerIds, update as updateStyle } from './utils/styles';

const defaultMoveAction = (target) => ({ command: 'flyTo', args: [target] });
const defaultFitBoundsAction = (target) => ({ command: 'fitBounds', args: [target.bounds, { animate: false }] });

class Map extends React.Component {
  static supported() {
    return mapboxgl.supported();
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSupported: Map.supported(),
      isDragging: false,
      isTouching: false,
      isZooming: false,
      isMoving: false,
      isLoaded: false,
      isStyleLoaded: false,
      startDragLngLat: null,
      startTouchLngLat: null,
      startZoomLngLat: null, // same as startZoom?
      startMoveLngLat: null,
      startRotatingLngLat: null, // same as startBearing?
      startBearing: null,
      startPitch: null,
      startZoom: null,
      userControlled: false,
    };

    const accessToken = props.mapboxApiAccessToken || context.mapboxApiAccessToken;
    if (accessToken) {
      mapboxgl.accessToken = accessToken;
    }

    this._simpleQuery = this._simpleQuery.bind(this);
    this._simpleClick = this._simpleClick.bind(this);
    this._simpleHover = this._simpleHover.bind(this);
    this._onChangeViewport = this._onChangeViewport.bind(this);
    this._resizedContainer = this._resizedContainer.bind(this);
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
      this.props.mapStyle.toJS() :
      this.props.mapStyle;

    // Optionally use longitude/latitude without a center present
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
      center: lngLatArray(this.props),
      zoom: this.props.zoom,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
    };

    // Create the map and configure the map options
    this._map = new mapboxgl.Map(options);
    this._mapFacade = new MapFacade(this._map);

    // If we have a bounds
    if (has(this.props, 'bounds')) {
      const next = {
        ...this.props,
        move: this.props.move || defaultFitBoundsAction,
      };
      this._updateMapViewport({}, next);
    }

    // Initial actions
    this._updateConvenienceHandlers({}, this.props);
    this._updateMapOptions({}, this.props);

    // Listen to some of the dispatched events
    this._listenStateEvents();

    // Add in event listeners for the container
    addResizeListener(this.refs.container, this._resizedContainer);
  }

  componentWillReceiveProps(nextProps) {
    this._updateMapViewport(this.props, nextProps);
    this._updateConvenienceHandlers(this.props, nextProps);
    this._updateStyle(this.props.mapStyle, nextProps.mapStyle);
    this._updateMapOptions(this.props, nextProps);
  }

  componentWillUnmount() {
    // Remove in event listeners for the container
    // Pending; https://github.com/KyleAMathews/element-resize-event/issues/2
    if (removeResizeListener) {
      removeResizeListener(this.refs.container, this._resizedContainer);
    }

    // Remove the map instance through the API
    if (this._map) {
      this._map.remove();
      this._map = null;
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
    const features = this._mapFacade.queryRenderedFeatures(
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

  _resizedContainer() {
    if (!this.props.trackResizeContainerDisabled && this._map) {
      this._map.resize();
    }
  }

  _simpleHover(e) {
    // Query the map and call the this.prop.onHoverFeatures
    if (!this.props.onHoverFeatures) {
      return;
    }
    this._simpleQuery(e.point, this.props.onHoverFeatures);
  }

  _onChangeViewport(e) {
    // Obtain map viewport and call the this.prop.onChangeViewport
    if (!this.props.onChangeViewport) {
      return;
    }

    const { lng, lat } = e.target.getCenter();
    this.props.onChangeViewport({
      longitude: mod(lng + 180, 360) - 180,
      latitude: lat,
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
      isUserControlled: this.state.userControlled,
      map: this._mapFacade,
    });
  }

  _listenStateEvents() {
    this._map.on('movestart', (event) => {
      this.setState({
        startMoveLngLat: event.target.getCenter(),
        startBearing: event.target.getBearing(),
        startPitch: event.target.getPitch(),
        startZoom: event.target.getZoom(),
        isUserControlled: (has(event, 'originalEvent')),
      });
    });
    this._map.on('moveend', () => {
      // Attempt to keep world within normal legal lng values
      // https://github.com/mapbox/mapbox-gl-js/issues/2071
      if (this.props.worldCopyJumpDisabled !== true) {
        const center = this._map.getCenter();
        const wrap = center.wrap();
        if (center.lng !== wrap.lng) {
          this._map.setCenter(wrap);
        }
      }
      this.setState({
        startMoveLngLat: null,
        startBearing: null,
        startPitch: null,
        startZoom: null,
        isUserControlled: false,
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
    this._map.on('load', () => {
      this.setState({ isLoaded: true });
      this._onChangeViewport({ target: this._mapFacade });
    });
  }

  _updateStyle(previousStyle, nextStyle) {
    updateStyle(this._map, previousStyle, nextStyle);
  }

  _updateMapOptions(previous, next) {
    updateMapOptions(this._map, previous, next);
  }

  _updateConvenienceHandlers(prevProps, nextProps) {
    if (diff('onClickFeatures', prevProps, nextProps)) {
      if (nextProps.onClickFeatures) {
        this._map.on('click', this._simpleClick);
      } else {
        this._map.off('click', this._simpleClick);
      }
    }
    if (diff('onHoverFeatures', prevProps, nextProps)) {
      if (nextProps.onHoverFeatures) {
        this._map.on('mousemove', this._simpleHover);
      } else {
        this._map.off('mousemove', this._simpleHover);
      }
    }
    if (diff('onChangeViewport', prevProps, nextProps)) {
      if (nextProps.onChangeViewport) {
        this._map.on('move', this._onChangeViewport);
      } else {
        this._map.off('move', this._onChangeViewport);
      }
    }
  }

  _updateMapViewport(prior, next) {
    // Check if the user is controlling this currently
    if (this.state.userControlled === true) {
      return;
    }

    // Obtain the center
    const propsCenter = lngLatArray(prior);
    const nextPropsCenter = lngLatArray(next);

    const viewportChanged = (
      diff(
        'center',
        { center: propsCenter },
        { center: nextPropsCenter }
      ) ||
      diff('bounds', prior, next) ||
      diff('zoom', prior, next) ||
      // diff('altitude', this.props, nextProps) ||
      diff('bearing', prior, next) ||
      diff('pitch', prior, next)
    );

    if (viewportChanged) {
      const target = {
        center: nextPropsCenter,
        longitude: nextPropsCenter[0],
        latitude: nextPropsCenter[1],
        bounds: next.bounds,
        zoom: next.zoom,
        // altitude: nextProps.altitude,
        bearing: next.bearing,
        pitch: next.pitch,
        ...this.state,
      };

      // Use a move
      const moveAction = next.move || defaultMoveAction;
      const result = moveAction(target);
      if (Array.isArray(result)) {
        result.forEach(action => performMoveAction(this._map, action));
      } else {
        performMoveAction(this._map, result);
      }
    }
  }

  render() {
    return (
      <div
        ref="container"
        className="map"
        style={this.props.style}
      >
        {this._map && this.props.children}
      </div>
    );
  }
}

Map.propTypes = {
  style: React.PropTypes.object,

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
  trackResizeContainerDisabled: React.PropTypes.bool,
  worldCopyJumpDisabled: React.PropTypes.bool,

  // Convenience implementations
  onChangeViewport: React.PropTypes.func,
  onHoverFeatures: React.PropTypes.func,
  ignoreEmptyFeatures: React.PropTypes.bool,
  onClickFeatures: React.PropTypes.func,
  clickRadius: React.PropTypes.number,
  longitude: React.PropTypes.number,
  latitude: React.PropTypes.number,

  // Target controls
  center: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.instanceOf(mapboxgl.LngLat),
  ]),
  zoom: React.PropTypes.number,
  // altitude: React.PropTypes.number,
  bearing: React.PropTypes.number,
  pitch: React.PropTypes.number,
  bounds: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)),
    React.PropTypes.instanceOf(mapboxgl.LngLatBounds),
  ]),

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
  minZoom: 0,
  maxZoom: 20,

  scrollZoomDisabled: false,
  dragRotateDisabled: false,
  dragPanDisabled: false,
  keyboardDisabled: false,
  doubleClickZoomDisabled: false,
  touchZoomRotateDisabled: false,
  trackResizeContainerDisabled: true,
  trackResizeDisabled: false,
  hashDisabled: true,
  interactiveDisabled: false,
  attributionControlDisabled: false,
  failIfMajorPerformanceCaveatDisabled: false,
  preserveDrawingBufferDisabled: true,
  worldCopyJumpDisabled: true,

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
};

Map.childContextTypes = {
  map: React.PropTypes.object,
};

Map.contextTypes = {
  mapboxApiAccessToken: React.PropTypes.string,
};

export default Map;
