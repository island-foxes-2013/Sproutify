// MARKER
function GardenMarker(map, garden) {
  this.map = map;
  this.garden = garden;
  var self = this;

  $(garden).on('removed', function() {
    self.remove();
  });
  $(garden).on('hidden', function() {
    self.hide();
  });

  $(garden).on('shown', function() {
    self.show();
  });
  this.place();
}

GardenMarker.prototype = {
  place: function() {
    var latLng = new google.maps.LatLng(this.garden.lat(), this.garden.lng());

    var marker = new google.maps.Marker({
        map: this.map.google_map,
        position: latLng,
        title: this.garden.username()
    });

    this.marker = marker;

    var self = this;
    google.maps.event.addListener(marker, 'click', function() {
      self.map.launchInfoWindow(this, self.renderInfoContent());
    });
  },
  renderInfoContent: function() {
    var gardenLiteral = { name: this.garden.username(),
                          id: this.garden.user_id(),
                          supplies: this.garden.suppliedCrops(),
                          demands: this.garden.demandedCrops() }

    return HandlebarsTemplates['infowindow'](gardenLiteral);
  },
  remove: function() {
    this.marker.setMap(null);
  },
  show: function() {
    this.marker.setIcon('/assets/marker.png');
  },
  hide: function() {
    this.marker.setIcon('/assets/small_marker.png');
  }
}
