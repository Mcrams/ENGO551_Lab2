# ENGO 551 - Lab 3

Visualizing Calgary open data through a stylized Mapbox Studio tileset and displaying it through Leaflet  

## Instructions
1. Open the index.html file, and you're done!

***

## Project Files
### index.html
Main landing page for the app. Contains a Leaflet map of the city of Calgary with separate Mapbox and OpenStreetMap (OSM) layers that can be toggled between using Leaflet's layer control panel on the upper right hand corner of the map window. Also contains a key table for understanding the symbology on the Mapbox map layer

### mapScripts.js
JS file that configures the OSM and MapBox layers as separate map layers, then creates a single map instance that can toggle between one layer or another through a checkbox menu, and sets the MapBox layer as the default layer shown when the page is first opened.

### styles.css
Extraneous CSS for site that controls the height of the Leaflet map (required) as well as styling the key table and circles in index.html.
