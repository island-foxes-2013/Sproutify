$(function(){
  bindEvents();
})

function bindEvents(){
  $("#.signup-link").on("click", function(){
    $("#signup-modal").modal()
  });
}