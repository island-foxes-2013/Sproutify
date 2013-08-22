function SessionView(session){
  this.session = session;
  this.bindEvents();

  new AuthenticationView({
    session: session, 
    element: $('body'), 
    modal: SignupModal, 
    link: '.signup-link'
  });

  new AuthenticationView({
    session: session, 
    element: $('body'), 
    modal: LoginModal,
    link: '.login-link'
  });

  new LogoutView(session, $('body'));
}


SessionView.prototype = {
  bindEvents: function(){
    $(this.session).on("loggedIn", function(){
      $("#main-body").empty();
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedin']());
      new MainManager();
    });
    $(this.session).on("loggedOut", function(){
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedout']());
      new LandingManager();
    });
  }

};
