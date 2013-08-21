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
    //remove gardens out of bounds
    var gardens_to_be_removed = [];
    $.each(this.gardens.set, function(index,garden) {
      if ((garden.attrs.lat < boundary.ulat || garden.attrs.lat > boundary.blat) || (garden.attrs.lng < boundary.ulng || garden.attrs.lng > boundary.blng)) {
        gardens_to_be_removed.push(garden);
      }
    });
    $.each(gardens_to_be_removed, function() {
      this.remove();
    });
    
    var self = this;
    this.searcher.fetch(boundary, function(gardens) {
      // self.gardens.clearIndex();
      var found_match = false;
      var found_object = false;
      $.each(gardens, function() {
        contender = this;
        $.each(self.gardens.set, function() {
          if (this.attrs.lat === contender.attrs.lat) {
            found_match = true;
            found_object = this;
            console.log("found match");
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
