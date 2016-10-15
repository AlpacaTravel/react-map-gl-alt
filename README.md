This project proposes changes to the react-map-gl implementation approach to try
and support more of the mapbox-gl-js api spec and interactions. Still keeping
to the react single directional goals of react-map-gl, the Map is exposed in
a non-mutatable fashion.

# Objectives
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


# Example use (crude)

```jsx
const hover = (e) => {
  // Access features under cursor through safe non-mutable map accessor
  const features = e.target.queryRenderedFeatures(e.point);
  // ...
}

// Can update center/zoom etc to move
return (
  <Map
    accessToken={...}
    style={...}
    center={...}
    zoom={...}
    bearing={...}
    pitch={...}
    move={(target) => ({ command: 'flyTo', args: [{
      ...target,
      // Use animation options etc.
      speed: 1.5,
      curve: 1.8,
    }])}
    scrollZoomDisabled={false}
  >
    <MapEvents
      onLoad={() => { this.setState({ loaded: true }); }}
      onError={(err) => console.error(err)}
      onMouseMove={hover}
      onMove={...}
      onClick={...}
    />
  </Map>
);
```

# Compatibility with existing react-map-gl projects

A project goal is to support similar behaviours of the existing react-map-gl
prop spec.

Some slight changes exist currently.

*containerWidth / containerHeight*
Chosen to use containerWidth and containerHeight props opposed to width/height
props (to support % based with react-dimensions). May implement HOC component
to make more convenient.

# Testing

You can run tests via standard NPM test. Ensure that you have installed the
devDependencies.

```
npm install -silent
npm test
```
