function Garden(gardenAttributes) {
  this.attrs = gardenAttributes;
}

Garden.prototype.lat = function() {
  return this.attrs.lat;
}

Garden.prototype.lng = function() {
  return this.attrs.lng;
}

Garden.prototype.user_id = function() {
  return this.attrs.user.id;
}

Garden.prototype.username = function() {
  return this.attrs.user.first_name +' '+ this.attrs.user.last_name;
}

Garden.prototype.email = function() {
  return this.attrs.user.email;
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
