import * as _ from 'lodash';
import mapboxgl from 'mapbox-gl';

export const diff = (prop, obj1, obj2) => {
  if (!_.has(obj1, prop) || !_.has(obj2, prop)) {
    return true;
  }
  return !_.isEqual(obj1[prop], obj2[prop]);
};

export const has = (obj, key) => (_.has(obj, key));

export const mod = (value, divisor) => {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
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
