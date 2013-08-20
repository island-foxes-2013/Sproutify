function MainManager() {
  $("#main-body").html(HandlebarsTemplates['main']());
  var self = this;
  var user_data = this.getUserData(function(user_data) {
    self.map = new Map(user_data.user_lat, user_data.user_lng);
    new MapView(self.map, document.getElementById('map-canvas'));
    $("body").trigger("initialMapLoad");

    $(document).on('click', '#generate_form', function() {
      var user_id = $(this).data('id');
      self.generateEmailForm();
      $('#connect').on('click', function(event) {
        event.preventDefault();
        var content = $('#message').val();
        self.emailUser(user_id, content);
      });
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
    self.browser = new Browser(self.map.gardens, self.filter, self.mySupply, self.myDemand);
    self.browserView = new BrowserView(self.browser);
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

MainManager.prototype.generateEmailForm = function(id) {
  $('#connect_with_user').remove();
  $('#main-body').append(HandlebarsTemplates['email_form']);
};

MainManager.prototype.emailUser = function(id, content) {
  var data = {id: id, content: content};
  $.ajax({
    url: '/connect',
    type: 'get',
    data: data
  }).done(function(response){
    $('#connect_with_user').html(response.recipient.first_name + ' has been messaged!').fadeOut(2000);
  });
};