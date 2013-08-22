describe("MySupplies", function(){
	demoSupplies = new MySupplies();

	it("should have an empty container for supplies", function(){
		expect(demoSupplies.mySupplies).toEqual([]);
	});

	it("should have empty containers for supply names", function(){
		expect(demoSupplies.mySuppliesNames).toEqual([]);
	});

	// it("should call getSupplies method in constructor", function(){
	// 	spyOn(MySupplies, 'getSupplies').andCallThrough();
	// 	// Mysupplies();
	// 	expect(demoSupplies.getSupplies).toHaveBeenCalled();
	// });
});

describe("#getSupplies", function(){
	var demoSupplies, request, getSuppliesSpy;

	beforeEach(function(){
		demoSupplies = new MySupplies();
		getSuppliesSpy = jasmine.createSpy();
	});
});