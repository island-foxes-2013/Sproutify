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
      url: '/search',
      type: 'get',
      data: {ulat: bounds.ulat, ulng: bounds.ulng,
             blat: bounds.blat, blng: bounds.blng}
    }).done(function(gardens) {
      var gardens = gsearcher.gardens = $.map(gardens, function(garden){
        return new Garden(garden);
      });
      successCallback(gardens);
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
  },
  getSuppliedCrops: function() {
    //return an array of
  }
}
