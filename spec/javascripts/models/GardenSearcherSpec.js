// describe("GardenSearcher", function() {
//   var server, callback;
//   var user = {name: "somebody"};
//   var boundary = {ulat:2, ulng:2, blat:3, blng:0};

//   beforeEach(function(){
//     server = sinon.fakeServer.create();
//   });

//   describe("#fetch", function() {
//     it("returns user objects within a boundary", function() {
//       var searcher = new GardenSearcher();
//       callback = function(results) {
//         expect(results[0].user).toEqual(user);
//       }

//       searcher.fetch(boundary, callback);
//     });
//   });

//   afterEach(function() {
//     server.restore();
//   });

// });