describe("Session", function(){
	it("should setup properties",function(){
		var data = {
			logged_in: true,
			user: "greg"
		};
		
		var session = new Session(data);
		expect(session.isLoggedIn()).toBeTruthy();
		expect(session.user()).toEqual("greg");
		expect(session.errors()).toEqual({});
	});

	describe("#user", function(){
		it("returns the name of the current user", function(){
			var data = {
				logged_in: true,
				user: "dude"
			};
			
			var session = new Session(data);
			expect(session.user()).toEqual("dude");
		});
	});

	describe("#errors", function(){
		it("returns the errors of the current user", function(){
			var data = {
				logged_in: true,
				user: "guy"
			};
			
			var session = new Session(data);
			expect(session.errors()).toEqual({});
		});
	});

	describe("#logIn", function() {
		var session, request, loginEventSpy, requestFailSpy;
		
		beforeEach(function() {
			session = new Session({});
			loginEventSpy = jasmine.createSpy();
			$(session).on('loggedIn', loginEventSpy);
			request = {
				done: function(callback) {
					this.doneCallback = callback
				},
				succeed: function() {
					this.doneCallback({
						logged_in: true,
						user: "bob"
					})
				},
				fail: function() {
					this.doneCallback({
						logged_in: false,
						errors: { username: "Not a cool enough username" }
					});
				}
			}
			session.api.sendRequest = function() { 
				return request 
			}
		});

		it("calls any fail callbacks when the log in fails", function() {
			
			var loginFailedSpy = jasmine.createSpy();

			session.logIn({
				username: "foo",
				password: "bar"
			}).fail(loginFailedSpy);

			request.fail();
			expect(loginFailedSpy).toHaveBeenCalled();
		});

		it("adds errors to the session when the log in fails ", function() {
			session.logIn({
				username: "foo",
				password: "bar"
			})

			request.fail();
			expect(session.errors()).toEqual({ username: "Not a cool enough username"})
		});

		it("sets the user and logged in status from the response", function() {
			session.logIn({
				username: "foo",
				password: "bar"
			});
			
			request.succeed();
			expect(session.user()).toEqual("bob");
			expect(session.isLoggedIn()).toBeTruthy()
		});

		it("triggers a loggedIn event when the log in works", function() {
			session.logIn({
				username: "foo",
				password: "bar"
			});

			request.succeed();
			expect(loginEventSpy).toHaveBeenCalled();
		});

		it("does not trigger a loggedIn event when the log in fails", function() {
			session.logIn({
				username: "foo",
				password: "bar"
			});
			
			request.fail();
			expect(loginEventSpy).not.toHaveBeenCalled();
		});
	})

	describe("#logOut", function() {
		var session, request, logoutEventSpy, requestFailSpy;
		
		beforeEach(function() {
			session = new Session({});
			logoutEventSpy = jasmine.createSpy();
			$(session).on('loggedOut', logoutEventSpy);
			request = {
				done: function(callback) {
					this.doneCallback = callback
				},
				succeed: function() {
					this.doneCallback({
						logged_in: false
					})
				},
				fail: function() {
					this.doneCallback({
						logged_in: true,
						errors: { session_status: "Logout unsuccessful" }
					});
				}
			}
			session.api.sendRequest = function() { 
				return request 
			}
		});// end beforeEach

		it("triggers a loggedOut event when the log out works", function() {
			session.logOut({});
			request.succeed();
			expect(logoutEventSpy).toHaveBeenCalled();
		});
		
		it("calls any fail callbacks when the log out fails", function() {
			var logoutEventSpy = jasmine.createSpy();
			session.logOut({}).fail(logoutEventSpy);
			request.fail();
			expect(logoutEventSpy).toHaveBeenCalled();
		});

		it("adds errors to the session when the log out fails ", function() {
			session.logOut({})
			request.fail();
			expect(session.errors()).toEqual({ session_status: "Logout unsuccessful"})
		});

		it("sets the user and logged out status from the response", function() {
			session.logOut({});
			request.succeed();

			expect(session.user()).toEqual(null);
			expect(session.isLoggedIn()).toBeFalsy();
		});
		
		it("does not trigger a loggedOut event when the log out fails", function() {
			session.logOut({});
			request.fail();
			expect(logoutEventSpy).not.toHaveBeenCalled();
		});
	});

	describe("#update", function(){
		var data1 = {
			logged_in: false,
			user: "bill"
		}
		var data2 = {
			logged_in: true,
			user: "ted"
		}
		var session = new Session(data1)

		it("should update the appropriate attributes", function(){
			session.update(data2);
			expect(session.data.logged_in).toEqual(true);
			expect(session.data.user).toEqual("ted");
		});
	});
});



















