An alternative implementation of uber/react-map-gl.

This project changes the implementation approach to try and provide more use
of the mapbox gl api spec. It also still aims to be single directional by
limiting access to mapbox-gl in a mutatable way. Mutation is still handled
through this library.

Objectives
* Use the latest available mapbox-gl-js release without version locking (Done)
* Expose access to all mapbox-gl-js events (safely with a readonly map accessor) (Done)
* Provide <MapEvents onLoad={...} onMove={...} /> exposing all mapbox events (Done)
* Allow safe access to use queryRenderedFeatures etc. (Done)
* Provide a mechanism to support all mapbox-gl-js camera/animation controls (Done)
* Use standard interactions (support for touch, scroll zoom etc) (Done)
* Expose ability to turn on/off handlers (e.g. BoxZoom, ScrollZoom, DoubleClickZoom) (Done)
* Use Immutable and mapbox-gl-js-style-spec for diffStyles (Done)
* Use setData for geojson sources (Done)
* API similar to current react-map-gl MapGL object props (Done)
* Support for all current Uber overlays (In Progress)
* Support for width/height 100% etc (TODO)


```
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
    move={(target) => (['flyTo', {
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
