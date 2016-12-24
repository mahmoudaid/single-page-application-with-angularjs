(function() {
'use strict';

  angular.module('app')
  .controller('RecipesController', function($scope, dataService, $location) {

    // Categories
    dataService.getCategories(function(response) { 
      $scope.categories = response.data;
    });

    // Filter by category
    $scope.filterByCategory = function () {
      if($scope.selectedCategory){
        // Get recipes by category
        dataService.getRecipesByCategory($scope.selectedCategory.name, function(response) { 
          $scope.recipes = response.data;
        });
      }else{
        // Get all data
        dataService.getRecipes(function(response) { 
          $scope.recipes = response.data;
        });
      }
    };

    // Recipes
    dataService.getRecipes(function(response) { 
      $scope.recipes = response.data;
    });

    // Add recipe
    $scope.addRecipe = function() {
      $location.path('/add/');
    };

    // Recipe detail
    $scope.recipeDetail = function(recipeId) {
      $location.path('/edit/'+recipeId);
    };
    
    // Delete recipe
    $scope.deleteRecipe = function(recipe, $index) {
      var message = 'Are you sure you want to delete ('+recipe.name+') ?';
      var confirm = window.confirm(message);
      if(confirm){
        dataService.deleteRecipe(recipe);
        $scope.recipes.splice($index, 1);
      }
    };
  });
})();