// MAIN MANAGER
function MainManager() {
  self = this;
  var user_data = this.getUserData(function(user_data) {
    self.showMap();
    self.showAddSupply();
    self.showAddDemand();
    console.log(user_data);
    var map = new Map(document.getElementById('map-canvas'), user_data.user_lat, user_data.user_lng);
    var searcher = new GardenSearcher();
    var lat = user_data.user_lat;
    var lng = user_data.user_lng;
    searcher.fetch(lat, lng, function(gardens) {
      $.each(gardens, function(index) {
        map.placeGarden(gardens[index]);
      });
    });
  });

  self.bindCurrentSupply();
  self.bindCurrentDemand();
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




// CURRENT SUPPLY
MainManager.prototype.showAddSupply = function() {
  $('#main-body').append(HandlebarsTemplates['add_supply']);
}

MainManager.prototype.getCurrentSupply = function() {
  $.ajax({
    url: '/supplies',
    type: 'GET'
  }).done(function(response){
    $('.user-supplies').html(HandlebarsTemplates['current_supply'](response));
    $('.crop-field').val('');
    $('.drop-down').prop('selectedIndex',0);
  });
}

MainManager.prototype.bindCurrentSupply = function (){
  var self = this;
  $("body").on('ajax:success', '#add-supplies-form', function(){
    self.getCurrentSupply();
  });
}

// CURRENT DEMAND
MainManager.prototype.showAddDemand = function() {
  $('#main-body').append(HandlebarsTemplates['add_demand']);
}

MainManager.prototype.bindCurrentDemand = function (){
  var self = this;
  $("body").on('ajax:success', '#add-demands-form', function(){
    self.getCurrentDemand();
  });
}

MainManager.prototype.getCurrentDemand = function() {
  $.ajax({
    url: '/demands',
    type: 'GET'
  }).done(function(response){
    $('.user-demands').html(HandlebarsTemplates['current_demand'](response));
    $('.demand-field').val('');
  });
}






















