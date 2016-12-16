( function(){
	angular.module('modAssignment1',[])
		.controller('LunchCheckController',LunchCheckController);

	LunchCheckController.$injector = ['$scope'];
	function LunchCheckController($scope){
		$scope.checkIfTooMuch = function(){
			if(typeof $scope.myLunch === "undefined" || $scope.myLunch==""){
				$scope.message = "Please enter data first";
				return;
			}

			var mySplitLunch = $scope.myLunch.split(',');
			if(mySplitLunch.length<4){
				$scope.message = "Enjoy!";
			}else{
				$scope.message = "Too much!"
			}
		}

	}

})();