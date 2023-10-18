/*var map = L.map(document.getElementById('mapDIV'), {
    center: [1.774187, -61.262458],
    zoom: 6
    });

*/
// teste código kemerson

if(window.screen.width > "500"){

        var latit = 1.80054;
        var long = -61.4714;
        var zm = 7;
var map = L.map(document.getElementById('mapDIV'), {
          center: [latit, long],
          zoom: zm,
          //zoomControl: false,
          //layers: [googleTerrain]
        });
      
      
      }else{
      
        var latit = -0.50;
        var long = -61.4714;
        var zm = 7;
        var map = L.map(document.getElementById('mapDIV'), {
          center: [latit, long],
          zoom: zm,
          //zoomControl: false,
          //layers: [googleTerrain]
        });


      if (!L.Browser.touch) {
        L.DomEvent
        .disableClickPropagation(mapDIV)
        .disableScrollPropagation(mapDIV);
        } else {
        L.DomEvent.disableClickPropagation(mapDIV);
        }
    }

//--------------------------------------------------------------------

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    
});

var google = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var printMap = L.easyPrint({
    tileLayer: google,
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'mapDIV',
    exportOnly: true,
    hideControlContainer: true,
    position: 'topright'
}).addTo(map);

/*function removeMap(mapa1, mapa2) {
    
    if (map.hasLayer(mapa1)) {
        map.removeLayer(mapa1);
    } else {
        map.removeLayer(mapa2);
        map.addLayer(mapa1);
    }

}*/

/*var leafletmap = L.map('map', { 
    renderer: L.svg()
  });*/


//Draw Control

var drawnFeatures = new L.FeatureGroup();
    map.addLayer(drawnFeatures);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnFeatures,
        //remove: false
    }
});

map.addControl(drawControl);

map.on("draw:created", function(e){
    var layer = e.layer;
    drawnFeatures.addLayer(layer);
});


var mapas = {
    'OpenStreetMap': osm,
    'Google': google
};


var rodovias = {

    "Federais BRs": {'Trecho Amajarí': rodFedAMJ, 'Trecho Boa Vista': rodFedBVA, 'Trecho Bonfim': rodFedBOM, 'Trecho Cantá': rodFedCTA, 'Trecho Caracaraí': rodFedCAI, 'Trecho Caroebe': rodFedCAB, 'Trecho Iracema': rodFedIRA, 'Trecho Mucajaí': rodFedMUC, 'Trecho Normândia': rodFedNOD, 'Trecho Pacaraima': rodFedPAC, 'Trecho Rorainópolis': rodFedRPO, 'Trecho São João da Baliza': rodFedSJB, 'Trecho São Luiz da Anauá': rodFedSLA
    },
    "Estaduais (RRs)": {
        'RRs Alto Alegre': rodEstALG, 'RRs Amajarí': rodEstAMJ, 'RRs Boa Vista': rodEstBVA, 'RRs Bonfim': rodEstBOM, 'RRs Cantá': rodEstCTA, 'RRs Mucajaí': rodEstMUC, 'RRs Normandia': rodEstNOD, 'RRs Pacaraima': rodEstPAC, 'RRs Uiramutã': rodEstUTA
    },
    "Municipais (Vicinais)": {
        'Vicinais Alto Alegre': rodMunALG, 'Vicinais Amajarí': rodMunAMJ, 'Vicinais Boa Vista': rodMunBVA, 'Vicinais Bonfim': rodMunBOM, 'Vicinais Cantá': rodMunCTA, 'Vicinais Caracaraí': rodMunCAI, 'Vicinais Caroebe': rodMunCAB, 'Vicinais Iracema': rodMunIRA, 'Vicinais Mucajaí': rodMunMUC, 'Vicinais Normandia': rodMunNOD, 'Vicinais Pacaraima': rodMunPAC, 'Vicinais Rorainopólis': rodMunRPO, 'Vicinais São João da Baliza': rodMunSJB, 'Vicinais Luiz do Anauá': rodMunSLA, 'Vicinais Uiramutã': rodMunUTA
    },
};

var municipios = {"Municípios": {
    'Alto Alegre': munAltoAlegre, 'Amajarí': munAmajari, 'Boa Vista': munBoaVista, 'Bonfim': munBonfim, 'Cantá': munCanta, 'Caracaraí': munCaracarai, 'Caroebe': munCaroebe, 'Iracema': munIracema, 'Mucajaí': munMucajai, 'Normandia': munNormandia, 'Pacaraima': munPacaraima, 'Rorainópolis': munRorainopolis, 'São João da Baliza': munSJBaliza,
    'São Luiz do Anauá': munSLAnaua, 'Uiramutã': munUiramuta
    }
};

var pontes = {"Pontes":{
    'Pontes de Concreto': pontesCONC,
    'Pontes de Madeira': pontesMAD
    }  
};

L.control.groupedLayers(mapas, null, {position: 'bottomleft'}).addTo(map);
L.control.groupedLayers(null, municipios).addTo(map);
L.control.groupedLayers(null, rodovias).addTo(map);
L.control.groupedLayers(null, pontes).addTo(map);


