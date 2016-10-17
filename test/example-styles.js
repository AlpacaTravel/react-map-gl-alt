export const styleSat = {
  version: 8,
  name: 'Country labels',
  metadata: {
    'mapbox:autocomposite': true,
    'mapbox:type': 'template',
  },
  sources: {
    route: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276],
          ],
        },
      },
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      interactive: true,
      layout: {},
      paint: {
        'background-color': 'rgb(4,7,14)',
      },
    },
    {
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    },
  ],
  created: '2016-10-16T09:23:11.473Z',
  id: 'ciucfcew200322ho8so7u88qj',
  modified: '2016-10-16T09:23:11.473Z',
  owner: 'alpacatravel',
  draft: false,
};
export const styleSatCountryLabels = {
  version: 8,
  name: 'Country labels',
  metadata: {
    'mapbox:autocomposite': true,
    'mapbox:type': 'template',
  },
  sources: {
    route: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276],
          ],
        },
      },
    },
    points: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.03238901390978, 38.913188059745586],
          },
          properties: {
            title: 'Mapbox DC',
            icon: 'monument',
          },
        }, {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776],
          },
          properties: {
            title: 'Mapbox SF',
            icon: 'harbor',
          },
        }],
      },
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      interactive: true,
      layout: {},
      paint: {
        'background-color': 'rgb(4,7,14)',
      },
    },
    {
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    },
    {
      id: 'points',
      type: 'symbol',
      source: 'points',
      layout: {
        'icon-image': '{icon}-15',
        'text-field': '{title}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top',
      },
    },
  ],
  created: '2016-10-16T09:23:11.473Z',
  id: 'ciucfcew200322ho8so7u88qj',
  modified: '2016-10-16T09:23:11.473Z',
  owner: 'alpacatravel',
  draft: false,
};
