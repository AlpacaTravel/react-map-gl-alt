import * as _ from 'lodash';

export const diff = (prop, obj1, obj2) => {
  if (!obj1 || !obj2 || !obj1[prop] || !obj2[prop]) {
    return true;
  }
  return !_.isEqual(obj1[prop], obj2[prop]);
};
