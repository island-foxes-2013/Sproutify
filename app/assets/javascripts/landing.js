$(function(){
  bindEvents();
});

function bindEvents(){
  $("#signup-link").on("ajax:beforeSend", function(){
    $("#signup-modal").modal();
    return false;
  });
  $("#login-link").on("ajax:beforeSend", function(){
    $("#login-modal").modal();
    return false;
  });
  $("#new_session").on("ajax:success", function(event, response, xhr, element){
    if (response.hasOwnProperty("error")){
      var $alert = $(".alert-danger");
      $alert = $alert.text(response.error);
      $("#new_session").find(".modal-body").append($alert);
      $alert.show();
    }
    
  });
}