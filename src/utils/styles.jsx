import Immutable, { Map } from 'immutable';
import { default as diffStyles } from '@mapbox/mapbox-gl-style-spec/diff';
import { isEqual, has } from './index';

export const getInteractiveLayerIds = (mapStyle) => {
  if (Map.isMap(mapStyle) && mapStyle.has('layers')) {
    return mapStyle.get('layers')
      .filter(l => l.get('interactive'))
      .map(l => l.get('id'))
      .toJS();
  } else if (Array.isArray(mapStyle.layers)) {
    return mapStyle.layers
      .filter(l => l.interactive)
      .map(l => l.id);
  }

  return [];
};

export const areGeoJSONSourcePropertiesSimilar = (source, newSource) => {
  const compareableOriginal = {};
  const compareableNew = {};
  const geojsonVtOptionsExtent = source.workerOptions.geojsonVtOptions.extent;
  const tileSize = source.tileSize;
  const scale = geojsonVtOptionsExtent / tileSize;
  if (has(newSource, 'buffer')) {
    compareableOriginal.buffer = source.workerOptions.geojsonVtOptions.buffer / scale;
    compareableNew.buffer = newSource.buffer;
  }
  if (has(newSource, 'tolerance')) {
    compareableOriginal.tolerance = source.workerOptions.geojsonVtOptions.tolerance / scale;
    compareableNew.tolerance = newSource.tolerance;
  }
  if (has(newSource, 'maxzoom')) {
    compareableOriginal.maxzoom = source.workerOptions.geojsonVtOptions.maxZoom;
    compareableNew.maxzoom = newSource.maxzoom;
  }
  if (has(newSource, 'cluster')) {
    compareableOriginal.cluster = source.workerOptions.cluster;
    compareableNew.cluster = newSource.cluster;
  }
  if (has(newSource, 'clusterMaxZoom')) {
    compareableOriginal.clusterMaxZoom = source.workerOptions.superclusterOptions.maxZoom;
    compareableNew.clusterMaxZoom = newSource.clusterMaxZoom;
  }
  if (has(newSource, 'clusterRadius')) {
    compareableOriginal.clusterRadius = source.workerOptions.superclusterOptions.radius / scale;
    compareableNew.clusterRadius = newSource.clusterRadius;
  }
  return (source.type === 'geojson' && newSource.type === 'geojson') && isEqual(compareableOriginal, compareableNew);
};

export const processStyleChanges = (map, changes, nextMapStyle) => {
  changes.forEach((change) => {
    const targetSource = change.args[0];

    // Check if we are just updating the data
    if (change.command === 'setGeoJSONSourceData') {
      if (nextMapStyle.sources && nextMapStyle.sources[targetSource]) {
        const source = map.getSource(targetSource);
        const data = change.args[1];
        source.setData(data);
        return;
      }
    }

    map[change.command].apply(map, change.args);
  });
};

// Identify style or source updates
export const update = (map, mapStyle, nextMapStyle) => {
  // String styles
  if (mapStyle !== nextMapStyle && (typeof nextMapStyle !== 'object')) {
    map.setStyle(nextMapStyle);
    return;
  }

  // If we can compare quickly
  if (Immutable.Map.isMap(nextMapStyle) &&
    (nextMapStyle.equals(mapStyle))) {
    return;
  }

  // If we are dealing with immutable elements
  let before = mapStyle;
  let after = nextMapStyle;
  if (Immutable.Map.isMap(mapStyle)) {
    before = mapStyle.toJS();
  }
  if (Immutable.Map.isMap(nextMapStyle)) {
    after = nextMapStyle.toJS();
  }

  // Process the style differences
  processStyleChanges(map, diffStyles(before, after), after);
};
