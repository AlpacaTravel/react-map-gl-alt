import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';
import { diffStyles } from 'mapbox-gl-style-spec';
import * as _ from 'lodash';

export const getInteractiveLayerIds = (mapStyle) => {
  let interactiveLayerIds = [];

  if (Map.isMap(mapStyle) && mapStyle.has('layers')) {
    interactiveLayerIds = mapStyle.get('layers')
      .filter(l => l.get('interactive'))
      .map(l => l.get('id'))
      .toJS();
  } else if (Array.isArray(mapStyle.layers)) {
    interactiveLayerIds = mapStyle.layers.filter(l => l.interactive)
      .map(l => l.id);
  }

  return interactiveLayerIds;
};

// Identify style or source updates
export const update = (map, currentMapStyle, nextMapStyle) => {
  if (Immutable.Map.isMap(nextMapStyle) &&
    (!nextMapStyle.equals(currentMapStyle))) {
    const before = currentMapStyle.toJs();
    const after = nextMapStyle.toJs();
    const changes = diffStyles(before, after);
    const skipAddSources = [];
    changes.forEach((change) => {
      // Bypass certain commands
      if (skipAddSources.length && change.command === 'addSource') {
        const sourceId = change.args[0];
        if (_.find(skipAddSources, sourceId)) {
          return;
        }
      }

      // Check if we are just updating the data
      if (change.command === 'removeSource') {
        const targetSource = change.args[0];
        if (nextMapStyle.sources[targetSource]) {
          const newSource = nextMapStyle.sources[targetSource];
          const oldSource = map.getSource(targetSource);
          if (oldSource instanceof mapboxgl.GeoJSONSource) {
            if (
              (newSource.maxzoom === undefined ||
                newSource.maxzoom === oldSource.geojsonVtOptions.maxZoom) &&
              (newSource.buffer === undefined ||
                newSource.buffer === oldSource.geojsonVtOptions.buffer) &&
              (newSource.tolerance === undefined ||
                newSource.tolerance === oldSource.geojsonVtOptions.tolerance) &&
              (newSource.cluster === undefined ||
                newSource.cluster === oldSource.cluster) &&
              (newSource.clusterRadius === undefined ||
                newSource.clusterRadius === oldSource.superclusterOptions.radius) &&
              (newSource.clusterMaxZoom === undefined ||
                newSource.clusterMaxZoom === oldSource.superclusterOptions.maxZoom)
            ) {
              oldSource.setData(newSource.data);
              skipAddSources.push(targetSource); // Don't re-add
              return;
            }
          }
        }
      }
      map[change.command].apply(map, change.args);
    });
  } else {
    map.setStyle(nextMapStyle);
  }
};
