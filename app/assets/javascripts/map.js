////////
// MAP
function Map(lat, lng) {
  this.lat = lat;
  this.lng = lng;
  this.gardens = new AllGardenSet();
  this.searcher = new GardenSearcher();
}

Map.prototype = {
  placeGarden: function(garden) {
    this.gardens.addGarden(garden);    
  },
  refreshGardens: function(boundary){
    this.clearGardens();
    var self = this;
    this.searcher.fetch(boundary, function(gardens) {
      $.each(gardens, function() {
        self.placeGarden(this);
      });
    });
    console.log(this.gardens)
  },
  clearGardens: function() {
    var self = this;
    $(this.gardens.set).each(function() {
      this.remove();
    });
  }
}
