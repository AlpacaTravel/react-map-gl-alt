import * as _ from 'lodash';

export const diff = (prop, obj1, obj2) => (!_.isEqual(obj1[prop], obj2[prop]));
