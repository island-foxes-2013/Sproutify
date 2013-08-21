function ManageSuppliesModal() {
  this.bindEvents();
}

ManageSuppliesModal.prototype = {
  bindEvents: function(){
    var self = this;
    $("#supply-manager").on('click', '#close', function(event) {
      event.preventDefault();
      self.hide();
    });
  },
  show: function() {
    Avgrund.show('#supply-manager');
  },
  hide: function() {
    Avgrund.hide();
  },
};