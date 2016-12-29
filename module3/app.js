( function(){

	angular.module('NarrowItDownApp',[])
		.controller('NarrowItDownController',NarrowItDownController)
		.service('MenuSearchService',MenuSearchService)
		.directive('foundItems',FoundItemsDirective);

	NarrowItDownController.$injector = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var narrowController = this;

		narrowController.searchIt = function(){
			if(!narrowController.searchTerm){
				narrowController.found = [];
				narrowController.message = 'Nothing found!';
				return;
			}
			var promise = MenuSearchService.getMatchedMenuItems(narrowController.searchTerm);
			promise.then(function(items){
				narrowController.found = items;
				if(!narrowController.found.length){
					narrowController.message = 'Nothing found!';
				} else{
					narrowController.message = '';
				}
			})
			.catch(function (error) {
      			console.log(error);
			});
		};

		narrowController.remove = function(index){
			console.log(index);
			narrowController.found.splice(index,1);
		}

	}
	MenuSearchService.$injector = ['$http'];
	function MenuSearchService($http){
		var service = this;
		service.getMatchedMenuItems = function(searchTerm){
			return $http({url:'https://davids-restaurant.herokuapp.com/menu_items.json'})
				.then(function (result) {
				    // process result and only keep items that match
				    var foundItems = result.data.menu_items;
				    //console.log(foundItems);
				    var filteredItems = foundItems.filter(function(i){
					    return i.description.match(searchTerm);
				    })
				    //.filter(function(i){
				    // });

				    // return processed items
				    return filteredItems;
				}
			);
		}
	}

	function FoundItemsDirective(){
		var ddo = {
			templateUrl: 'FoundItemsDirective.html',
			scope: {
				items: '<',
				myTitle: '@title',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'found',
			bindToController: true
		};
		return ddo;
	}
	function FoundItemsDirectiveController(){

	}

})();