function createMap(HUDHousing){
    // Build tile layer for background
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // coloring geojson polygons using poverty ratings
    function getColor(lowModPCT) {
        switch (true) {
            case lowModPCT <= .25:
                return "#FFEDA0"
            case lowModPCT <= .5:
                return "#FEB24C"
            case lowModPCT <= .75:
                return "#FC4E2A"
            case lowModPCT <= 1:
                return "#800026"
        }
    }
    // setting fill options for geojson info
    function styleInfo(feature) {
        return {
            fillColor: getColor(feature.properties.Lowmod_pct),
            fillOpacity:.6
        }
    }
    // adding info from geojson for popups
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
    // Adding a Legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend'),
            grades = [.25, .5, .75, 1]
        div.innerHTML += "<h4> Poverty Percentage </h4>"
        // loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                (grades[i - 1] ? grades[i - 1] + '&ndash;' + grades[i] : '<' + grades[i]) + '<br>';
        }
        return div;
    };
    // setting layer groups 
    let baseMaps = {
        'Street Map': streetmap
    }
    let overlayMaps = {
        "HUD Housing": HUDHousing,
        "Low to Mod Percent": blockLayer
    };
    // set up map center and layers / layer controls
    let myMap = L.map("map", {
        center: [45.516682, -122.538490],
        zoom: 12,
        layers: [streetmap, HUDHousing, blockLayer]
      });
    
    L.control.layers(baseMaps, overlayMaps, legend, {
        collapsed: false
    }).addTo(myMap)
    legend.addTo(myMap)
    
}

// create custom Icon for house markers
let houseIcon = L.icon({
    iconUrl: "bighouse.png",
    iconSize: [32,37],
    iconAnchor: [22,94],
    popupAnchor: [-3,-76]
})

function createMarkers(data) {
    // Initialize an array to hold hud locations
    let hudMarkers = [];
    // Loop through the hud locations 
    for (let i = 0; i < data.length; i++) {
        let hud = data[i]
        // for each location create marker
        let hudMarker = L.marker([hud["Project's Latitude:"], hud["Project's Longitude:"]], {icon:houseIcon})
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