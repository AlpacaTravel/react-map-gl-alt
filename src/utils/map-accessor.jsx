import Evented from './evented';

class MapAccessor {
  constuctor(map) {
    this._map = map;
    this._evented = new Evented(map, this);
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
    return this.map.hasClass(klass);
  }
  getClasses() {
    return this.map.getClasses();
  }
  getBounds() {
    return this.map.getBounds();
  }
  project(lnglat) {
    return this.map.project(lnglat);
  }
  unproject(point) {
    return this.map.unproject(point);
  }
  queryRenderedFeatures(...args) {
    return this.map.queryRenderedFeatures(...args);
  }
  querySourceFeatures(...args) {
    return this.map.querySourceFeatures(...args);
  }
  getContainer() {
    return this.map.getContainer();
  }
  getCanvasContainer() {
    return this.map.getCanvasContainer();
  }
  getCanvas() {
    return this.map.getCanvas();
  }
  loaded() {
    return this.map.loaded();
  }
  getCenter() {
    return this.map.getCenter();
  }
  getZoom() {
    return this.map.getZoom();
  }
  getBearing() {
    return this.map.getBearing();
  }
  getPitch() {
    return this.map.getPitch();
  }
}

export default MapAccessor;
