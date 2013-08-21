function MySuppliesForm(mySupplies){
  this.mySupplies = mySupplies;
 
  this.formSelector = '#new-supplies-form';
  this.$parent = $("body");

  this.appendForm();

  this.$form = $(this.formSelector);

  this.bindEvents();
}

MySuppliesForm.prototype = {
  appendForm: function(){
    $('#add-supply-form').html(HandlebarsTemplates['add_supply']);
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on('ajax:success', this.formSelector, function(event, response, xhr, element){
      if (response.hasOwnProperty("errors")){
        self.renderErrors(response);
      }
      self.mySupplies.getSupplies();
      self.$form.find(".supply-field").val("");
    });
  },
  renderErrors: function(response){
    this.$form.parent().find('.alert').remove();
    this.$form.before(HandlebarsTemplates['error'](response));
  }
};