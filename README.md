# react-map-gl-alt
react-map-gl-alt provides a React friendly API wrapper around Mapbox GL JS. A
webGl based vector tile mapping library.

This project proposes changes to the react-map-gl implementation approach to try
and support more of the mapbox-gl-js api spec and interactions. Still keeping
to the react single directional goals of react-map-gl, the Map is exposed in
a non-mutatable fashion.

The mapbox-gl-js can be controlled/stateless as part of your app.

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
  // Access features under cursor through safe non-mutable map accessor
  const features = e.target.queryRenderedFeatures(e.point);
  // ...
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
  <Map
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
  </Map>
);
```

### Usage using react-map-gl prop helpers

```jsx
import Map from 'react-map-gl-alt';

// ...

<Map width={400} height={400} longitude={144.9633200} latitude={-37.8140000}
  zoom={8} onChangeViewport={(viewport) => {
    const { latitude, longitude, zoom } = viewport;
    // Optionally this.setState({ viewport }); etc
  }}
/>
```

### Support for existing react-map-gl overlays

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

# Testing

You can run tests via standard NPM test. Ensure that you have installed the
devDependencies.

```
npm install -silent
npm test
```
