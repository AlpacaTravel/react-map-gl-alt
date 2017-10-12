import { diff } from './index';

export const updateOptions = (map, current, next) => {
  if (diff('minZoom', current, next)) {
    map.setMinZoom(next.minZoom);
  }
  if (diff('maxZoom', current, next)) {
    map.setMaxZoom(next.maxZoom);
  }
  if (diff('mapClasses', current, next) && map.setClasses) {
    map.setClasses(next.mapClasses);
  }
  if (diff('maxBounds', current, next)) {
    map.setMaxBounds(next.maxBounds);
  }
  if (diff('scrollZoomDisabled', current, next)) {
    if (next.scrollZoomDisabled === true) {
      map.scrollZoom.disable();
    } else {
      map.scrollZoom.enable();
    }
  }
  if (diff('boxZoomDisabled', current, next)) {
    if (next.boxZoomDisabled === true) {
      map.boxZoom.disable();
    } else {
      map.boxZoom.enable();
    }
  }
  if (diff('dragRotateDisabled', current, next)) {
    if (next.dragRotateDisabled === true) {
      map.dragRotate.disable();
    } else {
      map.dragRotate.enable();
    }
  }
  if (diff('dragPanDisabled', current, next)) {
    if (next.dragPanDisabled === true) {
      map.dragPan.disable();
    } else {
      map.dragPan.enable();
    }
  }
  if (diff('keyboardDisabled', current, next)) {
    if (next.keyboardDisabled === true) {
      map.keyboard.disable();
    } else {
      map.keyboard.enable();
    }
  }
  if (diff('doubleClickZoomDisabled', current, next)) {
    if (next.doubleClickZoomDisabled === true) {
      map.doubleClickZoom.disable();
    } else {
      map.doubleClickZoom.enable();
    }
  }
  if (diff('touchZoomRotateDisabled', current, next)) {
    if (next.touchZoomRotateDisabled === true) {
      map.touchZoomRotate.disable();
    } else {
      map.touchZoomRotate.enable();
    }
  }
};

export const performMoveAction = (map, action) => {
  if (action.command && action.args) {
    switch (action.command) {
      case 'flyTo':
        map.flyTo(...action.args);
        break;
      case 'fitBounds':
        map.fitBounds(...action.args);
        break;
      case 'jumpTo':
        map.jumpTo(...action.args);
        break;
      case 'panTo':
        map.panTo(...action.args);
        break;
      case 'zoomTo':
        map.zoomTo(...action.args);
        break;
      case 'zoomIn':
        map.zoomIn(...action.args);
        break;
      case 'zoomOut':
        map.zoomOut(...action.args);
        break;
      case 'rotateTo':
        map.rotateTo(...action.args);
        break;
      case 'resetNorth':
        map.resetNorth(...action.args);
        break;
      case 'snapToNorth':
        map.snapToNorth(...action.args);
        break;
      case 'easeTo':
        map.easeTo(...action.args);
        break;
      default: break;
    }
  }
};
