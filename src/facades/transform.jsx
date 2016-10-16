export default class Transform {
  constructor(transform) {
    this._transform = transform;
  }
  get minZoom() {
    return this._transform.minZoom;
  }
  get maxZoom() {
    return this._transform.maxZoom;
  }
  get worldSize() {
    return this._transform.worldSize;
  }
  get centerPoint() {
    return this._transform.centerPoint;
  }
  get size() {
    return this._transform.size;
  }
  get bearing() {
    return this._transform.bearing;
  }
  get pitch() {
    return this._transform.pitch;
  }
  get altitude() {
    return this._transform.altitude;
  }
  get zoom() {
    return this._transform.zoom;
  }
  get center() {
    return this._transform.center;
  }
  coveringZoomLevel(options) {
    return this._transform.coveringZoomLevel(options);
  }
  coveringTiles(options) {
    return this._transform.coveringTiles(options);
  }
  zoomScale(zoom) {
    return this._transform.zoomScale(zoom);
  }
  scaleZoom(scale) {
    return this._transform.scaleZoom(scale);
  }
  get x() {
    return this._transform.x;
  }
  get y() {
    return this._transform.y;
  }
  get point() {
    return this._transform.point;
  }
  lngX(lng, worldSize) {
    return this._transform.lngX(lng, worldSize);
  }
  latY(lat, worldSize) {
    return this._transform.latY(lat, worldSize);
  }
  xLng(x, worldSize) {
    return this._transform.xLng(x, worldSize);
  }
  yLng(y, worldSize) {
    return this._transform.yLng(y, worldSize);
  }
  locationPoint(lnglat) {
    return this._transform.locationPoint(lnglat);
  }
  pointLocation(p) {
    return this._transform.pointLocation(p);
  }
  locationCoordinate(lnglat) {
    return this._transform.locationCoordinate(lnglat);
  }
  coordinateLocation(coord) {
    return this._transform.coordinateLocation(coord);
  }
  pointCoordinate(p) {
    return this._transform.pointCoordinate(p);
  }
  coordinatePoint(coord) {
    return this._transform.coordinatePoint(coord);
  }
  calculatePosMatrix(coord, maxZoom) {
    return this._transform.calculatePosMatrix(coord, maxZoom);
  }
}
