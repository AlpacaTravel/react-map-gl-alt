# React WebGL Maps with Mapbox GL JS

*react-map-gl-alt* provides a [React](http://facebook.github.io/react/) friendly
API wrapper around [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/). A webGl
based vector tile mapping library.

This library is "bare-bones" without the kitchen-sink, for more direct API
interactions with the mapbox API.

[![NPM](https://nodei.co/npm/react-map-gl-alt.png?downloads=true&downloadRank=true)](https://nodei.co/npm/react-map-gl-alt/)
![Dependency Management](https://david-dm.org/AlpacaTravel/react-map-gl-alt.svg)

## Overview

This project looks at improved programmatic bindings to the API, motion control,
event handling and style management (such as Redux controlled state opposed to
  React or style URLs).

At a basic level, this library provides your React project with beautiful WebGL
maps that can be used for data visualiations and improved interactivity.

If you plan on creating simple maps and are new to mapbox gl js, you may find
simpler integrations using [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl).
If you require finer control of your style, API and want to leverage more of the
API this project we think will help you.

* Expose the mapbox API to your React application in a convenient way
* Use the latest available mapbox-gl-js release without version locking (Done)
* Expose access to all mapbox-gl-js events (safely with a readonly map accessor) (Done)
* Provide <MapEvents onLoad={...} onMove={...} /> exposing all mapbox events (Done)
* Allow safe access to use queryRenderedFeatures etc. (Done)
* Provide a mechanism to support all mapbox-gl-js camera/animation controls (Done)
* Use standard interactions (support for touch, scroll zoom etc) (Done)
* Expose ability to turn on/off handlers (e.g. BoxZoom, ScrollZoom, DoubleClickZoom) (Done)
* Expose project/unproject to use mapbox-gl-js mercator opposed to separate instance (Done)
* Use Immutable and mapbox-gl-js-style-spec for diffStyles (Done)
* Use setData for geojson sources (Done)
* API support for current react-map-gl MapGL wrapper props (Done)
* Support for width/height 100%/100vh etc (Done)
* Provide a separati on for managing viewport interactions (Done)
* Support for all current Uber overlays (In Progress)
* Provide an example controlled viewport interaction component (In Progress)
* High Code Coverage (Done - Subsequently REMOVED as requires a mock implementation of mapbox)

## Overview

### Installation

```
npm install react-map-gl-alt --save
```

This package works with compatible mapbox-gl-js build approaches, including
webpack, browserify, etc.

#### Using Webpack

You will need to set your resolve "alias" section to include the mapbox gl js
dist file directly. Mapbox GL JS has recommended this approach since version
0.25.0.

See [webpack configuration example](https://github.com/AlpacaTravel/react-map-gl-alt/blob/master/example/webpack.config.js)

### Simple Usage

```jsx
import MapGL from 'react-map-gl-alt';

// Simple react component returning your webGL map
export const MapExample = () => (
  <MapGL
    mapboxApiAccessToken="<your access token here>"
    mapStyle="mapbox://styles/mapbox/streets-v9"
    />
);
```

## Running the examples

Clone the example to your local fs. The example shows a simple full screen
interaction controlled by this component (built using webpack etc).

```
npm install
npm start
```

### Usage (showing map accessor interaction with map events)

```jsx
const hover = (e) => {
  // Access features under cursor through safe non-mutable map facade
  const features = e.target.queryRenderedFeatures(e.point);
}
const move = (e) => {
  // Differentiate user interaction versus flyTo
  if (e.originalEvent) {
    console.log('A human moved the map');
  }
  // Access map props (no mutation possible)
  console.log(e.target.getCenter(), e.target.getZoom());
}

// Can update center/zoom etc to move
return (
  <MapGL
    mapboxApiAccessToken={...}
    mapStyle={...}
    center={...}
    zoom={...}
    bearing={...}
    pitch={...}
    move={(target) => ({ command: 'flyTo', args: [{
      ...target,
      // Use animation options, duration etc.
      speed: 1.5,
      curve: 1.8,
    }])}
    scrollZoomDisabled={true}
  >
    <MapEvents
      onLoad={() => { this.setState({ loaded: true }); }}
      onError={console.error}
      onMouseMove={hover}
      onMove={move}
      onClick={...}
    />
  </MapGL>
);
```

## Orienting the viewport

You can provide a number of props to help control the location of the map. This
includes providing center, longitude latitude or a bounds.

* Supply a center or longitude/latitude props (LngLat like center is prefered)
* Supply bounds (e.g. LngLatBounds like)
* Supply zoom/bearing/pitch


```jsx
// Using a bounds
return (
  <MapGl
    bounds={bounds}
    move={(target) => ({
      command: 'fitBounds',
      args: [
        target.bounds,
        { animate: false, padding: 50 }
      ],
      })}
  />
);
```

## Map Options

You can adjust the map following map options through the ```<Map />``` exposed
props;

* scrollZoomDisabled (default false)
* dragRotateDisabled (default false)
* dragPanDisabled (default false)
* keyboardDisabled (default false)
* doubleClickZoomDisabled (default false)
* touchZoomRotateDisabled (default false)
* trackResizeDisabled (default false)
* interactiveDisabled (default false)
* pitchWithRotateDisabled (deafult false)
* attributionControlDisabled (default false)
* failIfMajorPerformanceCaveatDisabled (default false)
* preserveDrawingBuffer (default true)
* bearingSnap (default 7)
* mapClasses (default [])

There are also some enhanced behaviours to assist.

* worldCopyJumpDisabled (default true)
* trackResizeContainerDisabled (default true)
* crossSourceCollisionsDisabled (default false)


## The Map Facade

To reduce the state managed outside of this component, the component offers a
facade to the map object. The facade provides all accessor based methods for
those familiar with the mapbox API spec (e.g. getCenter, getCanvas etc)

```jsx
const click = (e) => {
  // Access the read only properties of the map
  const map = e.target;  
}

...
return (
  <MapGL {...props}>
    <MapEvents onClick={click} />
  </MapGL>
);
```

This is included along with events from the component/api, replacing the
exposed 'target' event.

Note: This Map Facade is available to children context.

### Transform

The map facade also offers access to the map transform. This is done through
a Transform Facade.

```jsx
// Access the transform facade (read only) through the map facade
const transform = map.transform;

// Optionally use a clone to have a working transform (detached);
const clonedTransform = map.cloneTransform(); // version unlocked clone..
```

The cloned transform can provide the ability to calculate zoom around and other
various viewport calculations in a interaction controlled state.

### Available Events

All the current documented events are accessible in this implementation. All
are available through using the MapEvents component with the prefix 'on', e.g.
onClick, onLoad, onMouseMove, onDrag etc.

* onStyleLoad
* onResize
* onWebGLContextLost
* onWebGLContextRestored
* onRemove
* onDataLoading
* onRender
* onLoad
* onData
* onError
* onMouseOut
* onMouseDown
* onMouseUp
* onMouseMove
* onTouchStart
* onTouchEnd
* onTouchMove
* onTouchCancel
* onClick
* onDblClick
* onContextMenu
* onMoveStart
* onMove
* onMoveEnd
* onZoomStart
* onZoomEnd
* onZoom
* onBoxZoomCancel
* onBoxZoomEnd
* onBoxZoomStart
* onRotateStart
* onRotateEnd
* onDragStart
* onDragEnd
* onDrag
* onPitch

Note: This component can be mounted many times in the children of the MapGL
component, enabling you to have many different function interactions depending
on what is mounted. There is support for multiple 'onClick' etc. listeners
using this method.

## Controlling move animations

You can provide new viewport details to the map, and as well have the
opportunity to control the animation. This allows you to control the Camera and
Animation options, as well as customise the usual Mapbox API args.

### Supported move animations

* flyTo
* jumpTo
* panTo
* zoomTo
* easeTo
* rotateTo
* fitBounds
* panTo
* fitScreenCoordinates

Other possible move control include zoomIn/zoomOut, snapToNorth, resetNorth. Be
cautious using these as you need to anticipate their state.

### Usage with move function

```jsx
const move = (target) => ({
  command: 'flyTo',
  args: [
    {
      ...target, // Standard target viewport
      // Additional camera/animation options
      speed: 0.2, // Slow it down
      curve: 1,
      // Control the easing
      easing: function(t) {
        return t;
      }
    }
  ]
});

return (
  <MapGL
    ...
    move={move}
  />
);
```

### Controlled animation using React Motion

Supporting stateless behaviour, this library can use React-Motion behaviour.

```jsx
<Motion style={{
  latitude: spring(viewport.latitude, { stiffness: 170, damping: 26, precision: 0.000001 }),
  longitude: spring(viewport.longitude, { stiffness: 170, damping: 26, precision: 0.000001 })
}}>
  {({ latitude, longitude }) => <MapGL
    {...viewport}
    latitude={latitude}
    longitude={longitude}
    mapStyle={mapboxStyle}
  />}
</Motion>
```

### Controlling viewport interactions (stateless map viewport)

If you chose to fully control the viewstate component and control your own
interactions, you can wrap this component in your own interaction component.

The child context provides access to the read only Map Facade, which supports
read-only project/unproject/transform as well as a cloneTransform etc.

```jsx
return (
  <MapGL
    {...viewport}
    interactiveDisabled={true}
  >
    <MyInteractiveControls
      onChangeViewport={(viewport) => this.setState({ viewport })}
    />
  </MapGL>
);
```

## Differences to react-map-gl

This project interfaces similar to the react-map-gl component, but aims to
provide some flexibilities with interactions. See the objectives of this project
which articulate some of the major differences with this implementation to
react-map-gl.

There have been some motivations for us to warrant this extended spec. We need
more exposure to the supported features of mapbox-gl-js, as well as want to
leverage their optimised user interactions for smoother map behaviour.

* Support for all interactions of mapbox-gl-js
* Support for all handlers (BoxZoom, ScrollZoom, DoubleClickZoom, Keyboard etc)
* Support the lastest mapbox-gl-js releases
* More flexible control of animation
* Improved mapbox API exposure with more of the API available for developers (stateless)
* Support for all mapbox events
* Easy access to queryRenderedFeatures etc.

This project also supports the existing proptypes and convenience functions
as react-map-gl so that developers can use their existing code and migrate
across easily.

Your visualisations and overlays will still be compatible also.

### Support using react-map-gl prop helpers (onChangeViewport, onClickFeatures...)

The following props expose similar behaviour to the react-map-gl library.

* onChangeViewport
* onHoverFeatures
* onClickFeatures
* clickRadius (default 15)
* ignoreEmptyFeatures (default false)

```jsx
import MapGL from 'react-map-gl-alt';

// ...

<MapGL width={400} height={400} longitude={144.9633200} latitude={-37.8140000}
  zoom={8} onChangeViewport={(viewport) => {
    const { latitude, longitude, zoom } = viewport;
    // Optionally this.setState({ viewport }); etc
  }}
/>
```

### Support for existing react-map-gl overlays

As this library produces the viewport containing the similar props as the
current react-map-gl spec, the existing react-map-gl overlays can be used, as
well as the other 3rd party overlays (as well as deck.gl etc.)

```jsx
import Map from 'react-map-gl-alt';

<Map {...viewport}>
  <ScatterplotOverlay
    {...viewport}
    locations={locations}
    dotRadius={4}
    globalOpacity={1}
    compositeInteraction="screen" />
  // Add additional overlays etc here...
</Map>
```

Please note; This project does not currently package the overlays included with
the react-map-gl project.

### Using ViewportMercator

You can still use the ViewportMercator supplying it the width/height. As this
library supports flex/vh and percentage based values, you can pass them in
as below;

```js
import ViewportMercator from 'viewport-mercator-project';

// Obtain the width and height accurately from the canvas drawn on screen
const { width, height } = viewport.map.getCanvas();

// Create the mercator from your captured viewport
const originalMercator = ViewportMercator({
  ...viewport, // Viewport obtained by onChangeViewport etc.
  width,
  height,
});
```

### Extended onChangeViewport

This library also exposes several new properties to the viewport state exposed
through the ```onChangeViewport``` method.

* isDragging
* isTouching (new)
* isMoving (new)
* isZooming (new)
* startDragLngLat
* startTouchLngLat (new)
* startMoveLngLat (new)
* startZoomLngLat (new)
* startPitch
* startBearing
* isUserControlled (new)
* longitude
* latitude
* center (new)
* zoom
* map (new - access to the map facade and transform/cloneTransform)

### worldCopyJumpDisabled (Experimental - default false)

When enabled, the map tracks the pan to another copy of the world and resets
the center. This is to assist emulating the behaviour of Leaflet
world copy jump behaviour. This behaviour will reset the center to the wrapped
center after the end of a move behaviour.

This can help the projection of your overlays (popups and custom markers etc)
that typically have problems projecting with illegal lng/lat values.

### trackResizeContainerDisabled (Experimental - default false)

When enabled, when the container is resized (opposed to the window), the map
will have a resize() call applied. This can assist where a transition happens
to the map component and it is important to call resize().

### crossSourceCollisionsDisabled (default false)

With the introduction of 0.46.0, Mapbox GL JS support for disabling cross source
collissions has been introduced. Apply this prop to the map to apply the map
option.

### featureState

You can pass the prop of featureState with an array of feature states.

```
// References to the feature state
const feature = { source: 'mySource', sourceLayer: 'default', id: '123' };
const state = { selected: true };

const featureStates = [
  { feature, state }
];

// Apply to the prop featureStates

```

### Controlling Attribution

* attributionControlDisabled (default false)
* logoPosition (default 'bottom-left')
* customAttribution (default null, accepts string|array)

### Additional Props for initiation of maps

In addition to the API offered above, the additional props are exposed for
initiating the map:

* collectResourceTimingDisabled (default true)
* transformRequest (default null)
* localIdeographFontFamily (default null)
* maxTileCacheSize (default null)
* clickTolerance (default 3)
*
