import React from 'react';
import ReactDOM from 'react-dom';
import MapGL from '../../src/map';
import MapEvents from '../../src/map-events';

const mapboxApiAccessToken = process.env.MAPBOX_API_ACCESS_TOKEN;

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
    };
  }

  render() {
    const click = (e) => {
      // Access features under cursor through safe non-mutable map facade
      const features = e.target.queryRenderedFeatures(e.point);
      console.log(features);
    };

    const onChangeViewport = () => {
      // ...
    };

    const move = (target) => ({
      command: 'flyTo',
      args: [{
        ...target,
        // Use animation options, duration etc.
        speed: 1.5,
        curve: 1.8,
      }],
    });

    const takeMeToHome = () => {
      this.setState(
        {
          target: {
            zoom: 10,
            center: [144.9633200, -37.8140000],
          },
        }
      );
    };

    // Can update center/zoom etc to move
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <div>
          <button onClick={takeMeToHome}>
            Melbourne
          </button>
        </div>
        <MapGL
          mapboxApiAccessToken={mapboxApiAccessToken}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...this.state.target}
          onChangeViewport={onChangeViewport}
          style={{
            display: 'flex',
            flex: 1,
          }}
          move={move}
        >
          <MapEvents
            onLoad={() => { this.setState({ loaded: true }); }}
            onError={console.error}
            onClick={click}
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
