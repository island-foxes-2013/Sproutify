function MainManager() {
  this.element = $('#main-body');
  this.element.html(HandlebarsTemplates['main']());
  var self = this;
  var user_data = this.getUserData(function(user_data) {
    self.map = new Map(user_data.user_lat, user_data.user_lng);
    new MapView(self.map, document.getElementById('map-canvas'));
    $("body").trigger("initialMapLoad");

    $(document).on('click', '#generate_form', function() {
      var contactGardenerModal = new ContactGardenerModal($(this).data('id'));
      self.element.append(contactGardenerModal.modal);
      contactGardenerModal.show();
    });

    $(document).on('click', '#messages-nav', function() {
      var inbox = new Inbox();
      $(this).show();
    });

    $(document).on('click', '.inbox-message', function(event) {
      event.preventDefault();
      var message = new Message($(this).data('id'));
    });

    $(document).on('click', '.close', function() {
      Avgrund.hide();
    });
  });
  this.bindEvents();
}

MainManager.prototype.bindEvents = function(){
  var self = this;

  $("body").on("initialMapLoad", function(){
    self.mySupply = new MySupply();
    self.mySupplyView = new MySupplyView(self.mySupply);

    self.myDemand = new MyDemand();
    self.myDemandView = new MyDemandView(self.myDemand);

    self.filter = new Filter(self.map.gardens);
    self.browser = new Browser(self.map.gardens, self.mySupply, self.myDemand);
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
