import * as _ from 'lodash';

export const diff = (prop, obj1, obj2) => {
  if (!obj1 || !obj2 || !obj1[prop] || !obj2[prop]) {
    return true;
  }
  return !_.isEqual(obj1[prop], obj2[prop]);
};

export const has = (obj, key) => (_.has(obj, key));

export const mod = (value, divisor) => {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
};
