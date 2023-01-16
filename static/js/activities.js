

function createMap(natlParks) {

  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the natlParks layer.
  var overlayMaps = {
    "National Parks": natlParks
  };

  // Create the map object with options.
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 4,
    layers: [streetmap, natlParks]
  });

  var marker = ({
    markerColor: "green",
    shape: "penta"
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  console.log(response)

  console.log(response[0].description)

  // Pull the "park" information from response.data.
  var parks = response

  console.log(parks[0].longitude)

  var activity = response
  console.log(activity[0].activity)

  // Initialize an array to hold park markers.
  var parkMarkers = [];
  var activityMarkers = [];
  
  
  
  // Loop through the park array.
  for (var index = 0; index < parks.length; index++) {

    var park = parks[index];

    // For each park, create a marker, and bind a popup with the park's name and activity.
    // var parkMarker = L.marker({markerColor: "green", shape: "penta"})([park.latitude, park.longitude])
    // .bindPopup("<h3>" + park.fullName + "<h3> <h6>" + park.activity + "</h6>");
    var parkMarker = L.marker([park.latitude, park.longitude])
    .bindPopup("<h3><strong>" + park.fullName + "<strong><h3> <h6>" + park.activity + "</h6>");
      // .bindPopup("<h3>" + park.fullName + "<h3>"),
      // activityMarker = L.marker([park.latitude, park.longitude])
      // .bindPopup("<h6>" + park.activity + "</h6>");


      // .bindPopup("<h3>" + park.fullName + "<h3> <h6>" + park.activity + "</h6>");

   
    // Add the marker to the parkMarkers array.
    parkMarkers.push(parkMarker);
    // parkMarkers.push(parkMarker, activityMarker);
    // activityMarkers.push(activityMarker);
  }

  // Create a layer group that's made from the park markers array, and pass it to the createMap function.
  createMap(L.layerGroup(parkMarkers));
  // createMap.addlayer(activityMarkers);
};


// Perform an API call to the Local NPS Flask API to get the park information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/v1.0/parks").then(createMarkers);