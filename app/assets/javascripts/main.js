function MainManager() {
  this.element = $('#main-body');
  this.element.html(HandlebarsTemplates['main']());
  var self = this;
  var user_data = this.getUserData(function(user_data) {
    self.showAddSupply();
    self.showAddDemand();
    self.map = new Map(user_data.user_lat, user_data.user_lng);
    new MapView(self.map, document.getElementById('map-canvas'));
    $("body").trigger("initialMapLoad");

    $(document).on('click', '#generate_form', function() {
      var contactGardenerModal = new ContactGardenerModal($(this).data('id'));
      self.element.append(contactGardenerModal.element);
    });

    $(document).on('click', '#messages-nav', function() {
      self.getInbox();
    });

    $(document).on('click', '.inbox-message', function(event) {
      event.preventDefault();
      var message_id = $(this).data('id');
      self.getMessage(message_id);
    });
  });
  this.bindEvents();
}

MainManager.prototype.bindEvents = function(){
  var self = this;

  this.bindCurrentSupply();
  this.bindCurrentDemand();

  $("body").on("initialMapLoad", function(){
    // self.browser = new Browser(self.map);
    self.browserView = new BrowserView(self.map.gardens);
  });
};

MainManager.prototype.getUserData = function(successCallback) {
  $.ajax({
    url: '/user_data',
    type: 'get'
  }).done(function(user_data) {
    successCallback(user_data);
  });
};

MainManager.prototype.getInbox = function(){
  $.ajax({
    url: '/inbox',
    type: 'get'
  }).done(function(response){
    $('#connect-with-user').html(HandlebarsTemplates['inbox'](response));
  });
}

MainManager.prototype.getMessage = function (message_id) {
  $.ajax({
    url: '/message',
    type: 'get',
    data: {message_id: message_id}
  }).done(function(response){
    $('<p>'+response.message[0].body+'</p>').insertAfter('*[data-id='+response.message[0].conversation_id+']')
    $('*[data-id='+response.message[0].conversation_id+']').remove();
  });
}




// MainManager.prototype.showMap = function() {
//   $('#mapcanvas').html(HandlebarsTemplates['map']);
// };

// CURRENT SUPPLY
MainManager.prototype.showAddSupply = function() {
  $('#add-supply').html(HandlebarsTemplates['add_supply']);
};

MainManager.prototype.getCurrentSupply = function() {
  $.ajax({
    url: '/supplies',
    type: 'GET'
  }).done(function(response){
    $('.user-supplies').html(HandlebarsTemplates['current_supply'](response));
    $('.crop-field').val('');
    $('.drop-down').prop('selectedIndex',0);
  });
};

MainManager.prototype.bindCurrentSupply = function (){
  var self = this;
  $("body").on('ajax:success', '#add-supplies-form', function(){
    self.getCurrentSupply();
  });
};

// CURRENT DEMAND
MainManager.prototype.showAddDemand = function() {
  $('#add-demand').html(HandlebarsTemplates['add_demand']);
};

MainManager.prototype.bindCurrentDemand = function (){
  var self = this;
  $("body").on('ajax:success', '#add-demands-form', function(){
    self.getCurrentDemand();
  });
};

MainManager.prototype.getCurrentDemand = function() {
  $.ajax({
    url: '/demands',
    type: 'GET'
  }).done(function(response){
    $('.user-demands').html(HandlebarsTemplates['current_demand'](response));
    $('.demand-field').val('');
  });
};
