# react-map-gl-alt
[![Build Status](https://travis-ci.org/AlpacaTravel/react-map-gl-alt.svg?branch=master)](https://travis-ci.org/AlpacaTravel/react-map-gl-alt)

react-map-gl-alt provides a [React](http://facebook.github.io/react/) friendly
API wrapper around [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/). A webGl
based vector tile mapping library.

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
* API similar to current react-map-gl MapGL object props (Done)
* Support for all current Uber overlays (In Progress)
* Support for width/height 100% etc (In Progress)
* Provide a separation for managing viewport interactions (Done)
* Provide an example controlled viewport interaction component (To Do)

## Overview

### Installation (experimental)

```
npm install react-map-gl-alt --save
```

This package works with compatible mapbox-gl-js build approaches, including
webpack. This library supports the current 'dist' method recommended by
mapbox-gl-js as of 0.25.0.

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

## The Map Facade

To reduce the state managed outside of this component, the component offers a
facade to the map object. The facade provides all accessor based methods for
those familiar with the mapbox API spec (e.g. getCenter, getCanvas etc)

This is included along with events from the component/api, replacing the
exposed 'target' event.

Additionally, the ```cloneTransform``` method is added that supports
accessing a clone of the current map transform. If you don't want to clone
transform, the library provides the transform facade.

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
This project interfaces similar to the react-map-gl component, but aims to build
a working relationship with mapbox-gl-js in terms of controlled interaction
and internal state.

This leads to more fluid transitions and support for all mapbox user
interactions.

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
* userControlled (new)
* longitude
* latitude
* center (new)
* zoom

# Testing

You can run tests via standard NPM test. Ensure that you have installed the
devDependencies.

```
npm install -silent
npm test
```
