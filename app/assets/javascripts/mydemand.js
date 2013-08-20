function MyDemand(){
  this.myDemand = [];
  this.myDemandNames = [];
  this.getDemand();
}

MyDemand.prototype = {
  getDemand: function(){

    var self = this;
    $.ajax({
      url: '/demands',
      type: 'GET'
    }).done(function(response){ 
      self.myDemand = response.demands;
      self.mapNames();
      $(self).trigger("updatedData");
    });
  },
  mapNames: function(){
    this.myDemandNames = $.map(this.myDemand, function(crop){
      return crop.name;
    });
  }

};

function MyDemandView(myDemand){
  this.myDemand = myDemand;

  this.linkSelector = ".myDemand-link";
  this.formSelector = '#myDemand-form';
  this.modalSelector = "#myDemand-modal";
  this.$parent = $("body");
  // this.$modal = $(this.modalSelector);
  this.$form = $(this.formSelector);

  this.appendForm();
  this.bindEvents();
}

MyDemandView.prototype = {
  appendForm: function(){
    $('#add-demand').html(HandlebarsTemplates['add_demand']);
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on('ajax:success', this.formSelector, function(event, response, xhr, element){
      self.renderErrors(response);
      self.myDemand.getDemand();
    });
  },
  renderErrors: function(response){
    this.$form.find('.alert').remove();
    this.$form.find(".modal-body").prepend(HandlebarsTemplates['error'](response));
  }
};