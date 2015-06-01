/*  ----------------------  *
    CONTROLLER - DIETPLAN
 *  ----------------------  */
/* 
/* ---------------------------- */
app.controller('DietCtrl', function ($scope, Meal) {
  var self = this;
  $scope.debug = true;

  // ---- INIT SCOPE ----  //
  self.init = function(element) {
    self.$element = element;
  };

  $scope.showRecipe = false;

  // // ------ METHODS FOR CONVERSATIONS ------ //

  $scope.initNewRecipe = function() {
    $scope.showRecipe = true;
    $scope.recipe = {};
  };



});
