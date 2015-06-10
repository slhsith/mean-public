app.controller('ExerciseCtrl', function ($scope, items, exercisePromise, $stateParams) {
  $scope.exercise = exercisePromise;
  $scope.addStep = function() {
    items.newStep($scope.step, $stateParams.exercise).success(function(data){
      console.log('success');
      $scope.step = null;
      $scope.exercise.steps.push(data);
   }).error(function(){
       console.log('failure');
   });
  };
});

app.controller('StepCtrl', function ($scope, items, stepPromise, $stateParams) {
  $scope.step = stepPromise;
});

