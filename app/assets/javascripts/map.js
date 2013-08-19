////////
// MAP
function Map(element, lat, lng) {
  this.element = element;
  this.lat = lat;
  this.lng = lng;
  this.markers = [];
  this.generate();
}

Map.prototype = {
  generate: function() {
    var latLng = new google.maps.LatLng(this.lat, this.lng);
    var mapOptions = {
      zoom: 13,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    }
    this.map = new google.maps.Map(this.element, mapOptions);
    this.map.info_window = new google.maps.InfoWindow({
      content: "placeholder"
    });
    
    var searcher = new GardenSearcher();
    // this.refreshMarkers(searcher);

    var self = this;
    map = this.map;
    // google.maps.event.addListener(map, 'bounds_changed', function() { 
    //   self.refreshMarkers(searcher);
    //   $("body").trigger("mapIdle");
    // });
    google.maps.event.addListener(map, 'idle', function() { 
      self.refreshMarkers(searcher);
      $("body").trigger("mapIdle");
    });
  },
  placeGarden: function(garden) {
    var gardenMarker = new GardenMarker(this, garden);
    this.markers.push(gardenMarker);
  },
  refreshMarkers: function(searcher){
    var bounds = this.map.getBounds();
    var boundary = {ulat: bounds.ea.b, ulng: bounds.ia.b, blat: bounds.ea.d, blng: bounds.ia.d}
    var self = this;

    $.each(this.markers, function(i) {
      self.markers[i].marker_object.setMap(null);
    });
    
    this.markers = [];
    
    searcher.fetch(boundary, function(gardens) {
      $.each(gardens, function(i) {
        self.placeGarden(gardens[i]);
      });
      // self.clusterer = new MarkerClusterer(self.map, self.markers, {gridSize: 80});
    });
  }
}

//////////
// MARKER
function GardenMarker(map_object, garden) {
  this.map_object = map_object;
  this.garden = garden;
  this.place(map_object, garden.lat(), garden.lng());
}

GardenMarker.prototype = {
  place: function(map_object, lat, lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: this.garden.username(),
        garden: this.garden
    });
    // console.log(this.map_object);
    // this.map_object.markers.push(marker);

    this.marker_object = marker;

    var self = this;
    google.maps.event.addListener(marker, 'click', function() {
      console.log("clicked");
      self.map_object.map.info_window.setContent(self.renderInfoContent(this.garden));
      self.map_object.map.info_window.open(self.map_object.map, this);
    });
  },
  renderInfoContent: function(garden) {
    var gardenLiteral = { name: garden.username(),
                          email: garden.email(),
                          supplies: garden.suppliedCrops(),
                          demands: garden.demandedCrops() }
    return HandlebarsTemplates['infowindow'](gardenLiteral);
  }
}
