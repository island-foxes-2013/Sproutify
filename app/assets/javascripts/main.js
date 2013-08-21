function MainManager() {
  this.element = $('#main-body');
  this.element.html(HandlebarsTemplates['main']());
  var self = this;
  var user_data = this.getUserData(function(user_data) {
    self.map = new Map(user_data.user_lat, user_data.user_lng);
    new MapView(self.map, document.getElementById('map-canvas'));
    $("body").trigger("initialMapLoad");
  });
  this.bindEvents();
}

MainManager.prototype.bindEvents = function(){
  var self = this;

  $("body").on("initialMapLoad", function(){

    $(document).on('click', '#generate_form', function() {
      var contactGardenerModal = new ContactGardenerModal($(this).data('id'));
      console.log(contactGardenerModal.modal);
      self.element.append(contactGardenerModal.modal);
      contactGardenerModal.show();
    });

    $(document).on('click', '#messages-nav', function() {
      self.getInbox();
    });

    $(document).on('click', '.inbox-message', function(event) {
      event.preventDefault();
      var message_id = $(this).data('id');
      self.getMessage(message_id);
    });

    self.mySupply = new MySupply();
    self.mySupplyView = new MySupplyView(self.mySupply);

    self.myDemands = new MyDemands();
    self.myDemandsForm = new MyDemandsForm(self.myDemands);

    self.manageDemandsModal = new ManageDemandsModal();

    $(document).on('click', '#demand-manager-link', function(event) {
      event.preventDefault();
      self.manageDemandsModal.show();
    });

    self.filter = new Filter(self.map.gardens);
    self.browser = new Browser(self.map.gardens, self.mySupply, self.myDemands);
    self.browserView = new BrowserView(self.browser, self.filter);
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
};
