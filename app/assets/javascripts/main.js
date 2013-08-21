function MainManager() {
  this.element = $('#main-body');
  this.element.html(HandlebarsTemplates['main']());
  this.element.append(HandlebarsTemplates['sent_message']());
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
      self.element.append(contactGardenerModal.modal);
      contactGardenerModal.show('#contact-gardener-form-initial');
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

    self.mySupplies = new MySupplies();
    self.mySuppliesForm = new MySuppliesForm(self.mySupplies);

    self.myDemands = new MyDemands();
    self.myDemandsForm = new MyDemandsForm(self.myDemands);

    self.manageDemandsModal = new ManageDemandsModal();
    self.manageSuppliesModal = new ManageSuppliesModal();

    $(document).on('click', '#demand-manager-link', function(event) {
      event.preventDefault();
      self.manageDemandsModal.show();
    });

    $(document).on('click', '#supply-manager-link', function(event) {
      event.preventDefault();
      self.manageSuppliesModal.show();
    });

    self.filter = new Filter(self.map.gardens);
    self.browser = new Browser(self.map.gardens, self.mySupplies, self.myDemands);
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
