import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { default as addResizeListener, unbind as removeResizeListener } from 'element-resize-event';

import MapFacade from './facades/map';
import { diff, has, mod, lngLatArray } from './utils';
import { updateOptions as updateMapOptions, performMoveAction } from './utils/map';
import { getInteractiveLayerIds, update as updateStyle } from './utils/styles';

const defaultMoveAction = (target) => ({ command: 'flyTo', args: [target] });
const defaultFitBoundsAction = (target) => ({ command: 'fitBounds', args: [target.bounds, { animate: false, duration: 100 }] });

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
      featureStates: null,
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
    const mapStyle = (this.props.mapStyle && this.props.mapStyle.toJS &&
      this.props.mapStyle.toJS()) ||
      this.props.mapStyle;

    // Optionally use longitude/latitude without a center present
    const options = {
      container: this.container,
      style: mapStyle,
      hash: !this.props.hashDisabled,
      interactive: !this.props.interactiveDisabled,
      bearingSnap: this.props.bearingSnap,
      pitchWithRotate: this.props.pitchWithRotate,
      clickTolerance: this.props.clickTolerance,
      attributionControl: !this.props.attributionControlDisabled,
      customAttribution: this.props.customAttribution,
      logoPosition: this.props.logoPosition,
      failIfMajorPerformanceCaveat: !this.props.failIfMajorPerformanceCaveatDisabled,
      preserveDrawingBuffer: !this.props.preserveDrawingBufferDisabled,
      refreshExpiredTiles: !this.props.refreshExpiredTilesDisabled,
      trackResize: !this.props.trackResizeDisabled,
      center: lngLatArray(this.props),
      zoom: this.props.zoom,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
      renderWorldCopies: !this.props.renderWorldCopiesDisabled,
      maxTileCacheSize: this.props.maxTileCacheSize,
      localIdeographFontFamily: this.props.localIdeographFontFamily,
      transformRequest: this.props.transformRequest,
      collectResourceTiming: !this.props.collectResourceTimingDisabled,
      fadeDuration: this.props.fadeDuration,
      crossSourceCollisions: !this.props.crossSourceCollisionsDisabled,
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
    this._updateFeatureState({}, this.props);

    // Listen to some of the dispatched events
    this._listenStateEvents();

    // Add in event listeners for the container
    addResizeListener(this.container, this._resizedContainer);
  }

  componentDidUpdate(prevProps) {
    this._updateConvenienceHandlers(prevProps, this.props);
    this._updateStyle(prevProps.mapStyle, this.props.mapStyle);
    this._updateMapOptions(prevProps, this.props);
    this._updateMapViewport(prevProps, this.props);
    this._updateFeatureState(prevProps, this.props);
  }

  componentWillUnmount() {
    // Remove in event listeners for the container
    // Pending; https://github.com/KyleAMathews/element-resize-event/issues/2
    if (removeResizeListener) {
      removeResizeListener(this.container, this._resizedContainer);
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
      if (!this.props.forceResizeContainerViewportDisabled && this._map) {
        this._updateMapViewport(this.props, { ...this.props, timestamp: Date.now() });
      }
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
    this._map.on('moveend', (e) => {
      // Attempt to keep world within normal legal lng values
      // https://github.com/mapbox/mapbox-gl-js/issues/2071
      if (this.props.worldCopyJumpDisabled !== true) {
        const map = this._map; // Use map from the event
        if (!e.snapWorldMove && map) {
          map.setCenter(map.getCenter().wrap(), { snapWorldMove: true });
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

  _updateFeatureState(prevProps, nextProps) {
    if (diff('featureStates', prevProps, nextProps)) {
      // Transform the function from [{ feature, state }] to { [feature]: { feature, state } }
      const featureStates = fs => fs && Array.isArray(fs) && fs.reduce((c, t) =>
        Object.assign({}, c, { [`${t.feature.source}:${t.feature.sourceLayer || ''}:${t.feature.id}`]: t }), {}) || {};

      // Reset existin
      const current = this.state.featureStates;
      const next = featureStates(nextProps.featureStates);
      if (current) {
        // Any non-matching states can be reset
        Object.keys(current).filter(key => !next[key])
          .forEach((key) => {
            // https://github.com/mapbox/mapbox-gl-js/issues/6889
            const blankState = Object.keys(current[key].state).reduce((c, t) => Object.assign({}, c, { [t]: null }), {});
            this._map.setFeatureState(current[key].feature, blankState);
          });
      }

      // Any non-matching states can be reset
      Object.keys(next)
        .forEach((key) => this._map.setFeatureState(next[key].feature, next[key].state));

      // Hold the feature state
      this.setState({ featureStates: next });
    }
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
      diff('pitch', prior, next) ||
      diff('timestamp', prior, next)
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
        ref={container => { this.container = container; }}
        className="map"
        style={this.props.style}
      >
        {this._map && this.props.children}
      </div>
    );
  }
}

Map.propTypes = {
  style: PropTypes.object,

  // Mapbox access token
  mapboxApiAccessToken: PropTypes.string,

  // Main style
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,

  // Move control actions
  move: PropTypes.func,

  // Control Interactions
  scrollZoomDisabled: PropTypes.bool,
  boxZoomDisabled: PropTypes.bool,
  dragPanDisabled: PropTypes.bool,
  dragRotateDisabled: PropTypes.bool,
  keyboardDisabled: PropTypes.bool,
  doubleClickZoomDisabled: PropTypes.bool,
  touchZoomRotateDisabled: PropTypes.bool,
  trackResizeDisabled: PropTypes.bool,
  trackResizeContainerDisabled: PropTypes.bool,
  worldCopyJumpDisabled: PropTypes.bool,
  forceResizeContainerViewportDisabled: PropTypes.bool,
  crossSourceCollisionsDisabled: PropTypes.bool,

  // Convenience implementations
  onChangeViewport: PropTypes.func,
  onHoverFeatures: PropTypes.func,
  ignoreEmptyFeatures: PropTypes.bool,
  onClickFeatures: PropTypes.func,
  clickRadius: PropTypes.number,
  longitude: PropTypes.number,
  latitude: PropTypes.number,

  // Target controls
  center: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.instanceOf(mapboxgl.LngLat),
  ]),
  zoom: PropTypes.number,
  // altitude: PropTypes.number,
  bearing: PropTypes.number,
  pitch: PropTypes.number,
  bounds: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.instanceOf(mapboxgl.LngLatBounds),
  ]),

  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  maxBounds: PropTypes.object,
  hashDisabled: PropTypes.bool,
  interactiveDisabled: PropTypes.bool,
  bearingSnap: PropTypes.number,
  mapClasses: PropTypes.arrayOf(PropTypes.string),
  logoPosition: PropTypes.string,
  pitchWithRotate: PropTypes.bool,
  clickTolerance: PropTypes.number,
  customAttribution: PropTypes.oneOf(PropTypes.string, PropTypes.array),
  fadeDuration: PropTypes.number,
  localIdeographFontFamily: PropTypes.string,
  maxTileCacheSize: PropTypes.number,
  collectResourceTimingDisabled: PropTypes.bool,
  transformRequest: PropTypes.func,
  renderWorldCopiesDisabled: PropTypes.bool,
  refreshExpiredTilesDisabled: PropTypes.bool,

  attributionControlDisabled: PropTypes.bool,
  failIfMajorPerformanceCaveatDisabled: PropTypes.bool,
  preserveDrawingBufferDisabled: PropTypes.bool,
  children: PropTypes.any,

  featureStates: PropTypes.arrayOf(PropTypes.object),
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
  forceResizeContainerViewportDisabled: false,
  crossSourceCollisionsDisabled: false,
  logoPosition: 'bottom-left',
  refreshExpiredTilesDisabled: false,
  pitchWithRotate: true,
  clickTolerance: 3,
  customAttribution: null,
  fadeDuration: 300,
  localIdeographFontFamily: null,
  maxTileCacheSize: null,
  collectResourceTimingDisabled: true,
  transformRequest: null,
  renderWorldCopiesDisabled: false,

  featureStates: [],

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
  map: PropTypes.object,
};

Map.contextTypes = {
  mapboxApiAccessToken: PropTypes.string,
};

export default Map;
