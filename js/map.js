class Map {
  constructor(mapId, url) {
    //id de ma map
    this.mapId = mapId;
    //url de l'API JCDecaux
    this.url = url;
    //Initialisation de la MAP
    this.map = L.map(this.mapId).setView([45.7568, 4.830929999999967], 13);
    //ajoute le "layer" (apparence de la map)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic3RwaC1waG0iLCJhIjoiY2swcG9tZjVhMDAxazNvbXF5b2UyaGZhMyJ9.aYj4xEVdfZq7i8_cqanFlg'
    }).addTo(this.map);
    // Création marker vert
    this.greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    // Création marker orange
    this.orangeIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    // Creation marker rouge
    this.redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.recupererStations();
  }; //Fin du constructor
  // Début methode du callback (récupérationStation)
  recupererStations() {
    // récupérer les données API JCDecaux de Lyon
    ajaxGet(this.url, (response) => {
      // convertir les donner en JSON
      let stations = JSON.parse(response);
      //creation des groupements de markers
      this.markerGroup = new L.MarkerClusterGroup();
      //boucle pour gérer les données récupérés
      stations.forEach((station) => {
        //on lance la méthode createMarker
        this.createMarker(station);
      });
      //ajout des groupements de markers a la map
      this.map.addLayer(this.markerGroup);
    });
  }; //fin de la methode recupererStations


  createMarker(station) {
    //marker vert par défaut
    this.markericon = this.greenIcon;

    //si station fermée => 0 velo de dispo
    if (station.status === 'CLOSED') {
      station.available_bikes = 0;
    }
    //si - de 10 vélos dispo => marker orange
    if (station.available_bikes < 10) {
      this.markericon = this.orangeIcon;
    }
    //si 0 vélos dispo => marker rouge
    if (station.available_bikes === 0) {
      this.markericon = this.redIcon;
    };
    //positonnement des markers selon leur latitude et longitude
    this.marker = L.marker([station.position.lat, station.position.lng], {
      icon: this.markericon
    });
    //ajout des markers aux groupements de marker
    this.markerGroup.addLayer(this.marker);
    //Lorsqu'on click sur les marker
    this.marker.on('click', () => {
      if (station.available_bikes > 0) {
        $('#resa_confirm').css('display', 'none');
        //on lance la méthode afficherInfo
        this.afficherInfo(station);
      } else {
        $('#select').text('La station est actuellement fermée ou ne possède plus de vélos disponible.');
      }
    });
  }; //fin de la methode createMarker

  afficherInfo(station) {
    // Div id Select disparait
    $('#select').css('display', 'none');
    // le formulaire apparait
    $('#info_client').css('display', 'none');
    $('#info_station').css('display', 'block');
    //ajout des information aux panneau d'information
    $('#nom_station').text(station.name);
    $('#address_station').text(station.address);
    $('#velodispo').text('Vélos disponible : ' + station.available_bikes);
    $('#placedispo').text('Places disponibles : ' + station.available_bike_stands);
  }; //fin de la methode afficherInfo
}; //fin de la class Map
