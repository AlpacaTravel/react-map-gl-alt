const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
  center: [-74.50, 40], // starting position [lng, lat]
  zoom: 9,
});
console.log(map);
