function MySupply(){
  this.growing = {};
  this.harvesting = {};
  this.getSupply();
}

MySupply.prototype = {
  getSupply: function(){

    var self = this;
    $.ajax({
      url: '/supplies',
      type: 'GET'
    }).done(function(response){ 
      self.growing = response.growing;
      self.harvest = response.harvesting;
      // $('.user-supplies').html(HandlebarsTemplates['current_supply'](response));
      // $('.crop-field').val('');
      // $('.drop-down').prop('selectedIndex',0);
    });
  },

};

function MySupplyView(mySupply){
  this.mySupply = mySupply;
  this.showForm();
  this.bindEvents();
}

MySupplyView.prototype = {
  showForm: function(){
    $('#add-supply').html(HandlebarsTemplates['add_supply']);
  },
  bindEvents: function(){
    var self = this;
    $("body").on('ajax:success', '#add-supplies-form', function(){
      self.mySupply.getSupply();
    });
  }
};