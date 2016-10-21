import mapboxgl from 'mapbox-gl';

export const cloneTransform = (transform) => {
  const clonedTransform = Object.create(Object.getPrototypeOf(transform));
  clonedTransform.tileSize = transform.tileSize; // Constant
  clonedTransform.minZoom = transform.minZoom;
  clonedTransform.maxZoom = transform.maxZoom;
  clonedTransform.latRange = transform.latRange;
  clonedTransform.width = transform.width;
  clonedTransform.height = transform.height;
  clonedTransform.center = mapboxgl.LngLat.convert([transform.center.lng, transform.center.lat]);
  clonedTransform.zoom = transform.zoom;
  clonedTransform.angle = transform.angle;
  clonedTransform.altitude = transform.altitude;
  clonedTransform.pitch = transform.pitch;
  return clonedTransform;
};
