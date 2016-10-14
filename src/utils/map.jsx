import { diff } from './index';

export const updateOptions = (map, current, next) => {
  if (diff('minZoom', current, next)) {
    map.setMinZoom(next.minZoom);
  }
  if (diff('maxZoom', current, next)) {
    map.setMinZoom(next.maxZoom);
  }
  if (diff('mapClasses', current, next)) {
    map.setClasses(next.mapClasses);
  }
  if (diff('maxBounds', current, next)) {
    map.setMaxBounds(next.mapClasses);
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
