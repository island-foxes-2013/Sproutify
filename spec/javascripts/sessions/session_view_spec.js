describe("SessionView", function(){
  beforeEach(function() {
    affix('#main-body');
  });
  var logoutSpy, loginSpy, signupSpy, sessionView, session;
  describe('new', function() {
    beforeEach(function() {
      session = "bananas";
      authenticationSpy = spyOn(window, 'AuthenticationView');
      logoutSpy = spyOn(window, 'LogoutView');
      sessionView = new SessionView(session);
    });

    it("should create a new SignupView", function(){
      expect(authenticationSpy).toHaveBeenCalledWith({
        session: session,
        element: $('body'),
        modal: SignupModal,
        link: '.signup-link'
      });
    });

    it("should create a new LoginView", function(){
      expect(authenticationSpy).toHaveBeenCalledWith({
        session: session,
        element: $('body'),
        modal: LoginModal,
        link: '.login-link'
      });
    });

    it("should create a new LogoutView", function(){
      expect(logoutSpy).toHaveBeenCalledWith(session, $('body'));
    });
  });
  xdescribe("when a session triggers a loggedIn event", function() {

  });
  xdescribe("when a sessed")

});
