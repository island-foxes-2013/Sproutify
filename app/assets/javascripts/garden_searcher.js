////////////////
//GARDEN SEARCH
function GardenSearcher() {};

GardenSearcher.prototype = {
  fetch: function(bounds, successCallback, failureCallback) {
    gsearcher = this;
    $.ajax({
      url: '/search',
      type: 'get',
      data: {NElat: bounds.NElat, NElng: bounds.NElng,
             SWlat: bounds.SWlat, SWlng: bounds.SWlng}
    }).done(function(gardenData) {
      var gardens = $.map(gardenData, function(garden){
        return new Garden(garden);
      });
      successCallback(gardens);

    });
  }
}
