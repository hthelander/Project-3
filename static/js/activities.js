// Perform an API call to the Local NPS Flask API to get the park information. 
d3.json(url).then(function (parksResponse) {

  var parks = parksResponse

      console.log(parks)
      

  // Create the tile layer that will be the background of our map.
     var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     });

    var topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

  // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap,
      "Topography": topomap
    };

  // Create layers for the map
    var layers = {
      PARKS: new L.layerGroup(),
      ACTIVITIES: new L.layerGroup(),
      COSTS: new L.layerGroup()
    }

  // Create an overlayMaps object to hold the natlParks layer.
    var overlayMaps = {
      "National Parks": layers.PARKS,
      "Activities": layers.ACTIVITIES,
      "Entrance Fee": layers.COSTS
    };

  // Create the map object with options.
    var map = L.map("map-id", {
      center: [40.73, -94.0059],
      zoom: 4,
      layers: [
        layers.PARKS,
        layers.ACTIVITIES,
        layers.COSTS
      ]
  
    });

    streetmap.addTo(map);

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);

    var parkClusters = L.markerClusterGroup()
    var activityClusters = L.markerClusterGroup()
    var costClusters = L.markerClusterGroup()


    var parkMarkers = [];
    var activityMarkers = [];
    var costMarkers = [];

    var parkIcon = L.ExtraMarkers.icon({
      icon: "ion-ios-navigate",
      iconColor: "white",
      markerColor: "blue",
      shape: "penta"
      })

    var activityIcon = L.ExtraMarkers.icon({
      icon: "ion-help-buoy",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
      })

    var costIcon = L.ExtraMarkers.icon({
      icon: "ion-social-usd-outline",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
      })

    for (var i = 0; i < parks.length; i++) {
      var park = parks[i];

      var parkMarker = L.marker([park.latitude, park.longitude], {
        icon: parkIcon
      })
        .bindPopup("<h3><strong>" + park.fullName + "<strong><h3> <h6>" + park.description + "</h6>");

        parkClusters.addLayer(parkMarker)
        parkClusters.addTo(layers.PARKS)

    }

    for (var i = 0; i < parks.length; i++) {
      var activity = parks[i];

      var activityMarker = L.marker([activity.latitude, activity.longitude], {
        icon: activityIcon
      })
        .bindPopup("<h3><strong>" + activity.fullName + "<strong><h3> <h6>" + activity.activity + "</h6>");

        activityClusters.addLayer(activityMarker)
        activityClusters.addTo(layers.ACTIVITIES)

    }

    for (var i = 0; i < parks.length; i++) {
      var cost = parks[i];

      var costMarker = L.marker([cost.latitude, cost.longitude], {
        icon: costIcon
      })
        .bindPopup("<h3><strong>" + cost.fullName + "<strong><h3> <h6>$" + cost.cost + "</h6>");

        costClusters.addLayer(costMarker)
        costClusters.addTo(layers.COSTS)

    }
    });


    






