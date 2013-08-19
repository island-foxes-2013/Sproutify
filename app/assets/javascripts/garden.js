function Garden(gardenAttributes) {
  this.attrs = gardenAttributes;
  // this.attrs.demandedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
  //   return new Crop(crop);
  // })
  // this.attrs.suppliedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
  //   return new Crop(crop);
  // })
}

Garden.prototype.lat = function() {
  return this.attrs.lat;
}

Garden.prototype.lng = function() {
  return this.attrs.lng;
}

Garden.prototype.username = function() {
  return this.attrs.user.first_name +' '+ this.attrs.user.last_name;
}

Garden.prototype.demandedCrops = function () {
  return this.attrs.demands;
}

Garden.prototype.suppliedCrops = function () {
  return this.attrs.supplies;
}


////////////////
//GARDEN SEARCH
function GardenSearcher() {
  // this.gardens = [];
};

GardenSearcher.prototype = {
  fetch: function(bounds, successCallback, failureCallback) {
    gsearcher = this;
    //Some code that turns lat, lng into sunspot-accepting data
    $.ajax({
      url: '/find_in_box',
      type: 'get',
      data: {ulat: bounds.ulat, ulng: bounds.ulng,
             blat: bounds.blat, blng: bounds.blng}
    }).done(function(gardens) {
      gsearcher.gardens = $.map(gardens, function(garden){
        return new Garden(garden);
      });
      console.log(gsearcher.localCropSupplies());
      gsearcher.localCropSupplies();
    });
  },
  localCropSupplies: function() {
    this.crops = [];
    self = this;
    $.each(this.gardens, function(i) {
      g = self.gardens[i];
      $.each(g.suppliedCrops(), function(i) {
        self.crops.push(g.suppliedCrops()[i]);
      })
      // self.crops.push(g.suppliedCrops());
    });
    return this.crops;
  }
}
