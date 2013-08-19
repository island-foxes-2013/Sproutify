// MAIN MANAGER
function MainManager() {
  self = this;
  var user_data = this.getUserData(function(user_data) {
    self.showMap();
    var map = new Map(document.getElementById('map-canvas'), user_data.user_lat, user_data.user_lng);
  });
}

MainManager.prototype.getUserData = function(successCallback) {
  $.ajax({
    url: '/user_data',
    type: 'get'
  }).done(function(user_data) {
    successCallback(user_data);
  });
}

MainManager.prototype.showMap = function() {
  $('#main-body').append(HandlebarsTemplates['map']);
}
