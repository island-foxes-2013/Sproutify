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

Garden.prototype.remove = function() {
  $(this).trigger('removed');
}

Garden.prototype.getSupplyNames = function() {
  return $.map(this.suppliedCrops(), function(crop) {
    return crop.name;
  });
}

Garden.prototype.getDemandNames = function() {
  return $.map(this.demandedCrops(), function(crop) {
    return crop.name;
  });
}