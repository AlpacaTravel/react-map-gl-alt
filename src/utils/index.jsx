import * as _ from 'lodash';
import mapboxgl from 'mapbox-gl';

export const isEqual = (prop1, prop2) => (_.isEqual(prop1, prop2));
export const has = (obj, key) => (_.has(obj, key));

export const diff = (prop, obj1, obj2) => {
  const obj1HasProp = has(obj1, prop);
  const obj2HasProp = has(obj2, prop);
  if (!obj1HasProp && !obj2HasProp) {
    return false;
  } else if (
    (obj1HasProp && !obj2HasProp) ||
    (!obj1HasProp && obj2HasProp)
  ) {
    return true;
  }
  return !isEqual(obj1[prop], obj2[prop]);
};

export const mod = (value, divisor) => {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
};

export const lngLatBoundsArray = (props) => {
  if (!props.bounds) {
    return null;
  }

  if (Array.isArray(props.bounds)) {
    return props.bounds;
  }

  if (props.bounds instanceof mapboxgl.LngLatBounds) {
    return props.bounds.toArray();
  }

  return null;
};

export const lngLatArray = (props) => {
  if (!(props.longitude && props.latitude) && !props.center) {
    return null;
  }

  if (props.latitude && props.longitude && !props.center) {
    return [props.longitude, props.latitude];
  }

  if (Array.isArray(props.center)) {
    return props.center;
  }

  if (props.center instanceof mapboxgl.LngLat) {
    return props.center.toArray();
  }

  return null;
};
