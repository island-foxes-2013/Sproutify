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

    var self = this;
    map = this.map;
    google.maps.event.addListener(map, 'idle', function() {
      var bounds = map.getBounds();
      var boundary = {ulat: bounds.ea.b, ulng: bounds.ia.b, blat: bounds.ea.d, blng: bounds.ia.d}
      console.log(boundary);
      searcher.fetch(boundary, function(gardens) {
        $.each(gardens, function(index) {
          self.placeGarden(gardens[index]);
        });
      });
    });
  },
  placeGarden: function(garden) {
    var gardenMarker = new GardenMarker(this.map, garden)
    this.markers.push(gardenMarker);
  }
}

//////////
// MARKER
function GardenMarker(map, garden) {
  this.map = map;
  this.garden = garden;
  this.place(map, garden.lat(), garden.lng());
}

GardenMarker.prototype = {
  place: function(map, lat, lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: this.garden.username(),
        garden: this.garden
    });

    self = this;
    google.maps.event.addListener(marker, 'click', function() {
      map.info_window.setContent(self.renderInfoContent(this.garden));
      map.info_window.open(this.map, this);
      console.log(this.map.getBounds());
    });
  },
  renderInfoContent: function(garden) {
    var gardenLiteral = { name: garden.username(),
                          supplies: garden.suppliedCrops(),
                          demands: garden.demandedCrops() }
    return HandlebarsTemplates['infowindow'](gardenLiteral);
  }
}
