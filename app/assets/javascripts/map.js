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
    //removes gardens outside of the boundary
    var gardens_to_be_removed = [];
    $.each(this.gardens.set, function(index,garden) {
      if ((garden.attrs.lat > boundary.NElat || garden.attrs.lat < boundary.SWlat) || (garden.attrs.lng > boundary.NElng || garden.attrs.lng < boundary.SWlng)) {
        gardens_to_be_removed.push(garden);
      }
    });
    $.each(gardens_to_be_removed, function() {
      this.remove();
    });
    
    // add gardens not already in our set
    var self = this;
    this.searcher.fetch(boundary, function(gardens) {
      var found_match = false;
      var found_object = false;
      $.each(gardens, function() {
        contender = this;
        $.each(self.gardens.set, function() {
          if (this.attrs.lat === contender.attrs.lat) {
            found_match = true;
            found_object = this;
          }
        });
        if (!found_match) {
          self.placeGarden(this);
        } else {
          found_match = false;
          found_object = false;
        }
      });
      self.gardens.refreshIndexes();
    });
  },
  clearGardens: function() {
    var self = this;
    $(this.gardens.set).each(function() {
      this.remove();
    });
  }
}
