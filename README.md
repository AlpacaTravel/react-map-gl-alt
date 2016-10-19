# react-map-gl-alt
[![Build Status](https://travis-ci.org/AlpacaTravel/react-map-gl-alt.svg?branch=master)](https://travis-ci.org/AlpacaTravel/react-map-gl-alt)
[![Coverage Status](https://coveralls.io/repos/github/AlpacaTravel/react-map-gl-alt/badge.svg?branch=master)](https://coveralls.io/github/AlpacaTravel/react-map-gl-alt?branch=master)

react-map-gl-alt provides a [React](http://facebook.github.io/react/) friendly
API wrapper around [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/). A webGl
based vector tile mapping library.

This library improves API access and event access.

## Objectives

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
* Provide a separation for managing viewport interactions (Done)
* Support for all current Uber overlays (In Progress)
* Provide an example controlled viewport interaction component (In Progress)
* High Code Coverage (Done)

## Overview

### Installation

```
npm install react-map-gl-alt --save
```

This package works with compatible mapbox-gl-js build approaches, including
webpack. This library supports the current 'dist' method recommended by
mapbox-gl-js as of 0.25.0.

See [webpack example](https://github.com/AlpacaTravel/react-map-gl-alt/blob/master/example/webpack.config.js)

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

* Supply a center or longitude/latitude props (center is prefered)
* Supply bounds
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

### Transform

The map facade also offers access to the map transform. This is done through
a Transform Facade.

```jsx
// Access the transform facade (read only) through the map facade
const transform = map.transform;

// Optionally use a clone to have a working transform (detached);
const clonedTransform = map.cloneTransform(); // version unlocked clone..
```

## Controlling move animations

You can provide new viewport details to the map, and as well have the
opportunity to control the animation. This allows you to control the Camera and
Animation options, as well as customise the usual Mapbox API args.


### Supported move animations

* flyTo
* jumpTo
* panTo
* zoomTo
* zoomIn
* rotateTo
* resetNorth
* snapToNorth
* fitBounds
* panTo

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

# Testing

You can run tests via standard NPM test. Ensure that you have installed the
devDependencies.

```
npm install -silent
npm test
```
