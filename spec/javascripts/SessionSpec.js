describe("SessionManager", function(){
	it("should create a new Session & new SessionView", function(){
		var data = {};
		var fakeObject = {};

		var mysession = spyOn(window,'Session').andReturn(fakeObject);
		spyOn(window,'SessionView')
		
		SessionManager(data);
		expect(Session).toHaveBeenCalledWith(data);
		expect(SessionView).toHaveBeenCalledWith(fakeObject);
	});
});

describe("Session", function(){
	it("should setup properties",function(){
		var data = {
			logged_in: "bananas",
			user: "greg"
		};
		
		Session(data);
		expect(window.logged_in).toEqual("bananas")
		expect(window.user).toEqual("greg");
		expect(window.errors).toEqual({});
	});
});

describe("SessionView", function(){
	var session = "bananas";
	var a = jasmine.createSpyObj(window, ['attachModals','bindEvents']);
	var signupSpy = spyOn(window, 'SignupView');
	var loginSpy  = spyOn(window, 'LoginView');
	var logoutSpy = spyOn(window, 'LogoutView');

	SessionView.call(a, session);

	it("should attach modals", function(){
		expect(a.attachModals).toHaveBeenCalled();
	});

	it("should bind events", function(){
		expect(a.bindEvents).toHaveBeenCalled();
	});

	it("should create a new SignupView", function(){
		expect(signupSpy).toHaveBeenCalledWith(session);
	});

	it("should create a new LoginView", function(){
		expect(loginSpy).toHaveBeenCalledWith(session);
	});

	it("should create a new LogoutView", function(){
		expect(logoutSpy).toHaveBeenCalledWith(session);
	});

	// PENDING TESTS START
	xdescribe("#attachModals", function(){
		it("does not do anything unless logged in");

		it("attaches handlebar templates if user is logged in");
	});

	xdescribe("#bindEvents", function(){
		it("hides the modal when the body is clicked");

		it("empties the main body when a user logs in");

		it("changes the navbar when a user logs in");

		it("changes the navbar when a user logs out");
	});
	// PENDING TEST END
});


describe("SignupView", function(){

	it("should set up the properties for a new SignupView", function(){
		var mysession = "peaches";
		var mySignupView = new SignupView(mysession);
		expect(mySignupView.session).toEqual("peaches");
		expect(mySignupView.linkSelector).toEqual(".signup-link");
		expect(mySignupView.formSelector).toEqual("#new_user");
		expect(mySignupView.modalSelector).toEqual("#signup-modal");
	});

	it("should call bindEvents method", function(){
		var mysession = "peaches";
		var a = jasmine.createSpyObj(window, ['bindEvents']);
		SignupView.call(a, mysession);
		expect(a.bindEvents).toHaveBeenCalled();
	});
});
