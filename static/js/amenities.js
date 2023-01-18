// Perform  successive API calls to the flask APIs to get the park and campground information information. 
d3.json(parksurl).then(function (parksResponse) {

  var parks = parksResponse

  d3.json(campgroundsurl).then(function (campgoundsResponse) {

    var campgrounds = campgoundsResponse




    console.log(parks)
    console.log(campgrounds)



    // build maplayers to enable viewers to revew maps

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

    // create a layer object for the layers
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

    // set variables for markers
    var parkMarkers = [];
    var campgroundMarkers = [];

    // set variables for cluster layers
    var parkClusters = L.markerClusterGroup();
    var campgroundClusters = L.markerClusterGroup();

    // build unique markers/icons
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


    // loop through data and create markers
    for (var i = 0; i < parks.length; i++) {
      var park = parks[i];

      var parkMarker = L.marker([park.latitude, park.longitude], {
        icon: parkIcon
      })
        .bindPopup("<img src =" + park.image + "><h5>" + park.fullName + "<h5><h6>" + park.description + "</h6>");

      // push markers to marker clusters
      parkClusters.addLayer(parkMarker)
      // add clusters to layer controls
      parkClusters.addTo(layers.PARKS)

    }

    // same process as above, performed for campgrounds
    for (var j = 0; j < campgrounds.length; j++) {
      var campground = campgrounds[j];

      var campgroundMarker = L.marker([campground.latitude, campground.longitude], {
        icon: campgroundIcon
      })
        .bindPopup("<h5>" + campground.name + "<h5><h6>" +
          "Reservable Sites: " + campground.numberOfSitesReservable +
          "<h6><h6>" + "First-come, First-serve Sites: " + campground.numberOfSitesFirstComeFirstServe +
          "<h6><h6>" + campground.description + "</h6>");

      campgroundClusters.addLayer(campgroundMarker)

      campgroundClusters.addTo(layers.CAMPGROUNDS)


    }
  });
}); 








