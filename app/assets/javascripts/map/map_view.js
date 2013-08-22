function MapView(map, element) {
  this.element = element;
  this.map = map;
  this.generate();
  var self = this;

  $(this.map.gardens).on('gardenAdded', function(e, garden) {
    self.placeMarker(garden);
  });
}

MapView.prototype.placeMarker = function(garden) {
  new GardenMarker(this, garden);
}
MapView.prototype.generate = function() {
  var latLng = new google.maps.LatLng(this.map.lat, this.map.lng);
  var mapOptions = {
    zoom: 14,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  }
  this.google_map = new google.maps.Map(this.element, mapOptions);
  this.google_map.info_window = new google.maps.InfoWindow();


  var self = this;
  google.maps.event.addListener(this.google_map, 'idle', function() {
    self.refreshMarkers();
  });
}
MapView.prototype.launchInfoWindow = function(marker, content) {
  this.google_map.info_window.setContent(content);
  this.google_map.info_window.open(this.google_map, marker);
}

MapView.prototype.refreshMarkers = function() {
  var bounds = this.google_map.getBounds();
  var boundary = {ulat: bounds.ea.b, ulng: bounds.ia.b, blat: bounds.ea.d, blng: bounds.ia.d}
  // debugger
  this.map.refreshGardens(boundary);
}
