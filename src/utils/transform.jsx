import mapboxgl from 'mapbox-gl';

export const cloneTransform = (transform) => {
  const clonedTransform = Object.create(Object.getPrototypeOf(transform));
  clonedTransform.tileSize = transform.tileSize; // Constant
  clonedTransform.minZoom = transform.minZoom;
  clonedTransform.maxZoom = transform.maxZoom;
  clonedTransform.latRange = transform.latRange;
  clonedTransform.width = transform.width;
  clonedTransform.height = transform.height;
  clonedTransform.scale = transform.scale;
  clonedTransform.tileZoom = transform.tileZoom;
  clonedTransform.zoomFraction = transform.zoomFraction;
  clonedTransform.angle = transform.angle;
  // Ensure we don't hold onto the original object reference
  // must access '_' as modifier/accessors perform actions on the transform
  clonedTransform._center = mapboxgl.LngLat.convert([transform.center.lng, transform.center.lat]);
  clonedTransform._altitude = transform.altitude;
  clonedTransform._pitch = transform.pitch;
  clonedTransform._unmodified = transform._unmodified;
  clonedTransform._renderWorldCopies = transform._renderWorldCopies;
  clonedTransform._fov = transform._fov;
  // Last modifier calls calculatePosMatrix
  clonedTransform.zoom = transform.zoom;
  return clonedTransform;
};
