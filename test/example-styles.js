export const styleSat = {
  version: 8,
  name: 'Country labels',
  metadata: {
    'mapbox:autocomposite': true,
    'mapbox:type': 'template',
  },
  sources: {
    'mapbox://mapbox.satellite': {
      url: 'mapbox://mapbox.satellite',
      type: 'raster',
      tileSize: 256,
    },
  },
  sprite: 'mapbox://sprites/alpacatravel/ciucfcew200322ho8so7u88qj',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
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
      id: 'mapbox-mapbox-satellite',
      type: 'raster',
      source: 'mapbox://mapbox.satellite',
      interactive: true,
      layout: {},
      paint: {},
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
    composite: {
      url: 'mapbox://mapbox.mapbox-streets-v7',
      type: 'vector',
    },
    'mapbox://mapbox.satellite': {
      url: 'mapbox://mapbox.satellite',
      type: 'raster',
      tileSize: 256,
    },
  },
  sprite: 'mapbox://sprites/alpacatravel/ciucfcew200322ho8so7u88qj',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
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
      id: 'mapbox-mapbox-satellite',
      type: 'raster',
      source: 'mapbox://mapbox.satellite',
      interactive: true,
      layout: {},
      paint: {},
    },
    {
      id: 'country-label-sm',
      type: 'symbol',
      metadata: {
        'mapbox:group': 1459802941943.712,
      },
      source: 'composite',
      'source-layer': 'country_label',
      minzoom: 1,
      maxzoom: 10,
      interactive: true,
      filter: [
        '>=',
        'scalerank',
        5,
      ],
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 6,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-size': {
          base: 0.9,
          stops: [
            [5, 14],
            [9, 22],
          ],
        },
      },
      paint: {
        'text-color': 'hsl(0, 0%, 100%)',
        'text-halo-color': {
          base: 1,
          stops: [
            ['0', 'hsl(224, 2%, 18%)'],
            ['4', 'hsl(224, 1%, 12%)'],
            ['8', 'hsl(224, 1%, 2%)'],
          ],
        },
        'text-halo-width': 1.25,
      },
    },
  ],
  created: '2016-10-16T09:23:11.473Z',
  id: 'ciucfcew200322ho8so7u88qj',
  modified: '2016-10-16T09:23:11.473Z',
  owner: 'alpacatravel',
  draft: false,
};
