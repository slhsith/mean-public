jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmine.getEnv().defaultTimeoutInterval = 20000;
	
	describe('mainApp',['ui.router','templates'], function () {
        beforeEach(angular.mock.module('mainApp'));

        describe("ShopCtrl", function () {
            var ShopCtrl, scope;

            beforeEach(inject(function ($rootScope,  $controller, items) {
                scope = $rootScope.$new();

                ShopCtrl = $controller("ShopCtrl", {
                    scope: $scope,
                    Items: items
                });
            }));


            it('ensures that Item is in scope.data defined', function () {
                expect($scope.data.Items).toBeDefined();
            });

            it('doSomething() does something', function () {
                var x = $scope.doeSomething();
                expect(x).toBeDefined();
                // this will fail
            });
        });
    });











		// describe('jasmine.stringMatching', function(){
		// 	it("matches the string to the get", function() {
		// 		expect({item: 'id'}).toEqual({item: jasmine.stringMatching(/^id$/)});
		// 		expect({item: 'ItemId'}).toEqual({item: jasmine.stringMatching('Itemid')});
		// 	});

		// 	  describe("spy for getting one item by id", function() {
		// 	    it("spies on the matching function", function() {
		// 	      var callback = jasmine.createSpy('callback');

		// 	      callback('ItemId');

		// 	      expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('Id'));
		// 	      expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^id$/));
		// 	    });
		// 	  });
		// });


		// describe("a spy to get a user id for item post", function () {
		// 	var item, userId, fetchedUserId;
		// 	var userId = user_id;

		// 	beforeEach(function() {
		// 		item = {
		// 			setUserId:  function(value) {
		// 				UserId = value;
		// 			},
		// 			getUserId: function() {
		// 				return UserId;
		// 			}
		// 		};

		// 		spyOn(item, 'getUserId').and.callThrough();

		// 		item.setUserId("user_id");
		// 		fetchedUserId = item.getUserId();
		// 	});

		// 	it("tracks that the spy function was called", function() {
		// 		expect(item.getUserId).toHaveBeenCalled();
		// 	});
		// 	it("does not affect other functions", function() {
		// 		expect(item.UserId).toEqual("user_id");
		// 	});
		// 	it("when called returns the requested value", function() {
		// 		expect(fetchedUserId).toEqual("user_id");
		// 	});
		// });

		// describe("Client.item [click] event", function () {
		// 	it("clicking an item link to retrieve specific item",function() {
		// 		Client.Items.getItemById(item._id);
		// 		Client.item.fireEvent('click');
		// 		expect(Item.get("item")).toBe([_id]);
		// 	});
		// });


