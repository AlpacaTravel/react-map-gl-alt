import Evented from '../evented';
import { cloneTransform } from '../utils/map';
import Transform from './transform';

export default class Map {
  constructor(map) {
    this._map = map;
    this._evented = new Evented(map, this);
    this.transform = new Transform(map.transform);
  }
  on(type, action) {
    this._evented.on(type, action);
    return this;
  }
  off(type, action) {
    this._evented.off(type, action);
    return this;
  }
  hasClass(klass) {
    return this._map.hasClass(klass);
  }
  getClasses() {
    return this._map.getClasses();
  }
  getBounds() {
    return this._map.getBounds();
  }
  project(lnglat) {
    return this._map.project(lnglat);
  }
  unproject(point) {
    return this._map.unproject(point);
  }
  queryRenderedFeatures(...args) {
    return this._map.queryRenderedFeatures(...args);
  }
  querySourceFeatures(...args) {
    return this._map.querySourceFeatures(...args);
  }
  getContainer() {
    return this._map.getContainer();
  }
  getCanvasContainer() {
    return this._map.getCanvasContainer();
  }
  getCanvas() {
    return this._map.getCanvas();
  }
  loaded() {
    return this._map.loaded();
  }
  getCenter() {
    return this._map.getCenter();
  }
  getZoom() {
    return this._map.getZoom();
  }
  getBearing() {
    return this._map.getBearing();
  }
  getPitch() {
    return this._map.getPitch();
  }
  cloneTransform() {
    return cloneTransform(this._map.transform);
  }
}
