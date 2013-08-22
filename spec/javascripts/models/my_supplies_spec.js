describe("MySupplies", function(){
	demoSupplies = new MySupplies();

	it("should have an empty container for supplies", function(){
		expect(demoSupplies.mySupplies).toEqual([]);
	});

	it("should have empty containers for supply names", function(){
		expect(demoSupplies.mySuppliesNames).toEqual([]);
	});

});

describe("#getSupplies", function(){
	var demoSupplies, request, getSuppliesSpy;

	beforeEach(function(){
		demoSupplies = new MySupplies();
		getSuppliesSpy = jasmine.createSpy();
		$(demoSupplies).on('updatedData', getSuppliesSpy);
		request = {
			done: function(callback){
				this.doneCallback = callback;
			},
			success: function(){
				this.doneCallback({
					mySupplies << 'banana object',
					mySuppliesNames << 'banana'
				})
			},
			fail: function(){
				this.doneCallback({
					errors: { demo: "unsuccessful" }
				});
			}
		}
	});// end beforeEach


});