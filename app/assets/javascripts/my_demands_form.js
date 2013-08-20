function MyDemandsForm(myDemands){
  this.myDemands = myDemands;

  this.linkSelector = ".demand-manager-link";
  this.modalSelector = "#demand-manager-modal";

  this.formSelector = '#new-demand-form';
  this.$parent = $("body");

  this.appendForm();

  // this.$modal = $(this.modalSelector);
  this.$form = $(this.formSelector);

  
  this.bindEvents();
}

MyDemandsForm.prototype = {
  appendForm: function(){
    $('#add-demand-form').html(HandlebarsTemplates['add_demand']);
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on('ajax:success', this.formSelector, function(event, response, xhr, element){
      if (response.hasOwnProperty("errors")){
        self.renderErrors(response);
      }
      self.myDemands.getDemands();
      self.$form.find(".demand-field").val("");
    });
  },
  renderErrors: function(response){
    this.$form.parent().find('.alert').remove();
    this.$form.before(HandlebarsTemplates['error'](response));
  }
};