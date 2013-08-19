////////
// MAP
function Map(lat, lng) {
  this.lat = lat;
  this.lng = lng;
  this.gardens = [];
  this.searcher = new GardenSearcher();
}

Map.prototype = {
  placeGarden: function(garden) {
    this.gardens.push(garden);

    var self = this;
    $(garden).on('removed', function(e) {
      self.gardens.exterminate(this);
    });

    $(this).trigger('gardenAdded', garden);
  },
  refreshGardens: function(boundary){
    this.clearGardens();
    var self = this;
    this.searcher.fetch(boundary, function(gardens) {
      $.each(gardens, function() {
        self.placeGarden(this);
      });
    });
  },
  clearGardens: function() {
    var self = this;
    $(this.gardens).each(function() {
      this.remove();
    });
  }
}
