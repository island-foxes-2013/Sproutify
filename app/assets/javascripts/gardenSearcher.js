////////////////
//GARDEN SEARCH
function GardenSearcher() {};

GardenSearcher.prototype = {
  fetch: function(bounds, successCallback, failureCallback) {
    gsearcher = this;
    $.ajax({
      url: '/search',
      type: 'get',
      data: {ulat: bounds.ulat, ulng: bounds.ulng,
             blat: bounds.blat, blng: bounds.blng}
    }).done(function(gardenData) {
      var gardens = $.map(gardenData, function(garden){
        return new Garden(garden);
      });
      successCallback(gardens);

    });
  }
}
