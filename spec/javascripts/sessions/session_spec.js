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
});
