import * as _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import Immutable from 'immutable';
import { diffStyles } from 'mapbox-gl-style-spec';

export const diff = (prop, obj1, obj2) => (!_.isEqual(obj1[prop], obj2[prop]));

export const updateMapOptions = (map, current, next) => {
  if (diff('minZoom', current, next)) {
    map.setMinZoom(next.minZoom);
  }
  if (diff('maxZoom', current, next)) {
    map.setMinZoom(next.maxZoom);
  }
  if (diff('mapClasses', current, next)) {
    map.setClasses(next.mapClasses);
  }
  if (diff('maxBounds', current, next)) {
    map.setMaxBounds(next.mapClasses);
  }
  if (diff('scrollZoomDisabled', current, next)) {
    if (next.scrollZoomDisabled === true) {
      map.scrollZoom.disable();
    } else {
      map.scrollZoom.enable();
    }
  }
  if (diff('boxZoomDisabled', current, next)) {
    if (next.boxZoomDisabled === true) {
      map.boxZoom.disable();
    } else {
      map.boxZoom.enable();
    }
  }
  if (diff('dragRotateDisabled', current, next)) {
    if (next.dragRotateDisabled === true) {
      map.dragRotate.disable();
    } else {
      map.dragRotate.enable();
    }
  }
  if (diff('dragPanDisabled', current, next)) {
    if (next.dragPanDisabled === true) {
      map.dragPan.disable();
    } else {
      map.dragPan.enable();
    }
  }
  if (diff('keyboardDisabled', current, next)) {
    if (next.keyboardDisabled === true) {
      map.keyboard.disable();
    } else {
      map.keyboard.enable();
    }
  }
  if (diff('doubleClickZoomDisabled', current, next)) {
    if (next.doubleClickZoomDisabled === true) {
      map.doubleClickZoom.disable();
    } else {
      map.doubleClickZoom.enable();
    }
  }
  if (diff('touchZoomRotateDisabled', current, next)) {
    if (next.touchZoomRotateDisabled === true) {
      map.touchZoomRotate.disable();
    } else {
      map.touchZoomRotate.enable();
    }
  }
};

// Identify style or source updates
export const updateStyle = (map, currentMapStyle, nextMapStyle) => {
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
