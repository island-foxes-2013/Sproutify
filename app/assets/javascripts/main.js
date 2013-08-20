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

  this.mySupply = new MySupply();
  this.mySupplyView = new MySupplyView(this.mySupply);

  this.myDemand = new MyDemand();
  this.myDemandView = new MyDemandView(this.myDemand);

  this.bindEvents();
}

MainManager.prototype.bindEvents = function(){
  var self = this;

  $("body").on("initialMapLoad", function(){
    self.filter = new Filter(self.map.gardens);
    self.browserView = new BrowserView(self.map.gardens, self.filter);
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