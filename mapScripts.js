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

//Save Variables from form
document.querySelector('form').addEventListener('submit', (e) => {
  const formData = new FormData(e.target);

  //Grab the variables from the form as a string with both dates
  const choice = formData.get('mapOptions');

  //Stop the form from submitting to avoid refreshing the page
  e.preventDefault();

});


//XML HTTP Object for GET requests
let HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        let anHttpRequest = new XMLHttpRequest();

        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );
        //Set parameter headers
        anHttpRequest.setRequestHeader("X-App-Token", "0Yy2rHqfsSy863vVSti73hwb7");
        anHttpRequest.send();
    }
}

//Parse JSON from response and convert them into Leaflet Markers
function createMarkers(json) {
  const data = JSON.parse(json);

  console.log(data);

  //Clear any existing marker data
  markers.clearLayers();
  oms.clearMarkers();

  if (data.features.length == 0) {
    document.getElementById('test').innerHTML = "Sorry, there is no data available for these dates.";
  } else {

    for (i in data.features) {

      //If the feature has no geometry, skip it
      if (data.features[i].geometry != null) {
        let coords = data.features[i].geometry.coordinates;

        let date = data.features[i].properties.issueddate || "N/A";
        let wcGroup = data.features[i].properties.workclassgroup || "N/A";
        let contractor = data.features[i].properties.contractorname || "N/A";
        let community = data.features[i].properties.communityname || "N/A";
        let address = data.features[i].properties.originaladdress || "N/A";

        let description = "<table class='table'><tr><th>Issued Date: </th><td>" + date + "</td> </tr> <tr> <th>Community Name: </th>" + "<td>" + community + "</td></tr><tr><th>Work Class Group: </th>" + "<td>" + wcGroup + "</td></tr><tr><th>Contractor: </th> <td>" + contractor + "</td> </tr><tr><th>Original Address: </th>" + "<td>" + address + "</td></tr></table>";

        //Add marker to the spiderifier layer
        let marker = new L.marker([coords[1], coords[0]]);
        marker.desc = description;
        oms.addMarker(marker);

        //Add marker to the cluster layer
        markers.addLayer(marker);


      }
    }

    //Add cluster marker layer to the map
    map.addLayer(markers);

    document.getElementById('test').innerHTML = "Successfully loaded " + data.features.length + " features.";
  }
}
