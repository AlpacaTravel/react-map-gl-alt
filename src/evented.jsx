import * as _ from 'lodash';

export default class Evented {
  constructor(map, mapAccessor) {
    this._map = map;
    this._mapAccessor = mapAccessor;
    this._listeners = {};

    // Register the listeners for the map events
    this._map.on('resize', (...args) => { this.notifyListeners('resize', args); });
    this._map.on('remove', (...args) => { this.notifyListeners('remove', args); });
    this._map.on('render', (...args) => { this.notifyListeners('render', args); });
    this._map.on('load', (...args) => { this.notifyListeners('load', args); });
    this._map.on('error', (...args) => { this.notifyListeners('error', args); });
    this._map.on('movestart', (...args) => { this.notifyListeners('movestart', args); });
    this._map.on('moveend', (...args) => { this.notifyListeners('moveend', args); });
    this._map.on('boxzoomend', (...args) => { this.notifyListeners('boxzoomend', args); });
    this._map.on('boxzoomstart', (...args) => { this.notifyListeners('boxzoomstart', args); });
    this._map.on('dragstart', (...args) => { this.notifyListeners('dragstart', args); });
    this._map.on('dragend', (...args) => { this.notifyListeners('dragend', args); });
    this._map.on('webglcontextlost', (...args) => { this.notifyListeners('webglcontextlost', args); });
    this._map.on('webglcontextrestored', (...args) => { this.notifyListeners('webglcontextrestored', args); });
    this._map.on('dataloading', (...args) => { this.notifyListeners('dataloading', args); });
    this._map.on('mouseout', (...args) => { this.notifyListeners('mouseout', args); });
    this._map.on('mousedown', (...args) => { this.notifyListeners('mousedown', args); });
    this._map.on('mouseup', (...args) => { this.notifyListeners('mouseup', args); });
    this._map.on('mousemove', (...args) => { this.notifyListeners('mousemove', args); });
    this._map.on('click', (...args) => { this.notifyListeners('click', args); });
    this._map.on('dblclick', (...args) => { this.notifyListeners('dblclick', args); });
    this._map.on('contextmenu', (...args) => { this.notifyListeners('contextmenu', args); });
    this._map.on('touchstart', (...args) => { this.notifyListeners('touchstart', args); });
    this._map.on('touchend', (...args) => { this.notifyListeners('touchend', args); });
    this._map.on('touchcanel', (...args) => { this.notifyListeners('touchcanel', args); });
    this._map.on('move', (...args) => { this.notifyListeners('move', args); });
    this._map.on('zoomstart', (...args) => { this.notifyListeners('zoomstart', args); });
    this._map.on('zoomend', (...args) => { this.notifyListeners('zoomend', args); });
    this._map.on('zoom', (...args) => { this.notifyListeners('zoom', args); });
    this._map.on('rotatestart', (...args) => { this.notifyListeners('rotatestart', args); });
    this._map.on('rotate', (...args) => { this.notifyListeners('rotate', args); });
    this._map.on('rotateend', (...args) => { this.notifyListeners('rotateend', args); });
    this._map.on('drag', (...args) => { this.notifyListeners('drag', args); });
    this._map.on('pitch', (...args) => { this.notifyListeners('pitch', args); });
  }

  notifyListeners(type, args) {
    const listeners = this._listeners[type] || [];
    if (listeners.length) {
      switch (type) {
        case 'resize':
        case 'remove':
        case 'render':
        case 'load':
          listeners.forEach((listener) => {
            listener();
          });
          break;
        // Safe errors
        case 'error':
          listeners.forEach((listener) => {
            listener(...args);
          });
          break;
        // WebGLContextEvent
        case 'webglcontextlost':
        case 'webglcontextrestored':
          listeners.forEach((listener) => {
            listener(args[0]);
          });
          break;
        // MapDataEvent
        case 'dataloading':
          listeners.forEach((listener) => {
            listener(args[0]);
          });
          break;
        // MapMouseEvent
        case 'mouseout':
        case 'mousedown':
        case 'mouseup':
        case 'mousemove':
        case 'click':
        case 'dblclick':
        case 'contextmenu':
          this.notifyMapEventListeners(listeners, args);
          break;
        // MapTouchEvents
        case 'touchstart':
        case 'touchend':
        case 'touchcanel':
          this.notifyMapEventListeners(listeners, args);
          break;
        // MapMouseEvents|MouseTouchEvents
        case 'movestart':
        case 'moveend':
        case 'boxzoomend':
        case 'boxzoomstart':
        case 'dragstart':
        case 'dragend':
        case 'move':
        case 'zoomstart':
        case 'zoomend':
        case 'zoom':
        case 'rotatestart':
        case 'rotate':
        case 'rotateend':
        case 'drag':
        case 'pitch':
          this.notifyMapEventListeners(listeners, args);
          break;

        default:
          listeners.forEach((listener) => {
            listener();
          });
          break;
      }
    }
  }

  notifyMapEventListeners(listeners, args) {
    const mapEventClone = _.cloneDeep(args[0]);
    mapEventClone.target = this._mapAccessor; // Accessor map only!
    listeners.forEach((listener) => {
      listener(mapEventClone);
    });
  }

  on(type, listener) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push(listener);
  }

  off(type, listener) {
    if (this._listeners && this._listeners[type]) {
      const index = this._listeners[type].indexOf(listener);
      if (index !== -1) {
        this._listeners[type].splice(index, 1);
      }
    }
  }
}
