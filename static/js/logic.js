function createMap(HUDHousing){
    // Build tile layer for background
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    function getColor(blockGroupNumber) {
        switch (true) {
            case blockGroupNumber <= .25:
                return "#FFEDA0"
            case blockGroupNumber <= .5:
                return "#FEB24C"
            case blockGroupNumber <= .75:
                return "#FC4E2A"
            case blockGroupNumber <= 1:
                return "#800026"
        }
    }
    function styleInfo(feature) {
        return {
            fillColor: getColor(feature.properties.Lowmod_pct),
            fillOpacity:.6
        }
    }
    blockLayer = L.layerGroup()
    d3.json("https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/LOW_MOD_INCOME_BY_BG/FeatureServer/12/query?where=Countyname%20%3D%20%27MULTNOMAH%20COUNTY%27%20AND%20Stusab%20%3D%20%27OR%27&outFields=GEOID,Source,geoname,Stusab,Countyname,State,County,Tract,BLKGRP,Low,Lowmod,Lmmi,Lowmoduniv,Lowmod_pct,Shape__Area,Shape__Length&outSR=4326&f=GeoJson").then((data) => {
        L.geoJSON(data,{
            style: styleInfo,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    "Total People: " + feature.properties.Lowmoduniv +
                    "<br /> Low to Mod Percent: " + ((feature.properties.Lowmod_pct)*100).toFixed(2) +"%"+
                    "<br /> Low Percent: " + ((feature.properties.Low/feature.properties.Lowmoduniv)*100).toFixed(2) +"%"
                )
            }
        }).addTo(blockLayer)
    })
    let baseMaps = {
        'Street Map': streetmap
    }
    let overlayMaps = {
        "HUD Housing": HUDHousing,
        "Low to Mod Percent": blockLayer
    };
    let myMap = L.map("map", {
        center: [45.516682, -122.538490],
        zoom: 12,
        layers: [streetmap, HUDHousing, blockLayer]
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
            .bindPopup(
            "Project Name: " + hud["Project Name:"] +
            "<br />Number of Units: " + hud["Total Number of Units:"]+
            "<br />Total Low-Income Units: " + hud["Total Low-Income Units:"]);
        // add the marker to the hud array
        hudMarkers.push(hudMarker);
        
    }
    // create a layer group made from hud locations and pass to createMap function
    createMap(L.layerGroup(hudMarkers))
}
d3.csv("https://raw.githubusercontent.com/theyoungerelder/project3/main/Resources/LIHTCdatasetlatlong.csv").then((data) => {
    createMarkers(data)
}
)