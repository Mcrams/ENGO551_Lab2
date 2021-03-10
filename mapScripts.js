const token = 'pk.eyJ1IjoibWlra29yYW1vcyIsImEiOiJja2o4MTJicmcwNGF5MzBwN3c2eGpiajJhIn0.6u3ND0vC40NLgZfQJOvO2A';

//Add Mapbox Basemap
const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/mikkoramos/ckm3uhj3f0vpz17qp7wsd03l8/tiles/{z}/{x}/{y}?access_token=' + token, {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


//mapbox://styles/mikkoramos/ckm3uhj3f0vpz17qp7wsd03l8
//Add OSM Basemap
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
});

//Create Leaflet Map centered on Calgary
const map = L.map('leafletMap', {
  center: [51.0447, -114.0719],
  zoom:11
});


//Create toggle between mapbox and OSM layers
L.control.layers({
  "Mapbox": mapbox,
  "OpenStreetMap": osm,
}, null, {
  collapsed: false
}).addTo(map);

mapbox.addTo(map); //  set as default
