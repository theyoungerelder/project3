function createMap(HUDHousing){
    // Build tile layer for background
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    let baseMaps = {
        'Street Map': streetmap
    }
    let overlayMaps = {
        "HUD Housing": HUDHousing
    };
    let myMap = L.map("map", {
        center: [45.516682, -122.538490],
        zoom: 12,
        layers: [streetmap, HUDHousing]
      });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap)
}
function createMarkers(data) {
    // Initialize an array to hold hud locations
    let hudMarkers = [];
    // Loop through the hud locations 
    for (let i = 0; i < data.length; i++) {
        let hud = data[i]
        // for each location create marker
        let hudMarker = L.marker([hud["Project's Latitude:"], hud["Project's Longitude:"]])
            .bindPopup("<h3>Project Name:</h3><h5>" + hud["Project Name:"] + "</h5>");
        // add the marker to the hud array
        hudMarkers.push(hudMarker);
        
    }
    // create a layer group made from hud locations and pass to createMap function
    createMap(L.layerGroup(hudMarkers))
}
d3.csv("../../Resources/LIHTCdatasetlatlong.csv").then((data) => {
    console.log(data)
    createMarkers(data)
}
)