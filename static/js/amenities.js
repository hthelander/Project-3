// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/v1.0/parks").then(function (parksResponse) {

  var parks = parksResponse

  d3.json("http://127.0.0.1:5000/api/v1.0/campgrounds").then(function (campgoundsResponse) {

    var campgrounds = campgoundsResponse

    d3.json("http://127.0.0.1:5000/api/v1.0/images").then(function (imagesResponse) {
      
      var images = imagesResponse

      console.log(parks)
      console.log(campgrounds)
      console.log(images)

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

      var layers = {
        PARKS: new L.layerGroup(),
        CAMPGROUNDS: new L.layerGroup()
      }

      // Create an overlayMaps object to hold the location's layer.
      var overlayMaps = {
        "National Parks": layers.PARKS,
        "Campgrounds": layers.CAMPGROUNDS
      };

    // Create the map object with options.
      var map = L.map("map-id", {
        center: [40.73, -94.0059],
        zoom: 4.4,
        layers: [
          layers.PARKS,
          layers.CAMPGROUNDS
        ]
      });

      streetmap.addTo(map);

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);
  
      var parkMarkers = [];
      var campgroundMarkers = [];

    
      var parkIcon = L.ExtraMarkers.icon({
        icon: "ion-arrow-up-b",
        iconColor: "white",
        markerColor: "blue",
        shape: "circle"
        })

      var campgroundIcon = L.ExtraMarkers.icon({
        icon: "ion-bonfire",
        iconColor: "white",
        markerColor: "green",
        shape: "penta"
        })
    
      for (var i = 0; i < parks.length; i++) {
        var park = parks[i];

        var parkMarker = L.marker([park.latitude, park.longitude], {
          icon: parkIcon
        })
          .bindPopup("<img src =" + park.image + "><h5>" + park.fullName + "<h5><h6>" + park.description + "</h6>");

        parkMarker.addTo(layers.PARKS)

      }

      for (var j = 0; j < campgrounds.length; j++) {
        var campground = campgrounds[j];

        var campgroundMarker = L.marker([campground.latitude, campground.longitude], {
          icon: campgroundIcon
        })
          .bindPopup("<h5>" + campground.name + "<h5><h6>" + campground.description + "</h6>");

        campgroundMarker.addTo(layers.CAMPGROUNDS)
      }
    });
  }); 
});







