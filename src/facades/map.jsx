import Evented from '../evented';
import { cloneTransform } from '../utils/transform';
import Transform from './transform';

export default class Map {
  constructor(map) {
    this._map = map;
    this._evented = new Evented(map, this);
    this.transform = new Transform(map.transform);

    // Bind the context to this
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.getBounds = this.getBounds.bind(this);
    this.project = this.project.bind(this);
    this.unproject = this.unproject.bind(this);
    this.queryRenderedFeatures = this.queryRenderedFeatures.bind(this);
    this.querySourceFeatures = this.querySourceFeatures.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getCanvasContainer = this.getCanvasContainer.bind(this);
    this.loaded = this.loaded.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.getZoom = this.getZoom.bind(this);
    this.getBearing = this.getBearing.bind(this);
    this.getPitch = this.getPitch.bind(this);
    this.cloneTransform = this.cloneTransform.bind(this);
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
