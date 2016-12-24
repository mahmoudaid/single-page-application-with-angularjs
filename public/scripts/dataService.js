(function() {
  'use strict';

  angular.module('app')
  .service('dataService', function($http) {

    // Categories
    this.getCategories = function(callback){
      $http.get('/api/categories')
      .then(callback)
    };

    // Recipes
    this.getRecipes = function(callback){
      $http.get('api/recipes')
      .then(callback)
    };

    // Get recipes by category name
    this.getRecipesByCategory = function(categoryName, callback){
      $http.get('api/recipes?category='+categoryName)
      .then(callback)
    };

    // Delete recipe
    this.deleteRecipe = function(recipe) {
      $http.delete('api/recipes/'+recipe._id)
      console.log("The " + recipe.name + " recipe has been deleted!");
    };

    // Get recipe
    this.getRecipe = function(recipeId, callback){
      $http.get('api/recipes/'+recipeId)
      .then(callback)
    };

    // Update recipe
    this.updateRecipe = function(recipeId, recipeObject, successCallback, errorCallback) {
      $http.put('api/recipes/'+ recipeId, recipeObject)
        .then(successCallback, errorCallback);
    };

    // Store new recipe
    this.saveRecipe = function(recipeObject, successCallback, errorCallback) {
      $http.post('api/recipes', recipeObject)
        .then(successCallback, errorCallback);
    };

    // Food items
    this.getFoodItems = function(callback){
      $http.get('api/fooditems')
      .then(callback)
    };

    

  });
})();