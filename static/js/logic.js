function createMap(){
    // Build tile layer for background
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        'Stree Map':streetmap
    }

    let overlayMaps = {
        "HUD Housing": ???
    };

    let myMap = L.map("map", {
        center: [45.516682, -122.538490],
        zoom: 12
      });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap)

    function createMarkers() {
        // pull hud locations from excel file 
        let hudLocations = ;

        // Initialize an array to hold hud locations
        let hudMarkers = [];

        // Loop through the hud locations 
        for () {

            // for each location create marker
            let hudMarker = L.marker()
                .bindPopup();

            // add the marker to the hud array
            hudLocations.push(hudMarker);
            
        }

        // create a layer group made from hud locations and pass to createMap function
        createMap(L.layerGroup())
    }

}