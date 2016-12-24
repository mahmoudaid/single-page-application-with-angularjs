(function() {
'use strict';

  angular.module('app')
  .controller('RecipeDetailController', function($scope, dataService, $location, $routeParams) {

  	if($routeParams.id){
  		dataService.getRecipe($routeParams.id, function(response) { 
	      $scope.recipe = response.data;
	    });
  	}else{
  		$scope.recipe = {};
  		$scope.recipe.ingredients = [{foodItem: '', condition: '', amount: ''}];
      	$scope.recipe.steps = [{description: ''}];
  	}

  	$scope.cancel = function () {
  		//$scope.recipe = {};
  		$location.path('/');	
  	};

    // Categories
    dataService.getCategories(function(response) { 
      $scope.categories = response.data;
    });

    // Food items
    dataService.getFoodItems(function(response) { 
      $scope.foodItems = response.data;
    });

    // Delete Ingredient or step
    $scope.deleteRow = function (array, $index) {
  		array.splice($index, 1);
  	};

    // Add Ingredient
    $scope.addIngredient = function () {
  		$scope.recipe.ingredients.push({foodItem: '', condition: '', amount: ''});
  	};
    
    // Add Sep
    $scope.addStep = function() {
      $scope.recipe.steps.push({description: ''});
    };

    // Save Recipe 
    $scope.saveRecipe = function () {
  		// Adds a new recipe if on the /add path. 
		if ($location.path() === '/add') {
			dataService.saveRecipe($scope.recipe, function() {
			  $location.path('/');
			}, errorCallback);

		/** Updates current recipe if not on the /add path. */
		} else {
			dataService.updateRecipe($scope.recipe._id, $scope.recipe, function() {
			  $location.path('/');
			}, errorCallback);
		}
  	};

	/** Creates an array containing each individual error message. */
	function errorCallback(response) {
		$scope.errors = response.data.errors;
		$scope.allErrors = [];
		for (var error in $scope.errors) {
		  $scope.allErrors.push($scope.errors[error][0].userMessage);
		}
	}

  });
})();