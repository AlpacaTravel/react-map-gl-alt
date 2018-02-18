import React from 'react';
import ReactDOM from 'react-dom';
import MapGL from '../../src/map';
import MapEvents from '../../src/map-events';

const mapboxApiAccessToken = process.env.MAPBOX_API_ACCESS_TOKEN;

const flyTo = (target) => ({
  command: 'flyTo',
  args: [{
    ...target,
    // Use animation options, duration etc.
    duration: 1000,
    curve: 1.8,
  }],
});

const fitBounds = (target) => ({
  command: 'fitBounds',
  args: [target.bounds, { duration: 0 }]
});

const resetNorth = (target) => ({
  command: 'resetNorth',
  args: [{
    ...target,
    duration: 200,
  }],
});

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false,
      target: {
        center: [
          144.9633200,
          -37.8140000,
        ],
        zoom: 5,
      },
      motion: flyTo,
      flex: 1,
    };

    this._onClick = this._onClick.bind(this);
    this._onChangeViewport = this._onChangeViewport.bind(this);
  }

  _onChangeViewport(viewport) {
    this.setState({ viewport });
  }

  _onClick(e) {
    // Access features under cursor through safe non-mutable map facade
    const features = e.target.queryRenderedFeatures(e.point);
    console.log(e, features);
  }

  render() {
    // Can update center/zoom etc to move
    return (
      <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <div>
          <button onClick={() => this.setState({ target: { ...this.state.viewport, zoom: 10, center: [144.9633200, -37.8140000] }, motion: flyTo })}>
            Goto Melbourne
          </button>
          <button onClick={() => this.setState({ target: { ...this.state.viewport, bearing: 0, pitch: 0 }, motion: resetNorth })}>
            Reset North
          </button>
          <button onClick={() => this.setState({ target: { bounds: [10, 10, 20, 20] }, motion: fitBounds })}>
            Bounds
          </button>
          <button onClick={() => this.setState({ flex: this.state.flex === 1 ? 0.5 : 1 })}>
            Flex
          </button>
        </div>
        <MapGL
          mapboxApiAccessToken={mapboxApiAccessToken}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...this.state.target}
          failIfMajorPerformanceCaveatDisabled
          onChangeViewport={this._onChangeViewport}
          style={{ display: 'flex', flex: this.state.flex }}
          move={this.state.motion}
          worldCopyJumpDisabled={false}
          trackResizeContainerDisabled={false}
        >
          <MapEvents
            onLoad={() => { this.setState({ loaded: true }); }}
            onError={console.error}
            onClick={this._onClick}
          />
        </MapGL>
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('react-map-gl-alt')
);
