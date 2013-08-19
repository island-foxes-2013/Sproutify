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

// Garden.prototype.demandedCrops = function() {
//   this.attrs.demandedCrops;
// }

// function Crop(cropAttributes) {
//   this.attrs = cropAttributes;
// }

////////////////
//GARDEN SEARCH
function GardenSearcher() {
};

GardenSearcher.prototype = {
  fetch: function(bounds, successCallback, failureCallback) {
    //Some code that turns lat, lng into sunspot-accepting data
    $.ajax({
      url: '/find_users',
      type: 'get',
      data: {ulat: bounds.ulat, ulng: bounds.ulng,
             blat: bounds.blat, blng: bounds.blng}
    }).done(function(gardens) {
      gardens = $.map(gardens, function(garden){
        return new Garden(garden);
      });
      successCallback(gardens);
    });
  }
}