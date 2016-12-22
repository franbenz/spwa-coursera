( function(){

	angular.module('ShoppingListCheckOff',[])
		.controller('ToBuyController',ToBuyController)
		.controller('AlreadyBoughtController',AlreadyBoughtController)
		.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

	ToBuyController.$injector = ['$scope','ShoppingListCheckOffService'];
	function ToBuyController($scope,ShoppingListCheckOffService){
		var tobuy = this;
		tobuy.items = ShoppingListCheckOffService.getToBuyItems();

		tobuy.removeItem = function(index){
			var items = ShoppingListCheckOffService.removeToBuyItem(index);
			ShoppingListCheckOffService.addBoughtItem(items[0].name,items[0].quantity);
		}

	}

	AlreadyBoughtController.$injector = ['$scope','ShoppingListCheckOffService'];
	function AlreadyBoughtController($scope,ShoppingListCheckOffService){
		var already = this;

		already.items = ShoppingListCheckOffService.getBoughtItems();
		
	}

	function ShoppingListCheckOffService(){
	  var service = this;

	  // List of shopping items
	  var toBuyItems = [
	  	{name: 'cookies',
	      quantity: 20
	    },
	    { name: 'galletitas',
	      quantity: 30
	    },
	    { name: 'oreos',
	      quantity: 40
	    },
	    { name: 'mandiocas',
	      quantity: 50
	    },
	    { name: 'papas fritas',
	      quantity: 60
	    },
	    { name: 'medialunas',
	      quantity: 70
	    }];
	  var boughtItems = [];
///////////////////////////////////////////////////
	  service.addToBuyItem = function (itemName, quantity) {
	    var item = {
	      name: itemName,
	      quantity: quantity
	    };
	    toBuyItems.push(item);
	  };

	  service.removeToBuyItem = function (itemIdex) {
	    return toBuyItems.splice(itemIdex, 1);
	  };

	  service.getToBuyItems = function () {
	    return toBuyItems;
	  };
///////////////////////////////////////////////////
	  service.addBoughtItem = function (itemName, quantity) {
	    var item = {
	      name: itemName,
	      quantity: quantity
	    };
	    boughtItems.push(item);
	  };

	  service.removeBoughtItem = function (itemIdex) {
	    boughtItems.splice(itemIdex, 1);
	  };

	  service.getBoughtItems = function () {
	    return boughtItems;
	  };
	}

})();